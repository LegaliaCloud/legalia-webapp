<script lang="ts" context="module">
	import { writable } from "svelte/store";

    interface Chat{
        chat_id:number,
        title:string,
        project_id:number,
        last_update:string
    }

    export let chat_history=writable<Chat[]>([]);

    export function sort_history(history:Chat[]){
        for(let i=1; i<history.length; i++){
            for(let j=(history.length-1);j>=i;j--){
                let date1 = new Date(history[j].last_update).getTime();
                let date2 = new Date(history[j-1].last_update).getTime();
                if(date1 > date2){
                    let temp:Chat = history[j];
                    history[j] = history[j-1];
                    history[j-1] = temp;
                }
            }
        }
    }

    export async function chat_all() {
        let history:Chat[] = [];
        try{
            const response = await fetch('/chat/all');
            if(!response.ok){
                let error = `Errore HTTP: ${response.status}`;
                throw new Error(error);
            }
            let responseData = await response.json();
            responseData.forEach(chat => {
                history=[...history,{
                    chat_id: chat.id,
                    title: chat.title,
                    project_id: chat.project_id,
                    last_update: chat.updated_at
                }];
            });
            sort_history(history);
            chat_history.set(history);
        } catch(err){
            console.log(err.message);
        }
    }
</script>