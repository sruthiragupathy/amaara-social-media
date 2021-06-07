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

export const processJoinedDate = (ISOString) => {
	const currentDate = new Date(ISOString).toUTCString().substring(5, 16);
	return currentDate;
};

export const isCurrentUserFollowing = (currentUserfollowingArray, userId) => {
	return currentUserfollowingArray.find(
		(followedUser) => followedUser.userId === userId,
	)
		? true
		: false;
};

export const reactionEmoji = {
	thumbsUp: '👍',
	hooray: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀',
};

export const statusEnum = {
	IDLE: 0,
	LOADING: 1,
	SUCCESS: 2,
	REJECTED: 3,
};
