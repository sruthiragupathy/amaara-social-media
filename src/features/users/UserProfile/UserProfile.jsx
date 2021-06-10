import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Nav } from '../../../Nav/Nav';
import { PostCard } from '../../posts/PostCard';
import { getUserProfileByUserName } from '../usersSlice';
import { UserHeader } from './UserHeader';

export const UserProfile = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const { users, userProfile, userTweets } = useSelector(
		(state) => state.users,
	);
	const { token } = useSelector((state) => state.currentUser);

	useEffect(() => {
		if (token) {
			dispatch(getUserProfileByUserName({ userName, token }));
		}
	}, [users]);
	return (
		<>
			{userProfile && userTweets && (
				<div className='flex w-full items-start justify-center container'>
					<Nav />
					<div className='text-left w-full md:w-4/6'>
						<UserHeader user={userProfile} userTweets={userTweets} />
						{userTweets.map((tweet) => {
							return (
								<NavLink to={`/tweet/${tweet._id}`} key={tweet._id}>
									<PostCard tweetObj={tweet} />
								</NavLink>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
};
