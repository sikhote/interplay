import { startCase, has, get } from 'lodash';
import Dropbox from 'dropbox';
import moment from 'moment';
import { getFileType } from '../lib/files';
import notifier from '../lib/notifier';
import { settingsReplace } from './settings';
import { cloudSaveFiles } from './cloud';

export const filesUpdate = payload => ({
	type: 'FILES_UPDATE',
	payload,
});

export const filesGetUrl = payload => (dispatch, getState) => {
	const { path: filePath, shouldPlay } = payload;
	const { settings, files } = getState();
	const fileIndex = files.findIndex(file => file.path === filePath);
	const file = files[fileIndex];
	const getNewSettings = newSettings => {
		const { settings } = getState();

		return {
			...settings,
			player: {
				...settings.player,
				...newSettings,
			},
		};
	};

	// Update state to indicate song was selected and URL is loading
	if (shouldPlay) {
		dispatch(
			settingsReplace(
				getNewSettings({
					file,
					position: fileIndex,
					loading: true,
					playing: true,
				}),
			),
		);
	}

	// If the current linkDate is not too old no need to load a new link
	if (
		has(file, 'urlDate') &&
		moment(file.urlDate).isAfter(moment().subtract(3, 'hours'))
	) {
		if (shouldPlay) {
			dispatch(settingsReplace(getNewSettings({ loading: false })));
		}

		return Promise.resolve();
	}

	const accessToken = settings.cloud.key;
	const path = `/${settings.cloud.path}`;
	const dropbox = new Dropbox({ accessToken });

	return dropbox
		.filesGetTemporaryLink({ path: `${path}/${filePath}` })
		.then(({ link: url }) => {
			const newFile = {
				...file,
				url,
				urlDate: Date.now(),
			};

			dispatch(filesUpdate({ file: newFile }));

			if (shouldPlay) {
				dispatch(
					settingsReplace(getNewSettings({ file: newFile, loading: false })),
				);
			}
		})
		.catch(() => notifier.error('Failed to get streaming URL'));
};

export const filesReplace = files => ({
	type: 'FILES_REPLACE',
	payload: { files },
});

export const filesSync = () => (dispatch, getState) => {
	const settingsCloud = getState().settings.cloud;
	const accessToken = settingsCloud.key;
	const path = `/${settingsCloud.path}`;
	const dropbox = new Dropbox({ accessToken });

	// Signal that syncing is starting
	dispatch(
		settingsReplace({
			...getState().settings,
			cloud: {
				...settingsCloud,
				date: Date.now(),
				status: 'syncing',
			},
		}),
	);

	const getEntries = ({ cursor, list, entries }) => {
		const listPromise = cursor
			? dropbox.filesListFolderContinue({ cursor })
			: dropbox.filesListFolder(list);

		return listPromise.then(response => {
			entries.push(...response.entries);

			if (getState().settings.cloud.status === 'cancelled') {
				return Promise.reject(new Error('cancelled'));
			}

			return response.has_more
				? getEntries({ list, entries, cursor: response.cursor })
				: entries;
		});
	};

	return getEntries({
		list: { path, recursive: true },
		entries: [],
	})
		.then(entries =>
			entries.reduce((files, entry) => {
				if (entry['.tag'] === 'file') {
					const filePath = entry.path_lower.replace(`${path}/`, '');
					const parts = filePath.split('/').reverse();
					const fileNameParts = parts[0].split('.');
					const type = getFileType(fileNameParts.pop());
					let name = startCase(fileNameParts.join('.'));
					let track;

					if (!type) {
						return files;
					}

					if (type === 'audio' && /^\d{2}[" "]/.test(name)) {
						track = Number(name.substring(0, 2));
						name = name.substring(3);
					}

					files.push({
						name,
						path: filePath,
						link: undefined,
						linkDate: undefined,
						type,
						...(type === 'audio'
							? {
									album: startCase(get(parts, '[1]', '')),
									artist: startCase(get(parts, '[2]', '')),
									track,
							  }
							: {}),
						...(type === 'video'
							? {
									category: startCase(get(parts, '[1]', '')),
							  }
							: {}),
					});
				}

				return files;
			}, []),
		)
		.then(files => {
			// Start using new files
			dispatch(filesReplace(files));

			// Signal that syncing was successful
			dispatch(
				settingsReplace({
					...getState().settings,
					cloud: {
						...settingsCloud,
						date: Date.now(),
						status: 'success',
					},
				}),
			);

			// Save files to cloud
			dispatch(cloudSaveFiles());

			notifier.success('Synced files successfully');
		})
		.catch(error => {
			const cloud = {
				...settingsCloud,
				date: Date.now(),
				status: error.message === 'cancelled' ? 'cancelled' : 'error',
			};

			dispatch(settingsReplace({ ...getState().settings, cloud }));
			notifier.error(get(error, 'error.error_summary') || 'Unknown error');
		});
};
