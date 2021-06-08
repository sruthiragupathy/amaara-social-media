import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { UserInfo } from '../UserProfile/UserInfo';
import { getUserProfileByUserName } from '../usersSlice';
import { UserSuggestionCard } from '../UserSuggestionCard';
import { FollowNav } from './FollowNav';

export const FollowPage = () => {
	const { userName } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getUserProfileByUserName({ userName }));
	}, []);
	const location = useLocation();
	const { userProfile, userTweets } = useSelector((state) => state.users);
	const { currentUser } = useSelector((state) => state.currentUser);
	return (
		userProfile && (
			<div>
				<UserInfo user={userProfile} userTweets={userTweets} />
				<FollowNav userName={userProfile.userName} />
				<div>
					{location.pathname.includes('following')
						? userProfile?.followingList?.map((followingUser) => {
								return (
									<UserSuggestionCard
										userProfile={followingUser.user}
										currentUser={currentUser}
									/>
								);
						  })
						: userProfile.followersList.map((follower) => {
								return (
									<UserSuggestionCard
										userProfile={userProfile}
										currentUser={currentUser}
									/>
								);
						  })}
				</div>
			</div>
		)
	);
};
