const capitalize = (str) => {
	const firstChar = str.charAt(0);

	return `${firstChar.toUpperCase()}${str.substr(1)}`;
};

exports = module.exports = {
	capitalize
}
