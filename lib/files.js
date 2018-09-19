export const extensions = {
  audio: ['mp3', 'm4a', 'mp4', 'm4p', 'm4v'],
  video: ['avi', 'mkv', 'mov'],
};

export const getFileType = fileExt =>
  Object.keys(extensions).find(exts => extensions[exts].includes(fileExt));
