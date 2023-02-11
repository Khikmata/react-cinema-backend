import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
		},
		likesCount: {
			type: Number,
			default: 0,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		avatarUrl: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Comment', CommentSchema);