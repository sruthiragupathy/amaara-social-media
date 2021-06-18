export const UserInfo = ({ user, userTweets }) => {
	return (
		<h2 className='text-2xl font-semibold text-left border-b py-2 capitalize'>
			{user.firstName} {user.lastName}
			<span className='text-gray-400 font-normal text-sm block'>
				{userTweets.length} {userTweets.length === 1 ? 'Tweet' : 'Tweets'}
			</span>
		</h2>
	);
};
