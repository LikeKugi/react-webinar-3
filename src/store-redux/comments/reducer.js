import {CommentsConstants} from "./constants";

const initialData = {
  count: 0,
  items: [],
}

export const initialState = {
  data: initialData,
  waiting: false,
  error: '',
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case CommentsConstants.LOAD_START:
      return {...state, data: initialData, waiting: true, error: ''};

    case CommentsConstants.LOAD_SUCCESS:
      return {...state, data: action.payload.data, waiting: false, error: ''};

    case CommentsConstants.LOAD_ERROR:
      return {...state, data: initialData, waiting: false, error: action.payload.error.message};

    default:
      return state;
  }
}

export default reducer;
