import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { merge, get, throttle } from 'lodash';
import screenfull from 'screenfull';
import { Button, Slider, Switch, Icon, Tooltip } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import style from '../styles/player';
import getFileInDirection from '../lib/getFileInDirection';
import { settingsReplace } from '../actions/settings';
import { filesGetUrl } from '../actions/files';

const prepareFile = throttle(callback => callback(), 10000, { leading: true });

class Player extends React.Component {
	static getDerivedStateFromProps(nextProps, prevState) {
		const oldPath = get(prevState, 'path');
		const path = get(nextProps, 'settings.player.file.path');

		if (oldPath !== path) {
			return {
				played: 0,
				playedSeconds: 0,
				path,
			};
		}

		return null;
	}

	constructor(props) {
		super(props);
		this.state = {
			path: undefined,
			played: 0,
			playedSeconds: 0,
			isFullscreen: false,
		};
	}

	componentDidMount() {
		screenfull.on('change', () => this.setIsFullscreen());
	}

	componentDidUpdate(prevProps) {
		const { settings, filesGetUrl } = this.props;
		const { path } = this.state;
		const source = get(settings, 'player.source');
		const playing = get(settings, 'player.playing');
		const isConnected = get(settings, 'isConnected');
		const isConnectedPrev = get(prevProps.settings, 'isConnected');

		if (isConnected !== isConnectedPrev && playing && source && path) {
			filesGetUrl({ source, path, shouldPlay: true });
		}
	}

	componentWillUnmount() {
		screenfull.off('change', () => this.setIsFullscreen());
	}

	setIsFullscreen() {
		this.setState({ isFullscreen: screenfull.isFullscreen });
	}

	render() {
		const { played, playedSeconds, path, isFullscreen } = this.state;
		const {
			files,
			settings,
			settingsReplace,
			filesGetUrl,
			playlists,
		} = this.props;
		const { player } = settings;
		const {
			source,
			volume,
			playing,
			loading,
			muted,
			random,
			file = {},
			loop,
		} = player;
		const { url, album, artist, name, type, category } = file;
		const config = {
			className: 'player',
			loop,
			muted,
			width: type === 'video' ? 124 : 0,
			height: type === 'video' ? 70 : 0,
			progressInterval: 1000,
			playsinline: true,
			controls: isFullscreen,
			volume,
			playing,
			url,
			ref: ref => {
				this.player = ref;
			},
			onDuration: () => this.player.seekTo(played),
			onProgress: ({ played, playedSeconds }) => {
				this.setState({ played, playedSeconds });

				// Get next link once 90% of media is over
				if (playing && played > 0.9) {
					prepareFile(() =>
						filesGetUrl({
							source,
							...getFileInDirection(settings, files, playlists),
						}),
					);
				}
			},
			onEnded: () =>
				filesGetUrl({
					...getFileInDirection(
						settings,
						files,
						playlists,
						random ? 'random' : 'next',
					),
					source,
					shouldPlay: true,
				}),
			onClick: () => screenfull.request(findDOMNode(this.player)),
		};

		return (
			<div className={`root ${type || ''}`}>
				<style jsx>{style}</style>
				<ReactPlayer {...config} />
				<div className="main">
					<div className="directions">
						<Button
							size="large"
							type="primary"
							shape="circle"
							icon="backward"
							onClick={() =>
								filesGetUrl({
									...getFileInDirection(
										settings,
										files,
										playlists,
										random ? 'random' : 'previous',
									),
									source,
									shouldPlay: true,
								})
							}
						/>
						<Button
							size="large"
							type="primary"
							shape="circle"
							loading={loading}
							icon={playing ? 'pause' : 'caret-right'}
							onClick={() => {
								if (!playing) {
									filesGetUrl({ source, path, shouldPlay: true });
								}

								settingsReplace(
									merge({}, settings, {
										player: { playing: !playing },
									}),
								);
							}}
						/>
						<Button
							size="large"
							type="primary"
							shape="circle"
							icon="forward"
							onClick={() =>
								filesGetUrl({
									...getFileInDirection(
										settings,
										files,
										playlists,
										random ? 'random' : 'next',
									),
									source,
									shouldPlay: true,
								})
							}
						/>
					</div>
					<div className="control sound">
						<Tooltip placement="top" title="Mute">
							<Switch
								checkedChildren={<Icon type="sound" />}
								unCheckedChildren={<Icon type="sound" />}
								checked={muted}
								onChange={() =>
									settingsReplace(
										merge({}, settings, {
											player: { muted: !muted },
										}),
									)
								}
							/>
						</Tooltip>
						<Slider
							value={volume}
							min={0}
							max={1}
							step={0.01}
							tipFormatter={volume => `Volume: ${Math.round(volume * 100)}%`}
							onChange={volume =>
								settingsReplace(
									merge({}, settings, {
										player: { volume },
									}),
								)
							}
						/>
					</div>
					<div className="control progress">
						<Tooltip placement="top" title="Loop">
							<Switch
								checkedChildren={<Icon type="retweet" />}
								unCheckedChildren={<Icon type="retweet" />}
								checked={loop}
								onChange={() =>
									settingsReplace(
										merge({}, settings, {
											player: { loop: !loop },
										}),
									)
								}
							/>
						</Tooltip>
						<Tooltip placement="top" title="Random">
							<Switch
								checkedChildren={<Icon type="question" />}
								unCheckedChildren={<Icon type="question" />}
								checked={random}
								onChange={() =>
									settingsReplace(
										merge({}, settings, {
											player: { random: !random },
										}),
									)
								}
							/>
						</Tooltip>
						<Slider
							value={played}
							min={0}
							max={1}
							step={0.01}
							tipFormatter={() =>
								moment(
									// eslint-disable-next-line no-underscore-dangle
									moment.duration(playedSeconds, 'seconds')._data,
								).format('mm:ss')
							}
							onChange={progress => this.player.seekTo(progress)}
						/>
					</div>
					<div className="info">
						{path
							? (category ? `${category} — ` : '') +
							  (artist ? `${artist} — ` : '') +
							  (album ? `${album} — ` : '') +
							  name
							: 'Add credentials and play some media'}
					</div>
				</div>
			</div>
		);
	}
}

Player.propTypes = {
	files: PropTypes.array.isRequired,
	settings: PropTypes.object.isRequired,
	settingsReplace: PropTypes.func.isRequired,
	filesGetUrl: PropTypes.func.isRequired,
	playlists: PropTypes.array.isRequired,
};

export default connect(
	({ files, settings, playlists }) => ({
		files,
		settings,
		playlists,
	}),
	dispatch => ({
		settingsReplace: payload => dispatch(settingsReplace(payload)),
		filesGetUrl: payload => dispatch(filesGetUrl(payload)),
	}),
)(Player);
