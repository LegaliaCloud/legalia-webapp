<script lang="ts">
	import Dotsicon from "./dotsicon.svelte";

    export let projectname: string;
    export let active: boolean
  </script>
  
  <div
  class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 p-0
  {active ? 'border-green-400 bg-green-700  hover:bg-green-400' : 'border-purple-300 bg-purple-600 hover:bg-purple-700'}"
  >
    <div class="flex-grow min-w-0 rounded-md py-3 bg-purple-900" style="min-width: 75%;">
      <p class="text-gray-100 text-md font-medium truncate pl-2 text" style="width: 90%">
        {projectname}
      </p>
    </div>  
    <div class="dropdown dropdown-end dropdown-hover pr-2 pt-1">
        <div tabindex="0" role="button" class="btn btn-ghost btn-xs h-full hover:no-animation hover:bg-transparent" style="padding: 0">
          <Dotsicon />
        </div>
        <ul class="dropdown-content z-[1] menu shadow bg-purple-200 rounded-box w-44">
          <li><a class="text-purple-950 hover:text-purple-100 hover:bg-purple-800">Rinomina progetto</a></li>
          <li><a class="text-purple-950 hover:text-purple-100  hover:bg-purple-800"> {active ? 'Disattiva progetto': 'Attiva progetto'}</a></li>
          <li><button class="btn btn-error text-center align-middle" onclick="confirm_delete_modal.showModal()">Elimina progetto</button>
        </li>
        </ul>

        <dialog id="confirm_delete_modal" class="modal">
            <div class="modal-box  bg-purple-300 text-black">
              <form method="dialog">
                    <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
              <h3 class="text-lg font-bold">Eliminazione del porgetto</h3>
              <p class="py-4">Sicuro di voler eliminare il progetto. Questa operazione è irriversibile</p>
              <form method="dialog">
                <button class="btn btn-error">Conferma</button>
              </form>
            </div>
            <form method="dialog" class="modal-backdrop">
              <button>Annulla</button>
            </form>
        </dialog>
      </div>
  </div>