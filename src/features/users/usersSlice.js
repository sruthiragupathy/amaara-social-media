import { BACKEND, TOKEN } from '../api';
import axios from 'axios';
const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit');

export const loadUsers = createAsyncThunk('posts/loadUsers', async () => {
	const response = await axios({
		method: 'GET',
		url: `${BACKEND}/users`,
		headers: {
			authorization: TOKEN,
		},
	});
	return response.data;
});

const initialState = {
	users: [],
	status: 'idle',
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
			state.status = 'loading';
		},
		[loadUsers.fulfilled]: (state, action) => {
			state.tweets = action.payload.users;
			state.status = 'succeeded';
		},
	},
});

export const { followClicked } = usersSlice.actions;

export default usersSlice.reducer;
