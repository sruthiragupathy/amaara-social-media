import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { transformISOString } from '../../utils/utils';
import { ReactionButtons } from './ReactionButtons';

export const PostCard = ({ tweetObj }) => {
	const { tweet, userId, createdAt } = tweetObj;
	const { currentUser } = useSelector((state) => state.currentUser);

	return (
		<div className='flex items-start justify-start py-3 px-1 md:px-0 border-b hover:bg-gray-50 '>
			<NavLink to={`/${userId.userName}`}>
				<div className='img-logo uppercase'>
					{' '}
					{userId.firstName[0]}
					{userId.lastName[0]}
				</div>
			</NavLink>
			<div className='text-left'>
				<div className='mb-4'>
					<NavLink to={`/${userId.userName}`}>
						<span className='text-gray-500 font-semibold text-md capitalize md:hover:underline'>
							{userId.firstName} {userId.lastName}
						</span>{' '}
					</NavLink>
					<span className='text-gray-400 text-sm'>
						<NavLink to={`/${userId.userName}`}>
							<span className='md:hover:underline'>@{userId.userName}</span>
						</NavLink>{' '}
						· {transformISOString(createdAt)}
					</span>
				</div>
				<div className='whitespace-pre-line'>{tweet}</div>
				<ReactionButtons tweetObj={tweetObj} currentUserId={currentUser._id} />
			</div>
		</div>
	);
};
