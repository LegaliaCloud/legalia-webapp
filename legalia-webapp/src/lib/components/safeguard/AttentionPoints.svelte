<script lang="ts">
    import AttetionPointItem from "./AttetionPointItem.svelte";
	import { attentionPoints, correctionComleted, selectedPage, fixText, reanalyze, isLoading } from "./SafeguardModule.svelte";
    $: attentionPointsList = $attentionPoints;
	$: completed = $correctionComleted;
	$: currentPage = $selectedPage;
	$: loading = $isLoading;
</script>

<div class="bg-purple-950 h-full w-full rounded-l-xl position-items-center py-6 px-4" style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <div class="text-center mb-2 w-full">
        <p class="text-xl font-bold text-white">Punti di attenzione</p>
    </div>
    <div class="overflow-y-auto overflow-x-hidden pr-2" style="min-height: 82%; max-height: 82%;">
		{#each attentionPointsList as attentionPoint}
            <AttetionPointItem {attentionPoint}/>
        {/each}
    </div>
    <div class="w-full text-center">
		{#if  currentPage}
			{#if currentPage.status === "review"}
				<button
					class="btn btn-warning mt-2 {!completed || loading ? 'btn-disabled' : ''}"
					on:click={fixText}
				>
					{#if loading}
						<span class="loading loading-spinner"></span>Sto correggendo...
					{:else}
						Correggi il testo
					{/if}
				</button>
			{:else}
				<button
					class="btn btn-warning mt-2 {loading ? 'btn-disabled' : ''}"
					on:click={reanalyze}
				>
					{#if loading}
						<span class="loading loading-spinner"></span>Sto analizzando...
					{:else}
						Esegui nuova analisi
					{/if}
				</button>
				<p class="text-xs text-white mt-1">Correzioni totali effettuate: {currentPage.progress + 1}</p>
			{/if}
		{/if}
    </div>
</div>

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