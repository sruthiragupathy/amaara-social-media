import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { statusEnum } from '../../utils/utils';
import { PostCard } from './PostCard';
import { loadPosts } from './postsSlice';

export const PostsList = () => {
	const { tweets, status } = useSelector((state) => state.posts);
	const { token } = useSelector((state) => state.currentUser);
	const dispatch = useDispatch();

	useEffect(() => {
		if (status.LOAD_POSTS === statusEnum['IDLE'])
			dispatch(loadPosts({ token }));
	}, [dispatch, status]);
	return (
		tweets.length && (
			<div className=''>
				{tweets.map((tweet) => {
					return (
						<NavLink to={`/tweet/${tweet._id}`} key={tweet._id}>
							<PostCard tweetObj={tweet} />
						</NavLink>
					);
				})}
			</div>
		)
	);
};
