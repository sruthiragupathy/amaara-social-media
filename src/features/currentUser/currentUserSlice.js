import axios from 'axios';
import { BACKEND, TOKEN } from '../api';
const { createSlice, nanoid, createAsyncThunk } = require('@reduxjs/toolkit');
export const loadCurrentUser = createAsyncThunk(
	'currentUser/loadCurrentUser',
	async () => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/user/tanaypratap_`,
			headers: {
				authorization: TOKEN,
			},
		});
		return response.data;
	},
);
const initialState = {
	currentUser: null,
	status: 'idle',
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: initialState,
	reducers: {
		updateCurrentUserFollowing(state, { payload }) {
			state.following.push({
				_id: nanoid(),
				userId: payload.followedUserId,
			});
		},
	},
	extraReducers: {
		[loadCurrentUser.pending]: (state, action) => {
			state.status = 'loading';
		},
		[loadCurrentUser.fulfilled]: (state, action) => {
			state.currentUser = action.payload.user;
			state.status = 'success';
		},
	},
});

export const { updateCurrentUserFollowing } = currentUserSlice.actions;

export default currentUserSlice.reducer;
