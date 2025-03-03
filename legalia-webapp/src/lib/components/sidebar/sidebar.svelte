<script lang="ts">
	import Fileexplorer from "../fileexplorer/fileexplorer.svelte";
	import Projectitem from "../misc/projectitem.svelte";
  import { onMount } from "svelte";
  import { get_files } from "../fileexplorer/filesFunction.svelte";

  interface Project{
    id:number,
    name:string,
    description:string,
    client:any,
    state:string,
    sentenze:[],
    norme:[],
    chats:[]
  }

  let projects:Project[] = [];

  let newProjectName = "", newProjectClient = "", newProjectDesc = "";
  let create_project_form;

  let newFile;
  let uploadModal;

  async function get_projects(){
    try{
      const response = await fetch('/project/');
      if(!response.ok){
        let error = `Errore HTTP: ${response.status}`;
        throw new Error(error);
      }
      projects = await response.json();
      for(let i=0; i<projects.length;i++){
        if(projects[i].state=="active"){
          if(i != 0){
            let temp = projects[i];
            projects[i] = projects[0];
            projects[0] = temp;
          }
          break;
        }
      }
    }catch(err){
      console.log(err);
    }
  }

  async function create_project(name:string, desc:string, client:string){
    if(name != ""){
      let payload = {"name": name, "description": desc, "client": client};
      newProjectName = "";
      newProjectClient = "";
      newProjectDesc = "";
      try{
        const response = await fetch('/project/add',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(payload)
        });
        if(!response.ok){
          let error = `Errore HTTP: ${response.status}`;
          throw new Error(error);
        }
        get_projects();
      }catch(err){
        console.log(err);
      }
    }
  }

  async function uploadFile() {
      if (!newFile) {
          alert("Seleziona un file prima di caricare!");
          return;
      }

      let formData = new FormData();
      formData.append("file", newFile);
      try{
        const response = await fetch('/files/upload', {
          method: "POST",
          body: formData
        });
        if(!response.ok){
          let error = `Errore HTTP: ${response.status}`;
          throw new Error(error);
        }
        get_files();
      }catch(err){
        alert("Qualcosa è andato storto nell'upload del file. Riprova!");
        console.log(err);
      }

  }

  function handleFileChange(event:Event) {
      const input = event.target as HTMLInputElement;
      if (input.files) {
          newFile = input.files[0];
          console.log("File selezionato:", newFile.name);
      }
  }

  onMount(get_projects);
</script>

<div class="rounded-r-lg text-gray-200 pt-3 px-1 h-full w-full flex flex-col" style="height: 87vh; background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <!-- Projects Section -->
  <div class="flex-1 flex flex-col px-5 overflow-y-auto" style="min-height: 40%; max-height: 40%; max-width:100%;">
    <ul class="menu w-full mb-2">
      <li class="menu-title text-xl text-purple-100 w-full">I tuoi progetti</li>
      {#each projects as project}
        <li class="my-1"><Projectitem id={project.id} projectname={project.name} active={project.state == "active"}/></li>
      {/each}
    </ul>
  </div>
  <div class="flex justify-center my-2">
    <button class="btn btn-sm btn-warning rounded-full" on:click={create_project_form.showModal()}>+</button>
  </div>

  <!-- Separator Line -->
  <div class="border-t border-purple-900 my-4"></div>
  
  <div class="overflow-y-auto">
    <Fileexplorer></Fileexplorer>
  </div>

  <div class="flex justify-center my-2">
    <button class="btn btn-sm btn-warning rounded-full" on:click={uploadModal.showModal()}>+</button>
  </div>
</div>

<!-- Create new project modal -->
<dialog bind:this={create_project_form} class="modal">
  <div class="modal-box bg-white text-black">
    <h3 class="text-lg font-bold">Crea un nuovo progetto</h3>
    <p class="text-sm text-right">Premi ESC per annullare</p>
    <div>
      <div class="w-full my-4">
        <input bind:value={newProjectName} type="text" placeholder="Nome progetto" class="input text-black bg-neutral-200 w-full" required/>
      </div>
      <div class="w-full my-2">
        <textarea bind:value={newProjectDesc} class="textarea text-black bg-neutral-200 w-full" placeholder="Descrizione del progetto"></textarea>
      </div>
      <div class="w-full mt-0 mb-4">
        <input bind:value={newProjectClient} type="text" placeholder="Cliente di riferimento" class="input text-black bg-neutral-200 w-full" />
      </div>
    </div>
    <div class="text-center">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button on:click={create_project(newProjectName, newProjectDesc, newProjectClient)} class="btn bg-purple-950 text-white capitalize">Crea progetto</button>
      </form>
    </div>
  </div>
</dialog>

<!-- Upload file modal-->
<dialog bind:this={uploadModal} class="modal">
  <div class="modal-box bg-white text-black">
      <h3 class="text-lg font-bold">Carica un file dal tuo dispositivo</h3>
      <p class="text-sm text-right">Premi ESC per annullare</p>
      <div class="my-4"><input on:change={handleFileChange} type="file" class="file-input file-input-warning bg-white w-full" /></div>
      <div class="text-center">
          <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button on:click={uploadFile} class="btn bg-purple-950 text-white capitalize">Carica file</button>
          </form>
      </div>
  </div>
</dialog>

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