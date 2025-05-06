<script lang="ts">
	import Fileicon from '../misc/FileIcon.svelte';
	//import Foldericon from "../misc/foldericon.svelte";
	import { onMount } from 'svelte';
	import { files, get_files } from './FilesModule.svelte';
	$: filesList = $files;

	onMount(get_files);
</script>

<ul class="menu menu-xs rounded-lg w-full max-w-xs text-xl">
    
    {#each filesList as file}
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a><Fileicon></Fileicon>{file.name}</a></li>
    {/each}

    <!--<li>
        <details open>
        <summary>
            <Foldericon></Foldericon>
            My Files
        </summary>
        <ul>
            <li>
            <a>
                <Fileicon></Fileicon>
                Project-final.psd
            </a>
            </li>
            <li>
            <a>
                <Fileicon></Fileicon>
                Project-final-2.psd
            </a>
            </li>
            <li>
            <details open>
                <summary>
                <Foldericon></Foldericon>
                Images
                </summary>
                <ul>
                <li>
                    <a>
                   <Fileicon></Fileicon>
                    Screenshot1.png
                    </a>
                </li>
                <li>
                    <a>
                    <Fileicon></Fileicon>
                    Screenshot2.png
                    </a>
                </li>
                <li>
                    <details open>
                    <summary>
                        <Foldericon></Foldericon>
                        Others
                    </summary>
                    <ul>
                        <li>
                        <a>
                            <Fileicon></Fileicon>
                            Screenshot3.png
                        </a>
                        </li>
                    </ul>
                    </details>
                </li>
                </ul>
            </details>
            </li>
        </ul>
        </details>
    </li>
    <li>
        <a>
        <Fileicon></Fileicon>
        reports-final-2.pdf
        </a>
    </li>-->

</ul>

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
