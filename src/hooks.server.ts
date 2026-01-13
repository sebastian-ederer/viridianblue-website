import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	const mediaExtensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif', '.mp3', '.ogg', '.webm'];
	if (mediaExtensions.some((ext) => event.url.pathname.endsWith(ext))) {
		response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
	}

	return response;
};
