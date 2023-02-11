import express from 'express';
import mongoose from 'mongoose'
import { commentCreateValidation, loginValidation, registerValidation } from './validations/validation.js';
import checkAuth from './utils/checkAuth.js';
import multer from 'multer';
import handleValidationErrors from './utils/handleValidationErrors.js';
import cors from 'cors'
import { create, getAll, getOne, removeOne, update } from './Controllers/CommentController.js'
import { checkMe, login, register } from './Controllers/UserController.js';



mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('db is fine'))
	.catch((err) => console.log('db error', err));


const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads')
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors())

app.post('/auth/login', loginValidation, handleValidationErrors, login)
app.post('/auth/register', registerValidation, handleValidationErrors, register)



app.get('/auth/me', checkAuth, checkMe)
app.post('/upload', checkAuth, upload.single('avatar'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
})

app.get('/comments', getAll)
app.get('/comments/:id', getOne)
app.post('/comments/', checkAuth, commentCreateValidation, create)
app.delete('/comments/:id', checkAuth, removeOne)
app.patch('/comments/:id', checkAuth, commentCreateValidation, handleValidationErrors, update)


app.listen(process.env.PORT || 4444, (err) => {
	if (err) {
		return console.log(err)
	}

	console.log('Server OK!')
});

