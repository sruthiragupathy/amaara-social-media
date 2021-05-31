import { nanoid } from '@reduxjs/toolkit';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = [
	{
		id: 1,
		post: 'First post!',
		likes: 0,
		userId: 1,
	},
	{
		id: 2,
		post: 'Second post!',
		likes: 10,
		userId: 1,
	},
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		tweetPosted(state, { payload }) {
			state.push({
				id: nanoid(),
				post: payload.tweet,
				likes: 0,
				userId: 1,
			});
		},
	},
});

export const { tweetPosted } = postsSlice.actions;

export default postsSlice.reducer;
