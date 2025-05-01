<script lang="ts">
	import Searchicon from '../misc/SearchIcon.svelte';
	import ResultSentenza from './ResultSentenza.svelte';
	import NormaResult from './NormaResult.svelte';
	import { sentenze, norme } from '../projects/ProjectsModule.svelte';

	$: sentenzeList = $sentenze;
	$: normeList = $norme;
</script>

<div
	class="position-items-center h-full w-full rounded-l-xl bg-purple-950 px-4 py-6"
	style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
	<div class="mb-4 text-center">
		<p class="text-xl font-bold text-white">Risultati ricerca</p>
	</div>
	<p class="pb-2 text-lg font-semibold text-white">Norme</p>
	<div class="my-2 w-full overflow-y-auto pr-2" style="min-height: 30%; max-height: 30%;">
		{#if normeList.length > 0}
			{#each normeList as norma}
				<NormaResult {norma} />
			{/each}
		{:else}
			<p class="text-center text-sm text-white">
				Ricerca le norme utili per te dal nostro motore di ricerca e aggiungile al tuo progetto per
				poterle allegare alla chat con LegalIA
			</p>
			<div class="my-2 text-center">
				<a class="btn btn-warning btn-sm rounded-full" href="./search"><Searchicon /></a>
			</div>
		{/if}
	</div>
	<div class="divider"></div>
	<p class="text-lg font-semibold text-white">Giurisprudenza</p>
	<div class="my-2 w-full overflow-y-auto pr-2" style="min-height: 37%; max-height: 37%;">
		{#if sentenzeList.length > 0}
			{#each sentenzeList as sentenza}
				<ResultSentenza {sentenza} />
			{/each}
		{:else}
			<p class="text-center text-sm text-white">
				Ricerca le senteze più adatte al tuo caso dal nostro motore di ricerca e aggiungile al tuo
				progetto per poterle allegare alla chat con LegalIA
			</p>
			<div class="my-2 text-center">
				<a class="btn btn-warning btn-sm rounded-full" href="./search"><Searchicon /></a>
			</div>
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
