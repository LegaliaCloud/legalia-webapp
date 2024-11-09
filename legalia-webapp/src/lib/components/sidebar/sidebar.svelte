<script>
	import Fileexplorer from "../fileexplorer/fileexplorer.svelte";
	import Projectitem from "../misc/projectitem.svelte";

    const activeProject = "Client XYZ"
    const projects = [
        "Client XYZ",
        "Legal Case 123456",
        "Contract Review",
    ];
  
    let showDeleteModal = false;
    
    function handleDeleteClick() {
        showDeleteModal = true;
    }
    
    function confirmDelete() {
        // Implement actual delete logic
        showDeleteModal = false;
    }
</script>

<div class="bg-purple-950 text-gray-200 pt-3 px-1 h-full w-full flex flex-col overflow-y-scroll">
    <!-- Projects Section -->
  <div class="flex-1 flex flex-col px-5">
    <ul class="menu w-full mb-2">
      <li class="menu-title text-xl text-purple-100 w-full">I tuoi progetti</li>
      {#each projects as project}
        <li class="my-1"><Projectitem projectname={project} active={project == activeProject}/></li>
      {/each}
    </ul>
  </div>

  <!-- Centered Button -->
  <div class="flex justify-center">
    <button class="btn btn-outline btn-warning">+</button>
  </div>

  <!-- Separator Line -->
  <div class="border-t border-purple-900 my-4"></div>

  <Fileexplorer></Fileexplorer>
  <!-- Centered Button -->
  <div class="flex justify-center mb-2">
    <button class="btn btn-outline btn-warning">+</button>
  </div>
</div>