<script lang="ts">
	import Dotsicon from '../misc/DotsIcon.svelte';
	import { project_toggle } from './ProjectsModule.svelte';

	export let id: number;
	export let projectname: string;
	export let active: boolean;

	export let description: string;
export let client: string;

import { get_projects } from './ProjectsModule.svelte';

let editedName = projectname;
let editedDesc = description;
let editedClient = client;

let edit_project_form: HTMLDialogElement;

function openEditModal() {
	editedName = projectname;
	editedDesc = description;
	editedClient = client;
	edit_project_form.showModal();
}

async function submitEdit() {
	const authHeader = sessionStorage.getItem('authHeader');
	if (!authHeader) return;

	try {
		const response = await fetch(`/project/modify/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader
			},
			body: JSON.stringify({
				name: editedName,
				description: editedDesc,
				client: editedClient,
				sentenze_ids: [],
				norme_ids: []
			})
		});
		if (!response.ok) {
			console.error(`Errore HTTP: ${response.status}`);
			return;
		}
		get_projects();
	} catch (err) {
		console.error(err);
	}
}

let confirmDeleteModal: HTMLDialogElement;
let deleteTarget = { id: id, title: projectname };

function openDeleteConfirmation() {
	deleteTarget = { id, title: projectname };
	confirmDeleteModal?.showModal();
}

async function confirmDelete() {
	const authHeader = sessionStorage.getItem('authHeader');
	if (!authHeader) return;

	const row = document.getElementById("project-row-" + deleteTarget.id);
	if (row) row.classList.add("fade-out");

	try {
		const response = await fetch(`/project/delete/${deleteTarget.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: authHeader
			}
		});

		if (!response.ok) {
			console.error(`Errore HTTP: ${response.status}`);
			if (row) row.classList.remove("fade-out");
			return;
		}

		setTimeout(() => {
			confirmDeleteModal?.close();
			get_projects(); // aggiorna lista progetti dal backend
		}, 400);
	} catch (err) {
		console.error(err);
		if (row) row.classList.remove("fade-out");
	}
}


</script>

<div
	id={"project-row-" + id}
	class="flex w-full items-center rounded-lg border-l-4 p-0 transition-colors duration-200
{active
		? 'border-green-400 bg-green-700  hover:bg-green-400'
		: 'border-purple-300 bg-purple-600 hover:bg-purple-700'}"
>
	<div class="w-full rounded-md bg-purple-900 py-3">
		<p class="text-md truncate pl-2 font-medium text-gray-100 w-full">
			{projectname}
		</p>
	</div>
	<div class="dropdown-active dropdown dropdown-end pr-2 pt-1">
		<div
			tabindex="0"
			role="button"
			class="btn btn-ghost btn-xs h-full hover:no-animation hover:bg-transparent"
			style="padding: 0"
		>
			<Dotsicon />
		</div>
		<ul class="menu dropdown-content rounded-box z-[2] w-44 bg-purple-200 shadow">
			<li>
				<button
					on:click={() => openEditModal()}
					class="text-purple-950 hover:bg-purple-800 hover:text-purple-100"
				>Modifica progetto</button>
			</li>
			{#if !active}
				<li>
					<button
						on:click={() => project_toggle(id)}
						class="text-purple-950 hover:bg-purple-800 hover:text-purple-100"
						>Attiva progetto</button
					>
				</li>
			{/if}
			<li>
	<button
		on:click={() => openDeleteConfirmation()}
		class="btn btn-error text-center align-middle"
	>
		Elimina progetto
	</button>
</li>

		</ul>
	</div>
</div>


<dialog bind:this={edit_project_form} class="modal" style="display: flex; align-items: center; justify-content: center;">
	<div class="modal-box bg-white text-black w-full max-w-xl">
		<h3 class="text-lg font-bold">Modifica progetto</h3>
		<p class="text-right text-sm">Premi ESC per annullare</p>

		<div>
			<div class="my-4 w-full">
				<input
					bind:value={editedName}
					type="text"
					placeholder="Nome progetto"
					class="input w-full bg-neutral-200 text-black"
					required
				/>
			</div>
			<div class="my-2 w-full">
				<textarea
					bind:value={editedDesc}
					class="textarea w-full bg-neutral-200 text-black"
					placeholder="Descrizione del progetto"
				></textarea>
			</div>
			<div class="mb-4 mt-0 w-full">
				<input
					bind:value={editedClient}
					type="text"
					placeholder="Cliente di riferimento"
					class="input w-full bg-neutral-200 text-black"
				/>
			</div>
		</div>

		<div class="text-center">
			<form method="dialog">
				<button
					on:click={submitEdit}
					class="btn bg-purple-950 capitalize text-white"
				>Salva modifiche</button>
			</form>
		</div>
	</div>
</dialog>

<dialog bind:this={confirmDeleteModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="font-bold text-lg">Conferma eliminazione</h3>
		<p class="py-4">
			Sei sicuro di voler eliminare <strong>{deleteTarget.title}</strong>?
		</p>
		<div class="modal-action">
			<form method="dialog" class="space-x-2">
				<button class="btn" type="submit">Annulla</button>
				<button class="btn btn-error" type="button" on:click={confirmDelete}>Elimina</button>
			</form>
		</div>
	</div>
</dialog>

<style>
	.fade-out {
		opacity: 0;
		transform: translateX(-20px);
		transition: opacity 0.4s ease, transform 0.4s ease;
	}
</style>
