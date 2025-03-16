<script lang="ts">
	import ProjectCard from '$lib/components/projectCard.svelte';
	import { debounce } from '$lib/utils/debounce';
	import Fuse from 'fuse.js';
	import { onMount } from 'svelte';
	import projectsData from '../../../data/projects.json';
	import technologiesData from '../../../data/technologies.json';
	import type Project from '../../../data/types/project';
	import type Technology from '../../../data/types/technology';

	let originalProjects: Project[] = projectsData;
	let projects: Project[] = [];
	let technologies: Technology[] = technologiesData;
	let searchString: string = '';
	let startDate: string = '';
	let endDate: string = '';

	const enrichProject = (project: Project): Project => {
		return {
			...project,
			techstack: project.technologyIds
				.map((techId) => technologies.find((tech) => tech.id === techId)!)
				.filter((tech) => tech !== undefined)
				.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0)),

			metadata: [...project.metadata].sort(
				(a, b) => (parseDate(b.start)?.getTime() ?? 0) - (parseDate(a.start)?.getTime() ?? 0)
			)
		};
	};

	const sortProjectsByDate = (projects: Project[]): Project[] => {
		return projects.sort((a, b) => {
			const latestDateA = a.metadata.length ? (parseDate(a.metadata[0].start)?.getTime() ?? 0) : 0;
			const latestDateB = b.metadata.length ? (parseDate(b.metadata[0].start)?.getTime() ?? 0) : 0;
			return latestDateB - latestDateA;
		});
	};

	const filterProjects = debounce(() => {
		let filteredProjects = originalProjects.map(enrichProject);

		if (startDate) {
			const startDateObj = parseDate(startDate);
			if (startDateObj) {
				filteredProjects = filteredProjects.filter((project) =>
					project.metadata.some((meta) => {
						const metaStartDate = parseDate(meta.start);

						if (!metaStartDate) return false;

						return metaStartDate >= startDateObj;
					})
				);
			}
		}

		if (endDate) {
			const endDateObj = parseDate(endDate);
			if (endDateObj) {
				filteredProjects = filteredProjects.filter((project) =>
					project.metadata.some((meta) => {
						let metaEndDate: Date | null = null;

						if (meta.end) metaEndDate = parseDate(meta.end);
						else metaEndDate = new Date();

						if (!metaEndDate) return false;

						return metaEndDate <= endDateObj;
					})
				);
			}
		}

		if (searchString) {
			const fuse = new Fuse(filteredProjects, {
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
			filteredProjects = results.map((x) => x.item);
		}

		projects = sortProjectsByDate(filteredProjects);
	});

	const parseDate = (dateString: string): Date | null => {
		const parts = dateString.split('/').map((x) => x.trim());
		if (parts.length === 2 && parts[0].length === 2 && parts[1].length === 4) {
			const month = parseInt(parts[0], 10) - 1; // Months are 0-indexed
			const year = parseInt(parts[1], 10);
			if (!isNaN(month) && !isNaN(year)) {
				return new Date(year, month, 1);
			}
		}
		return null;
	};

	const parseInput = (str: string) => {
		let value = str.replace(/\D/g, '');
		if (value.length === 0) {
			return '';
		}

		let month = '';
		let year = '';

		if (value.length <= 2) {
			month = value;
		} else {
			month = value.slice(0, 2);
			year = value.slice(2);
		}

		if (month.length === 1) {
			if (parseInt(month, 10) > 1) {
				month = '0' + month;
			}
		}

		if (month.length === 2) {
			if (parseInt(month, 10) > 12) {
				month = '12';
			} else if (parseInt(month, 10) === 0) {
				month = '01';
			}
		}

		let result = month;

		if (year) {
			result += ' / ' + year;
		} else if (month.length === 2) {
			result = month + ' / ';
		}

		return result;
	};

	const handleDateInput = (event: Event, bindValue: (value: string) => void) => {
		const input = event.target as HTMLInputElement;
		const value = parseInput(input.value);
		input.value = value;
		bindValue(value);
		filterProjects();
	};

	onMount(() => {
		projects = sortProjectsByDate(originalProjects.map(enrichProject));
	});
</script>

<div class="experience">
	<h1>Experience</h1>
	<div class="date-filters">
		<div class="input-group">
			<label for="start-date">started</label>
			<input
				id="start-date"
				type="text"
				placeholder="MM / YYYY"
				value={startDate}
				oninput={(event) => handleDateInput(event, (value) => (startDate = value))}
				maxlength="9"
			/>
		</div>
		<div class="input-group">
			<label for="end-date">finished</label>
			<input
				id="end-date"
				type="text"
				placeholder="MM / YYYY"
				value={endDate}
				oninput={(event) => handleDateInput(event, (value) => (endDate = value))}
				maxlength="9"
			/>
		</div>
	</div>

	<div class="global-filter">
		<input
			bind:value={searchString}
			oninput={filterProjects}
			type="text"
			placeholder="Search anything"
		/>
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

	.global-filter,
	.date-filters {
		width: 100%;
		max-width: 768px;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 12px;
	}

	.input-group {
		width: 100%;
		font-size: 10pt;
	}

	input {
		width: 100%;
		padding: 10px;
		border-radius: 4px;
		border: 1px solid black;
		&::placeholder {
			color: #999;
		}
	}
</style>
