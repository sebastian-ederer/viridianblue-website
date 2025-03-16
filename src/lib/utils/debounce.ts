export const debounce = (callback: Function, delay = 300) => {
	let timeoutId: number | undefined = undefined;

	return (...args: any) => {
		window.clearTimeout(timeoutId);

		timeoutId = window.setTimeout(() => {
			callback(...args);
		}, delay);
	};
};
