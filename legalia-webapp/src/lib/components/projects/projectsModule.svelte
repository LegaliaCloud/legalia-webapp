<script lang="ts" context="module">
    import { writable } from "svelte/store";

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

    export let projects = writable<Project[]>([]);
    export let activeProjectId = writable<number>();

    export async function get_projects(){
        try{
        const response = await fetch('/project/');
        if(!response.ok){
            let error = `Errore HTTP: ${response.status}`;
            throw new Error(error);
        }
        let responseData:Project[] = await response.json();
        for(let i=0; i<responseData.length;i++){
            if(responseData[i].state=="active"){
                if(i != 0){
                    let temp = responseData[i];
                    responseData[i] = responseData[0];
                    responseData[0] = temp;
                }
                break;
            }
        }
            projects.set(responseData);
        }catch(err){
            console.log(err);
        }
    }

    export async function project_toggle(project_id:number){
    try{
      const response = await fetch(`/project/toggle/${project_id}`);
      if(!response.ok){
      let error = `Errore HTTP: ${response.status}`;
      throw new Error(error);
      }
      activeProjectId.set(project_id);
      get_projects();
    }catch(err){
      console.log(err);
    }
  }

</script>