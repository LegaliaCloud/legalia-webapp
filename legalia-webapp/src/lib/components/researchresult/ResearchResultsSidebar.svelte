<script lang="ts">
    import Searchicon from "../misc/SearchIcon.svelte";
    import ResultSentenza from "./ResultSentenza.svelte";
    import NormaResult from "./NormaResult.svelte";
    import { sentenze, norme, get_norme_sentenze} from "../projects/ProjectsModule.svelte";
	import { onMount } from "svelte";

    $:sentenzeList = $sentenze;
    $:normeList = $norme;
    
    let authHeader:string = '';

    onMount(() => {
        if(sessionStorage.getItem("authHeader") != null){
            authHeader = sessionStorage.getItem("authHeader");
        }
    });
</script>
<div class="bg-purple-950 h-full w-full rounded-l-xl position-items-center py-6 px-4" style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <div class="text-center mb-4 relative">
        <p class="text-xl font-bold text-white">Risultati ricerca</p>
        <button on:click={get_norme_sentenze(authHeader)} class="btn btn-xs absolute top-1 right-0 rounded-full text-white bg-transparent border-transparent hover:btn-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
            </svg>
        </button>
    </div>
    <div class="flex">
        <p class="text-lg font-semibold text-white mr-2 pb-2">Norme</p>
        {#if normeList.length > 0}
            <a class="btn btn-sm btn-warning rounded-full" href="./search"><Searchicon /></a>
        {/if}
    </div>
    <div class="overflow-y-auto overflow-x-hidden w-full pr-2 my-2" style="min-height: 30%; max-height: 30%;">
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
    <div class = "flex">
        <p class="text-lg font-semibold text-white mx-2">Giurisprudenza</p>
        {#if sentenzeList.length > 0}
            <a class="btn btn-sm btn-warning rounded-full" href="./search"><Searchicon /></a>
        {/if}
    </div>
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