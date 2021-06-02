import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { PostCard } from '../../posts/PostCard';
import { UserHeader } from './UserHeader';

export const UserProfile = () => {
	const { userName } = useParams();
	const user = useSelector((state) =>
		state.users.find((user) => user.userName === userName),
	);

	console.log({ user });

	const userTweets = useSelector((state) =>
		state.posts.filter((post) => post.userId === user._id),
	);
	console.log({ userTweets });
	return (
		<div className=''>
			<UserHeader user={user} userTweets={userTweets} />
			{userTweets.map((tweet) => {
				return (
					<NavLink to={`/tweet/${tweet.id}`} key={tweet.id}>
						<PostCard tweet={tweet} />;
					</NavLink>
				);
			})}
		</div>
	);
};
