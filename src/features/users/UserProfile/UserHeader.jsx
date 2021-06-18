import { useDispatch, useSelector } from 'react-redux';
import { FollowButton } from '../FollowButton';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { processJoinedDate } from '../../../utils/utils';
import { NavLink } from 'react-router-dom';
import { UserInfo } from './UserInfo';

import { EditModal } from '../EditModal';
import {
	cancelEditClicked,
	toggleEditProfile,
} from '../../currentUser/currentUserSlice';

export const UserHeader = ({ user, userTweets }) => {
	const { currentUser, editProfile } = useSelector(
		(state) => state.currentUser,
	);
	const dispatch = useDispatch();

	const onEditProfileClicked = () => {
		dispatch(toggleEditProfile());
	};
	return (
		<>
			<UserInfo user={user} userTweets={userTweets} />
			{editProfile && (
				<div className='inset-0  bg-gray-800 opacity-50 fixed z-20'></div>
			)}
			<div className='border-b'>
				<div className='my-4 flex justify-between'>
					<div className='img-logo uppercase p-10 text-2xl'>
						<span>{user.firstName[0]}</span>
						<span>{user.lastName[0]}</span>
					</div>
					{user._id !== currentUser._id ? (
						<div className='self-center'>
							<FollowButton currentUser={currentUser} user={user} />
						</div>
					) : (
						<button
							className='secondary-btn self-center'
							onClick={onEditProfileClicked}>
							Edit Profile
						</button>
					)}
				</div>
				<div className='text-left'>
					<h2 className='text-2xl font-semibold text-left capitalize'>
						{user.firstName} {user.lastName}
					</h2>
					<div className='text-gray-400 block lowercase'>@{user.userName}</div>
					{user.bio && <div className='mt-4'>{user.bio}</div>}
					<div className='text-gray-400 mt-4'>
						<div>
							<EventNoteIcon color='inherit' />{' '}
							<span>Joined {processJoinedDate(user.createdAt)}</span>
						</div>
					</div>
					<div className='mt-4 flex justify-start mb-4'>
						<NavLink to={`/${user.userName}/following`}>
							<div className='mr-4'>
								<span className='mr-2 text-grey-700 font-semibold'>
									{user.followingList.length}
								</span>
								<span className='text-gray-400'>Following</span>
							</div>
						</NavLink>
						<NavLink to={`/${user.userName}/followers`}>
							<div>
								<span className='mr-2 text-grey-700 font-semibold'>
									{user.followersList.length}
								</span>
								<span className='text-gray-400'>Followers</span>
							</div>
						</NavLink>
					</div>
				</div>
			</div>
			{editProfile && <EditModal />}
		</>
	);
};
