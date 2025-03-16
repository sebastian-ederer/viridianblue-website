<script lang="ts">
	import Search from '$lib/components/icons/search.svelte';
	import ProjectCard from '$lib/components/projectCard.svelte';
	import { debounce } from '$lib/utils/debounce';
	import { onMount } from 'svelte';
	import projectsData from '../../../data/projects.json';
	import technologiesData from '../../../data/technologies.json';
	import type Project from '../../../data/types/project';
	import type Technology from '../../../data/types/technology';
	import Fuse from 'fuse.js';

	let originalProjects: Project[] = projectsData;
	let projects: Project[] = [];
	let technologies: Technology[] = technologiesData;
	let searchString: string = '';

	const enrichProject = (project: Project): Project => {
		return {
			...project,
			techstack: project.technologyIds
				.map((techId) => technologies.find((tech) => tech.id === techId)!)
				.filter((tech) => tech !== undefined)
				.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
		};
	};

	const filterProjects = debounce(() => {
		if (!searchString) {
			projects = originalProjects.map(enrichProject);
			return;
		}

		const fuse = new Fuse(originalProjects.map(enrichProject), {
			keys: [
				'description',
				'customer',
				'tasks',
				'techstack.name',
				'techstack.synonyms',
				'metadata.role'
			],
			threshold: 0.3
		});

		const results = fuse.search(searchString);
		projects = results.map((x) => x.item);
	});

	onMount(() => {
		projects = originalProjects.map(enrichProject);
	});
</script>

<div class="experience">
	<div class="global-filter">
		<input bind:value={searchString} oninput={filterProjects} type="text" placeholder="filter" />
		<button type="button" onclick={filterProjects}><Search /></button>
	</div>
	<div class="projects">
		{#each projects as project}
			<ProjectCard {project} />
		{/each}
	</div>
</div>

<style lang="scss">
	.experience {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 24px;
		align-items: center;
		margin: 20px 0;
	}

	.projects {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		max-width: 768px;
	}

	.global-filter {
		width: 100%;
		max-width: 768px;
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 6px;

		input {
			padding: 10px;
			border-radius: 4px;
			border: 1px solid black;
		}

		button {
			border-radius: 50%;
			border: none;
			background-color: rgb(var(--color-primary));
			cursor: pointer;

			width: 40px;
			height: 40px;

			:global(svg) {
				width: 18px;
				height: 18px;
				stroke: white;
				fill: white;
			}

			&:hover {
				background-color: rgba(var(--color-primary), 0.85);
			}
		}
	}
</style>
