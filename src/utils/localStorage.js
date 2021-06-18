export const setLocalStorage = async (user, token) => {
	await localStorage.setItem(
		'logincredentials',
		JSON.stringify({
			token,
			userName: user.userName,
			_id: user._id,
		}),
	);
};
