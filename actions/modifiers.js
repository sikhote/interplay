export const modifiersSelectionsToggle = payload => ({
  type: 'MODIFIERS_SELECTIONS_TOGGLE',
  payload,
});

export const modifiersSelectionsRemoveAll = () => ({
  type: 'MODIFIERS_SELECTIONS_REMOVE_ALL',
});

export const modifiersShowUpdate = payload => ({
  type: 'MODIFIERS_SHOW_UPDATE',
  payload,
});
