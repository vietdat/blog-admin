const argon2 = require('argon2');

const User = require('../models/User').model;

exports = module.exports = (app) => {
	app.use('/api/register', async (req, res) => {
		const { email, password, firstName, lastName, hearFrom } = req.body;
		if (!email || !password || !firstName || !lastName) {
			return res.status(400).send({ error: 'Yêu cầu không hợp lệ' });
		}

		// finding exist user
		let user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.status(400).send({ error: 'Email này đã được đăng ký.' });
		}

		// hashedPassword
		const hashedPassword = await argon2.hash(password);

		try {
			user = await User.create({
				email,
				password: hashedPassword,
				firstName: firstName,
				lastName: lastName,
				hearFrom: hearFrom
			});
		} catch (error) {
			console.log(error);
			return res
				.status(500)
				.send({ error: 'Đã có lỗi khi tạo tài khoản. Vui lòng thử lại sau' });
		}

		const token = user.generateAuthToken();
		res
			.cookie('authorization', `Bearer ${token}`, {
				httpOnly: true,
				expires: new Date(2120, 12, 31),
			})
			.send({
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
			});
	});

	app.get('/api/logout', async (req, res) => {
		res.clearCookie('authorization', { path: '/' });
		res.send({
			message: 'Success',
		});
	});
};
