export const transformISOString = (ISOString) => {
	const currentDate = new Date(ISOString).toUTCString().substring(5, 16);
	let hour = new Date(ISOString).getHours();
	let minutes = new Date(ISOString).getMinutes();
	if (hour > 12) {
		hour = hour - 12;
	}
	if (hour < 10) {
		hour = '0' + hour;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}
	const currentTime =
		hour +
		':' +
		minutes +
		' ' +
		new Date(ISOString).toLocaleTimeString().split(' ')[1];
	return currentDate + ' ' + currentTime;
};

export const isCurrentUserFollowing = (currentUserfollowingArray, userId) => {
	return currentUserfollowingArray.find(
		(followedUser) => followedUser.userId === userId,
	)
		? true
		: false;
};
