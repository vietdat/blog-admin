class Middleware {
	constructor() {
		this.stack = [];
	}

	async use(fn) {
		if (fn.constructor.name !== 'AsyncFunction') {
			throw new Error('Handler must be Async function');
		}

		this.stack.push(fn);
	}

	async go(...args) {
		const promises = this.stack.map(fn => fn(...args));
		await Promise.all(promises);
	}
}

module.exports = exports = Middleware;
