<script lang="ts">
    import AttetionPointItem from "./AttetionPointItem.svelte";
	import { attentionPoints } from "./SafeguardModule.svelte";
    $: attentionPointsList = $attentionPoints;
</script>

<div class="bg-purple-950 h-full w-full rounded-l-xl position-items-center py-6 px-4" style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <div class="text-center mb-4 w-full">
        <p class="text-xl font-bold text-white">Punti di attenzione</p>
    </div>
    <div class="overflow-y-auto overflow-x-hidden pr-2" style="min-height: 85%; max-height: 85%;">
		{#each attentionPointsList as attentionPoint}
            <AttetionPointItem {attentionPoint}/>
        {/each}
    </div>
    <div class="w-full text-center">
        <button class="btn btn-warning mt-2">Correggi il testo</button>
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