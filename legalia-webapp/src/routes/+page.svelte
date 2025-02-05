<script>
    import '../app.css';
    import Navbar from '$lib/components/navbar/navbar_1.svelte';
    import BetaTesterForm from '$lib/components/betaTesterForm/betaTesterForm.svelte';
    import { onMount } from 'svelte';
    import Hero from '$lib/components/hero/hero.svelte';
    import MyParticles from '$lib/components/particles/my-particles.svelte';
    import Stats from '$lib/components/stats/stats.svelte';

    // Dati per i messaggi della chat
    const messages = [
        { text: "Salve, sono Legalia, assistente AI nell'ambito della legge italiana. In cosa posso assisterla oggi?", sender: false },
        { text: "Ciao! Potresti aiutarmi nella scrittura di un parere legale?", sender: true },
        { text: "Certamente! Mi spieghi il caso e sarò felice di aiutarla.", sender: false },
        { text: "Grazie mille! Ecco il caso: [...]", sender: true },
        { text: "Ecco il parere riguardo il caso che mi ha illustrato: [...]", sender: false }
    ];

    let displayedMessages = [];
    let animationStarted = false;

    // Funzione per aggiungere i messaggi gradualmente
    function addMessage(message, index) {
        setTimeout(() => {
            displayedMessages = [...displayedMessages, message];
        }, index * 2000);
    }

    // Avvia l'animazione dei messaggi
    function startAnimation() {
        if (!animationStarted) {
            animationStarted = true;
            messages.forEach((message, index) => {
                addMessage(message, index);
            });
        }
    }

    onMount(() => {
        const chatContainer = document.querySelector('.phone-1');

        const chatObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                    chatObserver.disconnect(); // Disconnetti l'observer dopo la prima attivazione
                }
            });
        }, {
            threshold: 0.5 // Attiva quando l'elemento è visibile al 50%
        });

        chatObserver.observe(chatContainer);
    });

    let totalSteps = 4;
    let completedSteps = 3;
    let progressPercentage = 0;

    // Aggiorna la barra di progresso
    function updateProgress() {
        let currentStep = 1;
        while(currentStep <= completedSteps){
            progressPercentage = (currentStep / totalSteps) * 100;
            currentStep++;
        }
    }

    onMount(() => {
        const progressSection = document.querySelector('.my-progress-line');

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateProgress();
                    progressObserver.disconnect(); // Disconnetti dopo la prima attivazione
                }
            });
        }, {
            threshold: 1 // Attiva quando il 100% dell'elemento è visibile
        });

        progressObserver.observe(progressSection);
    });
</script>

<div class="font-roboto bg-white mx-auto min-h-dvh">
    <div class="relative mb-24 hero-container">
        <Navbar />
        <Hero />
        <div class="hero-content mx-auto lg:px-24">
            <div class="hero-content-left z-20">
                <div class="hero-text text-white md:mr-20">
                    <h1 class="text-4xl font-bold mb-4">LegalIA</h1>
                    <h2 class="text-2xl font-bold mb-4">Il tuo alleato legale 2.0: veloce, preciso, intelligente</h2>
                    <p class="text-justify">Scopri il futuro! Concentrati su ciò che conta davvero mentre la nostra tecnologia rivoluziona il tuo studio legale direttamente dal tuo browser: un motore di ricerca AI potente ed intuitivo ti permetterà di trovare rapidamente leggi, sentenze e documenti giuridici rilevanti in maniera semplice e pertinente.</p>
                </div>
                <div class="w-full text-center">
                    <Stats />
                </div>
            </div>
            <div class="mockup-phone border-purple-950 z-20 shadow-xl">
                <div class="camera"></div>
                <div class="display">
                    <div class="artboard artboard-demo phone-1">
                        <div class="pt-8 pb-2 bg-purple-950 w-full text-center text-white font-bold">LegalIA</div>
                    <div class="chat-messages" id="chatMessages">
                        {#each displayedMessages as message (message.text)}
                            <div class="message {message.sender ? 'sender' : 'receiver'} text-sm">
                                {message.text}
                            </div>
                        {/each}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <section class="bg-white text-black my-24">
        <div class="mx-auto px-6 md:px-24" style="max-width: 1250px">
            <h2 class="text-2xl font-bold mb-12">Tutta la potenza dell'AI a tua disposizione</h2>
            <div class="feature mb-12">
                <div class="feature-icon">
                    <img src="./img/AI.png" class="feature-image" alt="AI icon">
                </div>
                <div class="feature-text">
                    <h3 class="text-lg font-bold my-3">Legalia: l'assistente AI legale per aiutarti in tutti i task</h3>
                    <p class="mb-3">Vieni a conoscere Legalia, la nostra assistente AI, che ti aiuterà e accompagnerà in tutti i task. Capace di riassumere documenti, rispondere a domande, generare pareri e molto altro.</p>
                </div>
            </div>
            <div class="feature mb-12">
                <div class="feature-text">
                    <h3 class="text-lg font-bold my-3">Ricerca avanzata tra norme, sentenze, e altri documenti</h3>
                    <p class="mb-3">Avrai a disposizione un semplice tool di ricerca per cercare tra migliaia di documenti legali, sempre aggiornati! Utilizziamo algoritmi avanzati basati su AI per fornirti solo i migliori risultati.</p>
                </div>
                <div class="feature-icon">
                    <img src="./img/library.png" class="feature-image" alt="Library">
                </div>
            </div>
            <div class="text-center"><a href="#demo" class="btn btn-lg bg-purple-950 text-white my-4 hover:bg-purple-800">Prova ricerca avanzata</a></div>
        </div>
    </section>
    
    <div id="chi-siamo" class="relative text-white my-24">
        <MyParticles id="tsparticles2"/>
        <div class="container mx-auto relative z-20 py-8">
            <h2 class="text-center text-2xl mb-6 font-bold">Chi siamo</h2>
            <div class="team-members">
                <div class="card glass w-[350px]">
                    <figure class="pt-1 h-[350px] w-full">
                      <img src="./img/vito_conversano.jpeg" alt="Vito Conversano" class="rounded-xl h-[325px] w-[325px]" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">Vito Conversano</h2>
                      <p>MBA, esperienza direttiva internazionale in società di consulenza strategica ed informatica. Interlacciato con ecosistema startup e portato a profitto alcune nel giro di un anno.</p>
                    </div>
                </div>
                <div class="card glass w-[350px] md:my-0 my-6">
                    <figure class="pt-1 h-[350px] w-full">
                      <img src="./img/lorenzo_valgimigli.jpeg" alt="Lorenzo Valgimigli" class="rounded-xl h-[325px] w-[325px]" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">Lorenzo Valgimigli</h2>
                      <p>Phd in Intelligenza Artificiale, ampia visione e esperienza operativa su tecnologie emergenti.</p>
                    </div>
                </div>
                <div class="card glass w-[350px]">
                    <figure class="pt-1 h-[350px] w-full">
                      <img src="./img/renzo_mancini.png" alt="Renzo Mancini" class="rounded-xl h-[325px] w-[325px]" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">Renzo Mancini</h2>
                      <p>Sviluppatore e tecnico informatico. Attuale studente di Ingegneria Informatica e dell'Automazione.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <section class="text-black my-24 mx-12 h-48 md:px-24">
        <div class="h-24">
            <h2 class="text-center font-bold text-2xl">Stato dei lavori</h2>
            <div class="my-progress-bar">
                <div class="my-progress-line">
                    <div class="my-progress-line-fill" style="width: {progressPercentage}%;"></div>
                </div>
                {#each Array(totalSteps).fill(0).map((_, index) => index) as step (step)}
                    <div class="my-progress-step {step < completedSteps ? 'active' : ''}" data-step={step}>
                        {#if step === 0}
                            <p>Idea e definizione progetto</p>
                        {/if}
                        {#if step === 1}
                            <p>Implementazione</p>
                        {/if}
                        {#if step === 2}
                            <p>Versione Beta</p>
                        {/if}
                        {#if step === 3}
                            <p>LegalIA è pronta!</p>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </section>
    
    <section id="demo" class="text-black text-center mt-24 py-12 md:px-24 relative">
        <MyParticles id="tsparticles3"/>
        <div class="container mx-auto relative z-20 pt-10">
            <div class="card glass text-white my-auto md:mx-auto mx-6 max-w-[750px] shadow-xl">
                <div class="card-body">
                    <h2 class="text-center font-bold text-2xl">Accedi alla demo gratuitamente</h2>
                    <p>Lavori anche tu nell'ambito legale e sei interessato a come utilizzare l'AI?</p>
                    <p>Diventa beta tester e prova Legalia in anteprima gratuitamente.</p>
                    <p>Cosa aspetti? Compila il form!</p>
                    <div class="card-actions mx-auto">
                        <BetaTesterForm />
                    </div>
                </div>
            </div>        
        </div>
    </section>
</div>

<style>
    @import '../landing_page.css';
</style>