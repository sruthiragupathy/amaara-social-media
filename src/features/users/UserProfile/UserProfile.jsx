import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import { PostCard } from '../../posts/PostCard';
import { getUserProfileByUserName } from '../usersSlice';
import { UserHeader } from './UserHeader';

export const UserProfile = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const { userProfile, userTweets } = useSelector((state) => state.users);
	useEffect(() => {
		dispatch(getUserProfileByUserName({ userName }));
	}, [userProfile]);
	return (
		<>
			{userProfile && userTweets && (
				<div className=''>
					<UserHeader user={userProfile} userTweets={userTweets} />
					{userTweets.map((tweet) => {
						return (
							<NavLink to={`/tweet/${tweet._id}`} key={tweet._id}>
								<PostCard tweetObj={tweet} />
							</NavLink>
						);
					})}
				</div>
			)}
		</>
	);
};
