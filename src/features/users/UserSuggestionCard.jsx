import { useSelector } from 'react-redux';
import { FollowButton } from './FollowButton';
import { NavLink } from 'react-router-dom';

export const UserSuggestionCard = ({ userId, currentUser }) => {
	const user = useSelector((state) =>
		state.users.find((user) => user._id === userId),
	);
	const { firstName, lastName, userName, bio } = user;

	return (
		<NavLink to={`/${userName}`}>
			<div className='flex items-start justify-start py-3 px-1 border-b hover:bg-gray-50'>
				<div className='img-logo uppercase'>
					{' '}
					{firstName[0]}
					{lastName[0]}
				</div>
				<div className='text-left w-full'>
					<div className='flex items-center justify-between mb-4'>
						<div className=''>
							<span className='text-gray-500 font-semibold text-l capitalize block'>
								{firstName} {lastName}
							</span>{' '}
							<span className='text-gray-400 text-sm'>@{userName}</span>
						</div>
						<FollowButton currentUser={currentUser} user={user} />
					</div>
					<div>{bio}</div>
				</div>
			</div>
		</NavLink>
	);
};
