import { nanoid } from '@reduxjs/toolkit';
const { createSlice } = require('@reduxjs/toolkit');

const initialState = [
	{
		id: '1',
		post: 'First post!',
		likes: 0,
		userId: 1,
	},
	{
		id: '2',
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
		tweetEdited(state, { payload }) {
			console.log(payload);
			const editTweet = state.find((tweet) => tweet.id === payload.id);
			if (editTweet) {
				editTweet.post = payload.tweet;
			}
		},
	},
});

export const { tweetPosted, tweetEdited } = postsSlice.actions;

export default postsSlice.reducer;
