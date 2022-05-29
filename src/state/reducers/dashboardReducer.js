/* eslint-disable */
import { LOAD_LAYOUT } from "../actions/actionTypes";
import { localStorage } from '../utils/index';

export default function (state = {
  items: localStorage.getLocalState('ITEMS') || [],
  layout: localStorage.getLocalState('LAYOUT') || [],
  layouts: localStorage.getLocalState('LAYOUTS') || { lg: [], md: [], sm: [] },
}, action) {
  switch (action.type) {
    case LOAD_LAYOUT:
      const { items, layout, layouts } = action.payload;
      localStorage.setLocalState('ITEMS', items);
      localStorage.setLocalState('LAYOUT', layout);
      localStorage.setLocalState('LAYOUTS', layouts);
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
