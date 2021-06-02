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
		following: [],
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
		addCurrentUserToFollowersList(state, { payload }) {
			console.log(payload.followedUserId);
			const followedUser = state.find((user) => {
				console.log(user);
				return user._id === payload.followedUserId;
			});
			console.log({ followedUser });
			followedUser.followers.push({
				_id: nanoid(),
				userId: payload.currentUserId,
			});
		},
	},
});

export const { addCurrentUserToFollowersList } = usersSlice.actions;

export default usersSlice.reducer;
