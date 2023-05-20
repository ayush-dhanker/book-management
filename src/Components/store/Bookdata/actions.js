import {
  ADD_BOOK,
  REMOVE_ALL,
  REMOVE_BOOK,
  EDIT_BOOK_DETAILS,
} from "./actionTypes";

export const addBook = (title, author, year, isbn) => ({
  type: ADD_BOOK,
  payload: { title, author, year, isbn },
});

export const removeAll = () => ({
  type: REMOVE_ALL,
});

export const removeBook = (isbn) => ({
  type: REMOVE_BOOK,
  payload: isbn,
});

export const editBookDetails = (title, author, year, isbn, isbnOld) => ({
  type: EDIT_BOOK_DETAILS,
  payload: { title, author, year, isbn, isbnOld },
});
