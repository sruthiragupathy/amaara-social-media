import { useSelector } from 'react-redux';
import { FollowButton } from '../FollowButton';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { processJoinedDate } from '../../../utils/utils';

export const UserHeader = ({ user, userTweets }) => {
	const currentUser = useSelector((state) => state.currentUser);
	return (
		<>
			<h2 className='text-2xl font-semibold text-left border-b py-2 capitalize'>
				{user.firstName} {user.lastName}
				<span className='text-gray-400 font-normal text-sm block'>
					{userTweets.length} {userTweets.length === 1 ? 'Tweet' : 'Tweets'}
				</span>
			</h2>
			<div className='border-b'>
				<div className='my-4 flex'>
					<div className='img-logo uppercase p-10 text-2xl'>SR</div>;
					<div className='self-end'>
						<FollowButton currentUser={currentUser} user={user} />
					</div>
				</div>
				<div className='text-left'>
					<h2 className='text-2xl font-semibold text-left capitalize'>
						{user.firstName} {user.lastName}
					</h2>
					<div className='text-gray-400 block lowercase'>@{user.userName}</div>
					<div className='mt-4'>{user.bio}</div>
					<div className='text-gray-400 mt-4'>
						<div>
							<EventNoteIcon color='inherit' />{' '}
							<span>Joined {processJoinedDate(user.createdAt)}</span>
						</div>
					</div>
					<div className='mt-4 flex justify-start mb-4'>
						<div className='mr-4'>
							<span className='mr-2 text-grey-700 font-semibold'>
								{user.following.length}
							</span>
							<span className='text-gray-400'>Following</span>
						</div>
						<div>
							<span className='mr-2 text-grey-700 font-semibold'>
								{user.followers.length}
							</span>
							<span className='text-gray-400'>Followers</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
