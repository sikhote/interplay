export const extensions = {
  audio: ['mp3', 'm4a', 'mp4', 'm4p'],
  video: ['avi', 'mkv', 'mov', 'm4v'],
};

export const getFileType = fileExt =>
  Object.keys(extensions).find(exts => extensions[exts].includes(fileExt));
