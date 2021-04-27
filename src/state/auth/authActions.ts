export const ADD_ITEM = 'ADD_ITEM';

const prefix = 'AUTH';

export const SELECTED_COUNTRY = `${prefix}/SELECTED_COUNTRY`;

export const setSelectedCountry = item => ({
  type: SELECTED_COUNTRY,
  payload: item,
});
