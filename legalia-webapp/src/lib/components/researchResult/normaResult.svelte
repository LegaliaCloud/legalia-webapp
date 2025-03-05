<script lang="ts">
    import { decode_codici, type Norma } from "./researchModule.svelte";
  
    export let norma:Norma;

  </script>
  <div class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 my-2 p-0">
      <div class="flex-grow min-w-0 rounded-md py-3 px-2 bg-white text-black hover:bg-gray-200" style="min-width: 75%;">
        <p class="text-md font-medium truncate text" style="width: 90%">
          Art. {norma.articolo}
        </p>
        <div class="grid grid-cols-2">
            <p class="text-sm font-semibold">{decode_codici[norma.codice]}</p>      
        </div>
      </div> 
  </div>
  
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