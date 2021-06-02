import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export const UserInfo = () => {
	const { userName } = useParams();
	const user = useSelector((state) =>
		state.users.find((user) => user.userName === userName),
	);

	const userTweets = useSelector((state) =>
		state.posts.filter((post) => post.userId === user._id),
	);
	return (
		<h2 className='text-2xl font-semibold text-left border-b py-2 capitalize'>
			{user.firstName} {user.lastName}
			<span className='text-gray-400 font-normal text-sm block'>
				{userTweets.length} {userTweets.length === 1 ? 'Tweet' : 'Tweets'}
			</span>
		</h2>
	);
};
