import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const imageExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif', '.mp3', '.ogg'];
	if (imageExtensions.some((ext) => event.url.pathname.endsWith(ext))) {
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	}

	return response;
};
