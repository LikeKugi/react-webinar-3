import {CommentsConstants} from "./constants";

const initialData = {
  count: 0,
  items: [],
};

export const initialState = {
  data: initialData,
  waiting: false,
  error: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CommentsConstants.LOAD_START:
      return {...state, data: initialData, waiting: true, error: ""};

    case CommentsConstants.LOAD_SUCCESS:
      return {...state, data: action.payload.data || initialData, waiting: false, error: ""};

    case CommentsConstants.LOAD_ERROR:
      return {...state, data: initialData, waiting: false, error: action.payload.error.message};

    case CommentsConstants.ADD_COMMENT:
      return {...state, data: {count: state.data.count + 1, items: [...state.data.items, action.payload]}};

    default:
      return state;
  }
}

export default reducer;
