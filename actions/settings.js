export const settingsReplace = settings => ({
  type: 'SETTINGS_REPLACE',
  payload: { settings },
});

export const settingsCloudDelete = () => ({
  type: 'SETTINGS_CLOUD_DELETE',
});
