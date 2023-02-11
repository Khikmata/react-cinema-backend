import { body } from 'express-validator';

export const loginValidation = [
	body('userName', 'Неверное имя').isLength({ min: 3 }),
	body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
];
export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен быть не менее 5 символов').isLength({ min: 5 }),
	body('userName', 'Укажите имя').isLength({ min: 3 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];
export const commentCreateValidation = [
	body('text', 'Введите текст комментария').isLength({ min: 3 }).isString(),
	body('avatarUrl', 'Неверная ссылка на изображение').optional().isString(),
] 