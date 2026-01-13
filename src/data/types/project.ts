interface TechStack {
	name: string;
	color: string;
}

interface Metadata {
	start: string;
	end?: string;
	role: string;
}

export default interface Project {
	customer: string;
	description: string;
	metadata: Metadata[];
	techstack?: TechStack[];
	tasks: string[];
}
