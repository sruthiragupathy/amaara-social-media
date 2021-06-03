import axios from 'axios';
import { BACKEND, TOKEN } from '../api';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const loadPosts = createAsyncThunk('posts/loadPosts', async () => {
	const response = await axios({
		method: 'GET',
		url: `${BACKEND}/tweets`,
		headers: {
			authorization: TOKEN,
		},
	});
	return response.data;
});

export const reactToPosts = createAsyncThunk(
	'posts/reactToPosts',
	async (payload) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/tweet/reactions/${payload.tweetId}`,
			headers: {
				authorization: TOKEN,
			},
			data: {
				reactionName: payload.reactionName,
				reactionCount: payload.reactionCount,
			},
		});
		return response.data;
	},
);

export const postTweet = createAsyncThunk(
	'posts/postTweet',
	async ({ tweet }) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/tweet`,
			headers: {
				authorization: TOKEN,
			},
			data: {
				tweet,
			},
		});
		return response.data;
	},
);

const initialState = {
	tweets: [],
	status: 'idle',
	error: null,
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		tweetEdited(state, { payload }) {
			const editTweet = state.find((tweet) => tweet.id === payload.id);
			if (editTweet) {
				editTweet.post = payload.tweet;
			}
		},
		tweetDeleted(state, { payload }) {
			const deleteTweetIndex = state.findIndex(
				(tweet) => tweet.id === payload.id,
			);
			state.splice(deleteTweetIndex, 1);
		},
	},
	extraReducers: {
		[loadPosts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[loadPosts.fulfilled]: (state, action) => {
			state.tweets = action.payload.tweets;
			state.status = 'succeeded';
		},
		[reactToPosts.pending]: (state, action) => {
			state.status = 'loading';
		},
		[reactToPosts.fulfilled]: (state, action) => {
			const tweetIndex = state.tweets.findIndex(
				(tweet) => tweet._id === action.payload.tweet._id,
			);
			state.tweets[tweetIndex] = action.payload.tweet;
			state.status = 'succeeded';
		},
		[postTweet.pending]: (state, action) => {
			state.status = 'loading';
		},
		[postTweet.fulfilled]: (state, action) => {
			state.tweets.unshift(action.payload.tweet);
			state.status = 'succeeded';
		},
	},
});

export const { tweetPosted, tweetEdited, tweetDeleted, tweetReacted } =
	postsSlice.actions;

export default postsSlice.reducer;
