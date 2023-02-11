import Comment from "../models/Comment.js";


export const getAll = async (req, res) => {
	try {
		const comments = await Comment.find().populate('user').exec();


		res.json(comments)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить комментарии'
		})
	}
}
export const removeOne = async (req, res) => {
	try {
		const commentId = req.params.id;

		Comment.findOneAndDelete({
			_id: commentId,
		}, (err, doc) => {
			if (err) {
				console.log(err)
				return res.status(500).json({
					message: 'Не удалось удалить комментарий'
				});
			}

			if (!doc) {
				console.log(err)
				return res.status(404).json({
					message: 'Не удалось найти комментарий'
				});
			}

			res.json({
				success: true,
			})
		}
		)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить комментарий'
		})
	}
}
export const getOne = async (req, res) => {
	try {
		const commentId = req.params.id;

		Comment.findById(
			{
				_id: commentId,
			},
			(err, doc) => {
				if (err) {
					console.log(err);
					res.status(500).json({
						message: 'Не удалось вернуть комментарий'
					})
				}
				if (!doc) {
					return res.status(404).json({
						message: 'Комментарий не найден'
					})
				}
				res.json(doc)
			}
		)
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось получить комментарий'
		})
	}
}
export const create = async (req, res) => {
	try {
		const doc = new Comment({
			text: req.body.text,
			avatarUrl: req.body.avatarUrl,
			user: req.userId,
		});

		const comment = await doc.save();

		res.json(comment);
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось оставить комментарий'
		})
	}
}
export const update = async (req, res) => {
	try {
		const commentId = req.params.id;

		await Comment.updateOne({
			_id: commentId,
		},
			{
				text: req.body.text,
				avatarUrl: req.body.avatarUrl,
				user: req.userId,
			},
		);

		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: 'Не удалось обновить комментарий'
		})
	}
}