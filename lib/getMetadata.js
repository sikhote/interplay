export default function getMetadata(page) {
  const divider = ' · ';
  const name = 'interplay';
  const description = 'play media from the cloud on a browser';
  let title;

  switch (page) {
    case 'music':
      title = `music${divider}${name}`;
      break;
    default:
      title = name;
  }

  return { title, description };
}
