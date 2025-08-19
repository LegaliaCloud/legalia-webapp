<script lang="ts">
	import Fileexplorer from '../fileexplorer/FileExplorer.svelte';
	import Projectitem from '../projects/ProjectItem.svelte';
	import { onMount } from 'svelte';
	import { get_files } from '../fileexplorer/FilesModule.svelte';
	import { projects, get_projects } from '../projects/ProjectsModule.svelte';
	import { json } from '@sveltejs/kit';

	$: projects_list = $projects;
	let newProjectName = '',
		newProjectClient = '',
		newProjectDesc = '';
	let create_project_form: HTMLDialogElement;

	let newFile: string | Blob;
	let uploadModal: HTMLDialogElement;

	async function create_project(name: string, desc: string, client: string) {
		const authHeader = sessionStorage.getItem('authHeader');
		if (name != '' && authHeader != null) {
			let payload = { name: name, description: desc, client: client };
			newProjectName = '';
			newProjectClient = '';
			newProjectDesc = '';
			try {
				const response = await fetch('/project/add', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader
					},
					body: JSON.stringify(payload)
				});
				if (!response.ok) {
					let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				get_projects();
			} catch (err) {
				console.log(err);
			}
		}
	}

	async function uploadFile() {
		if (!newFile) {
			alert('Seleziona un file prima di caricare!');
			return;
		}

		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			let formData = new FormData();
			formData.append('file', newFile);
			try {
				const response = await fetch('/files/upload', {
					method: 'POST',
					headers: { Authorization: authHeader },
					body: formData
				});
				if (!response.ok) {
					let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				get_files();
			} catch (err) {
				alert("Qualcosa è andato storto nell'upload del file. Riprova!");
				console.log(err);
			}
		}
	}

	function handleFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input.files) {
			newFile = input.files[0];
			console.log('File selezionato:', newFile.name);
		}
	}

	onMount(get_projects);
</script>

<div
	class="rounded-r-lg text-white px-1 h-full w-full flex flex-col"
	style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
    <!-- Projects Section -->
	<p class="font-bold text-center text-xl py-3 w-full">I tuoi progetti</p>
	<div class="overflow-x-hidden overflow-y-auto px-5" style="min-height: 30%; max-height: 30%; max-width:100%;">
		<div class="flex flex-col gap-2">
	{#each projects_list as project}
		<Projectitem
			id={project.id}
			projectname={project.name}
			description={project.description}
			client={project.client}
			active={project.state == "active"}
		/>
	{/each}
</div>

		</div>
	<div class="flex justify-center my-2">
		<button class="btn btn-sm btn-warning rounded-full" on:click={()=>create_project_form.showModal()}>+</button>
	</div>

	<!-- Separator Line -->
	<div class="border-t border-purple-900 mt-2"></div>
	<p class="font-bold text-center text-xl py-3 w-full">I tuoi file</p>
	<div class="overflow-y-auto overflow-x-hidden px-5" style="max-height: 30%; max-width:100%;">
		<Fileexplorer></Fileexplorer>
	</div>
	<div class="my-2 flex justify-center">
		<button class="btn btn-warning btn-sm rounded-full" on:click={() => uploadModal.showModal()}
			>+</button
		>
	</div>
</div>

<!-- Create new project modal -->
<dialog bind:this={create_project_form} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Crea un nuovo progetto</h3>
		<p class="text-right text-sm">Premi ESC per annullare</p>
		<div>
			<div class="my-4 w-full">
				<input
					bind:value={newProjectName}
					type="text"
					placeholder="Nome progetto"
					class="input w-full bg-neutral-200 text-black"
					required
				/>
			</div>
			<div class="my-2 w-full">
				<textarea
					bind:value={newProjectDesc}
					class="textarea w-full bg-neutral-200 text-black"
					placeholder="Descrizione del progetto"
				></textarea>
			</div>
			<div class="mb-4 mt-0 w-full">
				<input
					bind:value={newProjectClient}
					type="text"
					placeholder="Cliente di riferimento"
					class="input w-full bg-neutral-200 text-black"
				/>
			</div>
		</div>
		<div class="text-center">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button
					on:click={() => create_project(newProjectName, newProjectDesc, newProjectClient)}
					class="btn bg-purple-950 capitalize text-white">Crea progetto</button
				>
			</form>
		</div>
	</div>
</dialog>

<!-- Upload file modal-->
<dialog bind:this={uploadModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Carica un file dal tuo dispositivo</h3>
		<p class="text-right text-sm">Premi ESC per annullare</p>
		<div class="my-4">
			<input
				on:change={handleFileChange}
				type="file"
				class="file-input file-input-warning w-full bg-white"
			/>
		</div>
		<div class="text-center">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button on:click={uploadFile} class="btn bg-purple-950 capitalize text-white"
					>Carica file</button
				>
			</form>
		</div>
	</div>
</dialog>

<style>
	/* Stile della scrollbar (per Chrome, Edge e Safari) */
	::-webkit-scrollbar {
		width: 8px; /* larghezza della scrollbar verticale */
		height: 8px; /* altezza della scrollbar orizzontale */
	}

	/* Stile della "maniglia" della scrollbar */
	::-webkit-scrollbar-thumb {
		background-color: #b0b0b0; /* colore chiaro */
		border-radius: 4px; /* bordi arrotondati */
	}

	/* Al passaggio del mouse sulla scrollbar */
	::-webkit-scrollbar-thumb:hover {
		background-color: #868686; /* leggermente più scuro al passaggio del mouse */
	}

	/* Stile della "traccia" della scrollbar */
	::-webkit-scrollbar-track {
		background-color: #4f1c76; /* sfondo ancora più chiaro */
		border-radius: 4px; /* bordi arrotondati */
	}
</style>
