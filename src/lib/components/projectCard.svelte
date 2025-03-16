<script lang="ts">
	import { slide } from 'svelte/transition';
	import type Project from '../../data/types/project';
	import Calendar from './icons/calendar.svelte';
	import Person from './icons/person.svelte';
	import Pill from './pill.svelte';

	export let project: Project;

	let techstackCollapsed = true;
	let tasksCollapsed = true;
</script>

{#if !project}
	<div>Loading Skeletton...</div>
{:else}
	<div class="project-card">
		<h1>{project.customer}</h1>
		<div class="metadata">
			{#each project.metadata as metadata}
				<div class="row">
					<div class="date">
						<span class="icon"><Calendar /></span>{metadata.start} - {metadata.end ?? 'heute'}
					</div>
					<div class="role"><span class="icon"><Person /></span>{metadata.role}</div>
				</div>
			{/each}
		</div>

		<p class="description">
			{project.description}
		</p>

		<div class="collapsables">
			<div>
				<button class="collapsable-btn" on:click={() => (techstackCollapsed = !techstackCollapsed)}>
					Techstack
					<span class="arrow-container" class:rotate={!techstackCollapsed}> &#8250; </span>
				</button>
				{#if !techstackCollapsed}
					<div transition:slide={{ duration: 300 }} class="techstack">
						{#each project.techstack ?? [] as stack}
							<Pill bgColor={stack.color} content={stack.name} />
						{/each}
					</div>
				{/if}
			</div>

			<div>
				<button class="collapsable-btn" on:click={() => (tasksCollapsed = !tasksCollapsed)}>
					Tasks
					<span class="arrow-container" class:rotate={!tasksCollapsed}> &#8250; </span>
				</button>
				{#if !tasksCollapsed}
					<ul transition:slide={{ duration: 300 }} class="tasks">
						{#each project.tasks as task}
							<li>{task}</li>
						{/each}
					</ul>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.project-card {
		padding: 20px;
		width: 100%;
		display: flex;
		flex-direction: column;
		background-color: #ebebeb;

		@media (min-width: 768px) {
			border-radius: 4px;
		}

		h1 {
			color: rgb(var(--color-primary));
			margin-top: 0;
			border-bottom: 1px solid #ccc;
		}
	}

	.row {
		display: flex;
		flex-direction: column;
		gap: 8px;

		@media (min-width: 480px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}

	.metadata {
		display: flex;
		flex-direction: column;
		font-size: 10pt;
		gap: 24px;

		@media (min-width: 480px) {
			gap: 6px;
		}
	}

	.icon {
		display: inline-block;
		width: 1em;
		height: 1em;

		:global(svg) {
			fill: rgb(var(--color-primary));
		}
	}

	.date,
	.role {
		display: flex;
		gap: 10px;
	}

	.techstack {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;
	}

	.collapsables {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.collapsable-btn {
		display: flex;
		justify-content: space-between;
		width: 100%;
		text-align: left;
		padding: 12px;
		font-size: 12pt;
		background-color: #cdcdcd;
		border: none;
		border-radius: 4px;
		cursor: pointer;

		&:hover {
			background-color: #ababab;
		}

		.arrow-container {
			transition: transform 0.3s ease;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 1em;
			height: 1em;
			font-size: 1.2rem;
			transform: rotate(90deg);
		}

		.arrow-container.rotate {
			transform: rotate(-90deg);
		}
	}
</style>
