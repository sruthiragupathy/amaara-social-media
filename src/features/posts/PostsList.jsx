import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { PostCard } from './PostCard';
import { loadPosts } from './postsSlice';

export const PostsList = () => {
	const { tweets, status } = useSelector((state) => state.posts);
	const dispatch = useDispatch();
	useEffect(() => {
		if (status === 'idle') dispatch(loadPosts());
	}, [dispatch, status]);
	console.log({ tweets });
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
