<script lang="ts">
    import Searchicon from "../misc/searchIcon.svelte";
    import ResultSentenza from "./resultSentenza.svelte";
    import NormaResult from "./normaResult.svelte";
    import { sentenze, norme } from "../projects/projectsModule.svelte";

    $:sentenzeList = $sentenze;
    $:normeList = $norme;
</script>
<div class="bg-purple-950 h-full w-full rounded-l-xl position-items-center py-6 px-4" style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <div class="text-center mb-4">
        <p class="text-xl font-bold text-white">Risultati ricerca</p>
    </div>
    <p class="text-lg font-semibold text-white pb-2">Norme</p>
    <div class="overflow-y-auto w-full pr-2 my-2" style="min-height: 30%; max-height: 30%;">
        {#if normeList.length > 0}
            {#each normeList as norma}
                <NormaResult {norma} />
            {/each}
        {:else}
            <p class="text-center text-white text-sm">Ricerca le norme utili per te dal nostro motore di ricerca e aggiungile al tuo progetto per poterle allegare alla chat con LegalIA</p>
            <div class="text-center my-2"><a class="btn btn-sm btn-warning rounded-full" href="./search"><Searchicon /></a></div>
        {/if}
    </div>
    <div class="divider"></div>
    <p class="text-lg font-semibold text-white">Giurisprudenza</p>
    <div class="overflow-y-auto w-full pr-2 my-2" style="min-height: 37%; max-height: 37%;">
        {#if sentenzeList.length > 0}
            {#each sentenzeList as sentenza}
                <ResultSentenza {sentenza}/>
            {/each}
        {:else}
            <p class="text-center text-sm text-white">Ricerca le senteze più adatte al tuo caso dal nostro motore di ricerca e aggiungile al tuo progetto per poterle allegare alla chat con LegalIA</p>
            <div class="text-center my-2"><a class="btn btn-sm btn-warning rounded-full" href="./search"><Searchicon /></a></div>
        {/if}
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
        background-color: #4f1c76;  /* sfondo ancora più chiaro */
        border-radius: 4px;  /* bordi arrotondati */
    }
</style>