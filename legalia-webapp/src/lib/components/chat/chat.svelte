<script lang="ts">
  import UserMsg from "./user-msg.svelte";
  import ChatbotMsg from "./chatbot-msg.svelte";
  import NewChatIcon from "../misc/newChatIcon.svelte";
  import Sendicon from "../misc/sendicon.svelte";
  import Paperclipicon from "../misc/paperclipicon.svelte";
  import Removeatteachedicon from "../misc/removeatteachedicon.svelte";
  import { files } from "../fileexplorer/filesFunction.svelte";
  import { afterUpdate } from 'svelte';
  import { onMount } from "svelte";

  interface Message {
        sender:number, // 0 = ChatBot | 1 = User 
        text:string
  };

  interface Chat{
        chat_id:number,
        title:string,
        project_id:number,
        last_update:string
  }

  interface Atteached {
    senstenze_ids:number[],
    norme_ids:number[],
    file_ids:number[]
  }

  let atteached: Atteached = {
    senstenze_ids: [],
    norme_ids: [],
    file_ids: []
  };
  $: filesList = $files;

  let  user_message:string = "", chat_title = "Nuova Chat";
  let chat:Message[] = [];
  let history:Chat[] = [];
  let active_chat:number = -1;
  let chatbot_loading:boolean = false;

  async function load_chat(chat_id:number){
    chat = [];
    try{
      const response = await fetch(`/chat/get/${chat_id}`);
      if(!response.ok){
          let error = `Errore HTTP: ${response.status}`;
          throw new Error(error);
      }
      let responseData = await response.json();
      responseData.messages.forEach(message=>{
        let msgSender:number=-1;
        if(message.sender == 'assistant'){
          msgSender = 0;
        } else if(message.sender == 'user'){
          msgSender = 1;
        }
        if(msgSender != -1){
          chat=[...chat, {sender: msgSender, text: message.text}];
        }
      });
      active_chat = chat_id;
      atteached.norme_ids = [];
      atteached.senstenze_ids = [];
      atteached.file_ids = [];
    }catch(err){
      chat=[...chat, {sender: 0, text: "Qualcosa è andato storto nel ricaricare la chat. Riprova."}];
      console.log(err);
    }
  }

  async function chat_all() {
    history = [];
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
        sort_history();
    } catch(err){
        console.log(err.message);
    }
  }

  async function use_chat(msg:string){
    if(msg != "" && !chatbot_loading){
      user_message = "";
      chatbot_loading = true;
      chat = [...chat, {sender:1, text:msg}];
      let chatbot_msg = "";
      if(chat_title == ""){
        chat_title = "Nuova Chat";
      }
      if(chat.length == 1){
        try{
          const response = await fetch(`/chat/create/?title=${chat_title}`);
          if(!response.ok){
            let error = `Errore HTTP: ${response.status}`;
            throw new Error(error);
          }
          let responseData = await response.json();
          active_chat = responseData.chat_id;
          chat_title = "Nuova Chat";
          chat_all();
        }catch (err){
          console.log(err.message);
          chatbot_msg = "Qualcosa è andato storto! Riprova.";
          chat = [...chat, {sender: 0, text: chatbot_msg}];
          chatbot_loading = false;
        }
      }

      if(active_chat != -1){
        try{
          const response = await fetch(`/chat/complete?last_message=${msg}&chat_id=${active_chat}`,
          {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(atteached)
          });
          if(!response.ok){
            let error = `Errore HTTP: ${response.status}`;
            throw new Error(error);
          }
          let responseData = await response.json();
          chatbot_msg = responseData.response;
          atteached.norme_ids = [];
          atteached.senstenze_ids = [];
          atteached.file_ids = [];
        } catch (err){
          console.log(err.message);
          chatbot_msg = "Troppe richieste! Riprova.";
        } finally {
          chatbot_loading = false;
          chat = [...chat, {sender: 0, text: chatbot_msg}];
        }
      }
    }
  }

  function allega_file(file_id:number){
    atteached.file_ids = [...atteached.file_ids, file_id];
  }

  function remove_file(file_id:number){
    atteached.file_ids = atteached.file_ids.filter(id => id !== file_id);
  }

  function sort_history(){
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

  function dateFormat(dateString:string){
      let dateNtime = dateString.split('T');
      let date = dateNtime[0].split('-');
      let time = dateNtime[1].split(':');
      time.pop();
      return date[2]+"/"+date[1]+"/"+date[0]+" "+time.join(':');
  }

  onMount(chat_all);

  let chat_container, atteachedModal;
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

<div class="mx-8 px-3 py-4 rounded-box" style="height: 72%; background: linear-gradient(170deg, #3b0764 30%, #712da4);">
  <div class="relative h-full">
    <div bind:this={chat_container} class="absolute top-2 overflow-y-auto px-1" style="width: 100%; height:80%;">
      {#if chat.length == 0}
      <div class="text-center text-white mt-2 mx-12">
        <div class="avatar">
          <div class="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
            <img alt="AI-avatar" src="./img/AI.png" />
          </div>
        </div>
        <h1 class="text-xl font-bold">Ciao sono LegalIA, come posso aiutarti?</h1>
        <p class="text-sm my-4">
          LegalIA può aiutarti con il tuo lavoro nell' ambito legale. Lascia che
          generi dei riassunti per i tuoi documenti, ti aiuti a
          trovare le norme più rilevanti, generi per te dei pareri e
          molto altro.
        </p>
        <h2 class="text-md font-bold">Inizia subito! Crea una nuova chat o carica una chat dalla cronologia.</h2>
        <fieldset class="fieldset mt-2">
          <legend class="fieldset-legend text-xs mb-1 font-bold">Titolo nuova chat</legend>
          <input bind:value={chat_title} type="text" class="input input-sm bg-white text-black" placeholder="Type here" />
        </fieldset>
      </div>
      {:else}
        {#each chat as msg}
          {#if msg.sender == 0}
            <ChatbotMsg text={msg.text}/>
          {:else}
            <UserMsg text={msg.text}/>
          {/if}
        {/each}
        {#if chatbot_loading}
          <ChatbotMsg text={'<span class="loading loading-dots loading-md"></span>'}/>
        {/if}
      {/if}
    </div>
    <div class="absolute bottom-0 w-full">
      <div class = "w-full grid grid-cols-12 gap-2 mt-3">
        <div class="relative">
          <button on:click={atteachedModal.showModal()} class="btn w-full border-green-200 bg-green-200 text-black rounded-full hover:bg-green-400 hover:border-green-400"><Paperclipicon /></button>
          {#if (atteached.norme_ids.length + atteached.senstenze_ids.length + atteached.file_ids.length) > 0}
            <div class="badge badge-secondary absolute top-0 right-0">{atteached.norme_ids.length + atteached.senstenze_ids.length + atteached.file_ids.length}</div>
          {/if}
        </div>
        <div class="col-span-10">
          {#if !chatbot_loading}
            <input type="text" bind:value={user_message} placeholder="Scrivi qui il tuo messaggio..." class="input input-md input-bordered w-full bg-white text-black rounded-full" />
          {:else}
            <input type="text" bind:value={user_message} placeholder="Scrivi qui il tuo messaggio..." class="input input-md input-bordered w-full bg-white text-black rounded-full" disabled/>
          {/if}
        </div>
        <div class="col-span-1">
          <button on:click={use_chat(user_message)} class="btn w-full border-green-500 bg-green-200 text-black rounded-full hover:bg-green-400 hover:border-green-400"><Sendicon/></button>
        </div>   
      </div>
    </div>
  </div>
</div>

<div class="divider divider-purple-950 text-purple-950 mx-3">Storico conversazioni<button on:click={() => {chat = []}} class="btn btn-xs bg-purple-950 text-white tooltip capitalize" data-tip="New Chat"><NewChatIcon /></button></div>

<div class="flex max-w-full overflow-x-auto">
  {#each history as chat}
      <div class="bg-purple-950 mx-8 py-2 px-4 rounded-box min-w-52 max-w-52 mb-1" style=" background: linear-gradient(170deg, #3b0764 30%, #712da4);">
          <div class="text-center text-white truncate">
              <p class="font-bold">{chat.title}</p>
              <p class="text-sm">{dateFormat(chat.last_update)}</p>
              <div class="py-1">
                  <button on:click={load_chat(chat.chat_id)} class="btn btn-sm capitalize bg-green-200 border-green-200 text-black rounded-full hover:bg-green-400 hover:border-green-400">Carica</button>
              </div>          
          </div>
      </div>
  {/each}
</div>

<dialog bind:this={atteachedModal} class="modal">
  <div class="modal-box bg-white text-black">
      <h3 class="text-lg font-bold">Allega file, norme e sentenze</h3>
      <p class="text-sm text-right">Premi ESC per uscire</p>
      <div class="w-full">
        <div>
          <h4 class="font-bold">File</h4>
          {#each filesList as file}
            <div class="ml-5">
              <div class="flex gap-2 my-2">
                {#if !atteached.file_ids.includes(file.id)}
                  <div><button on:click={allega_file(file.id)} class="btn btn-xs bg-purple-950 border-purple-950 text-white capitalize tooltip" data-tip="Allega"><Paperclipicon /></button></div>
                {:else}
                  <div><button on:click={remove_file(file.id)} class="btn btn-xs btn-error text-white capitalize tooltip" data-tip="Rimuovi allegato"><Removeatteachedicon /></button></div>
                {/if}
                <div class="py-auto"><p class="font-bold text-sm">{file.name}</p></div>
              </div>
            </div>
          {/each}
        </div>
        <div class="divider"></div>
        <div>
          <h4 class="font-bold">Norme</h4>
        </div>
        <div class="divider"></div>
        <div>
          <h4 class="font-bold">Sentenze</h4>
        </div>
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
      background-color: #d3cada;  /* sfondo ancora più chiaro */
      border-radius: 4px;  /* bordi arrotondati */
  }
</style>