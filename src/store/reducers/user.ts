import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { auth } from 'store/firebase';
import type { AppThunk } from 'store/reducers';
import { IUser, IError } from 'typings/interfaces';

const initialState: IUser = {
  loading: false,
  userData: null,
  error: null,
  isLoginnedUser: false,
};

// onAuthStateChanged keeps firing for the life of the subscription, so it
// can't be modeled as a single-resolution createAsyncThunk.
export const IsLogIn = (): AppThunk => dispatch => {
  dispatch(isLoginStarted());

  onAuthStateChanged(auth, user => {
    if (user) {
      dispatch(isLoginSuccess(user));
    } else {
      dispatch(isLoginError());
    }
  });
};

export const LogIn = createAsyncThunk(
  'user/logIn',
  async ({
    userEmail,
    userPassword,
  }: {
    userEmail: string;
    userPassword: string;
  }) => {
    const { user } = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword,
    );
    return user;
  },
);

export const SignUp = createAsyncThunk(
  'user/signUp',
  async ({
    userEmail,
    userPassword,
    userLogin,
  }: {
    userEmail: string;
    userPassword: string;
    userLogin: string;
  }) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword,
    );
    await updateProfile(user, { displayName: userLogin });
    return user;
  },
);

export const LogOut = createAsyncThunk('user/logOut', async () => {
  await signOut(auth);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    isLoginStarted: state => {
      state.loading = true;
    },
    isLoginSuccess: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.loading = false;
      state.error = null;
      state.isLoginnedUser = true;
    },
    isLoginError: state => {
      state.isLoginnedUser = false;
    },
    changeAuthPage: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(LogIn.pending, state => {
        state.loading = true;
      })
      .addCase(LogIn.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
        state.isLoginnedUser = true;
      })
      .addCase(LogIn.rejected, (state, action) => {
        state.error = action.error as IError;
      })
      .addCase(SignUp.pending, state => {
        state.loading = true;
      })
      .addCase(SignUp.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.loading = false;
        state.error = null;
        state.isLoginnedUser = true;
      })
      .addCase(SignUp.rejected, (state, action) => {
        state.error = action.error as IError;
      })
      .addCase(LogOut.pending, state => {
        state.loading = true;
      })
      .addCase(LogOut.fulfilled, state => {
        state.userData = null;
        state.loading = false;
        state.error = null;
        state.isLoginnedUser = false;
      })
      .addCase(LogOut.rejected, (state, action) => {
        state.error = action.error as IError;
      });
  },
});

export const { isLoginStarted, isLoginSuccess, isLoginError, changeAuthPage } =
  userSlice.actions;

export default userSlice.reducer;
