/* Actions */
const SET_PAGE = 'baker/ui/SET_PAGE';

const initialState = {
  currentPage: ''
};
/* Reducer Function */
export default function reducer(state = initialState, action = {}) {
  switch(action.type) {
    case SET_PAGE:
      return {
        ...state,
        currentPage: action.page
      };
    default:
      return state;
  }
}

/* Action Creators */
export function setPage(page) {
  return {
    type: SET_PAGE,
    page: page
  }
}
