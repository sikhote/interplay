// eslint-disable-next-line no-console
const log = (type, message) => console[type](message);

export default {
	success: message => log('log', message),
	error: message => log('error', message),
};
