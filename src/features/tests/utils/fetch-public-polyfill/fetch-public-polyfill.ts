import { readFileSync } from 'node:fs';

const readContent = (url: string) =>
	readFileSync(`${process.cwd()}/public${url}`, 'utf8');

const json = (url: string) =>
	new Promise((resolve) => resolve(JSON.parse(readContent(url))));

type FetchReturnType = Awaited<ReturnType<typeof fetch>>;

export const fetchPublicPolyfill = async (
	...parameters: Parameters<typeof fetch>
) => {
	const [url] = parameters;

	if (!(typeof url === 'string' && url.startsWith('/'))) {
		return fetch(...parameters);
	}

	return new Promise<FetchReturnType>((resolve) => {
		resolve({
			json: () => json(url),
		} as FetchReturnType);
	});
};
