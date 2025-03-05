<script lang="ts">
    import UserMsg from "./user-msg.svelte";
    import ChatbotMsg from "./chatbot-msg.svelte";
    import { afterUpdate } from 'svelte';

    export let chat_history_payload;
    export let first_msg:string = '';
    
    let user_message:string;
    let loading:boolean;
    let chat_container;

    interface Message {
        sender:number, // 0 = ChatBot | 1 = User 
        text:string
    };

    let history:Message[] = [];
    history[0] = {sender:0, text: first_msg};

    async function chat(message: string){
        loading = true;
        user_message = "";
        history = [...history, {sender:1, text:message}]
        console.log(chat_history_payload);
        try {
            const response = await fetch(`/search/chat?message=${message}`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(chat_history_payload)
            });
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);          
            }
            let responseData = await response.json();
            history = [...history, {sender:0, text: responseData.last_message}]
            chat_history_payload = responseData.chat_history;
        } catch (err) {
            history = [...history, {sender:0, text: 'Troppe richieste. Riprova.'}]
        } finally {
            loading = false;
        }
    }

    // Funzione per scorrere automaticamente alla fine della chat
    function scrollToBottom() {
        if (chat_container) {
            chat_container.scrollTop = chat_container.scrollHeight;
        }
    }

    // Esegui lo scroll alla fine quando la chat è aggiornata
    afterUpdate(() => {
        scrollToBottom();
    });
</script>

<div class="rounded-box md:mx-14 sm:mx-4 mx-1 my-6 md:4 md:px-6 pt-2 pb-6 px-2 shadow-xl" style="background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <div bind:this={chat_container} class="max-h-96 overflow-auto px-2">
    {#each history as msg}
        {#if msg.sender == 0}
            <ChatbotMsg text={msg.text}/>
        {:else if msg.sender == 1}
            <UserMsg text={msg.text}/>
        {/if}
    {/each}
    {#if loading}
        <ChatbotMsg text={'<span class="loading loading-dots loading-md"></span>'}/>
    {/if}
    </div>
    <div class="row-span-1">
        <div class = "grid grid-cols-10 gap-2 mt-3">
          <div class="md:col-span-9 col-span-8">
              <input type="text" bind:value={user_message} placeholder="Type here" class="input input-md input-bordered w-full bg-white text-black rounded-full" />
          </div>
          <div class="md:col-span-1 col-span-2">
              <button on:click={chat(user_message)} class="btn w-full bg-green-500 border-green-500 text-white hover:bg-green-400 hover:border-green-400 text-xs rounded-full">Invia</button>
          </div>     
        </div>
    </div>
</div>