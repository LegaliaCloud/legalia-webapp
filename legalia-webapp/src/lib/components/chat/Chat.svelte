<script lang="ts">
	import UserMsg from './UserMsg.svelte';
	import ChatbotMsg from './ChatbotMsg.svelte';
	import NewChatIcon from '../misc/NewChatIcon.svelte';
	import Sendicon from '../misc/SendIcon.svelte';
	import Paperclipicon from '../misc/PaperClipIcon.svelte';
	import Removeatteachedicon from '../misc/RemoveAttachedIcon.svelte';
	import Reporticon from '../misc/ReportIcon.svelte';
	import Shildicon from '../misc/ShildIcon.svelte';
	import { dateFormat } from '../misc/UsefulFunctions.svelte';
	import { files } from '../fileexplorer/FilesModule.svelte';
	import { chat_all, chat_history } from './ChatHistoryModule.svelte';
	import { sentenze, norme } from '../projects/ProjectsModule.svelte';
	import { decodeCodici } from '../researchresult/ResearchModule.svelte';
	import { afterUpdate } from 'svelte';
	import { onMount } from 'svelte';
	import { marked } from 'marked';

	interface Message {
		sender: number; // 0 = ChatBot | 1 = User
		text: string;
	}

	interface Atteached {
		sentenze_ids: number[];
		norme_ids: number[];
		file_ids: number[];
	}

	let atteached: Atteached = {
		sentenze_ids: [],
		norme_ids: [],
		file_ids: []
	};
	$: filesList = $files;
	$: sentenzeList = $sentenze;
	$: normeList = $norme;

	let user_message: string = '',
		chat_title = 'Nuova Chat';
	let chat: Message[] = [];
	$: history = $chat_history;
	let active_chat: number = -1;
	let chatbot_loading: boolean = false;
	let isLoading = false; // Add loading state

	let context: string = '';
	let difense_lines: string = '';
	let customRequestModal: HTMLDialogElement;

	function indexOfChat(chat_id: number) {
		let index = -1;
		for (let i = 0; i < history.length; i++) {
			if (history[i].chat_id == chat_id) {
				index = i;
				break;
			}
		}
		return index;
	}

	async function generate_defense() {
		const authHeader = sessionStorage.getItem('authHeader');
		if (!context || isLoading || authHeader == null) return;

		isLoading = true;
		difense_lines = '';

		try {
			const payload = {
				context: context,
				number_of_lines: 3
			};

			const response = await fetch(`/generate/defense`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader
				},
				body: JSON.stringify(payload)
			});

			if (!response.ok) {
				throw new Error(`Errore HTTP: ${response.status}`);
			}

			const text = await response.text();
			difense_lines = text.trim().replace(/\n\n/g, '<br><br>').replace(/\n/g, ' ');
		} catch (err) {
			console.error(err);
			difense_lines = 'Si è verificato un errore. Riprova';
		} finally {
			isLoading = false;
			defenseResultModal.showModal();
			generateDefenseModal.close();
		}
	}

	let customRequest: string = '';

	async function downloadReport() {
		const authHeader = sessionStorage.getItem('authHeader');
		if (active_chat != -1 && authHeader != null) {
			try {
				const payload = {
					chat_id: active_chat,
					title: history[indexOfChat(active_chat)].title,
					customRequest: customRequest
				};

				const response = await fetch(`/generate/report`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader
					},
					body: JSON.stringify(payload)
				});

				if (!response.ok) {
					throw new Error('Errore nel download del file');
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
			} catch (error) {
				console.error('Errore durante il download:', error);
			} finally {
				customRequestModal.close();
			}
		}
	}

	async function load_chat(chat_id: number) {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			chat = [];
			try {
				const response = await fetch(`/chat/get/${chat_id}`, {
					headers: { Authorization: authHeader }
				});
				if (!response.ok) {
					let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				let responseData = await response.json();
				responseData.messages.forEach((message: { sender: string; text: any }) => {
					let msgSender: number = -1;
					if (message.sender == 'assistant') {
						msgSender = 0;
					} else if (message.sender == 'user') {
						msgSender = 1;
					}
					if (msgSender != -1) {
						chat = [...chat, { sender: msgSender, text: message.text }];
					}
				});
				active_chat = chat_id;
				atteached.norme_ids = [];
				atteached.sentenze_ids = [];
				atteached.file_ids = [];
			} catch (err) {
				chat = [
					...chat,
					{ sender: 0, text: 'Qualcosa è andato storto nel ricaricare la chat. Riprova.' }
				];
				console.log(err);
			}
		}
	}

	async function use_chat(msg: string) {
		const authHeader = sessionStorage.getItem('authHeader');
		if (msg != '' && !chatbot_loading && authHeader != null) {
			user_message = '';
			chatbot_loading = true;
			chat = [...chat, { sender: 1, text: msg }];
			let chatbot_msg = '';
			if (chat_title == '') {
				chat_title = 'Nuova Chat';
			}
			if (chat.length == 1) {
				try {
					const response = await fetch(`/chat/create/?title=${chat_title}`, {
						headers: { Authorization: authHeader }
					});
					if (!response.ok) {
						let error = `Errore HTTP: ${response.status}`;
						throw new Error(error);
					}
					let responseData = await response.json();
					active_chat = responseData.chat_id;
					chat_title = 'Nuova Chat';
					chat_all();
				} catch (err: any) {
					console.log(err.message);
					chatbot_msg = 'Qualcosa è andato storto! Riprova.';
					chat = [...chat, { sender: 0, text: chatbot_msg }];
					chatbot_loading = false;
				}
			}

			if (active_chat != -1) {
				try {
					const response = await fetch(
						`/chat/complete?last_message=${msg}&chat_id=${active_chat}`,
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: authHeader
							},
							body: JSON.stringify(atteached)
						}
					);
					if (!response.ok) {
						let error = `Errore HTTP: ${response.status}`;
						throw new Error(error);
					}
					let responseData = await response.json();
					chatbot_msg = responseData.response;
					atteached.norme_ids = [];
					atteached.sentenze_ids = [];
					atteached.file_ids = [];
				} catch (err: any) {
					console.log(err.message);
					chatbot_msg = 'Troppe richieste! Riprova.';
				} finally {
					chatbot_loading = false;
					chat = [...chat, { sender: 0, text: chatbot_msg }];
				}
			}
		}
	}

	function allega(doc_type: number, doc_id: number) {
		//doc_type: 0 = norma, 1 = sentenza, 2 = file utente
    console.log(atteached)
		if (doc_type == 0) {
			atteached.norme_ids = [...atteached.norme_ids, doc_id];
		} else if (doc_type == 1) {
      
			atteached.sentenze_ids = [...atteached.sentenze_ids, doc_id];
		} else if (doc_type == 2) {
			atteached.file_ids = [...atteached.file_ids, doc_id];
		}
	}

	function rimuovi_allegato(doc_type: number, doc_id: number) {
    console.log(atteached)
		if (doc_type == 0) {
			atteached.norme_ids = atteached.norme_ids.filter((id) => id !== doc_id);
		} else if (doc_type == 1) {
			atteached.sentenze_ids = atteached.sentenze_ids.filter((id) => id !== doc_id);
		} else if (doc_type == 2) {
			atteached.file_ids = atteached.file_ids.filter((id) => id !== doc_id);
		}
	}

	onMount(chat_all);

	let chat_container: HTMLDivElement,
		atteachedModal: HTMLDialogElement,
		generateDefenseModal: HTMLDialogElement,
		defenseResultModal: HTMLDialogElement;
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

	let confirmDeleteModal: HTMLDialogElement;
let deleteTarget: { chat_id: number; title: string } = { chat_id: -1, title: '' };

function openDeleteConfirmation(chat_id: number, title: string) {
	deleteTarget = { chat_id, title };
	confirmDeleteModal?.showModal();
}

async function confirmDelete() {
    const chat_id = deleteTarget.chat_id;
    const row = document.getElementById("chat-row-" + chat_id);
    if (row) row.classList.add("fade-out");

    await new Promise((res) => setTimeout(res, 400));

    const authHeader = sessionStorage.getItem("authHeader");
	
    try {
	const response = await fetch(`/chat/${chat_id}`, {
	method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader ?? ''
    }
});
        if (response.ok) {
            chat_history.update((list) => list.filter((c) => c.chat_id !== chat_id));
        } else {
            console.error(await response.text());
            alert("Errore durante l'eliminazione");
        }
    } catch (err) {
        console.error(err);
    } finally {
        confirmDeleteModal?.close();
    }
}
</script>

<div
	class="rounded-box mx-8 px-3 py-4"
	style="height: 72%; background: linear-gradient(170deg, #3b0764 30%, #712da4);"
>
	<div class="relative h-full">
		<div class="absolute left-0 top-0 z-[10]">
			<button
				on:click={() => customRequestModal.showModal()}
				class="btn tooltip my-1 rounded-full border-transparent bg-transparent capitalize text-white hover:border-green-400 hover:bg-green-400"
				data-tip="Genera report chat"><Reporticon /></button
			> <br />
			<button
				on:click={() => generateDefenseModal.showModal()}
				class="btn tooltip my-1 rounded-full border-transparent bg-transparent capitalize text-white hover:border-green-400 hover:bg-green-400"
				data-tip="Genera linee difensive"><Shildicon /></button
			>
		</div>
		<div
			bind:this={chat_container}
			class="absolute top-2 overflow-y-auto px-1 {chat.length>0 ? 'pl-14 pr-1' : 'px-1'}"
			style="width: 100%; height:80%;"
		>
			{#if chat.length == 0}
				<div class="mx-12 mt-2 text-center text-white">
					<div class="avatar">
						<div class="w-20 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
							<img alt="AI-avatar" src="./img/AI.png" />
						</div>
					</div>
					<h1 class="text-xl font-bold">Ciao sono LegalIA, come posso aiutarti?</h1>
					<p class="my-4 text-sm">
						LegalIA può aiutarti con il tuo lavoro nell' ambito legale. Lascia che generi dei
						riassunti per i tuoi documenti, ti aiuti a trovare le norme più rilevanti, generi per te
						dei pareri e molto altro.
					</p>
					<h2 class="text-md font-bold">
						Inizia subito! Crea una nuova chat o carica una chat dalla cronologia.
					</h2>
					<fieldset class="fieldset mt-2">
						<legend class="fieldset-legend mb-1 text-xs font-bold">Titolo nuova chat</legend>
						<input
							bind:value={chat_title}
							type="text"
							class="input input-sm bg-white text-black"
							placeholder="Type here"
						/>
					</fieldset>
				</div>
			{:else}
				{#each chat as msg}
					{#if msg.sender == 0}
						<ChatbotMsg text={msg.text} />
					{:else}
						<UserMsg text={msg.text} />
					{/if}
				{/each}
				{#if chatbot_loading}
					<ChatbotMsg text={'<span class="loading loading-dots loading-md"></span>'} />
				{/if}
			{/if}
		</div>
		<div class="absolute bottom-0 w-full">
			<div class="mt-3 grid w-full grid-cols-12 gap-2">
				<div class="col-span-1 text-center">
					<button
						on:click={() => atteachedModal.showModal()}
						class="btn relative rounded-full border-green-200 bg-green-200 text-black hover:border-green-400 hover:bg-green-400 hover:text-white"
					>
						<Paperclipicon />
						{#if atteached.norme_ids.length + atteached.sentenze_ids.length + atteached.file_ids.length > 0}
							<div class="badge badge-secondary absolute right-0 top-0">
								{atteached.norme_ids.length +
									atteached.sentenze_ids.length +
									atteached.file_ids.length}
							</div>
						{/if}
					</button>
				</div>
				<div class="col-span-10">
					{#if !chatbot_loading}
						<input
							type="text"
							bind:value={user_message}
							placeholder="Scrivi qui il tuo messaggio..."
							class="input input-bordered input-md w-full rounded-full bg-white text-black"
						/>
					{:else}
						<input
							type="text"
							bind:value={user_message}
							placeholder="Scrivi qui il tuo messaggio..."
							class="input input-bordered input-md w-full rounded-full bg-white text-black"
							disabled
						/>
					{/if}
				</div>
				<div class="col-span-1 text-center">
					<button
						on:click={() => use_chat(user_message)}
						class="btn rounded-full border-green-200 bg-green-200 text-black hover:border-green-400 hover:bg-green-400 hover:text-white"
						><Sendicon /></button
					>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="divider-purple-950 divider mx-3 text-purple-950">
	Storico conversazioni<button
		on:click={() => {
			chat = [];
		}}
		class="btn btn-xs tooltip bg-purple-950 capitalize text-white"
		data-tip="Nuova Chat"><NewChatIcon /></button
	>
</div>

<div class="flex max-w-full overflow-x-auto">
	{#each history as chatItem (chatItem.chat_id)}
	<div
		id={"chat-row-" + chatItem.chat_id}
		class="rounded-box mx-8 mb-1 min-w-52 max-w-52 bg-purple-950 px-4 py-2 transition-all duration-300"
		style=" background: linear-gradient(170deg, #3b0764 30%, #712da4);"
	>
		<div class="truncate text-center text-white">
			<p class="font-bold">{chatItem.title}</p>
			<p class="text-sm">{dateFormat(chatItem.last_update)}</p>
			<div class="flex justify-center gap-2 py-1">
				<button
					on:click={() => load_chat(chatItem.chat_id)}
					class="btn btn-sm rounded-full border-green-200 bg-green-200 capitalize text-black hover:border-green-400 hover:bg-green-400 hover:text-white"
				>
					Carica
				</button>

				<!-- Bottone Elimina -->
				<button
	class="btn btn-sm btn-error rounded-full capitalize text-white"
	on:click={() => openDeleteConfirmation(chatItem.chat_id, chatItem.title)}
>
	Elimina
</button>

			</div>
		</div>
	</div>
{/each}
</div>

<dialog bind:this={confirmDeleteModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="font-bold text-lg">Conferma eliminazione</h3>
		<p class="py-4">
			Sei sicuro di voler eliminare <strong>{deleteTarget.title}</strong>?
		</p>
		<div class="modal-action">
			<form method="dialog" class="space-x-2">
				<button class="btn" type="submit">Annulla</button>
				<button class="btn btn-error" type="button" on:click={confirmDelete}>Elimina</button>
			</form>
		</div>
	</div>
</dialog>

<dialog bind:this={customRequestModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Richieste Personalizzate</h3>
		<p class="text-right text-sm">Premi ESC per uscire</p>
		<div>
			<div class="my-2 w-full">
				<label class="label" for="customRequest">Inserisci le tue richieste personalizzate</label>
				<textarea
					id="customRequest"
					bind:value={customRequest}
					class="textarea w-full bg-neutral-200 text-black"
					placeholder="Inserisci qui le tue richieste..."
				></textarea>
			</div>
		</div>
		<div class="text-center">
			<form method="dialog" on:submit|preventDefault>
				<button
					on:click|preventDefault={downloadReport}
					class="btn bg-purple-950 capitalize text-white"
				>
					Genera PDF
				</button>
			</form>
		</div>
	</div>
</dialog>

<dialog bind:this={atteachedModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Allega file, norme e sentenze</h3>
		<p class="text-right text-sm">Premi ESC per uscire</p>
		<div class="w-full">
			<div>
				<h4 class="font-bold">File</h4>
				<div class="ml-6">
					{#if filesList.length > 0}
						{#each filesList as file}
							<div class="my-2 flex gap-2">
								{#if !atteached.file_ids.includes(file.id)}
									<div>
										<button
											on:click={() => allega(2, file.id)}
											class="btn btn-xs tooltip border-purple-950 bg-purple-950 capitalize text-white"
											data-tip="Allega"><Paperclipicon /></button
										>
									</div>
								{:else}
									<div>
										<button
											on:click={() => rimuovi_allegato(2, file.id)}
											class="btn btn-error btn-xs tooltip capitalize text-white"
											data-tip="Rimuovi allegato"><Removeatteachedicon /></button
										>
									</div>
								{/if}
								<div class="py-auto"><p class="text-sm font-bold">{file.name}</p></div>
							</div>
						{/each}
					{:else}
						<p class="mt-2 text-sm">
							Non ci sono file da allegare.<br />
							Carica un file dal tuo dispositivo usando la barra laterale sinistra per poterlo allegare
							alla chat.
						</p>
					{/if}
				</div>
			</div>
			<div class="divider"></div>
			<div>
				<h4 class="font-bold">Norme</h4>
				<div class="ml-6">
					{#if normeList.length > 0}
						{#each normeList as norma}
							<div class="my-2 flex gap-2">
								{#if !atteached.norme_ids.includes(norma.id)}
									<div>
										<button
											on:click={() => allega(0, norma.id)}
											class="btn btn-xs tooltip border-purple-950 bg-purple-950 capitalize text-white"
											data-tip="Allega"><Paperclipicon /></button
										>
									</div>
								{:else}
									<div>
										<button
											on:click={() => rimuovi_allegato(0, norma.id)}
											class="btn btn-error btn-xs tooltip capitalize text-white"
											data-tip="Rimuovi allegato"><Removeatteachedicon /></button
										>
									</div>
								{/if}
								<div class="py-auto">
									<p class="text-sm font-bold">Art {norma.articolo} {decodeCodici[norma.codice]}</p>
								</div>
							</div>
						{/each}
					{:else}
						<p class="mt-2 text-sm">
							Non ci sono norme da allegare.<br />
							Cerca una norma con il nostro motore di ricerca e aggiungila al progetto per poterla allegare
							alla chat.
						</p>
					{/if}
				</div>
			</div>
			<div class="divider"></div>
			<div>
				<h4 class="font-bold">Sentenze</h4>
				<div class="ml-6">
					{#if sentenzeList.length > 0}
						{#each sentenzeList as sentenza}
							<div class="my-2 flex gap-2">
								{#if !atteached.sentenze_ids.includes(sentenza.position_index)}
									<div>
										<button
											on:click={() => allega(1, sentenza.position_index)}
											class="btn btn-xs tooltip border-purple-950 bg-purple-950 capitalize text-white"
											data-tip="Allega"><Paperclipicon /></button
										>
									</div>
								{:else}
									<div>
										<button
											on:click={() => rimuovi_allegato(1, sentenza.position_index)}
											class="btn btn-error btn-xs tooltip capitalize text-white"
											data-tip="Rimuovi allegato"><Removeatteachedicon /></button
										>
									</div>
								{/if}
								<div class="py-auto">
									<p class="text-sm font-bold">{sentenza.description.split(' \n')[0]}</p>
								</div>
							</div>
						{/each}
					{:else}
						<p class="mt-2 text-sm">
							Non ci sono sentenze da allegare.<br />
							Cerca una sentenza con il nostro motore di ricerca e aggiungila al progetto per poterla
							allegare alla chat.
						</p>
					{/if}
				</div>
			</div>
		</div>
	</div>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog bind:this={generateDefenseModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Genera linee difensive</h3>
		<p class="text-right text-sm">Premi ESC per uscire</p>
		<div>
			<div class="my-2 w-full">
				<label class="label" for="context"
					>Descrivi il caso per cui desideri realizzare le linee difensive</label
				>
				<textarea
					id="context"
					bind:value={context}
					class="textarea w-full bg-neutral-200 text-black"
					placeholder="Descrizione del caso"
					disabled={isLoading}
				></textarea>
			</div>
		</div>
		<div class="text-center">
			<form method="dialog" on:submit|preventDefault>
				{#if isLoading}
					<button class="btn bg-purple-950 capitalize text-white" disabled>
						<span class="loading loading-spinner"></span>
						Generando...
					</button>
				{:else}
					<button
						on:click|preventDefault={generate_defense}
						class="btn bg-purple-950 capitalize text-white"
					>
						Genera
					</button>
				{/if}
			</form>
		</div>
	</div>
</dialog>

<dialog bind:this={defenseResultModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Linee difensive</h3>
		<p class="text-right text-sm">Premi ESC per uscire</p>
		<div class="my-4 overflow-y-auto rounded-lg bg-neutral-200 p-4" style="max-height: 400px;">
			{@html marked(difense_lines.replace(/\\n/g, '\n'), { breaks: true })}
		</div>
	</div>
</dialog>

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

	.fade-out {
	opacity: 0;
	transform: translateX(-20px);
	transition: opacity 0.4s ease, transform 0.4s ease;
}
</style>
