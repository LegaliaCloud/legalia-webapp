<script lang="ts" context="module">
    import { writable } from "svelte/store";
    import { chat_all } from "../chat/chatHistoryModule.svelte";
    import type { Sentenza, Norma } from "../researchResult/researchModule.svelte";

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
    export let norme = writable<Norma[]>([]);
    export let sentenze = writable<Sentenza[]>([]);
    let activeProjectId:number;

    export async function get_projects(){
        const authHeader = sessionStorage.getItem('authHeader');
        if(authHeader != null){
            try{
                const response = await fetch('/project/',{
                    headers:{
                        'Authorization': authHeader
                    }
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
                    throw new Error(error);
                }
                let responseData:Project[] = await response.json();
                for(let i=0; i<responseData.length;i++){
                    if(responseData[i].state=="active"){
                        activeProjectId = responseData[i].id;
                        if(i != 0){
                            let temp = responseData[i];
                            responseData[i] = responseData[0];
                            responseData[0] = temp;
                        }
                        break;
                    }
                }
                projects.set(responseData);
                if(responseData.length > 0){
                    get_norme_sentenze(authHeader);
                }
            }catch(err){
                console.log(err);
            }
        }
    }

    export async function project_toggle(project_id:number){
        const authHeader = sessionStorage.getItem('authHeader');
        if(authHeader != null){
            try{
                const response = await fetch(`/project/toggle/${project_id}`,{
                    headers: {'Authorization': authHeader}
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
                    throw new Error(error);
                }
                await get_projects();
                chat_all();
            }catch(err){
                console.log(err);
            }
        }
    }

    async function get_active_project(id:number, authHeader:string){
        try{
            const response = await fetch(`/project/${id}`, {
                    headers:{
                        'Authorization': authHeader
                    }
            });
            if(!response.ok){
                let error = `Errore HTTP: ${response.status}`;
                throw new Error(error);
            }
            return await response.json();
        } catch(err){
            console.log(err);
            return null;
        }

    }

    async function get_sentenza_document(document_id: number, authHeader:string){
        try {
            const response = await fetch(`/search/document/${document_id}`, {
                headers:{
                    'Authorization': authHeader
                }
            });
            if (!response.ok) {
                let error = `Errore HTTP: ${response.status}`;
                throw new Error(error);
            }
            let sentenza = await response.json();
            return {ok: true, doc: sentenza};
        } catch (err) {
            console.log(err);
            return {ok: false,doc: null};
        }
    }

    async function get_norma_document(document_id: number, authHeader:string){
        try {
            const response = await fetch(`/search/norme/${document_id}`,{
                headers: {
                    'Authorization': authHeader
                }
            });
            if (!response.ok) {
                let error = `Errore HTTP: ${response.status}`;
                throw new Error(error);
            }
            let norma = await response.json();
            return {ok: true, doc: norma};
        } catch (err) {
            console.log(err);
            return {ok: false,doc: null};
        }
    }

    async function get_norme_sentenze(authHeader:string){
        let sentenzeList:Sentenza[] = [];
        let normeList:Norma[] = [];
        const activeProject = await get_active_project(activeProjectId, authHeader);
        if(activeProject != null){
            for(let i=0; i<activeProject.sentenze.length;i++){
                const response = await get_sentenza_document(activeProject.sentenze[i], authHeader);
                if(response.ok){
                    sentenzeList = [...sentenzeList, response.doc];
                }
            }
            for(let i=0; i<activeProject.norme.length;i++){
                const response = await get_norma_document(activeProject.norme[i], authHeader);
                if(response.ok){
                    normeList = [...normeList, response.doc];
                }
            }
        }
        sentenze.set(sentenzeList);
        norme.set(normeList);
    }

</script>