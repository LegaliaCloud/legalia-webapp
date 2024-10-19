<script>
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
        const chatContainer = document.querySelector('.chat-container');

        const chatObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAnimation();
                    chatObserver.disconnect(); // Disconnetti l'observer dopo la prima attivazione
                }
            });
        }, {
            threshold: 1 // Attiva quando l'elemento è completamente visibile
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
        const progressSection = document.querySelector('.progress');

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

<section class='no-daisyui'>
    <header>
        <div class="container">
            <nav>
                <h1>Legal IA</h1>
                <ul>
                    <li><a href="#chi-siamo">Chi siamo</a></li>
                    <li><a href="#demo">Demo</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <section class="hero">
        <div class="container hero-content">
            <div class="hero-content-left">
                <div class="hero-text">
                    <h2>Neque porro quisquam est qui dolorem</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan erat vel mi scelerisque, ut egestas quam egestas. Nunc auctor erat nec interdum commodo.</p>
                </div>
                <div class="container stats">
                    <div class="stat-box">
                        <h3>500K Norme</h3>
                        <p>Tutta la normativa italiana sempre aggiornata</p>
                    </div>
                    <div class="stat-box">
                        <h3>5K Sentenze</h3>
                        <p>Tutta la giurisprudenza italiana</p>
                    </div>
                </div>
            </div>
            <div class="chat-container">
                <div class="chat-header">Legalia</div>
                <div class="chat-messages" id="chatMessages">
                    {#each displayedMessages as message (message.text)}
                        <div class="message {message.sender ? 'sender' : 'receiver'}">
                            {message.text}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </section>
    <section class="features">
        <div class="container">
            <h2>Tutta la potenza dell'AI a tua disposizione</h2>
            <div class="feature">
                <div class="feature-icon">
                    <img src="./img/AI.png" class="feature-image" alt="AI icon">
                </div>
                <div class="feature-text">
                    <h3>Legalia: l'assistente AI legale per aiutarti in tutti i task</h3>
                    <p>Vieni a conoscere Legalia, la nostra assistente AI, che ti aiuterà e accompagnerà in tutti i task. Capace di riassumere documenti, rispondere a domande, generare pareri e molto altro.</p>
                </div>
            </div>
            <div class="feature">
                <div class="feature-text">
                    <h3>Ricerca avanzata tra norme, sentenze, e altri documenti</h3>
                    <p>Avrai a disposizione un semplice tool di ricerca per cercare tra migliaia di documenti legali, sempre aggiornati! Utilizziamo algoritmi avanzati basati su AI per fornirti solo i migliori risultati.</p>
                </div>
                <div class="feature-icon">
                    <img src="./img/library.png" class="feature-image" alt="Library">
                </div>
            </div>
        </div>
    </section>
    
    <section id="chi-siamo" class="team">
        <div class="container">
            <h2>Chi siamo</h2>
            <div class="team-members">
                <div class="team-member">
                    <img src="./img/user.png" alt="Team Member 1">
                    <h3>Nome Cognome</h3>
                    <p>
                        Pellentesque suscipit ipsum vitae ante iaculis auctor.
                        Proin commodo  tempus mollis. Donec vel porttitor purus.
                        Curabitur ut posuere urna, a  mattis ex. Donec sit amet auctor est.
                        Praesent a aliquam augue.
                    </p>
                </div>
                <div class="team-member">
                    <img src="./img/user.png" alt="Team Member 1">
                    <h3>Nome Cognome</h3>
                    <p>
                        Pellentesque suscipit ipsum vitae ante iaculis auctor.
                        Proin commodo  tempus mollis. Donec vel porttitor purus.
                        Curabitur ut posuere urna, a  mattis ex. Donec sit amet auctor est.
                        Praesent a aliquam augue.
                    </p>
                </div>
                <div class="team-member">
                    <img src="./img/user.png" alt="Team Member 1">
                    <h3>Nome Cognome</h3>
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
    
    <section class="progress">
        <div class="container">
            <h2 class="progress-title">Stato dei lavori</h2>
            <div class="progress-bar">
                <div class="progress-line">
                    <div class="progress-line-fill" style="width: {progressPercentage}%;"></div>
                </div>
                {#each Array(totalSteps).fill(0).map((_, index) => index) as step (step)}
                    <div class="progress-step {step < completedSteps ? 'active' : ''}" data-step={step}>
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
    
    <section id="demo" class="cta">
        <div class="container">
            <h2>Accedi alla demo gratuitamente</h2>
            <p>Lavori anche tu nell'ambito legale e sei interessato a come utilizzare l'AI nel tuo lavoro?</p>
            <p>Diventa un beta tester, prova la versione beta di Legalia in anteprima gratuitamente, rimani al corrente con gli sviluppi del progetto, consigliaci anche tu delle feature o modifiche che vorresti!</p>
            <p>Cosa aspetti? Compila il form!</p>
            <a href="/app" class="button">Diventa betatester</a>
        </div>
    </section>
</section>

<style>
    @import '../landing_page.css';
</style>