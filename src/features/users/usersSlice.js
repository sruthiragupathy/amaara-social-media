import { BACKEND, TOKEN } from '../api';
import axios from 'axios';
import { statusEnum } from '../../utils/utils';
const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit');

export const loadUsers = createAsyncThunk(
	'users/loadUsers',
	async ({ token }) => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/users`,
			headers: {
				authorization: token,
			},
		});
		return response.data;
	},
);

export const getUserProfileByUserName = createAsyncThunk(
	'users/getUserProfileByUserName',
	async ({ userName, token }) => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/profile/${userName}`,
			headers: {
				authorization: token,
			},
		});
		return response.data;
	},
);

export const followButtonClicked = createAsyncThunk(
	'users/followButtonClicked',
	async ({ followingUserId, token }) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/user/follow`,
			headers: {
				authorization: token,
			},
			data: {
				followingUserId,
			},
		});
		return response.data;
	},
);

const initialState = {
	users: [],
	userProfile: null,
	userTweets: null,
	status: {
		LOAD_USERS: 0,
		GET_USER_DETAILS: 0,
	},
	error: null,
};
const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[loadUsers.pending]: (state, action) => {
			state.status.LOAD_USERS = statusEnum['LOADING'];
		},
		[loadUsers.fulfilled]: (state, action) => {
			state.users = action.payload.users;
			state.status.LOAD_USERS = statusEnum['SUCCESS'];
		},
		[getUserProfileByUserName.pending]: (state, action) => {
			state.userProfile = null;
			state.status.GET_USER_DETAILS = statusEnum['LOADING'];
		},
		[getUserProfileByUserName.fulfilled]: (state, action) => {
			state.userProfile = action.payload.userProfile;
			state.userTweets = action.payload.tweets;
			state.status.GET_USER_DETAILS = statusEnum['SUCCESS'];
		},
		[followButtonClicked.pending]: (state, action) => {
			state.status.LOAD_USERS = statusEnum['LOADING'];
		},
		[followButtonClicked.fulfilled]: (state, action) => {
			state.users = action.payload.users;
			state.status.LOAD_USERS = statusEnum['SUCCESS'];
		},
	},
});

export const { followClicked } = usersSlice.actions;

export default usersSlice.reducer;
