import axios from 'axios';
import { useSelector } from 'react-redux';
import { statusEnum } from '../../utils/utils';
import { BACKEND } from '../api';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const loadPosts = createAsyncThunk(
	'posts/loadPosts',
	async ({ token }) => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/tweets`,
			headers: {
				authorization: token,
			},
		});
		return response.data;
	},
);

export const reactToPosts = createAsyncThunk(
	'posts/reactToPosts',
	async (payload) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/tweet/reactions/${payload.tweetId}`,
			headers: {
				authorization: payload.token,
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
	async ({ tweet, token }) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/tweet`,
			headers: {
				authorization: token,
			},
			data: {
				tweet,
			},
		});
		return response.data;
	},
);

export const loadCurrentTweet = createAsyncThunk(
	'posts/loadCurrentTweet',
	async ({ tweetId, token }) => {
		const response = await axios({
			method: 'GET',
			url: `${BACKEND}/tweet/${tweetId}`,
			headers: {
				authorization: token,
			},
		});
		return response.data;
	},
);

export const updateTweet = createAsyncThunk(
	'posts/updateTweet',
	async (payload) => {
		const response = await axios({
			method: 'POST',
			url: `${BACKEND}/tweet/${payload.tweetId}`,
			headers: {
				authorization: payload.token,
			},
			data: {
				editedTweet: payload.editTweet,
			},
		});
		return response.data;
	},
);

export const deleteTweet = createAsyncThunk(
	'posts/deleteTweet',
	async ({ tweetId, token }) => {
		const response = await axios({
			method: 'DELETE',
			url: `${BACKEND}/tweet/${tweetId}`,
			headers: {
				authorization: token,
			},
		});
		return response.data;
	},
);

const initialState = {
	tweets: null,
	currentTweet: {},
	status: {
		LOAD_POSTS: 0,
		REACT_TO_POSTS: 0,
		POST_TWEET: 0,
		LOAD_CURRENT_TWEET: 0,
		UPDATE_TWEET: 0,
		DELETE_TWEET: 0,
	},
	error: null,
	editable: '',
	deletable: '',
};

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		tweetDeleted(state, { payload }) {
			const deleteTweetIndex = state.findIndex(
				(tweet) => tweet.id === payload.id,
			);
			state.splice(deleteTweetIndex, 1);
		},
		editIconClicked(state, { payload }) {
			state.editable = payload.tweetId;
		},
		deleteIconClicked(state, { payload }) {
			state.deletable = payload.tweetId;
		},
		cancelClicked(state) {
			state.editable = '';
			state.deletable = '';
		},
	},
	extraReducers: {
		[loadPosts.pending]: (state, action) => {
			state.status.LOAD_POSTS = statusEnum['LOADING'];
		},
		[loadPosts.fulfilled]: (state, action) => {
			state.tweets = action.payload.tweets;
			state.status.LOAD_POSTS = statusEnum['SUCCESS'];
		},
		[reactToPosts.pending]: (state, action) => {
			state.status.REACT_TO_POSTS = statusEnum['LOADING'];
		},
		[reactToPosts.fulfilled]: (state, action) => {
			const tweetIndex = state.tweets.findIndex(
				(tweet) => tweet._id === action.payload.tweet._id,
			);
			state.tweets[tweetIndex] = action.payload.tweet;
			state.currentTweet = action.payload.tweet;
			state.status.REACT_TO_POSTS = statusEnum['SUCCESS'];
			state.status.LOAD_CURRENT_TWEET = statusEnum['SUCCESS'];
		},
		[postTweet.pending]: (state, action) => {
			state.status.POST_TWEET = statusEnum['LOADING'];
		},
		[postTweet.fulfilled]: (state, action) => {
			state.tweets.unshift(action.payload.tweet);
			state.status.POST_TWEET = statusEnum['SUCCESS'];
		},
		[updateTweet.pending]: (state, action) => {
			state.status.UPDATE_TWEET = statusEnum['LOADING'];
		},
		[updateTweet.fulfilled]: (state, action) => {
			const tweetIndex = state.tweets.findIndex(
				(tweet) => tweet._id === action.payload.tweet._id,
			);
			state.tweets[tweetIndex] = action.payload.tweet;
			state.currentTweet = action.payload.tweet;
			state.editable = '';
			state.status.LOAD_CURRENT_TWEET = statusEnum['SUCCESS'];
		},
		[deleteTweet.pending]: (state, action) => {
			state.status.DELETE_TWEET = statusEnum['LOADING'];
		},
		[deleteTweet.fulfilled]: (state, action) => {
			state.tweets = action.payload.tweets;
			state.deletable = '';
			state.status.DELETE_TWEET = statusEnum['SUCCESS'];
		},
		[loadCurrentTweet.pending]: (state, action) => {
			state.status.LOAD_CURRENT_TWEET = statusEnum['LOADING'];
		},
		[loadCurrentTweet.fulfilled]: (state, action) => {
			state.currentTweet = action.payload.tweet;
			state.status.LOAD_CURRENT_TWEET = statusEnum['SUCCESS'];
		},
	},
});

export const {
	tweetDeleted,
	tweetReacted,
	editIconClicked,
	cancelClicked,
	deleteIconClicked,
} = postsSlice.actions;

export default postsSlice.reducer;
export const useTweets = () => {
	return useSelector((state) => state.posts);
};
