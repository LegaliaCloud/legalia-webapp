<script>
    import '../app.css';
    import Navbar from '$lib/components/navbar/navbar_1.svelte';
    import BetaTesterForm from '$lib/components/betaTesterForm/betaTesterForm.svelte';
    import { onMount } from 'svelte';

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

<div class="font-serif bg-white mx-auto min-h-dvh">
    <Navbar />
    <section class="my_hero">
        <div class="hero-content mx-auto">
            <div class="hero-content-left">
                <div class="hero-text">
                    <h2 class="text-2xl font-bold mb-4">Neque porro quisquam est qui dolorem</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan erat vel mi scelerisque, ut egestas quam egestas. Nunc auctor erat nec interdum commodo.</p>
                </div>
                <div class="my-stats">
                    <div class="rounded-lg border-4 border-purple-950 bg-white p-3 my-6 mx-6 shadow-inner shadow-2xl text-center text-purple-950 max-w-72">
                        <h3 class="text-xl font-bold my-2">500K Norme</h3>
                        <p>Tutta la normativa italiana sempre aggiornata</p>
                    </div>
                    <div class="rounded-lg border-4 border-purple-950 bg-white p-3 my-6 mx-6 shadow-inner shadow-2xl text-center text-purple-950 max-w-72">
                        <h3 class="text-xl font-bold my-2">5K Sentenze</h3>
                        <p>Tutta la giurisprudenza italiana</p>
                    </div>
                </div>
            </div>
            <div class="mockup-phone">
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
    </section>
    <section class="bg-white text-black my-12">
        <div class="mx-auto px-6" style="max-width: 1250px">
            <h2 class="text-xl font-bold mb-3">Tutta la potenza dell'AI a tua disposizione</h2>
            <div class="feature">
                <div class="feature-icon">
                    <img src="./img/AI.png" class="feature-image" alt="AI icon">
                </div>
                <div class="feature-text">
                    <h3 class="text-lg font-bold my-3">Legalia: l'assistente AI legale per aiutarti in tutti i task</h3>
                    <p class="mb-3">Vieni a conoscere Legalia, la nostra assistente AI, che ti aiuterà e accompagnerà in tutti i task. Capace di riassumere documenti, rispondere a domande, generare pareri e molto altro.</p>
                </div>
            </div>
            <div class="feature">
                <div class="feature-text">
                    <h3 class="text-lg font-bold my-3">Ricerca avanzata tra norme, sentenze, e altri documenti</h3>
                    <p class="mb-3">Avrai a disposizione un semplice tool di ricerca per cercare tra migliaia di documenti legali, sempre aggiornati! Utilizziamo algoritmi avanzati basati su AI per fornirti solo i migliori risultati.</p>
                    <a href="/search" class="btn btn-sm bg-purple-950 text-white my-4">Prova ricerca avanzata</a>
                </div>
                <div class="feature-icon">
                    <img src="./img/library.png" class="feature-image" alt="Library">
                </div>
            </div>
        </div>
    </section>
    
    <section id="chi-siamo" class="bg-purple-950 text-white py-12">
        <div class="container mx-auto">
            <h2 class="text-center text-xl mb-6 font-bold">Chi siamo</h2>
            <div class="team-members">
                <div class="team-member">
                    <img class="mx-auto mb-6" src="./img/user.png" alt="Team Member 1">
                    <h3 class="text-lg font-bold mb-4">Nome Cognome</h3>
                    <p>
                        Pellentesque suscipit ipsum vitae ante iaculis auctor.
                        Proin commodo  tempus mollis. Donec vel porttitor purus.
                        Curabitur ut posuere urna, a  mattis ex. Donec sit amet auctor est.
                        Praesent a aliquam augue.
                    </p>
                </div>
                <div class="team-member my-6">
                    <img class="mx-auto mb-6" src="./img/user.png" alt="Team Member 1">
                    <h3 class="text-lg font-bold mb-4">Nome Cognome</h3>
                    <p>
                        Pellentesque suscipit ipsum vitae ante iaculis auctor.
                        Proin commodo  tempus mollis. Donec vel porttitor purus.
                        Curabitur ut posuere urna, a  mattis ex. Donec sit amet auctor est.
                        Praesent a aliquam augue.
                    </p>
                </div>
                <div class="team-member">
                    <img class="mx-auto mb-6" src="./img/user.png" alt="Team Member 1">
                    <h3 class="text-lg font-bold mb-4">Nome Cognome</h3>
                    <p>
                        Pellentesque suscipit ipsum vitae ante iaculis auctor.
                        Proin commodo  tempus mollis. Donec vel porttitor purus.
                        Curabitur ut posuere urna, a  mattis ex. Donec sit amet auctor est.
                        Praesent a aliquam augue.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="text-black my-12 mx-12 h-48">
        <div class="h-24">
            <h2 class="text-center font-bold text-xl">Stato dei lavori</h2>
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
                            <p>Realizzazione</p>
                        {/if}
                        {#if step === 2}
                            <p>Versione Beta</p>
                        {/if}
                        {#if step === 3}
                            <p>Lancio Legalia</p>
                        {/if}
                    </div>
                {/each}
            </div>
        </div>
    </section>
    
    <section id="demo" class="text-black text-center mt-12 pb-12">
        <div class="container mx-auto px-6" style="max-width: 1250px">
            <h2 class="text-2xl font-bold mb-4">Accedi alla demo gratuitamente</h2>
            <p class="my-2">Lavori anche tu nell'ambito legale e sei interessato a come utilizzare l'AI nel tuo lavoro?</p>
            <p class="my-2">Diventa un beta tester, prova la versione beta di Legalia in anteprima gratuitamente, rimani al corrente con gli sviluppi del progetto, consigliaci anche tu delle feature o modifiche che vorresti!</p>
            <p class="my-2">Cosa aspetti? Compila il form!</p>
            <BetaTesterForm />
        </div>
    </section>
</div>

<style>
    @import '../landing_page.css';
</style>