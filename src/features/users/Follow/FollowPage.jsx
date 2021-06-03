import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { UserInfo } from '../UserProfile/UserInfo';
import { UserSuggestionCard } from '../UserSuggestionCard';
import { FollowNav } from './FollowNav';

export const FollowPage = () => {
	const { userName } = useParams();
	const user = useSelector((state) =>
		state.users.find((user) => user.userName === userName),
	);
	const currentUser = useSelector((state) => state.currentUser);
	const location = useLocation();

	return (
		<div>
			<UserInfo />
			<FollowNav userName={user.userName} />
			<div>
				{location.pathname.includes('following')
					? user.following.map((followingUser) => {
							return (
								<UserSuggestionCard
									userId={followingUser.userId}
									currentUser={currentUser}
								/>
							);
					  })
					: user.followers.map((follower) => {
							return (
								<UserSuggestionCard
									userId={follower.userId}
									currentUser={currentUser}
								/>
							);
					  })}
			</div>
		</div>
	);
};
