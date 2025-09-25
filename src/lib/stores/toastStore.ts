import { writable } from 'svelte/store';

export type ToastMessage = {
	id: number;
	message: string;
	type: 'success' | 'error';
	duration: number;
};

export const toasts = writable<ToastMessage[]>([]);

/**
 * Removes a toast notification by its ID.
 * @param {number} id The ID of the toast to remove.
 */
export function removeToast(id: number) {
	toasts.update((all) => all.filter((t) => t.id !== id));
}

/**
 * Shows a toast notification.
 * @param {string} message The message to display.
 * @param {'success' | 'error'} type The type of toast.
 * @param {number} duration How long the toast should be visible in milliseconds.
 */
export function showToast(message: string, type: 'success' | 'error' = 'success', duration = 4000) {
	const id = Date.now();

	const newToast: ToastMessage = {
		id,
		message,
		type,
		duration
	};

	toasts.update((all) => [...all, newToast]);

	setTimeout(() => {
		removeToast(id);
	}, duration);
}
