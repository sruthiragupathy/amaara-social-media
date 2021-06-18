import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PostCard } from './PostCard';

export const PostsList = () => {
	const { tweets } = useSelector((state) => state.posts);

	return (
		<div className=''>
			{tweets.map((tweet) => {
				return (
					<NavLink to={`/tweet/${tweet._id}`} key={tweet._id}>
						<PostCard tweetObj={tweet} />
					</NavLink>
				);
			})}
		</div>
	);
};
