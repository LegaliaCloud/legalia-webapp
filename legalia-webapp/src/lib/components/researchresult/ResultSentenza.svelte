<script lang="ts">
	import type { Sentenza } from './ResearchModule.svelte';
	import { dateFormat } from '../misc/UsefulFunctions.svelte';

  	export let sentenza:Sentenza;
  	let sentenzaContentModal;
</script>

<!--role="button" tabindex="0" on:dblclick={sentenzaContentModal.showModal()}-->
<div class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 my-2 p-0">
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div on:dblclick={sentenzaContentModal.showModal()} class="flex-grow min-w-0 rounded-md py-3 px-2 bg-white text-black hover:bg-gray-200" style="min-width: 75%;">
      <p class="text-md font-medium truncate text" style="width: 90%">
        {sentenza.description.split(" \n")[0]}
      </p>
      <div class="grid grid-cols-2">
        <div class="col-span-1">
            <p class="text-xs">Data: {dateFormat(sentenza.dep_date).split(" ")[0]}</p>
        </div>
        <div class="col-span-1">
            <p class="text-xs">Numero: {sentenza.number}</p>
        </div>
      </div>
    </div>
</div>

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
      <!-- Main content -->
      <div class="prose max-w-full mb-4">
        <div class="bg-base-200 p-4 rounded-lg bg-neutral-200 text-black">
          <p>{sentenza.content}</p>
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
</style>
