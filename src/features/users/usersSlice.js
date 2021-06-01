const { createSlice } = require('@reduxjs/toolkit');

const initialState = [
	{
		_id: 1,
		firstName: 'sruthi',
		lastName: 'ragupathy',
		userName: 'sruthiragupathy_',
		email: 'sruthiragupathy@gmail.com',
		followers: [
			{
				_id: 1,
				userId: 2,
			},
		],
	},
	{
		_id: 2,
		firstName: 'sruthi',
		lastName: 'ragupathy',
		email: 'sruthiragupathy@gmail.com',
		followers: [
			{
				_id: 1,
				userId: 1,
			},
		],
	},
];

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export default usersSlice.reducer;
