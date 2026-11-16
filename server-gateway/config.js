exports = module.exports = {
	PRESERVED_DOMAIN: ['test', 'demo'],
	MONGO_URI: 'mongodb://localhost:27017/surveysaurus',
	secretKey: process.env.JWT_SECRET,
	HOST: 'http://localhost:8080',
	registerLink: 'http://localhost:8080/signup',
};
