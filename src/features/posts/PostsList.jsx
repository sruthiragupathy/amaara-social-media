import React from 'react';
import { useSelector } from 'react-redux';

export const PostsList = () => {
	const posts = useSelector((state) => state.posts);
	return (
		<div className='m-auto w-9/12'>
			{posts.map(({ id, post, likes }) => {
				return (
					<div key={id} className='border-2 mb-2'>
						<div>{post}</div>
						<div>{likes}</div>
					</div>
				);
			})}
		</div>
	);
};
