<script lang="ts">
    import { editorText } from './SafeguardModule.svelte';
    import { marked } from 'marked';

    $: text = $editorText;
</script>

<div
	class="rounded-box mx-8 px-6 py-6"
	style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
    <div class="text-center mb-4 w-full">
        <p class="text-xl font-bold text-white">SafeGuard</p>
    </div>
    <div style="height: 90%;">
        <div class="overflow-y-auto rounded-lg bg-white text-black p-4 min-h-full max-h-full">
            {#if text == null}
                Non esistono progetti Safeguard.
            {:else}
                {@html marked(text)}
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