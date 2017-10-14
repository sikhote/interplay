export const settingsUpdate = settings => ({
  type: 'SETTINGS_UPDATE',
  payload: { settings },
});

export const settingsDropboxDelete = () => ({
  type: 'SETTINGS_DROPBOX_DELETE',
});
