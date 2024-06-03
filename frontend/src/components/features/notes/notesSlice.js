import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  notes: [],
  loading: false,
  error: "",
  success: false,
};

const notesList = createAsyncThunk("notes/notesList", async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.get("api/notes", config);
    return data;
  } catch (error) {
    console.log("error", error.response.data.error.message);
    throw new Error(error.response.data.error.message);
  }
});

const createNote = createAsyncThunk(
  "note/createNote",
  async ({ title, content, catagory }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.post(
        "api/notes/create",
        { title, content, catagory },
        config
      );
      return data;
    } catch (error) {
      throw new Error(error.response.data.error.message);
    }
  }
);

const updateNote = createAsyncThunk(
  "note/update",
  async ({ id, title, content, catagory }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `/api/notes/${id}`,
        { title, content, catagory },
        config
      );
      console.log("updated data");
      return data;
    } catch (error) {
      console.log("update error", error);
      throw new Error(error.response.data.error.message);
    }
  }
);

const deleteNote = createAsyncThunk("note/delete", async (id) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    const { data } = await axios.delete(`/api/notes/${id}`, config);
    return data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(notesList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(notesList.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = "";
      state.success = true;
    });
    builder.addCase(notesList.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.payload;
    });
    builder.addCase(createNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = "";
      state.success = true;
    });
    builder.addCase(createNote.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
    builder.addCase(updateNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = "";
      state.success = true;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.loading = false;
      state.action = [];
      state.error = action.error.message;
    });
    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.loading = false;
      state.notes = action.payload;
      state.error = "";
      state.success = true;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.error.message;
    });
  },
});

export { notesList, createNote, updateNote, deleteNote };
export default notesSlice.reducer;
