import {
  ADD_BOOK,
  EDIT_BOOK_DETAILS,
  REMOVE_ALL,
  REMOVE_BOOK,
} from "./actionTypes";

const INIT_STATE = {
  data: [],
  isbn: [],
};

const bookshelf = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        data: [
          ...state.data,
          {
            title: action.payload.title,
            author: action.payload.author,
            year: action.payload.year,
            isbn: action.payload.isbn,
          },
        ],
        isbn: [...state.isbn, action.payload.isbn],
      };

    case REMOVE_ALL:
      return {
        ...state,
        data: [],
        isbn: [],
      };

    case REMOVE_BOOK:
      return {
        ...state,
        data: state.data.filter(
          (ele) => ele?.isbn?.toString() !== action?.payload?.toString()
        ),
        isbn: state.isbn.filter(
          (ele) => ele?.toString() !== action?.payload?.toString()
        ),
      };

    case EDIT_BOOK_DETAILS:
      return {
        ...state,
        data: state.data.map((ele) =>
          ele?.isbn?.toString() === action.payload.isbnOld?.toString()
            ? {
                title: action.payload.title,
                author: action.payload.author,
                year: action.payload.year,
                isbn: action.payload.isbn,
              }
            : ele
        ),
      };

    default:
      return state;
  }
};

export default bookshelf;
