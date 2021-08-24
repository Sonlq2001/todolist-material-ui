export interface ValueForm {
	username: string;
	password: string;
}

export interface valueWork {
	_id?: string | number;
	title: string;
	completed?: boolean;
}

export interface Todo {
	id?: string | number;
	content: string;
	status?: string;
}
