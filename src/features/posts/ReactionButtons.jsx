import { useDispatch } from 'react-redux';
import { tweetReacted } from './postsSlice';

const reactionEmoji = {
	thumbsUp: '👍',
	hooray: '🎉',
	heart: '❤️',
	rocket: '🚀',
	eyes: '👀',
};

export const ReactionButtons = ({ tweet }) => {
	const currentUser = 123;
	const dispatch = useDispatch();
	const onReactEmojiClicked = (e) => {
		e.preventDefault();
		dispatch(
			tweetReacted({
				currentUser: currentUser,
				reactionName: e.target.name,
				tweetId: tweet.id,
			}),
		);
	};

	const styleReactionButtons = (reactionEmoji) => {
		console.log(
			tweet.reactions[reactionEmoji].reactedUsers.includes(currentUser),
		);
		return tweet.reactions[reactionEmoji].reactedUsers.includes(currentUser)
			? 'border-2 border-gray-300 bg-gray-100'
			: '';
	};
	return (
		<div className='mt-4'>
			{Object.keys(reactionEmoji).map((emojiname) => {
				return (
					<button
						className={`mr-3 p-1 ${styleReactionButtons(emojiname)}`}
						name={emojiname}
						onClick={(e) => onReactEmojiClicked(e)}>
						{reactionEmoji[emojiname]}{' '}
						{tweet.reactions[emojiname].reactedUsers.length}
					</button>
				);
			})}
		</div>
	);
};
