import { combineReducers } from "redux";
import bookshelf from "./Bookdata/reducer";

const rootReducer = combineReducers({
  //write reducers here
  bookshelf,
});

export default rootReducer;
