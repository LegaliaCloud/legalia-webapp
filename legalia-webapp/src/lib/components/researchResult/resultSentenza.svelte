<script lang="ts">
  import type { Sentenza } from "./researchModule.svelte";
  import { dateFormat } from "../misc/usefulFunctions.svelte";

  export let sentenza:Sentenza;
  //let sentenzaContentModal;
</script>
<!--role="button" tabindex="0" on:dblclick={sentenzaContentModal.showModal()}-->
<div class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 my-2 p-0">
    <div class="flex-grow min-w-0 rounded-md py-3 px-2 bg-white text-black hover:bg-gray-200" style="min-width: 75%;">
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

<!--<dialog bind:this={sentenzaContentModal} class="modal">
  <div class="rounded-lg bg-white text-black" style="width:75%;max-height: 75vh;">
    <div class="px-10 pt-10">
      <h1 class="text-lg font-bold mb-4">{sentenza.description}</h1>
      <div class="overflow-y-scroll pr-4 text-justify" style="max-height: 300px">
        {@html sentenza.content.replace(/\n/g, "<br>")}
      </div>
    </div>
    <div><p class="text-sm text-center my-5">Premi ESC per uscire</p></div>
  </div>
</dialog>-->

<style>
  /* Stile della scrollbar (per Chrome, Edge e Safari) */
  ::-webkit-scrollbar {
      width: 8px;  /* larghezza della scrollbar verticale */
      height: 8px; /* altezza della scrollbar orizzontale */
      }
      
  /* Stile della "maniglia" della scrollbar */
  ::-webkit-scrollbar-thumb {
      background-color: #b0b0b0;  /* colore chiaro */
      border-radius: 4px;  /* bordi arrotondati */
  }
      
  /* Al passaggio del mouse sulla scrollbar */
  ::-webkit-scrollbar-thumb:hover {
      background-color: #868686;  /* leggermente più scuro al passaggio del mouse */
  }
      
  /* Stile della "traccia" della scrollbar */
  ::-webkit-scrollbar-track {
      background-color: #d3cada;  /* sfondo ancora più chiaro */
      border-radius: 4px;  /* bordi arrotondati */
  }
</style>