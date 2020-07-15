/* -----------------    ACTION TYPES    ------------------ */

const RESET_STATE = 'RESET_STATE';
const UPDATE_STORE = 'UPDATE_STORE';

/* ------------     ACTION CREATORS      ------------------ */

export const resetStateActionCreator = () => ({ type: RESET_STATE});
export const updateStoreActionCreator = (data) => ({ type: UPDATE_STORE, data });

/* ------------          REDUCER         ------------------ */

const initialState = {
	code: [],
	turn: 0,
	guessHistory: [],
	responseHistory: [],
	codeLength: 4,
	guessCount: 10,
};

export default function reducer (state = initialState, action) {
  switch (action.type) {

    case RESET_STATE:
      return {};
		case UPDATE_STORE:
      return Object.assign({}, state, action.data);
    default:
      return state
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const resetState = () => dispatch => {
  dispatch(resetStateActionCreator());
};

export const updateStore = (data) => dispatch => {
  dispatch(updateStoreActionCreator(data));
};


