module.exports = exports = (composer) => {
	composer.schema.add({
		createdAt: { type: Date, default: Date.now },
	});

	composer.schema.pre('findOneAndUpdate', function (next) {
		const query = this.getQuery();
		const data = this.getUpdate();
		(async () => {
			const cell = await composer.model.findOne(query);
			if (!cell) {
				data.createdAt = new Date();
				this.setUpdate(data);
			}
			next();
		})();
	});
};
