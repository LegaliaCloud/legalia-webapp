<script lang="ts">
	import '../../app.css';
	import Navbar from '$lib/components/navbar/Navbar1.svelte';
	import Fileicon from '$lib/components/misc/FileIconLg.svelte';
	import ChatDemo from '$lib/components/chat/ChatDemo.svelte';
	import { onMount } from 'svelte';
	import type { Norma } from '$lib/components/researchresult/ResearchModule.svelte';
	import { decodeCodici } from '$lib/components/researchresult/ResearchModule.svelte';
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/hero/Hero.svelte';

	let question: string = '';
	let lookFor: boolean; //false = sentenze | true = norme

	let codice: string;
	let art: string = '';
	let normeResults: Norma[] = [];

	let analisi: boolean = false;
	let reasoningLoading: boolean = false;
	let rerankLoading: boolean = false;
	let GetDocsLoading: boolean = false;
	let doc_IDs: number[] = [];
	interface Doc {
		title: string;
		massima: string;
		keywords: string[];
		url: string;
	}
	interface Documents {
		[id: number]: Doc;
	}

	let documents: Documents = {};
	let analysis_text: string = '';
	let chat_history: any;
	let responseData = null;
	let error: string = '';

	onMount(() => {
		if (sessionStorage.getItem('authHeader') == null) {
			goto('/login');
		}
	});

	/*
    Funzione per spostare automatica all'inizio della sezione risultati quando in
    questa si verifica un cambiamento.
    */
	onMount(() => {
		const container = document.getElementById('results');

		if (container) {
			const observer = new MutationObserver(() => {
				container.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});

			observer.observe(container, { childList: true, subtree: true });

			// Cleanup
			return () => observer.disconnect();
		}
	});

	async function add_project(doc_type: number, id: number) {
		//doc_type 0 = norma, 1 = sentenza
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			error = '';
			let addToProjectAPI: string = '';
			if (doc_type == 0) {
				addToProjectAPI = '/project/add/norme';
			} else if (doc_type == 1) {
				addToProjectAPI = '/project/add/sentenze';
			}
			try {
				// Send a direct array of IDs, not an object containing an array
				let payload = [id];
				const response = await fetch(addToProjectAPI, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader
					},
					body: JSON.stringify(payload)
				});

				if (!response.ok) {
					error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}

				// Show confirmation message to user
				alert('Documento aggiunto al progetto attivo con successo!');
			} catch (err: any) {
				error = err.message;
				alert("Errore nell'aggiungere il documento al progetto: " + error);
			}
		}
	}

	async function search_norme() {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			doc_IDs = [];
			error = '';
			analisi = false;
			GetDocsLoading = true;
			let payload = {
				query: question,
				articolo: art,
				codice: [''],
				top_k: '10'
			};
			if (codice != 'all') {
				payload.codice = [codice];
			} else {
				payload.codice = ['cp', 'cc', 'cpc', 'cpp'];
			}
			try {
				const response = await fetch(`search/norme/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader
					},
					body: JSON.stringify(payload)
				});
				console.log(payload);
				if (!response.ok) {
					throw new Error(`Errore HTTP: ${response.status}`);
				}
				normeResults = await response.json();
			} catch (err: any) {
				error = err.message;
			} finally {
				GetDocsLoading = false;
			}
		}
	}

	async function analysis(id: number) {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			error = '';
			analisi = true;
			reasoningLoading = true;
			analysis_text = '';
			let analysisResponse;
			let ids = [id];
			let payload = { document_ids: ids };
			try {
				const response = await fetch(`search/sentenze/analysis`, {
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
				responseData = await response.json();
				analysisResponse = responseData.analysis;
				analysis_text = '<h3 class="text-lg font-bold mb-2">' + documents[id].title + '</h3>';
				analysis_text += '<b>PAROLE CHIAVE</b><br>';
				let keywords: string[] = analysisResponse.keywords.split(',');
				for (let i = 0; i < keywords.length; i++) {
					keywords[i] = keywords[i].replace(/[{}"]/g, '');
				}
				analysis_text += '<div class="flex flex-wrap">';
				keywords.forEach((key) => {
					analysis_text +=
						'<div class="bg-warning m-2 py-2 px-4 text-black rounded-box font-semibold uppercase shadow-xl">' +
						key +
						'</div>';
				});
				analysis_text += '</div>';
				analysis_text += '<b>SOMMARIO</b><br>' + analysisResponse.summary + '<br>';
				chat_history = responseData.chat_history;
				//console.log(chat_history);
			} catch (err: any) {
				error = err.message;
				analysis_text = '';
			} finally {
				reasoningLoading = false;
			}
		}
	}

	async function rerank() {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			error = '';
			rerankLoading = true;
			let payload = { document_ids: doc_IDs };
			try {
				const response = await fetch(`/search/sentenze/reranker?question=${question}&k=5`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader
					},
					body: JSON.stringify(payload)
				});
				if (!response.ok) {
					error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				responseData = await response.json();
				if (responseData != null) {
					doc_IDs = responseData.document_ids;
				}
			} catch (err: any) {
				error = err.message;
			} finally {
				rerankLoading = false;
			}
		}
	}

	async function get_document_info(document_id: number, authHeader: string) {
		try {
			const response = await fetch(`/search/document/${document_id}`, {
				headers: { Authorization: authHeader }
			});
			if (!response.ok) {
				return {
					ok: false,
					error: `Errore HTTP: ${response.status}`
				};
			}
			responseData = await response.json();
			return {
				ok: true,
				url: responseData.url,
				description: responseData.description,
				massima: responseData.massima,
				keywords: responseData.keywords
			};
		} catch (err: any) {
			return {
				ok: false,
				error: err.message
			};
		}
	}

	async function get_documents() {
		const authHeader = sessionStorage.getItem('authHeader');
		if (authHeader != null) {
			error = '';
			GetDocsLoading = true;
			analisi = false;
			normeResults = [];
			try {
				const response = await fetch(`/search/sentenze/documents?question=${question}&k=15`, {
					headers: { Authorization: authHeader }
				});
				if (!response.ok) {
					error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				responseData = await response.json();
				if (responseData != null) {
					doc_IDs = responseData.document_ids;
					documents = {};
					for (let i = 0; i < doc_IDs.length; i++) {
						let id = doc_IDs[i];
						let docInfo = await get_document_info(id, authHeader);
						if (docInfo.ok) {
							let text = docInfo.description.split('\n');
							let keywords_list = docInfo.keywords.split(',');
							for (let i = 0; i < keywords_list.length; i++) {
								keywords_list[i] = keywords_list[i].replace(/[{}"]/g, '');
							}
							documents[id] = {
								title: text[0],
								massima: docInfo.massima,
								keywords: keywords_list,
								url: docInfo.url
							};
						} else {
							documents[id] = {
								title: 'ERRORE',
								massima: "Errore nell'ottenimento delle informazioni di questo documento",
								keywords: [''],
								url: ''
							};
						}
					}
					//console.log(documents);
				}
			} catch (err: any) {
				error = err.message;
			} finally {
				GetDocsLoading = false;
			}
		}
	}
</script>

<div class="conteiner min-h-screen bg-white pb-6">
	<div class="relative" style="height: 95vh">
		<Navbar />
		<!--hero-background-->
		<Hero />
		<!--Contnent-->
		<div class="relative z-20 w-full">
			<div class="absolute left-0 top-0 h-full w-full">
				<div>
					<div class="text-balance py-4 text-white">
						<h1 class="font-roboto mx-12 my-4 text-xl font-bold md:text-2xl">
							Prova il nostro motore di ricerca basato sull’AI
						</h1>
						<p class="text-md font-roboto mx-12 md:text-lg">
							Analizziamo centinaia di migliaia di sentenze della Corte Suprema di Cassazione,
							utilizziando le tecnologie di AI più potenti e moderne.<br />
							Ti forniamo un elenco di documenti rilevanti, e degli spunti di ragionamento.
						</p>
					</div>
					<div
						class="mx-1 my-12 rounded-lg border-4 border-purple-950 bg-white px-2 py-6 shadow-2xl shadow-inner sm:mx-4 md:mx-12 md:p-6"
					>
						<div class="grid grid-rows-{lookFor ? '4' : '2'} gap-{lookFor ? '1' : '3'}">
							<div>
								<input
									id="semantic"
									type="text"
									bind:value={question}
									placeholder="La tua ricerca..."
									class="font-roboto input input-bordered w-full border-2 border-neutral-300 bg-white text-black"
								/>
							</div>
							{#if lookFor}
								<div class="divider">Oppure</div>
								<div>
									<p class="mb-2 ml-1 text-black">Ricerca una norma specifica</p>
									<div class="flex gap-2">
										<select
											bind:value={codice}
											on:change={() => console.log(codice)}
											class="font-roboto select border-2 border-neutral-300 bg-white"
										>
											<option value="all" disabled selected>Codice</option>
											<option value="cp">Codice Penale</option>
											<option value="cc">Codice Civile</option>
											<option value="cpp">Codice Procedura Penale</option>
											<option value="cpc">Codice Procedura Civile</option>
											<option value="all">Tutti</option>
										</select>
										<div>
											<input
												type="text"
												bind:value={art}
												placeholder="num. Articolo"
												class="font-roboto input input-bordered w-full border-2 border-neutral-300 bg-white text-black"
											/>
										</div>
									</div>
								</div>
							{/if}
							<div>
								<div class="grid h-full grid-cols-1">
									<div class="col-start-1 my-auto ml-1 flex flex-wrap">
										<div class="flex">
											<p class="mr-2 text-black">Stai cercando le</p>
											<label class="swap">
												<input
													bind:checked={lookFor}
													on:change={() => (codice = 'all')}
													type="checkbox"
												/>
												<div
													class="swap-on rounded bg-green-400 px-2 text-center font-bold text-white"
												>
													Norme
												</div>
												<div
													class="swap-off rounded bg-secondary px-2 text-center font-bold text-white"
												>
													Sentenze
												</div>
											</label>
										</div>
									</div>
									<div class="col-start-2 my-auto text-right">
										{#if lookFor}
											<button
												class="font-roboto btn bg-purple-950 text-white hover:bg-purple-800"
												on:click={search_norme}>Cerca</button
											>
										{:else}
											<button
												class="font-roboto btn bg-purple-950 text-white hover:bg-purple-800"
												on:click={get_documents}>Cerca</button
											>
										{/if}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="results" class="pt-1">
		{#if error != ''}
			<div class="m-4">
				<div role="alert" class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0 stroke-current"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span>ERORRE: {error}. Riprova. Se l'errore persiste conntattare info@legalia.cloud.</span
					>
				</div>
			</div>
		{/if}
		{#if analisi}
            {#if reasoningLoading}
                <ChatDemo
                chat_history_payload={chat_history}
                first_msg='<span class="loading loading-dots loading-md"></span>'
                />
            {:else if analysis_text == ''}
                <ChatDemo 
                chat_history_payload={chat_history} 
                first_msg="Troppe richieste. Riprova." 
                />
            {:else}
                <ChatDemo 
                chat_history_payload={chat_history} 
                first_msg={analysis_text} 
                />
            {/if}
        {/if}
		{#if GetDocsLoading}
			<div class="w-full text-center text-purple-950">
				<span class="loading loading-dots loading-lg"></span>
			</div>
		{:else}
			{#if doc_IDs.length > 0}
				<div class="mt-4 w-full pl-1 sm:pl-4 md:pl-14">
					<h1 class="font-roboto text-xl font-bold text-black">Risultati Ricerca Sentenze</h1>
				</div>
				<div class="my-6 px-1 md:px-14">
					<div role="alert" class="alert bg-purple-950 text-white shadow-lg">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="h-6 w-6 shrink-0 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							></path></svg
						>
						<div>
							<h3 class="font-bold">Ottimizza la tua ricerca con l'AI!</h3>
							<div class="text-xs">
								Lascia che LegalIA valuti per te i migliori 5 risultati di ricerca.
							</div>
						</div>
						<button
							class="font-roboto btn btn-sm ml-6 bg-green-500 text-white hover:bg-green-400"
							on:click={rerank}
						>
							{#if rerankLoading}
								<span class="loading loading-dots loading-md"></span>
							{:else}
								ottimizza
							{/if}
						</button>
					</div>
				</div>
				<div class="px-1">
					<!--<div class="flex flex-wrap pb-4 px-1">-->
					{#each doc_IDs as id}
						<div class="card card-side mx-1 my-2 flex-wrap bg-white shadow-xl md:mx-14">
							<!--<div class="card card-side bg-white shadow-xl my-2 mx-auto max-w-96">-->
							<figure class="mx-auto my-auto ml-4 w-24 text-purple-950">
								<Fileicon />
							</figure>
							<div class="card-body w-72 text-black">
								<h2 class="card-title">{documents[id].title}</h2>
								<p>
									<span class="font-semibold">Massima: </span>{documents[id].massima}
								</p>
								<p class="font-semibold">Parole chiave:</p>
								<div class="flex flex-wrap">
									{#each documents[id].keywords as keyword}
										<div
											class="rounded-box m-2 bg-warning px-4 py-2 font-semibold uppercase text-black shadow-xl"
										>
											{keyword}
										</div>
									{/each}
								</div>
								<div class="card-actions flex justify-end">
									<a
										href={documents[id].url}
										target="_blank"
										class="font-roboto btn btn-sm bg-purple-950 text-white hover:bg-purple-800"
										>Vedi</a
									>
									<button
										class="font-roboto btn btn-sm bg-purple-950 text-white hover:bg-purple-800"
										on:click={() => analysis(id)}>Chiedi a LegalIA</button
									>
									<button
										class="font-roboto btn btn-sm bg-purple-950 text-white hover:bg-purple-800"
										on:click={() => add_project(1, id)}>Aggiungi a progetto</button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
			{#if normeResults.length > 0}
				<div class="mt-4 w-full pl-1 sm:pl-4 md:pl-14">
					<h1 class="font-roboto text-xl font-bold text-black">Risultati Ricerca Norme</h1>
				</div>
				<div class="px-1">
					<!--<div class="flex flex-wrap pb-4 px-1">-->
					{#each normeResults as norma}
						<div class="card card-side mx-1 my-2 flex-wrap bg-white shadow-xl md:mx-14">
							<!--<div class="card card-side bg-white shadow-xl my-2 mx-auto max-w-96">-->
							<figure class="mx-auto my-auto ml-4 w-24 text-purple-950">
								<Fileicon />
							</figure>
							<div class="card-body w-72 text-black">
								<h2 class="card-title">Art. {norma.articolo} del {decodeCodici[norma.codice]}</h2>
								<p class="font-bold">
									{norma.libro}
								</p>
								<p class="font-semibold">{norma.content}</p>
								<div class="card-actions flex justify-end">
									<a
										href={norma.url}
										target="_blank"
										class="font-roboto btn btn-sm bg-purple-950 text-white hover:bg-purple-800"
										>Vedi</a
									>
									<button
										class="font-roboto btn btn-sm bg-purple-950 text-white hover:bg-purple-800"
										on:click={() => add_project(0, norma.id)}>Aggiungi a progetto</button
									>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.my_hero {
		height: 75vh;
		width: 100%;
		shape-outside: polygon(0 0, 100% 0, 100% 50%, 0 100%);
		clip-path: polygon(0 0, 100% 0, 100% 50%, 0 100%);
	}
</style>
