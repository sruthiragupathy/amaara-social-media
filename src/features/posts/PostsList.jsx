import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const PostsList = () => {
	const posts = useSelector((state) => state.posts);
	return (
		<div className='m-auto w-9/12'>
			{posts.map(({ id, post, likes }) => {
				return (
					<Link to={`/tweet/${id}`} key={id}>
						<div className='border-2 mb-2'>
							<div>{post}</div>
							<div>{likes}</div>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
