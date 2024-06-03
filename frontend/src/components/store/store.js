import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/user/usersSlice";
import notesReducer from "../features/notes/notesSlice";

const store = configureStore({
  reducer: {
    userLogin: usersReducer,
    notes: notesReducer,
  },
});

export default store;
