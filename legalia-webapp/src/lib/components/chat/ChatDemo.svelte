<script lang="ts">
	import UserMsg from './UserMsg.svelte';
	import ChatbotMsg from './ChatbotMsg.svelte';
	import { afterUpdate } from 'svelte';

	export let chat_history_payload: JSON;
	export let first_msg: string = '';

	let user_message: string;
	let loading: boolean;
	let chat_container: HTMLDivElement;

	interface Message {
		sender: number; // 0 = ChatBot | 1 = User
		text: string;
	}

	let history: Message[] = [];
	history[0] = { sender: 0, text: first_msg };

	async function chat(message: string) {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			loading = true;
			user_message = '';
			history = [...history, { sender: 1, text: message }];
			console.log(chat_history_payload);
			try {
				const response = await fetch(`/search/chat?message=${message}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader
					},
					body: JSON.stringify(chat_history_payload)
				});
				if (!response.ok) {
					throw new Error(`Errore HTTP: ${response.status}`);
				}
				let responseData = await response.json();
				history = [...history, { sender: 0, text: responseData.last_message }];
				chat_history_payload = responseData.chat_history;
			} catch (err) {
				history = [...history, { sender: 0, text: 'Troppe richieste. Riprova.' }];
			} finally {
				loading = false;
			}
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

<div
	class="md:4 rounded-box mx-1 my-6 px-2 pb-6 pt-2 shadow-xl sm:mx-4 md:mx-14 md:px-6"
	style="background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
	<div bind:this={chat_container} class="max-h-96 overflow-auto px-2">
		{#each history as msg}
			{#if msg.sender == 0}
				<ChatbotMsg text={msg.text} />
			{:else if msg.sender == 1}
				<UserMsg text={msg.text} />
			{/if}
		{/each}
		{#if loading}
			<ChatbotMsg text={'<span class="loading loading-dots loading-md"></span>'} />
		{/if}
	</div>
	<div class="row-span-1">
		<div class="mt-3 grid grid-cols-10 gap-2">
			<div class="col-span-8 md:col-span-9">
				<input
					type="text"
					bind:value={user_message}
					placeholder="Type here"
					class="input input-bordered input-md w-full rounded-full bg-white text-black"
				/>
			</div>
			<div class="col-span-2 md:col-span-1">
				<button
					on:click={() => chat(user_message)}
					class="btn w-full rounded-full border-green-500 bg-green-500 text-xs text-white hover:border-green-400 hover:bg-green-400"
					>Invia</button
				>
			</div>
		</div>
	</div>
</div>

<style>
	/* Stile della scrollbar (per Chrome, Edge e Safari) */
	::-webkit-scrollbar {
		width: 8px; /* larghezza della scrollbar verticale */
		height: 8px; /* altezza della scrollbar orizzontale */
	}

	/* Stile della "maniglia" della scrollbar */
	::-webkit-scrollbar-thumb {
		background-color: #b0b0b0; /* colore chiaro */
		border-radius: 4px; /* bordi arrotondati */
	}

	/* Al passaggio del mouse sulla scrollbar */
	::-webkit-scrollbar-thumb:hover {
		background-color: #868686; /* leggermente più scuro al passaggio del mouse */
	}

	/* Stile della "traccia" della scrollbar */
	::-webkit-scrollbar-track {
		background-color: #d3cada; /* sfondo ancora più chiaro */
		border-radius: 4px; /* bordi arrotondati */
	}
</style>
