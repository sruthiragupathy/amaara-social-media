import { useDispatch } from 'react-redux';
import { isCurrentUserFollowing } from '../../utils/utils';
export const FollowButton = ({ currentUser, user }) => {
	const { _id } = user;
	const dispatch = useDispatch();
	return (
		<>
			{!isCurrentUserFollowing(currentUser.followingList, user._id) ? (
				<button className='secondary-btn'>Follow</button>
			) : (
				<button className='primary-btn' disabled>
					Following
				</button>
			)}
		</>
	);
};
