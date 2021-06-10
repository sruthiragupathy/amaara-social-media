import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { Nav } from '../../../Nav/Nav';
import { UserInfo } from '../UserProfile/UserInfo';
import { getUserProfileByUserName } from '../usersSlice';
import { UserSuggestionCard } from '../UserSuggestionCard';
import { FollowNav } from './FollowNav';

export const FollowPage = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	const { userProfile, userTweets } = useSelector((state) => state.users);
	const { token } = useSelector((state) => state.currentUser);

	useEffect(() => {
		if (token) {
			dispatch(getUserProfileByUserName({ userName, token }));
		}
	}, []);
	const location = useLocation();
	const { currentUser } = useSelector((state) => state.currentUser);
	return (
		userProfile && (
			<div className='flex w-full items-start justify-center container'>
				<Nav />
				<div className='text-left w-full md:w-4/6'>
					<UserInfo user={userProfile} userTweets={userTweets} />
					<FollowNav userName={userProfile.userName} />
					<div>
						{location.pathname.includes('following')
							? userProfile?.followingList?.map((followingUser) => {
									return (
										<UserSuggestionCard
											key={followingUser._id}
											userProfile={followingUser.user}
											currentUser={currentUser}
										/>
									);
							  })
							: userProfile.followersList.map((follower) => {
									return (
										<UserSuggestionCard
											key={follower._id}
											userProfile={follower.user}
											currentUser={currentUser}
										/>
									);
							  })}
					</div>
				</div>
			</div>
		)
	);
};
