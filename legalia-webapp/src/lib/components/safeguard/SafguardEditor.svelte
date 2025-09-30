<script lang="ts">
    import { editorText, activeSgProject, projectReady, download_pdf } from './SafeguardModule.svelte';
	import PageSelector from './pageSelector.svelte';
    import { marked } from 'marked';
	import DownloadIcon from '../misc/DownloadIcon.svelte';

	$: activeProject = $activeSgProject;
    $: text = $editorText;
	$: isReady = $projectReady;
</script>

<div
	class="rounded-box mx-8 px-6 py-6 relative"
	style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
    <div class="text-center mb-4 w-full">
        <p class="text-xl font-bold text-white">SafeGuard</p>
    </div>
	<div class="absolute top-0 right-0 mt-6 mr-6 p-0 font-semibold"
		class:tooltip={!isReady}
		data-tip="Correggi prima tutte le pagine del progetto">
		<button class="btn btn-sm btn-warning flex capitalize"
				class:btn-disabled={!isReady}
				on:click={download_pdf}>
			<DownloadIcon /> Scarica PDF
		</button>
	</div>
    <div style="height: 87%;">
        <div class="w-full overflow-y-auto rounded-lg bg-white text-black p-4 min-h-full max-h-full">
            <p class="prose max-w-full">
				{#if text == null}
                	Non esistono progetti Safeguard.
				{:else}
					{@html marked(text.replace(/\\n/g, '\n').replace(/\\\\\\/g, ''))}
				{/if}
			</p>
        </div>
    </div>
	<div class="text-center">
		<div class="join my-2">
			{#if activeProject != null}
				{#each activeProject.pages as page}
					<PageSelector {page}/>
				{/each}
			{/if}
		</div>
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