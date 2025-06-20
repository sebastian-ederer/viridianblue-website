<script lang="ts">
	export let bgColor: string;
	export let content: string;

	const getContrastColor = (bgColor: string): string => {
		const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result
				? {
						r: parseInt(result[1], 16),
						g: parseInt(result[2], 16),
						b: parseInt(result[3], 16)
					}
				: null;
		};

		const rgb = hexToRgb(bgColor);
		if (!rgb) {
			return 'black';
		}

		const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
		return luminance > 0.5 ? 'black' : 'white';
	};

	$: fontColor = getContrastColor(bgColor);
</script>

<span class="pill" style="background-color: {bgColor}; color: {fontColor};">{content}</span>

<style lang="scss">
	.pill {
		padding: 0.125em 0.5em;
		margin: 0.25em;
		border-radius: 1em;
		white-space: nowrap;
	}
</style>
