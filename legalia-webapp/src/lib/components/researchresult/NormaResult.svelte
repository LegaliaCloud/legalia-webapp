<script lang="ts">
	import { decodeCodici, type Norma } from './ResearchModule.svelte';

	export let norma: Norma;

	// State for tab management
	let activeTab = 'spiegazione';

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

<div class="my-2 flex w-full items-center rounded-lg border-l-4 transition-colors duration-200">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		on:dblclick={handleOpenModal}
		class="min-w-0 flex-grow rounded-md bg-white px-4 py-3 text-black hover:bg-gray-200"
	>
		<div class="flex items-center justify-between">
			<div>
				<p class="text-md truncate font-medium">
					Art. {norma.articolo}
				</p>
				<p class="text-sm font-semibold">{decodeCodici[norma.codice]}</p>
			</div>
			<!--<button class="btn btn-sm ml-4" on:click={handleOpenModal}>Dettagli</button>-->
		</div>
	</div>
</div>

<dialog id={modalId} class="modal">
	<div class="modal-box max-w-2xl overflow-y-auto bg-white text-black">
		<div class="mb-4 flex items-center justify-between border-b pb-2">
			<h3 class="text-xl font-bold">
				{decodeCodici[norma.codice]} - Art. {norma.articolo}
			</h3>
			<form method="dialog">
				<button class="btn btn-circle btn-ghost btn-sm">✕</button>
			</form>
		</div>

		<!-- Rubrica (Title/Heading) -->
		{#if norma.rubrica}
			<h4 class="mb-3 text-lg font-semibold text-primary">{norma.rubrica}</h4>
		{/if}

		<!-- Main content -->
		<div class="prose mb-4 max-w-full">
			<div class="rounded-lg bg-base-200 bg-neutral-200 p-4 text-black">
				<p>{norma.content}</p>
			</div>
		</div>

		<!-- Additional information in tabs -->
		<div class="tabs-boxed tabs mb-3 bg-neutral-200">
			<button
				class="tab {activeTab === 'spiegazione' ? 'tab-active' : ''}"
				on:click={() => handleTabChange('spiegazione')}
			>
				Spiegazione
			</button>
			<button
				class="tab {activeTab === 'massime' ? 'tab-active' : ''}"
				on:click={() => handleTabChange('massime')}
			>
				Massime
			</button>
			<button
				class="tab {activeTab === 'note' ? 'tab-active' : ''}"
				on:click={() => handleTabChange('note')}
			>
				Note
			</button>
		</div>

		<!-- Tab content -->
		<div class="tab-content">
			{#if activeTab === 'spiegazione'}
				<div class="rounded-lg bg-neutral-200 p-4">
					{#if norma.spiegazione}
						<p>{norma.spiegazione}</p>
					{:else}
						<p class="text-base-content/70">Nessuna spiegazione disponibile.</p>
					{/if}
				</div>
			{/if}

			{#if activeTab === 'massime'}
				<div class="rounded-lg bg-neutral-200 p-4">
					{#if norma.massime}
						<p>{norma.massime}</p>
					{:else}
						<p class="text-neutral-content/70">Nessuna massima disponibile.</p>
					{/if}
				</div>
			{/if}

			{#if activeTab === 'note'}
				<div class="rounded-lg bg-neutral-200 p-4">
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
				<a href={norma.url} class="link-primary link" target="_blank">
					Consulta la fonte ufficiale →
				</a>
			</div>
		{/if}

		<div class="modal-action">
			<form method="dialog">
				<button class="btn btn-primary">Chiudi</button>
			</form>
		</div>
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
