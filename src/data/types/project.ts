import type Technology from './technology';

export interface Metadata {
	start: string;
	end: string | null;
	role: string;
}

export default interface Project {
	id: number;
	technologyIds: number[];
	description: string;
	tasks: Array<string>;
	customer: string;
	metadata: Metadata[];
	techstack?: Technology[];
}
