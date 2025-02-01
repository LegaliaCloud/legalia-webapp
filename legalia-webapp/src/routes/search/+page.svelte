<script lang="ts">
    import '../../app.css';
    import Navbar from '$lib/components/navbar/navbar_1.svelte';
    import Fileicon from '$lib/components/misc/fileicon-lg.svelte';
    import ChatDemo from '$lib/components/chat/chat-demo.svelte';
    import { onMount} from "svelte";
    import Hero from '$lib/components/hero/hero.svelte';

    let question: string;
    let analisi: boolean = false;
    let reasoningLoading: boolean= false;
    let rerankLoading: boolean = false;
    let GetDocsLoading: boolean = false;
    let doc_IDs:number[] = [];
    interface Doc {title:string, massima:string, keywords:string[], url:string}
    interface Documents {[id: number] : Doc;};

    let documents:Documents = {};
    let analysis_text: string = "";
    let chat_history;
    let responseData = null;
    let error:string = "";

    /*
    Funzione per spostare automatica all'inizio della sezione risultati quando in
    questa si verifica un cambiamento.
    */
    onMount(() => {
        const container = document.getElementById("results");

        if (container) {
            const observer = new MutationObserver(() => {
                container.scrollIntoView({ behavior: "smooth", block: "start" });
            });

            observer.observe(container, { childList: true, subtree: true });

            // Cleanup
            return () => observer.disconnect();
        }
    });

    /*
    async function reasoning(id: number){
        analisi = true;
        reasoningLoading = true;
        reasoning_text = "";
        let reasoningResponse;
        let ids=[id];
        let payload = {"document_ids": ids};
        try {
            const response = await fetch(`/reasoning?question=${question}`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);
            }
            responseData = await response.json();
            reasoningResponse = responseData.reasoning;
            reasoningResponse.informazioni_utili.forEach(info => {
                reasoning_text += info.informazione + '<br>';
            });
            reasoning_text += "<br><b>RAGIONAMENTO</b><br>" + reasoningResponse.ragionamento +'<br>';
            reasoning_text += "<br><b>POSSIBILI ATTENUANTI</b><br>" + reasoningResponse.possibili_attenuanti +'<br>';
            reasoning_text += "<br><b>POSSIBILI AGGRAVANTI</b><br>" + reasoningResponse.possibili_aggravanti;  
        } catch (err) {
            error = err.message;
        } finally {
            reasoningLoading = false;
        }
    }*/

    async function analysis(id: number){
        error = "";
        analisi = true;
        reasoningLoading = true;
        analysis_text = "";
        let analysisResponse;
        let ids=[id];
        let payload = {"document_ids": ids};
        try {
            const response = await fetch(`/analysis`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                throw new Error(`Errore HTTP: ${response.status}`);          
            }
            responseData = await response.json();
            analysisResponse = responseData.analysis;
            analysis_text = '<h3 class="text-lg font-bold mb-2">' + documents[id].title + '</h3>';
            analysis_text += "<b>PAROLE CHIAVE</b><br>";
            let keywords:string[] = analysisResponse.keywords.split(', ');
            analysis_text += '<div class="flex flex-wrap">'
            keywords.forEach(key => {
                analysis_text += '<div class="bg-warning m-2 py-2 px-4 text-black rounded-box font-semibold uppercase shadow-xl">' + key + '</div>'
            });
            analysis_text += '</div>'
            analysis_text += "<b>SOMMARIO</b><br>" + analysisResponse.summary +'<br>';
            chat_history = responseData.chat_history;
            //console.log(chat_history);
        } catch (err) {
            error = err.message;
            analysis_text = "";
        } finally {
            reasoningLoading = false;
        }
    }

    async function rerank(){
        error = "";
        rerankLoading = true;
        let payload = {"document_ids": doc_IDs};
        try {
            const response = await fetch(`/reranker?question=${question}&k=5`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                error = `Errore HTTP: ${response.status}`;
                throw new Error(error);
            }
            responseData = await response.json();
            if(responseData != null){
                doc_IDs = responseData.document_ids;
            }
        } catch (err) {
            error = err.message;
        } finally{
            rerankLoading = false;
        }
    }

    async function get_document_info(document_id: number){
        try {
            const response = await fetch(`/document/${document_id}`);
            if (!response.ok) {
                return {
                    ok: false,
                    error: `Errore HTTP: ${response.status}`
                };
            }
            responseData = await response.json();
            return {
                'ok': true,
                'url': responseData.url,
                'description': responseData.description,
                'massima': responseData.massima,
                'keywords': responseData.keywords
            };
        } catch (err) {
            return {
                ok: false,
                error: err.message
            };
        }
    }
    
    async function get_documents(){
        error = "";
        GetDocsLoading = true;
        analisi = false;
        try {
            const response = await fetch(`/documents?question=${question}&k=15`);
            if (!response.ok) {
                error = `Errore HTTP: ${response.status}`;
                throw new Error(error);
            }
            responseData = await response.json();
            if(responseData != null){
                doc_IDs = responseData.document_ids;
                documents = {};
            for(let i=0; i< doc_IDs.length; i++){
                let id = doc_IDs[i];
                let docInfo = await get_document_info(id);
                if(docInfo.ok){
                    let text = docInfo.description.split('\n');
                    let keywords_list = docInfo.keywords.split(', ');
                    documents[id] = {title: text[0], massima: docInfo.massima, keywords: keywords_list, url: docInfo.url};
                } else {
                    documents[id] = {title: 'ERRORE', massima: 'Errore nell\'ottenimento delle informazioni di questo documento',keywords: '', url: ''}
                }
            }
            //console.log(documents);
            }
        } catch (err) {
            error = err.message;
        } finally {
            GetDocsLoading = false;
        }
    }
</script>

<div class="conteiner bg-white min-h-screen pb-6">
    <div class="relative" style="height: 95vh">
        <Navbar/>
        <!--hero-background-->
        <Hero />
        <!--Contnent-->
        <div class="relative z-20 w-full">
            <div class="absolute top-0 left-0 w-full">
                <div>
                    <div class="text-balance py-4 text-white">
                        <h1 class="md:text-2xl text-xl mx-12 font-roboto font-bold my-4">Prova il nostro motore di ricerca basato sull’AI</h1>
                        <p class="md:text-lg text-md mx-12 font-roboto">
                            Analizziamo centinaia di migliaia di sentenze della Corte Suprema di Cassazione, utilizziando le tecnologie di AI più potenti e moderne.<br>
                            Ti forniamo un elenco di documenti rilevanti, e degli spunti di ragionamento.  
                        </p>
                    </div>
                    <div class="rounded-lg border-4 border-purple-950 bg-white md:p-6 py-6 px-2 my-12 md:mx-12 sm:mx-4 mx-1 shadow-inner shadow-2xl">
                        <div class="grid grid-rows-2 gap-3">
                            <div>
                                <input type="text" bind:value={question} placeholder="La tua ricerca..." class="input input-bordered border-2 border-neutral-300 w-full bg-white text-black font-roboto" />
                            </div>
                            <div class="text-center">
                                <div>
                                    <button class="btn bg-purple-950 text-white font-roboto hover:bg-purple-800" on:click={get_documents}>Cerca</button>
                                </div>
                                <!--<div class="grid grid-cols-1 h-full">
                                    <div class="col-start-1 flex flex-wrap my-auto">
                                        <p class="ml-1 mr-4 font-roboto text-black">Includi le norme</p>
                                        <input type="checkbox" class="toggle border-neutral-300 bg-white [--tglbg:red] checked:[--tglbg:green]"/>
                                    </div>
                                    <div class="col-start-2 text-right">
                                        <button class="btn bg-purple-950 text-white font-roboto hover:bg-purple-800" on:click={get_documents}>Cerca</button>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="results" class="pt-1">
        {#if error != ""}
            <div class="m-4">
                <div role="alert" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>ERORRE: {error}. Riprova. Se l'errore persiste conntattare info@legalia.cloud.</span>
                </div>
            </div>
        {/if}
        {#if analisi}
            {#if reasoningLoading}
                <ChatDemo chat_history_payload={chat_history} first_msg = '<span class="loading loading-dots loading-md"></span>'/>
            {:else if analysis_text == ""}
                <ChatDemo chat_history_payload={chat_history} first_msg = "Troppe richieste. Riprova."/>
            {:else}
                <ChatDemo chat_history_payload={chat_history} first_msg = {analysis_text}/>
            {/if}
        {/if}
        {#if GetDocsLoading}
            <div class="w-full text-center text-purple-950"><span class="loading loading-dots loading-lg"></span></div>
        {:else} 
            {#if doc_IDs.length > 0}
                <div class="w-full md:pl-14 sm:pl-4 pl-1  mt-4">
                    <h1 class="text-xl font-roboto font-bold text-black">Risultati Ricerca</h1>
                </div>
                <div class="md:px-14 px-1 my-6">
                    <div role="alert" class="alert bg-purple-950 text-white shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current h-6 w-6 shrink-0"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <div>
                          <h3 class="font-bold">Ottimizza la tua ricerca con l'AI!</h3>
                          <div class="text-xs">Lascia che LegalIA valuti per te i migliori 5 risultati di ricerca.</div>
                        </div>
                        <button class="btn btn-sm bg-green-500 text-white font-roboto ml-6 hover:bg-green-400" on:click={rerank}>
                            {#if rerankLoading}
                                <span class="loading loading-dots loading-md"></span>
                            {:else}
                                ottimizza
                            {/if}
                        </button>
                    </div>
                </div>      
                <div class="px-1"> <!--<div class="flex flex-wrap pb-4 px-1">-->
                    {#each doc_IDs as id}
                        <div class="card card-side bg-white shadow-xl my-2 md:mx-14 mx-1 flex-wrap"> <!--<div class="card card-side bg-white shadow-xl my-2 mx-auto max-w-96">-->
                            <figure class="text-purple-950 mx-auto my-auto w-24 ml-4">
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
                                        <div class="bg-warning m-2 py-2 px-4 text-black rounded-box font-semibold uppercase shadow-xl">{keyword}</div>
                                    {/each}
                                </div>
                                <div class="card-actions justify-end flex">
                                    <a href={documents[id].url} target="_blank" class="btn btn-sm bg-purple-950 text-white font-roboto hover:bg-purple-800">Vedi</a>
                                    <button class="btn btn-sm bg-purple-950 text-white font-roboto hover:bg-purple-800" on:click={analysis(id)}>Chiedi a LegalIA</button>
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
    .my_hero{
        height: 75vh;
        width: 100%;
        shape-outside: polygon(
            0 0,
            100% 0,
            100% 50%,
            0 100%
        );
        clip-path: polygon(
            0 0,
            100% 0,
            100% 50%,
            0 100%
        );
    }
</style>