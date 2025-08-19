<script lang="ts">
	import Fileicon from '../misc/FileIcon.svelte';
	import { onMount } from 'svelte';
  import { files, get_files, delete_file } from './FilesModule.svelte';

	let filesList = [];
	$: filesList = $files;

	onMount(get_files);

	function openDeleteConfirmation(fileId: number) {
		const modal = document.getElementById(`confirmDelete-${fileId}`) as HTMLDialogElement;
		if (modal) modal.showModal();
	}

	function confirmDelete(fileId: number) {
		deleteFile(fileId);
		const modal = document.getElementById(`confirmDelete-${fileId}`) as HTMLDialogElement;
		if (modal) modal.close();
	}

  async function deleteFile(fileId: number) {
    const row = document.getElementById(`file-row-${fileId}`);
    if (row) {
      row.classList.add('fade-out');
      await new Promise(resolve => setTimeout(resolve, 400));
    }
    await delete_file(fileId); // chiamata diretta alla funzione backend
  }


</script>


<ul class="w-full max-w-xs rounded-lg">
  {#each filesList as file}
    <li
      id={"file-row-" + file.id}
class="flex items-center justify-between px-2 py-1 text-sm hover:bg-violet-300/20 transition duration-300 rounded-md"
    >
      <!-- Sinistra: icona + nome -->
      <div class="flex items-center gap-1 overflow-hidden">
        <Fileicon class="w-4 h-4" />
        <span class="truncate text-xs">{file.name}</span>
      </div>

      <!-- Destra: cestino DaisyUI icona sola -->
      <button
        class="text-error hover:text-red-700 transition"
        on:click={() => openDeleteConfirmation(file.id)}
        aria-label="Elimina"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3M1 7h22" />
        </svg>
      </button>

      <!-- Modale conferma -->
      <dialog id={"confirmDelete-" + file.id} class="modal">
        <div class="modal-box bg-white text-black">
          <h3 class="font-bold text-lg">Conferma eliminazione</h3>
          <p class="py-4">Vuoi eliminare <strong>{file.name}</strong>?</p>
          <div class="modal-action">
            <form method="dialog" class="space-x-2">
              <button class="btn" type="submit">Annulla</button>
              <button class="btn btn-error" type="button" on:click={() => confirmDelete(file.id)}>Elimina</button>
            </form>
          </div>
        </div>
      </dialog>
    </li>
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

    	.fade-out {
		opacity: 0;
		transform: translateX(-20px);
		transition: opacity 0.4s ease, transform 0.4s ease;
	}
</style>
