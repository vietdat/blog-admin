export const POST = (url, data) =>
	fetch(url, {
		method: 'post',
		headers: {
			'content-type': 'application/json',
			'cache-control': 'no-cache',
		},
		body: JSON.stringify(data),
	}).then((res) => res.json());
