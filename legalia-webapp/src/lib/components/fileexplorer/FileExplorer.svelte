<script lang="ts">
	import Fileicon from '../misc/FileIcon.svelte';
	//import Foldericon from "../misc/foldericon.svelte";
	import { onMount } from 'svelte';
	import { files, get_files } from './FilesModule.svelte';
	$: filesList = $files;

	onMount(get_files);
</script>

<div class="flex flex-1 flex-col pl-5" style="min-height: 50%;">
	<ul class="menu menu-xs w-full max-w-xs rounded-lg text-xl">
		<li class="menu-title mb-5 text-xl text-purple-100">I tuoi file</li>

		{#each filesList as file}
			<!-- svelte-ignore a11y-missing-attribute -->
			<li><a><Fileicon></Fileicon>{file.name}</a></li>
		{/each}
		<!--
    <li>
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
</div>
