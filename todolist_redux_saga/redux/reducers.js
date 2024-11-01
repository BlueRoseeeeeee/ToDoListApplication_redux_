import {
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_FAILURE,
  ADD_ITEM_SUCCESS,
  UPDATE_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
} from './actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMS_SUCCESS:
      return { ...state, items: action.payload, loading: false };
    case FETCH_ITEMS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case ADD_ITEM_SUCCESS:
      return { ...state, items: [...state.items, action.payload] };
    case UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, title: action.payload.updatedText } : item
        ),
      };
    case DELETE_ITEM_SUCCESS:
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

export default reducer;
