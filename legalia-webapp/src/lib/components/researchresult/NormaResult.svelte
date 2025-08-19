<script lang="ts">
	import { decodeCodici, type Norma } from "./ResearchModule.svelte";
	import { norme } from "../projects/ProjectsModule.svelte";
	import { get } from "svelte/store";
	export let norma: Norma;
	
	// State for tab management
	let activeTab = "note";
	
	// Generate a unique ID for the modal
	let modalId = `normaDetailModal-${norma.articolo}`;
	
	function handleOpenModal() {
		const modal = document.getElementById(modalId) as HTMLDialogElement;
		if (modal) {
		modal.showModal();
		}
	}
	
	function handleTabChange(tab: string) {
		activeTab = tab;
	}

	async function deleteNorma() {
		try {
			const id = norma.id;
			const row = document.getElementById("norma-row-" + id);
			if (row) {
				row.classList.add("fade-out");
			}

			await new Promise(resolve => setTimeout(resolve, 400)); // attende animazione

			const authHeader = sessionStorage.getItem("authHeader");
			const response = await fetch(`/project/delete/norme?norme_ids=${id}`, {
				method: "DELETE",
				headers: {
					Authorization: authHeader ?? ""
				}
			});

			if (response.ok) {
				norme.update(list => list.filter(n => n.id !== id));
			} else {
				alert("Errore durante l'eliminazione");
				console.error(await response.text());
			}
		} catch (err) {
			console.error(err);
		}
	}


	function openDeleteConfirmation() {
		const modal = document.getElementById("confirmDelete-" + norma.id) as HTMLDialogElement;
		if (modal) modal.showModal();
	}

	function confirmDelete() {
		deleteNorma(); // chiamata principale
		const modal = document.getElementById("confirmDelete-" + norma.id) as HTMLDialogElement;
		if (modal) modal.close();
	}
</script>

<div id={"norma-row-" + norma.id} class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 my-2">
	<!-- Info norma -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:dblclick={handleOpenModal} class="flex min-w-full rounded-md py-3 px-4 bg-white text-black hover:bg-gray-200">
		<div style="max-width:85%; min-width:85%;">
			<p class="text-md font-medium truncate">
				Art. {norma.articolo} {norma.codice}
			</p>
			<p class="text-xs truncate mr-1" style="width:90%">Rubrica: {norma.rubrica}</p>
		</div>
		<!-- Cestino -->
		<div>
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
	</div>
</div>

<dialog id={"confirmDelete-" + norma.id} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="font-bold text-lg">Conferma eliminazione</h3>
		<p class="py-4">Sei sicuro di voler eliminare <strong>Art. {norma.articolo} {norma.codice}</strong>?</p>
		<div class="modal-action">
			<form method="dialog" class="space-x-2">
				<button class="btn" type="submit">Annulla</button>
				<button class="btn btn-error" type="button" on:click={confirmDelete}>Elimina</button>
			</form>
		</div>
	</div>
</dialog>


<dialog id={modalId} class="modal">
	<div class="modal-box max-w-2xl bg-white text-black">
		<div class="flex items-center justify-between mb-4 border-b pb-2">
			<h3 class="text-xl font-bold">
				{decodeCodici[norma.codice]} - Art. {norma.articolo}
			</h3>
			<form method="dialog">
				<button class="btn btn-sm btn-circle btn-ghost">✕</button>
			</form>
		</div>
		
		<!-- Rubrica (Title/Heading) -->
		{#if norma.rubrica}
		<h4 class="text-lg font-semibold text-primary mb-3">{norma.rubrica}</h4>
		{/if}
		<div class="overflow-y-auto pr-4 text-justify" style="max-height: 300px">
			<!-- Main content -->
			<div class="prose max-w-full mb-4">
				<div class="bg-base-200 p-4 rounded-lg bg-neutral-200 text-black">
					<p>{norma.content}</p>
				</div>
			</div>
		
			<!-- Additional information in tabs -->
			<div class="tabs tabs-boxed mb-3  bg-neutral-200">
				<button 
				class="tab text-black font-semibold {activeTab === 'note' ? 'tab-active' : ''}" 
				on:click={() => handleTabChange('note')}
				>
				Note
				</button>
				<button 
				class="tab text-black font-semibold {activeTab === 'spiegazione' ? 'tab-active' : ''}" 
				on:click={() => handleTabChange('spiegazione')}
				>
				Spiegazione
				</button>
				<button 
				class="tab text-black font-semibold {activeTab === 'massime' ? 'tab-active' : ''}" 
				on:click={() => handleTabChange('massime')}
				>
				Massime
				</button>
			</div>
		
			<!-- Tab content -->
			<div class="tab-content">
				{#if activeTab === 'spiegazione'}
				<div class="p-4 bg-neutral-200 rounded-lg">
					{#if norma.spiegazione}
					<p>{norma.spiegazione}</p>
					{:else}
					<p class="text-base-content/70">Nessuna spiegazione disponibile.</p>
					{/if}
				</div>
				{/if}
				
				{#if activeTab === 'massime'}
				<div class="p-4 bg-neutral-200 rounded-lg">
					{#if norma.massime}
					<p>{norma.massime}</p>
					{:else}
					<p class="text-neutral-content/70">Nessuna massima disponibile.</p>
					{/if}
				</div>
				{/if}
			
			{#if activeTab === 'note'}
			<div class="p-4 bg-neutral-200 rounded-lg">
				{#if norma.note}
				<p>{norma.note}</p>
				{:else}
				<p class="text-neutral-content/70">Nessuna nota disponibile.</p>
				{/if}
			</div>
			{/if}
		</div>
		
		<!-- URL Reference -->
		{#if norma.url}
			<div class="mt-4 text-sm">
			<a href={norma.url} class="link link-primary" target="_blank">
				Vedi su Broccardi →
			</a>
			</div>
		{/if}
	</div>
</dialog>

<style>
	/* Scrollbar styling (for Chrome, Edge, and Safari) */
	::-webkit-scrollbar {
		width: 8px;
		height: 8px;
	}

	::-webkit-scrollbar-thumb {
		background-color: #b0b0b0;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: #868686;
	}

	::-webkit-scrollbar-track {
		background-color: #d3cada;
		border-radius: 4px;
	}

	.fade-out {
	opacity: 0;
	transform: translateX(-20px);
	transition: opacity 0.4s ease, transform 0.4s ease;
}
</style>
