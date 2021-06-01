import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { transformISOString } from '../../utils/utils';
import { ReactionButtons } from './ReactionButtons';

export const PostCard = ({ tweet }) => {
	const { id, likes, post, userId, createdAt } = tweet;

	const currentTweetUser = useSelector((state) => {
		return state.users.find((user) => user._id === userId);
	});

	const { firstName, lastName, userName } = currentTweetUser;
	return (
		<div className='flex items-start justify-start py-3 px-1 border-b hover:bg-gray-100'>
			<div className='img-logo'> SR</div>
			<div className='text-left'>
				<div className='mb-4'>
					<span className='text-gray-500 font-semibold text-l capitalize'>
						{firstName} {lastName}
					</span>{' '}
					<span className='text-gray-400 text-sm'>
						@{userName} · {transformISOString(createdAt)}
					</span>
				</div>
				<div className='whitespace-pre-line'>{post}</div>
				<ReactionButtons tweet={tweet} />
			</div>
		</div>
	);
};
