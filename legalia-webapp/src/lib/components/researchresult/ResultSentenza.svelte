<script lang="ts">
	import type { Sentenza } from './ResearchModule.svelte';
	import { dateFormat } from '../misc/UsefulFunctions.svelte';
	import { sentenze } from '../projects/ProjectsModule.svelte'; // se usi uno store centrale

	export let sentenza: Sentenza;

	let sentenzaContentModal: HTMLDialogElement;
	let confirmModalId = `confirmDelete-${sentenza.position_index}`;
	let rowId = `sentenza-row-${sentenza.position_index}`;

	function handleOpenModal() {
		sentenzaContentModal?.showModal();
	}

	function openDeleteConfirmation() {
		const modal = document.getElementById(confirmModalId) as HTMLDialogElement;
		modal?.showModal();
	}

	function confirmDelete() {
		deleteSentenza();
		const modal = document.getElementById(confirmModalId) as HTMLDialogElement;
		modal?.close();
	}

	async function deleteSentenza() {
	try {
		const id = sentenza.position_index;
		const row = document.getElementById(rowId);
		if (row) {
			row.classList.add("fade-out");
		}

		await new Promise(resolve => setTimeout(resolve, 400)); // attesa animazione

		const authHeader = sessionStorage.getItem("authHeader");
		const url = `/project/delete/sentenze?sent_ids=${id}`;

		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				Authorization: authHeader ?? "",
			},
		});

		if (response.ok) {
			sentenze.update(list => list.filter(s => s.position_index !== id));
		} else {
			alert("Errore durante l'eliminazione");
			console.error(await response.text());
		}
	} catch (err) {
		console.error(err);
	}
}

</script>

<!-- Sentenza container -->
<div id={rowId} class="w-full flex justify-between items-center rounded-lg border-l-4 transition-colors duration-200 my-2 bg-white hover:bg-gray-200 p-3 group">
	<!-- Parte cliccabile -->
	<div on:dblclick={handleOpenModal} class="flex-grow min-w-0 cursor-pointer">
		<p class="text-md font-medium truncate">{sentenza.description.split(" \n")[0]}</p>
		<div class="grid grid-cols-2 text-xs">
			<p class="col-span-1">Data: {dateFormat(sentenza.dep_date).split(" ")[0]}</p>
			<p class="col-span-1">Numero: {sentenza.number}</p>
		</div>
	</div>

	<!-- Bottone cestino -->
	<button
		class="btn btn-sm btn-circle btn-error opacity-80 group-hover:opacity-100 transition"
		on:click={openDeleteConfirmation}
	>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
				d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3" />
		</svg>
	</button>
</div>

<!-- Modale di conferma -->
<dialog id={confirmModalId} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="font-bold text-lg">Conferma eliminazione</h3>
		<p class="py-4">Vuoi davvero eliminare <strong>sentenza n. {sentenza.number}</strong>?</p>
		<div class="modal-action">
			<form method="dialog" class="space-x-2">
				<button class="btn" type="submit">Annulla</button>
				<button class="btn btn-error" type="button" on:click={confirmDelete}>Elimina</button>
			</form>
		</div>
	</div>
</dialog>

<!-- Modale contenuto sentenza -->
<dialog bind:this={sentenzaContentModal} class="modal">
	<div class="modal-box max-w-2xl bg-white text-black">
		<div class="flex items-center justify-between mb-4 border-b pb-2">
			<h3 class="text-lg font-bold">
				{sentenza.description.split(" \n")[0]} n. {sentenza.number}
			</h3>
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost">✕</button>
			</form>
		</div>
		<h4 class="text-lg font-semibold text-primary mb-3">{sentenza.description.split(" \n")[1]}</h4>
		<div class="overflow-y-auto pr-4 text-justify" style="max-height: 300px">
			<div class="prose max-w-full mb-4">
				<div class="bg-base-200 p-4 rounded-lg bg-neutral-200 text-black">
					<p>{sentenza.content}</p>
				</div>
			</div>
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
		background-color: #d3cada; /* sfondo ancora più chiaro */
		border-radius: 4px; /* bordi arrotondati */
	}

	.fade-out {
		opacity: 0;
		transform: translateX(-20px);
		transition: opacity 0.4s ease, transform 0.4s ease;
	}
</style>
