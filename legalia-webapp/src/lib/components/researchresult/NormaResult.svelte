<script lang="ts">
	import { decodeCodici, type Norma } from "./ResearchModule.svelte";
	
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
</script>

<div class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 my-2">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div on:dblclick={handleOpenModal} class="flex-grow min-w-0 rounded-md py-3 px-4 bg-white text-black hover:bg-gray-200">
		<div class="flex justify-between items-center">
		<div class="w-full">
			<p class="text-md font-medium truncate">
			Art. {norma.articolo} {norma.codice}
			</p>
			<p class="text-xs truncate mr-1" style="width:90%">Rubrica: {norma.rubrica}</p>
		</div>
			<!--<button class="btn btn-sm ml-4" on:click={handleOpenModal}>Dettagli</button>-->
		</div>
	</div>
</div>

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
</style>
