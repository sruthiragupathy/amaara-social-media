import axios from 'axios';
import { statusEnum } from '../../utils/utils';
import { BACKEND, TOKEN } from '../api';
const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit');

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
	async ({ email, password }) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/login`,
			data: {
				email,
				password,
			},
		});
		return response.data;
	},
);
const initialState = {
	currentUser: null,
	status: {
		LOAD_CURRENT_USER: 0,
	},
	token: null,
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: initialState,
	reducers: {
		setToken(state, { payload }) {
			state.token = payload.token;
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
			state.status.LOAD_CURRENT_USER = statusEnum['LOADING'];
		},
		[loginUser.fulfilled]: (state, action) => {
			state.currentUser = action.payload.user;
			state.token = action.payload.token;
			state.status.LOAD_CURRENT_USER = statusEnum['SUCCESS'];
		},
	},
});

export const { updateCurrentUserFollowing, setToken } =
	currentUserSlice.actions;

export default currentUserSlice.reducer;
