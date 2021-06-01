import { nanoid } from '@reduxjs/toolkit';
const { createSlice } = require('@reduxjs/toolkit');
const reactionsObject = {
	thumbsUp: {
		reactionsCount: 0,
		reactedUsers: [],
	},
	hooray: {
		reactionsCount: 0,
		reactedUsers: [],
	},
	heart: {
		reactionsCount: 0,
		reactedUsers: [],
	},
	rocket: {
		reactionsCount: 0,
		reactedUsers: [],
	},
	eyes: {
		reactionsCount: 0,
		reactedUsers: [],
	},
};

const initialState = [
	{
		id: '1',
		post: 'First post!',
		reactions: {
			thumbsUp: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			hooray: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			heart: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			rocket: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			eyes: {
				reactionsCount: 0,
				reactedUsers: [],
			},
		},
		userId: 1,
		createdAt: '2021-01-31T10:00:00.000Z',
	},
	{
		id: '2',
		post: 'Second post!',
		likes: 10,
		reactions: {
			thumbsUp: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			hooray: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			heart: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			rocket: {
				reactionsCount: 0,
				reactedUsers: [],
			},
			eyes: {
				reactionsCount: 0,
				reactedUsers: [],
			},
		},
		userId: 1,
		createdAt: '2019-01-31T10:00:00.000Z',
	},
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		tweetPosted(state, { payload }) {
			state.unshift({
				id: nanoid(),
				post: payload.tweet,
				likes: 0,
				userId: 1,
				reactions: reactionsObject,
				createdAt: new Date(),
			});
		},
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
		tweetReacted(state, { payload }) {
			const currentTweet = state.find((tweet) => tweet.id === payload.tweetId);
			if (
				currentTweet.reactions[payload.reactionName].reactedUsers.includes(
					payload.currentUser,
				)
			) {
				currentTweet.reactions[payload.reactionName].reactionsCount -= 1;
				currentTweet.reactions[payload.reactionName].reactedUsers =
					currentTweet.reactions[payload.reactionName].reactedUsers.filter(
						(user) => user !== payload.currentUser,
					);
			} else {
				currentTweet.reactions[payload.reactionName].reactionsCount += 1;
				currentTweet.reactions[payload.reactionName].reactedUsers.push(
					payload.currentUser,
				);
			}
		},
	},
});

export const { tweetPosted, tweetEdited, tweetDeleted, tweetReacted } =
	postsSlice.actions;

export default postsSlice.reducer;
