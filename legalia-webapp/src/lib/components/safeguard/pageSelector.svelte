<script lang='ts'>
    import { selectPage, selectedPage } from "./SafeguardModule.svelte";
    import type { SgPage } from "./SafeguardModule.svelte";
    import WarningIcon from "../misc/WarningIcon.svelte";

    export let page:SgPage;
    $:currentPage = $selectedPage;
</script>

{#if page}
    <button class="join-item btn btn-sm flex"
        class:btn-warning={page.id === currentPage.id} 
        class:tooltip={page.status === 'review'}
        data-tip='Pagina non corretta'
        on:click={selectPage(page)}>
        {#if page.status === 'review'}
            <WarningIcon />  
        {/if}
        {page.page}
    </button>
{/if}