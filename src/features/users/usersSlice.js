const { createSlice, nanoid } = require('@reduxjs/toolkit');

const initialState = [
	{
		_id: 1,
		firstName: 'sruthi',
		lastName: 'ragupathy',
		userName: 'sruthiragupathy_',
		email: 'sruthiragupathy@gmail.com',
		bio: 'A technology enthusiast | Tweet about my learnings, tech and #151daysofcode | Learning full stack web development | Neogrammer',
		followers: [],
		following: [
			{
				_id: nanoid(),
				userId: 2,
			},
		],
		createdAt: '2021-01-31T10:00:00.000Z',
	},
	{
		_id: 2,
		firstName: 'sriman',
		lastName: 'ragupathy',
		email: 'srimanragupathy@gmail.com',
		bio: 'A technology enthusiast | Tweet about my learnings, tech and #151daysofcode | Learning full stack web development | Neogrammer',
		userName: 'sriman_ram',
		followers: [
			{
				_id: nanoid(),
				userId: 1,
			},

			{
				_id: nanoid(),
				userId: 3,
			},
		],
		following: [],
		createdAt: '2021-01-31T10:00:00.000Z',
	},
	{
		_id: 3,
		firstName: 'tanay',
		lastName: 'pratap',
		email: 'tanaypratap@gmail.com',
		userName: 'tanaypratap',
		bio: `Senior Software Engineer 
		Microsoft
		 | ReactJS + TypeScript expert | Tech + Life + Career tweets here | Teaching 
		neogcamp
		 | Dev Jobs 
		roc8HQ`,
		followers: [],
		following: [],
		createdAt: '2021-01-31T10:00:00.000Z',
	},
];

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		followClicked(state, { payload }) {
			const followedUser = state.find((user) => {
				console.log(user);
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
});

export const { followClicked } = usersSlice.actions;

export default usersSlice.reducer;
