import { useDispatch, useSelector } from 'react-redux';
import { reactToPosts } from './postsSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	hooray: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀',
};

export const ReactionButtons = ({ tweetObj }) => {
	const { currentUser } = useSelector((state) => state.currentUser);
	const currentUserId = currentUser._id;

	console.log({ tweetObj });
	const dispatch = useDispatch();
	const onReactEmojiClicked = (e) => {
		e.preventDefault();
		dispatch(
			reactToPosts({
				tweetId: tweetObj._id,
				reactionName: e.target.name,
				reactionCount: tweetObj[e.target.name].reactedUsers.length,
			}),
		);
	};

	const styleReactionButtons = (reactionEmoji) => {
		const isCurrentUserReacted = tweetObj[reactionEmoji].reactedUsers.find(
			(user) => user._id === currentUserId,
		);
		console.log({ isCurrentUserReacted });
		return isCurrentUserReacted ? 'border-2 border-gray-300 bg-gray-100' : '';
		// return '';
	};
	return (
		<div className='mt-4'>
			{Object.keys(reactionEmoji).map((emojiname) => {
				return (
					<button
						className={`mr-3 p-1 ${styleReactionButtons(emojiname)}`}
						name={emojiname}
						onClick={(e) => onReactEmojiClicked(e)}>
						{reactionEmoji[emojiname]} {tweetObj[emojiname].reactedUsers.length}
					</button>
				);
			})}
		</div>
	);
};
