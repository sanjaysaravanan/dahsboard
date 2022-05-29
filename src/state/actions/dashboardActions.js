import { LOAD_LAYOUT } from './actionTypes';

export function saveLayout(payload) {
  return {
    type: LOAD_LAYOUT,
    payload,
  };
}
