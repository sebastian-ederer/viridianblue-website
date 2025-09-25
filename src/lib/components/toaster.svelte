<script lang="ts">
	import { toasts } from '$lib/stores/toastStore';
	import Toast from './Toast.svelte';
</script>

{#if $toasts.length}
	<div class="toaster-container">
		{#each $toasts as toast (toast.id)}
			<Toast id={toast.id} type={toast.type} message={toast.message} />
		{/each}
	</div>
{/if}

<style>
	.toaster-container {
		position: fixed;
		bottom: 2.5em;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: calc(100% - 2rem);
		max-width: 400px;
		align-items: center;
	}
</style>
