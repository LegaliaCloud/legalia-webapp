<script lang='ts' context='module'>
	import { writable, get } from "svelte/store";

    export interface SgProject{
        project_title:string,
        pages:SgPage[]
    }

    export interface SgPage {
        id:number,
        user_id:number,
        project_id:number,
        created_at:string,
        updated_at:string,
        title:string,
        text:string,
        status:string,
        progress:number,
        page:number
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
    export let selectedPage = writable<SgPage>();
    export let editorText = writable<string>();
    export let sgProjects = writable<SgProject[]>([]);
    export let attentionPoints = writable<AttentionPoint[]>([]);
    export let correctionComleted = writable<boolean>();
    export let projectReady = writable<boolean>();
    export let isLoading = writable<boolean>(false);

    export function activateSgProject(project:SgProject){
        activeSgProject.set(project);
        sessionStorage.setItem('currSgProject', project.project_title);
        selectPage(project.pages[0]);
        checkProject();
    }

    export function selectPage(page:SgPage){
        if(page.title == get(activeSgProject).project_title){
            selectedPage.set(page);
            editorText.set(page.text);
            getAttentionPoints(page.id);
        }
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
                    const currProject = sessionStorage.getItem('currSgProject');
                    if(currProject){
                        for(let i = 0; i < responseData.length; i++){
                            if(responseData[i].project_title == currProject){
                                let temp = responseData[0];
                                responseData[0] = responseData[i];
                                responseData[i] = temp;
                                break;
                            }
                        }
                    }
                    activateSgProject(responseData[0]);
                }
                sgProjects.set(responseData);
            } catch(err) {
				console.log(err);
			}
        }
    }

    export async function deleteSgProject(sgProjectTitle:string){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null && sgProjectTitle != get(activeSgProject).project_title) {
            try{
                const response = await fetch(`/safeguard/projects/${sgProjectTitle}/bulk`, {
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
                getAttentionPoints(get(selectedPage).id);
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
                getAttentionPoints(get(selectedPage).id);
            }
        }
    }

    export async function fixText(){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null && get(correctionComleted)) {
            isLoading.set(true);
            try{
                const sgProjectId = get(selectedPage).id;
                const response = await fetch(`/safeguard/projects/${sgProjectId}/fix-text`, {
                    method: 'POST',
                    headers: {
                        Authorization: authHeader
                    },
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                let responseData:SgPage = await response.json();
                await getSgProjects()
                selectPage(responseData);
            } catch(err) {
				console.log(err);
			} finally {
                isLoading.set(false);
            }
        }
    }

    export async function reanalyze(){
        const authHeader = sessionStorage.getItem('authHeader');
        const currPage = get(selectedPage);
		if (authHeader != null && currPage.status === "ready") {
            isLoading.set(true);
            try{
                const response = await fetch(`/safeguard/projects/${currPage.id}/reanalyze`, {
                    method: 'POST',
                    headers: {
                        Authorization: authHeader
                    },
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                let responseData:SgPage = await response.json();
                await getSgProjects()
                selectPage(responseData);
            } catch(err) {
				console.log(err);
			} finally {
                isLoading.set(false);
            }
        }
    }

    export async function download_pdf(){
        const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
            try{
                const currProject = get(activeSgProject);
                const response = await fetch(`/safeguard/projects/${currProject.project_title}/download-pdf`, {
                    method: 'POST',
                    headers: {
                        Authorization: authHeader
                    },
                });
                if(!response.ok){
                    let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
                }
                // Converti la risposta in un Blob
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);

				// Estrai il nome del file dall'header Content-Disposition (se presente)
				const contentDisposition = response.headers.get('content-disposition');
				let fileName = 'download.pdf'; // Nome di default

				if (contentDisposition) {
					const match = contentDisposition.match(/filename="?([^"]+)"?/);
					if (match) {
						fileName = match[1];
					}
				}

				// Crea un link per il download
				const a = document.createElement('a');
				a.href = url;
				a.download = fileName; // Nome del file
				document.body.appendChild(a);
				a.click();

				// Pulizia
				window.URL.revokeObjectURL(url);
				document.body.removeChild(a);
            } catch(err) {
				console.log(err);
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

    function checkProject(){
        const pages = get(activeSgProject).pages;
        let ready = true;
        for(let i = 0; i<pages.length; i++){
            if(pages[i].status === "review"){
                ready = false
                break;
            }
        }
        projectReady.set(ready);
    }
    
    export function makeEvident(startPosition:number, offset:number, state:string){
        let string = get(selectedPage).text
        let text = string.substring(0, startPosition) + '<span style="background-color: ' + stateColors[state] + '">' + 
            string.substring(startPosition, startPosition+offset) + '</span>' +
            string.substring(startPosition+offset, string.length);
        editorText.set(text);
    }
</script>