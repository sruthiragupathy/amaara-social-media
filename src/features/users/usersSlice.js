import { BACKEND, TOKEN } from '../api';
import axios from 'axios';
import { statusEnum } from '../../utils/utils';
const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit');

export const loadUsers = createAsyncThunk('users/loadUsers', async () => {
	const response = await axios({
		method: 'GET',
		url: `${BACKEND}/users`,
		headers: {
			authorization: TOKEN,
		},
	});
	return response.data;
});

export const getUserProfileByUserName = createAsyncThunk(
	'users/getUserProfileByUserName',
	async ({ userName }) => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/profile/${userName}`,
			headers: {
				authorization: TOKEN,
			},
		});
		return response.data;
	},
);

export const followButtonClicked = createAsyncThunk(
	'users/followButtonClicked',
	async ({ followingUserId }) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/user/follow`,
			headers: {
				authorization: TOKEN,
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
	reducers: {
		followClicked(state, { payload }) {
			const followedUser = state.find((user) => {
				return user._id === payload.followedUserId;
			});
			followedUser.followers.push({
				_id: nanoid(),
				userId: payload.currentUserId,
			});
			const currentUser = state.find((user) => {
				return user._id === payload.currentUserId;
			});
			currentUser.following.push({
				_id: nanoid(),
				userId: payload.followedUserId,
			});
		},
	},
	extraReducers: {
		[loadUsers.pending]: (state, action) => {
			state.status.LOAD_USERS = statusEnum['LOADING'];
		},
		[loadUsers.fulfilled]: (state, action) => {
			state.users = action.payload.users;
			state.status.LOAD_USERS = statusEnum['SUCCESS'];
		},
		[getUserProfileByUserName.pending]: (state, action) => {
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
