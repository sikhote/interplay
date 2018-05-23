export const extensions = {
  audio: ['mp3', 'm4a', 'mp4', 'm4p', 'm4v'],
  video: ['avi', 'mkv', 'mov'],
  invalid: [
    'aif',
    'audio',
    'book',
    'common',
    'controllers',
    'css',
    'csv',
    'discography',
    'home',
    'html',
    'images',
    'interface',
    'itlp',
    'itunesartwork',
    'jpg',
    'js',
    'nbproject',
    'pdf',
    'plist',
    'png',
    'private',
    'properties',
    'songs',
    'sounds',
    'src',
    'tunekit',
    'videos',
    'views',
    'xml',
  ],
};

export const getFileType = fileExt =>
  Object.keys(extensions).find(exts =>
    extensions[exts].find(ext => ext === fileExt),
  );