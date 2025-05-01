<script lang="ts">
	import Dotsicon from "../misc/DotsIcon.svelte";
  import { project_toggle } from "./ProjectsModule.svelte";

  export let id:number;
  export let projectname: string;
  export let active: boolean;
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
  <div class="dropdown dropdown-end dropdown-active pr-2 pt-1">
      <div tabindex="0" role="button" class="btn btn-ghost btn-xs h-full hover:no-animation hover:bg-transparent" style="padding: 0">
        <Dotsicon />
      </div>
      <ul class="dropdown-content menu shadow bg-purple-200 rounded-box w-44 z-[2]">
        <li><p class="text-purple-950 hover:text-purple-100 hover:bg-purple-800">Rinomina progetto</p></li>
        {#if !active}
          <li><button on:click={()=>project_toggle(id)} class="text-purple-950 hover:text-purple-100  hover:bg-purple-800">Attiva progetto</button></li>
        {/if}
        <li><button class="btn btn-error text-center align-middle">Elimina progetto</button></li>
      </ul>
    </div>
</div>