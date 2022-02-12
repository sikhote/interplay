import dropbox from './dropbox';

const services = { dropbox };

const service = (request, state, payload) => {
  const service = services[state.auth.service];
  return service[request](state, payload);
};

export default service;
