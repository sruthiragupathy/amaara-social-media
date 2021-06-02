const { createSlice, nanoid } = require('@reduxjs/toolkit');

const currentUser = {
	_id: 1,
	firstName: 'sruthi',
	lastName: 'ragupathy',
	userName: 'sruthiragupathy_',
	email: 'sruthiragupathy@gmail.com',
	followers: [],
	following: [
		{
			_id: nanoid(),
			userId: 2,
		},
	],
};

const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState: currentUser,
	reducers: {
		updateCurrentUserFollowing(state, { payload }) {
			state.following.push({
				_id: nanoid(),
				userId: payload.followedUserId,
			});
		},
	},
});

export const { updateCurrentUserFollowing } = currentUserSlice.actions;

export default currentUserSlice.reducer;
