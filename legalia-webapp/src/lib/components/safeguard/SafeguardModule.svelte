<script lang='ts' context='module'>
	import { writable, get } from "svelte/store";
	import AttentionPoints from "./AttentionPoints.svelte";

    export interface SgProject {
        id:number,
        user_id:number,
        project_id:number,
        created_at:string,
        updated_at:string,
        title:string,
        text:string,
        status:string,
        progress:number
    }

    export interface AttentionPoint {
        id:number,
        sg_project_id:number,
        text:string,
        start_position:number,
        offset:number,
        kind:string,
        state:string
    }

    export const decodeAttentionPointKind: Record<string, string> = {
        D: 'Riferimento a una data',
        RC: 'Riferimento ai codici normativi italiani',
        RS: 'Riferimento a vecchie sentenze in corso o terminate',
        U: 'Riferimento a un URL',
        RE: 'Riferimenti a fonti, dati, documenti, media diversi da norme o sentnze'
    }

    export const stateColors: Record<string, string> = {
        human_validated: 'lightgreen',
        discard: 'red',
        not_validated: 'yellow'  
    }

    export let activeSgProject = writable<SgProject>();
    export let editorText = writable<string>();
    export let sgProjects = writable<SgProject[]>([]);
    export let attentionPoints = writable<AttentionPoint[]>([]);
    export let correctionComleted = writable<boolean>();

    export function activateSgProject(project:SgProject){
        activeSgProject.set(project);
        editorText.set(project.text);
        getAttentionPoints(project.id);
    }

    export async function getSgProjects(){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
            try{
                const response = await fetch('/safeguard/projects/?skip=0&limit=100', {
                    method: 'GET',
                    headers: {
                        Authorization: authHeader
                    }
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                let responseData:SgProject[] = await response.json();
                if(responseData.length > 0){
                    let activeProject = get(activeSgProject);
                    if(activeProject != null){
                        for(let i = 0; i < responseData.length; i++){
                            if(responseData[i].id == activeProject.id){
                                let temp = responseData[0];
                                responseData[0] = responseData[i];
                                responseData[i] = temp;
                                break;
                            }
                        }
                    } else {
                        activateSgProject(responseData[0]);
                    }
                }
                sgProjects.set(responseData);
            } catch(err) {
				console.log(err);
			}
        }
    }

    export async function deleteSgProject(sgProjectId:number){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null && sgProjectId != get(activeSgProject).id) {
            try{
                const response = await fetch(`/safeguard/projects/${sgProjectId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: authHeader
                    }
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                getSgProjects();
            }catch(err){
                console.log(err);
            }
        }
    }
    
    export async function getAttentionPoints(sgProjectId:number){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
            try{
                const response = await fetch(`/safeguard/projects/${sgProjectId}/attention-points/?skip=0&limit=100`, {
                    method: 'GET',
                    headers: {
                        Authorization: authHeader
                    }
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                let responseData:AttentionPoint[] = await response.json();
                attentionPoints.set(responseData);
                checkAttentionPoints();
                console.log(responseData);
            } catch(err) {
				console.log(err);
			}
        }
    }

    export async function updateAttentionPoint(attentionPoint:AttentionPoint, newState:string){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
            let payload = {
                text: attentionPoint.text,
                start_position: attentionPoint.start_position,
                offset: attentionPoint.offset,
                state: newState,
                kind: attentionPoint.kind
            };
            try{
                const response = await fetch(`/safeguard/attention-points/${attentionPoint.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: authHeader
                    },
                    body: JSON.stringify(payload)
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                getAttentionPoints(get(activeSgProject).id);
            } catch(err) {
				console.log(err);
			}
        }
    }

    export async function deleteAttentionPoint(id:number){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
            try{
                const response = await fetch(`/safeguard/attention-points/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: authHeader
                    },
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
            } catch(err) {
				console.log(err);
			} finally {
                getAttentionPoints(get(activeSgProject).id);
            }
        }
    }

    export function checkAttentionPoints(){
        let attentionPointsList = get(attentionPoints);
        if(attentionPointsList.length > 0){
            let completed = true;
            for(let i=0; i<attentionPointsList.length; i++){
                if(attentionPointsList[i].state == "not_validated"){
                    completed = false;
                    break;
                }
            }
            correctionComleted.set(completed);
        }
    }
    
    export function makeEvident(startPosition:number, offset:number, state:string){
        let string = get(activeSgProject).text
        let text = string.substring(0, startPosition) + '<span style="background-color: ' + stateColors[state] + '">' + 
            string.substring(startPosition, startPosition+offset) + '</span>' +
            string.substring(startPosition+offset, string.length);
        editorText.set(text);
    }
</script>