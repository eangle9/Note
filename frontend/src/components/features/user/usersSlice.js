import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const existingUserInfo = JSON.parse(localStorage.getItem("userInfo"));
const initialState = {
  userInfo: existingUserInfo,
  loading: false,
  success: false,
  error: "",
};

const userLogin = createAsyncThunk(
  "users/userLogin",
  async ({ email, password }) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { email, password },
        config
      );
      console.log("data", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error", error.response.data.error.message);
      throw new Error(error.response.data.error.message);
    }
  }
);

const userRegister = createAsyncThunk(
  "user/logout",
  async ({ name, email, password, pic }) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/api/users",
        { name, email, password, pic },
        config
      );

      console.log("user Information", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      console.log("error", error);
      throw new Error(error.response.data.error.message);
    }
  }
);

const userEdit = createAsyncThunk("user/edit", async (user) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };
  try {
    console.log("user", user);
    const { data } = await axios.post("/api/users/profile", user, config);
    localStorage.setItem("userInfo", JSON.stringify(data));
    return data;
  } catch (error) {
    throw new Error(error.response.data.error.message);
  }
});

const updatePassword = createAsyncThunk("password/update", async({oldPassword, newPassword}) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const config = {
    headers : {
      "Content-type" : "application/json",
      Authorization : `Bearer ${userInfo.token}`,
    },
  };
  try{
    const { data } = await axios.post('api/users/account', {oldPassword, newPassword}, config);
    return data;
  }catch(error){
    throw new Error(error.response.data.message);
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      state.error = "";
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userInfo = null;
      state.error = action.error.message;
    });
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      state.error = "";
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userInfo = null;
      state.error = action.error.message;
    });
    builder.addCase(userEdit.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userEdit.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      state.error = "";
    });
    builder.addCase(userEdit.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userInfo = [];
      state.error = action.error.message;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userInfo = action.payload;
      state.error = "";
    })
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.userInfo = [];
      state.error = action.error.message;
    })
  },
});

export { userLogin, userRegister, userEdit, updatePassword };
export const { logout } = usersSlice.actions;
export default usersSlice.reducer;
