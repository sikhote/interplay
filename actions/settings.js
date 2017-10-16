export const settingsUpdate = settings => ({
  type: 'SETTINGS_UPDATE',
  payload: { settings },
});

export const settingsCloudDelete = () => ({
  type: 'SETTINGS_CLOUD_DELETE',
});
