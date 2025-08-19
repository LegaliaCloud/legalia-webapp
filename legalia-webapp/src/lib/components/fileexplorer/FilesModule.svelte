<script lang="ts" context="module">
	import { writable } from 'svelte/store';

	export interface File {
		id: number;
		name: string;
	}

	export let files = writable<File[]>([]);

	export async function get_files() {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			try {
				const response = await fetch('/files/all', {
					method: 'GET',
					headers: {
						Authorization: authHeader
					}
				});
				if (!response.ok) {
					let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				const responseData = await response.json();
				files.set(responseData);
			} catch (err) {
				console.log(err);
			}
		}
	}

export async function delete_file(fileId: number) {
	const authHeader = sessionStorage.getItem('authHeader');
	if (authHeader != null) {
		try {
			const response = await fetch(`/files/delete/${fileId}`, {
				method: 'DELETE',
				headers: {
					Authorization: authHeader,
					"Content-Type": "application/json"
				}
			});
			if (!response.ok) {
				let error = `Errore HTTP: ${response.status}`;
				throw new Error(error);
			}
			files.update(list => list.filter(f => f.id !== fileId));
		} catch (err) {
			console.log(err);
		}
	}
}


</script>
