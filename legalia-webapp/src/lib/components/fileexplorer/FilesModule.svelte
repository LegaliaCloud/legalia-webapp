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
</script>
