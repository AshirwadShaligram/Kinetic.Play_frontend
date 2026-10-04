import {
  loginService,
  logoutService,
  refreshService,
  registerService,
} from "@/services/authService";
import { clearToken, setToken } from "@/services/token-service";
import {
  AuthState,
  LoginFormData,
  LoginResponse,
  RefreshResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/types/authTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterRequest,
  { rejectValue: string }
>("auth/register", async (userData, thunkAPI) => {
  try {
    return await registerService(userData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? "Something went wrong",
    );
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginFormData,
  { rejectValue: string }
>("auth/login", async (userData, thunkAPI) => {
  try {
    return await loginService(userData);
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? "Something went wrong",
    );
  }
});

export const refreshUser = createAsyncThunk<
  RefreshResponse,
  void,
  { rejectValue: string }
>("auth/refresh", async (_, thunkAPI) => {
  try {
    return await refreshService();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message ?? "Something went wrong",
    );
  }
});

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      return await logoutService();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ?? "Something went wrong",
      );
    }
  },
);

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
  authChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER USER CASE
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // LOGIN USER CASE
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        ((state.user = action.payload.user),
          (state.token = action.payload.accessToken));
        setToken(action.payload.accessToken);
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      })

      // LOGOUT USER CASE
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        clearToken();
      })

      // REFRESH USER CASE
      .addCase(refreshUser.pending, (state) => {
        state.loading = true;
        state.authChecked = false;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.authChecked = true;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.loading = false;
        state.authChecked = true;
        state.token = null;
        state.user = null;
      });
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
