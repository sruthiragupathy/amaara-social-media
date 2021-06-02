import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PostCard } from './PostCard';

export const PostsList = () => {
	const posts = useSelector((state) => state.posts);
	return (
		<div className=''>
			{posts.map((post) => {
				return (
					<NavLink to={`/tweet/${post.id}`} key={post.id}>
						<PostCard tweet={post} />
					</NavLink>
				);
			})}
		</div>
	);
};
