import axios from 'axios';
import { setLocalStorage, statusEnum } from '../../utils';
import { BACKEND } from '../api';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const loadCurrentUser = createAsyncThunk(
	'currentUser/loadCurrentUser',
	async ({ userName, token }) => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/user/${userName}`,
			headers: {
				authorization: token,
			},
		});
		return response.data;
	},
);

export const loginUser = createAsyncThunk(
	'currentUser/loginUser',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			const response = await axios({
				method: 'POST',
				url: `${BACKEND}/login`,
				data: {
					email,
					password,
				},
			});
			console.log({ response });
			return response.data;
		} catch (error) {
			const value = error.response.data.error;
			return rejectWithValue(value);
		}
	},
);

export const signUpUser = createAsyncThunk(
	'currentUser/signUpUser',
	async ({ user }, { rejectWithValue }) => {
		try {
			const response = await axios({
				method: 'POST',
				url: `${BACKEND}/signup`,
				data: {
					user,
				},
			});

			return response.data;
		} catch (error) {
			const value = error.response.data.error;
			return rejectWithValue(value);
		}
	},
);

export const logoutUser = () => {};
const initialState = {
	currentUser: null,
	status: {
		LOAD_CURRENT_USER: 0,
	},
	token: null,
	error: null,
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: initialState,
	reducers: {
		setToken(state, { payload }) {
			state.token = payload.token;
		},
		resetError(state) {
			state.error = '';
		},
		resetToken(state) {
			state.token = null;
		},
	},
	extraReducers: {
		[loadCurrentUser.pending]: (state, action) => {
			state.status.LOAD_CURRENT_USER = statusEnum['LOADING'];
		},
		[loadCurrentUser.fulfilled]: (state, action) => {
			state.currentUser = action.payload.user;
			state.status.LOAD_CURRENT_USER = statusEnum['SUCCESS'];
		},
		[loginUser.pending]: (state, action) => {
			state.status.error = '';
			state.status.LOAD_CURRENT_USER = statusEnum['LOADING'];
		},
		[loginUser.fulfilled]: (state, action) => {
			state.currentUser = action.payload.user;
			state.token = action.payload.token;
			state.status.LOAD_CURRENT_USER = statusEnum['SUCCESS'];
			setLocalStorage(action.payload.user, action.payload.token);
		},
		[loginUser.rejected]: (state, action) => {
			state.error = action.payload;
			state.status.LOAD_CURRENT_USER = statusEnum['REJECTED'];
		},
		[signUpUser.pending]: (state, action) => {
			state.status.error = '';
			state.status.LOAD_CURRENT_USER = statusEnum['LOADING'];
		},
		[signUpUser.fulfilled]: (state, action) => {
			state.currentUser = action.payload.user;
			state.token = action.payload.token;
			state.status.LOAD_CURRENT_USER = statusEnum['SUCCESS'];
			setLocalStorage(action.payload.user, action.payload.token);
		},
		[signUpUser.rejected]: (state, action) => {
			console.log({ action });
			state.error = action.payload;
			state.status.LOAD_CURRENT_USER = statusEnum['REJECTED'];
		},
	},
});

export const { setToken, resetError, resetToken } = currentUserSlice.actions;

export default currentUserSlice.reducer;
