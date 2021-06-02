import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { transformISOString } from '../../utils/utils';
import { ReactionButtons } from './ReactionButtons';

export const PostCard = ({ tweet }) => {
	const { post, userId, createdAt } = tweet;

	const currentTweetUser = useSelector((state) => {
		return state.users.find((user) => user._id === userId);
	});

	const { firstName, lastName, userName } = currentTweetUser;
	return (
		<div className='flex items-start justify-start py-3 px-1 md:px-0 border-b hover:bg-gray-50'>
			<NavLink to={`/${userName}`}>
				<div className='img-logo'> SR</div>
			</NavLink>
			<div className='text-left'>
				<div className='mb-4'>
					<NavLink to={`/${userName}`}>
						<span className='text-gray-500 font-semibold text-md capitalize md:hover:underline'>
							{firstName} {lastName}
						</span>{' '}
					</NavLink>
					<span className='text-gray-400 text-sm'>
						<NavLink to={`/${userName}`}>
							<span className='md:hover:underline'>@{userName}</span>
						</NavLink>{' '}
						· {transformISOString(createdAt)}
					</span>
				</div>
				<div className='whitespace-pre-line'>{post}</div>
				<ReactionButtons tweet={tweet} />
			</div>
		</div>
	);
};
