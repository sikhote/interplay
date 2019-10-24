import Dropbox from 'dropbox';

const checkStatus = () => Promise.resolve();

const download = () => Promise.resolve();

const upload = () => Promise.resolve();

const delete = () => Promise.resolve();

export default auth => {
  const dropbox = new Dropbox({ accessToken: auth });

  return
}


({
  filesGetMetadata,
  filesDownload,
  filesUpload,
  filesDelete,
});
