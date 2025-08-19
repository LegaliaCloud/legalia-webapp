<script lang="ts">
    import SgProgectItem from "./SgProgectItem.svelte";
    import { sgProjects, getSgProjects, activeSgProject } from "./SafeguardModule.svelte";
	import { onMount } from "svelte";
	
	$: activeProject = $activeSgProject;
    $: projects = $sgProjects;

    onMount(getSgProjects)
</script>

<div
	class="rounded-r-lg text-white px-1 h-full w-full flex flex-col py-6 px-4"
	style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
    <div class="text-center mb-4 w-full">
        <p class="text-xl font-bold text-white">Progetti SafeGuard</p>
    </div>
    <div class="overflow-y-auto overflow-x-hidden pr-2" style="min-height: 95%; max-height: 95%;">
		{#each projects as project}
            <SgProgectItem {project} active={project.id == activeProject.id}></SgProgectItem>
        {/each}
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