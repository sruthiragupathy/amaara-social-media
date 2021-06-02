import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { PostCard } from '../../posts/PostCard';
import { UserHeader } from './UserHeader';

export const UserProfile = () => {
	const { userName } = useParams();
	const user = useSelector((state) =>
		state.users.find((user) => user.userName === userName),
	);

	const userTweets = useSelector((state) =>
		state.posts.filter((post) => post.userId === user._id),
	);
	return (
		<div className='md:w-9/12 md:m-auto my-2 mx-2'>
			<UserHeader user={user} userTweets={userTweets} />
			{userTweets.map((tweet) => {
				return <PostCard tweet={tweet} />;
			})}
		</div>
	);
};
