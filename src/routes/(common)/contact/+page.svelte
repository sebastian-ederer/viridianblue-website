<script lang="ts">
	import { contactSchema } from '$lib/schemas/contactSchema.js';
	import { invalidateAll } from '$app/navigation';
	import { applyAction, deserialize } from '$app/forms';
	import { showToast } from '$lib/stores/toastStore';
	import { onMount } from 'svelte';
	import 'quill/dist/quill.snow.css';
	import '$lib/theme/quill.scss';

	let email: string;
	let subject: string;
	let message: string;
	let isUnlocking = false;
	let isOpening = false;
	let isFinished = false;

	let textarea: HTMLElement;
	let quill: any;

	let isSubmitting = false;
	let errors: { [key: string]: Array<string> } = {};

	// State to track whether a field has been focused/touched
	let touched: { [key: string]: boolean } = {
		subject: false,
		message: false,
		email: false
	};

	const supportedFormats = [
		'bold',
		'font',
		'code',
		'italic',
		'link',
		'size',
		'strike',
		'script',
		'underline',
		'blockquote',
		'header',
		'indent',
		'list',
		'align',
		'code-block'
	];

	onMount(async () => {
		const { default: Quill } = await import('quill');

		const toolbarOptions = [
			[{ size: [] }],
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ list: 'ordered' }, { list: 'bullet' }],
			['link']
		];

		quill = new Quill(textarea, {
			modules: {
				toolbar: toolbarOptions
			},
			placeholder: 'Your message...',
			theme: 'snow',
			formats: supportedFormats
		});

		// Add validation
		quill.on('text-change', async () => {
			touched['message'] = true;
			message = quill.getText().trim();
			await validateField('message', message);
		});
		quill.on('selection-change', () => {
			touched['message'] = true;
		});
	});

	const handleSubmit = async (event: Event) => {
		isSubmitting = true;

		message = quill.getSemanticHTML();
		const isValid = await contactSchema.isValid({ subject, email, message });
		if (!isValid) {
			await validateForm();
			isSubmitting = false;
			return;
		}

		const data = new FormData(event.currentTarget as HTMLFormElement);
		data.set('message', message);

		const response = await fetch((event.currentTarget as HTMLFormElement).action, {
			method: 'POST',
			body: data
		});

		const result: any = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
			showToast('Message sent successfully!', 'success');
			email = '';
			subject = '';
			message = '';
			errors = {};
		} else if (result.status === 400) {
			errors = result?.data;
			showToast(result.data?.error || 'Failed to send message.', 'error');
		}

		applyAction(result);
		isSubmitting = false;
	};

	const validateForm = async () => {
		errors = {};

		await contactSchema
			.validate({ subject, email, message }, { abortEarly: false })
			.catch((error) => {
				for (let i = 0; i < error.inner.length; i++) {
					const key = error.inner[i].path as keyof typeof errors;
					errors[key] = error.inner[i].errors;
				}
			});
	};

	const validateField = async (field: string, value: string) => {
		if (!touched[field]) return;

		try {
			await contactSchema.validateAt(field, { [field]: value });
			errors[field] = [];
		} catch (error: any) {
			errors[field] = error.errors;
		}
	};

	const handleBlur = (field: keyof typeof touched) => {
		touched[field] = true;
	};

	const handleOnChange = async (field: string, value: string) => {
		touched[field] = true;
		await validateField(field, value);
	};

	const revealContactForm = () => {
		// Unlocking (rotation) animation
		isUnlocking = true;

		// After the rotation is finished (800ms), start the opening (sliding) animation
		setTimeout(() => {
			isOpening = true;

			setTimeout(() => {
				isFinished = true;
			}, 800);
		}, 800);
	};
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<!-- This layer contains the gate and the colored panels -->
<div class="reveal-layer" class:opening={isOpening} class:finished={isFinished}>
	<!-- This wrapper handles the 180-degree rotation of the gate -->
	<div class="gate-wrapper" class:unlocking={isUnlocking}>
		<!-- Top half of the gate -->
		<div class="gate-half top" class:opening={isOpening}>
			<div class="gate">
				<div class="ring ring-1"></div>
				<div class="ring ring-2"></div>
				<div class="ring ring-3"></div>
				<div class="ring ring-4"></div>
				<div class="ring ring-5"></div>
			</div>
		</div>
		<!-- Bottom half of the gate -->
		<div class="gate-half bottom" class:opening={isOpening}>
			<div class="gate">
				<div class="ring ring-1"></div>
				<div class="ring ring-2"></div>
				<div class="ring ring-3"></div>
				<div class="ring ring-4"></div>
				<div class="ring ring-5"></div>
			</div>
		</div>
	</div>

	<button class:hidden={isUnlocking} on:click={revealContactForm}>Contact me</button>
	<div class="half top" class:opening={isOpening}></div>
	<div class="half bottom" class:opening={isOpening}></div>
</div>

<div class="contact">
	<div class="form-card">
		<div class="card-header">
			<h2>Get in touch</h2>
			<p>Have a question or a project in mind? I'd love to hear from you.</p>
		</div>
		<div class="card-content">
			<form method="POST" on:submit|preventDefault={handleSubmit}>
				<div class="input-group">
					<label for="email">Email</label>
					<input
						id="email"
						type="email"
						placeholder="your.email@example.com"
						name="email"
						on:change={() => handleOnChange('email', email)}
						on:blur={() => handleBlur('email')}
						bind:value={email}
						required
						class:error={errors?.email?.length > 0}
					/>
					{#if errors?.email?.length > 0}
						<small class="error-msg">{errors.email}</small>
					{/if}
				</div>
				<div class="input-group">
					<label for="subject">Subject</label>
					<input
						id="subject"
						type="text"
						placeholder="What is this about?"
						name="subject"
						bind:value={subject}
						on:change={() => handleOnChange('subject', subject)}
						on:blur={() => handleBlur('subject')}
						class:error={errors?.subject?.length > 0}
						required
					/>
					{#if errors?.subject?.length > 0}
						<small class="error-msg">{errors.subject}</small>
					{/if}
				</div>
				<div class="input-group">
					<label for="message">Message</label>
					<div class="textarea-wrapper" class:error={errors?.message?.length > 0}>
						<div bind:this={textarea}></div>
					</div>
					{#if errors?.message?.length > 0}
						<small class="error-msg">{errors.message}</small>
					{/if}
				</div>
				<button type="submit" class="submit-btn" disabled={isSubmitting}>Send Message</button>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	:root {
		--gate-fg: #3d352a;
		--gate-size: 320px;
		--menu-bar-height: 3.75em;
	}

	/* --- Reveal Layer & Panels --- */
	.reveal-layer {
		position: absolute;
		left: 0;
		top: var(--menu-bar-height);
		width: 100%;
		height: calc(100dvh - var(--menu-bar-height));
		overflow: hidden;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;

		&::before,
		&::after {
			content: '';
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			width: calc((100% - var(--gate-size)) / 2);
			height: 1px;
			background-color: var(--gate-fg);
			opacity: 0.5;
			z-index: 11;
		}
		&::before {
			left: 0;
		}
		&::after {
			right: 0;
		}
	}

	.reveal-layer.opening::before,
	.reveal-layer.opening::after {
		opacity: 0;
	}

	.reveal-layer.finished {
		pointer-events: none;
	}

	.reveal-layer button {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 12;
		width: var(--gate-size);
		height: var(--gate-size);
		border: none;
		font-size: 1.2rem;
		cursor: pointer;
		border-radius: 50%;
		background-color: transparent;
		color: #000;
		transition: opacity 0.3s ease-out;
		pointer-events: auto;

		&:hover {
			color: #333;
		}
	}

	.reveal-layer button.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.half {
		position: absolute;
		width: 100%;
		height: 50%;
		background-color: rgb(83, 197, 160);
		z-index: 10;
		transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			background-image: url('/dirt-texture.jpg');
			background-size: 700px;
			background-repeat: repeat;

			mix-blend-mode: multiply;
			opacity: 0.1;
			pointer-events: none;
		}
	}

	.half.top {
		top: 0;
	}
	.half.bottom {
		bottom: 0;
	}

	.half.top.opening {
		transform: translateY(-100%);
	}
	.half.bottom.opening {
		transform: translateY(100%);
	}

	.gate-wrapper {
		position: absolute;
		width: var(--gate-size);
		height: var(--gate-size);
		z-index: 11;
		transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
	}

	.gate-wrapper.unlocking {
		transform: rotate(180deg);
	}

	.gate-half {
		position: absolute;
		width: 100%;
		height: 50%;
		overflow: hidden;
		transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
	}

	.gate-half.top {
		top: 0;
	}
	.gate-half.bottom {
		bottom: 0;
	}

	.gate-half.top.opening {
		transform: translateY(-100vh);
	}
	.gate-half.bottom.opening {
		transform: translateY(100vh);
	}

	.gate-half .gate {
		position: absolute;
		width: var(--gate-size);
		height: var(--gate-size);
	}
	.gate-half.top .gate {
		top: 0;
	}
	.gate-half.bottom .gate {
		bottom: 0;
	}

	.gate {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: transparent;
	}

	.ring {
		position: absolute;
		border-radius: 50%;
		box-sizing: border-box;
	}

	.ring-1 {
		width: 100%;
		height: 100%;
		border: 1px solid var(--gate-fg);
		opacity: 0.5;
	}
	.ring-1::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: repeating-radial-gradient(
			transparent,
			transparent 2px,
			var(--gate-fg) 2px,
			var(--gate-fg) 3px
		);
		-webkit-mask: radial-gradient(circle, transparent 95%, black 95.5%);
		mask: radial-gradient(circle, transparent 95%, black 95.5%);
		opacity: 0.3;
		animation: spin-slow 60s linear infinite;
	}

	.ring-2 {
		width: 90%;
		height: 90%;
		border: 1px dashed var(--gate-fg);
		opacity: 0.7;
		animation: spin-right 20s linear infinite;
	}

	.ring-3 {
		width: 80%;
		height: 80%;
		border: 2px solid var(--gate-fg);
		border-top-color: transparent;
		border-bottom-color: transparent;
		animation: spin-left 15s linear infinite;
	}

	.ring-4 {
		width: 60%;
		height: 60%;
		border: 1px solid var(--gate-fg);
		opacity: 0.6;
		animation: spin-right 25s linear infinite;
	}
	.ring-4::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 110%;
		height: 110%;
		border-radius: 50%;
		border: 4px solid transparent;
		border-left: 4px solid var(--gate-fg);
		border-right: 4px solid var(--gate-fg);
		opacity: 0.8;
	}

	.ring-5 {
		width: 40%;
		height: 40%;
		border: 2px solid var(--gate-fg);
		background-color: rgba(61, 53, 42, 0.05);
		box-shadow: 0 0 15px rgba(61, 53, 42, 0.2);
	}

	/* --- Keyframe Animations --- */
	@keyframes spin-right {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes spin-left {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(-360deg);
		}
	}

	@keyframes spin-slow {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* --- Contact Form Styles --- */
	.contact {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 1;
		padding: 1em 0;

		@media (min-width: 480px) {
			padding: 2em;
		}
	}

	.form-card {
		width: 100%;
		max-width: 900px;
		background-color: #ffffff;
		border-radius: 0;
		padding: 2.5em;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
		border: 1px solid #e9e9e9;

		@media (min-width: 480px) {
			border-radius: 12px;
		}
	}

	.card-header {
		text-align: center;
		margin-bottom: 2em;
		h2 {
			font-size: 2rem;
			color: #222;
			margin-bottom: 0.25em;
		}
		p {
			font-size: 1.1rem;
			color: #666;
		}
	}

	.card-content {
		display: flex;
		flex-direction: column;
		gap: 3em;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.5em;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}

	label {
		font-weight: 600;
		font-size: 0.9rem;
		color: #333;
	}

	input {
		width: 100%;
		padding: 0.8em 1em;
		border-radius: 8px;
		border: 1px solid #dcdcdc;
		font-size: 1rem;
		transition:
			border-color 0.2s,
			box-shadow 0.2s;
		background-color: #f9f9f9;

		&:focus {
			outline: none;
			border-color: rgb(70, 165, 135);
			box-shadow: 0 0 0 3px rgba(83, 197, 160, 0.2);
		}

		&::placeholder {
			color: #999;
		}
	}

	.textarea-wrapper {
		border-radius: 8px;

		&:focus-within {
			outline: none;
			border-color: rgb(70, 165, 135);
			box-shadow: 0 0 0 3px rgba(83, 197, 160, 0.2);
		}
	}

	.submit-btn {
		background-color: rgb(70, 165, 135);
		color: #fff;
		border: none;
		padding: 1em;
		border-radius: 8px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
		margin-top: 1em;

		&:hover {
			background-color: rgb(62, 155, 125);
		}

		&:disabled {
			background-color: rgb(148, 181, 171);
			opacity: 0.7;
			cursor: not-allowed;
		}
	}

	.error-msg {
		color: #ff5569;
		margin-top: 0.25em;
	}

	.error {
		outline: 2px solid #ff5569;

		&:focus {
			outline: 2px solid #ff5569;
		}
	}
</style>
