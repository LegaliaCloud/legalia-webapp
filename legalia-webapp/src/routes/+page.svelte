<script>
	import '../app.css';
	import Navbar from '$lib/components/navbar/Navbar1.svelte';
	import BetaTesterForm from '$lib/components/betatesterform/BetaTesterForm.svelte';
	import { onMount } from 'svelte';
	import Hero from '$lib/components/hero/Hero.svelte';
	import MyParticles from '$lib/components/particles/MyParticles.svelte';
	import Stats from '$lib/components/stats/Stats.svelte';

	// Dati per i messaggi della chat
	const messages = [
		{
			text: "Salve, sono Legalia, assistente AI nell'ambito della legge italiana. In cosa posso assisterla oggi?",
			sender: false
		},
		{ text: 'Ciao! Potresti aiutarmi nella scrittura di un parere legale?', sender: true },
		{ text: 'Certamente! Mi spieghi il caso e sarò felice di aiutarla.', sender: false },
		{ text: 'Grazie mille! Ecco il caso: [...]', sender: true },
		{ text: 'Ecco il parere riguardo il caso che mi ha illustrato: [...]', sender: false }
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

		const chatObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						startAnimation();
						chatObserver.disconnect(); // Disconnetti l'observer dopo la prima attivazione
					}
				});
			},
			{
				threshold: 0.5 // Attiva quando l'elemento è visibile al 50%
			}
		);

		chatObserver.observe(chatContainer);
	});

	let totalSteps = 4;
	let completedSteps = 3;
	let progressPercentage = 0;

	// Aggiorna la barra di progresso
	function updateProgress() {
		let currentStep = 1;
		while (currentStep <= completedSteps) {
			progressPercentage = (currentStep / totalSteps) * 100;
			currentStep++;
		}
	}

	onMount(() => {
		const progressSection = document.querySelector('.my-progress-line');

		const progressObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						updateProgress();
						progressObserver.disconnect(); // Disconnetti dopo la prima attivazione
					}
				});
			},
			{
				threshold: 1 // Attiva quando il 100% dell'elemento è visibile
			}
		);

		progressObserver.observe(progressSection);
	});
</script>

<div class="font-roboto mx-auto min-h-dvh bg-white">
	<div class="hero-container relative mb-24">
		<Navbar />
		<Hero />
		<div class="hero-content mx-auto lg:px-24">
			<div class="hero-content-left z-20">
				<div class="hero-text text-white md:mr-20">
					<h1 class="mb-4 text-4xl font-bold">LegalIA</h1>
					<h2 class="mb-4 text-2xl font-bold">
						Il tuo alleato legale 2.0: veloce, preciso, intelligente
					</h2>
					<p class="text-justify">
						Scopri il futuro! Concentrati su ciò che conta davvero mentre la nostra tecnologia
						rivoluziona il tuo studio legale direttamente dal tuo browser: un motore di ricerca AI
						potente ed intuitivo ti permetterà di trovare rapidamente leggi, sentenze e documenti
						giuridici rilevanti in maniera semplice e pertinente.
					</p>
				</div>
				<div class="w-full text-center">
					<Stats />
				</div>
			</div>
			<div class="mockup-phone z-20 border-purple-950 shadow-xl">
				<div class="camera"></div>
				<div class="display">
					<div class="artboard artboard-demo phone-1">
						<div class="w-full bg-purple-950 pb-2 pt-8 text-center font-bold text-white">
							LegalIA
						</div>
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
	<section class="my-24 bg-white text-black">
		<div class="mx-auto px-6 md:px-24" style="max-width: 1250px">
			<h2 class="mb-12 text-2xl font-bold">Tutta la potenza dell'AI a tua disposizione</h2>
			<div class="feature mb-12">
				<div class="feature-icon">
					<img src="./img/AI.png" class="feature-image" alt="AI icon" />
				</div>
				<div class="feature-text">
					<h3 class="my-3 text-lg font-bold">
						Legalia: l'assistente AI legale per aiutarti in tutti i task
					</h3>
					<p class="mb-3">
						Vieni a conoscere Legalia, la nostra assistente AI, che ti aiuterà e accompagnerà in
						tutti i task. Capace di riassumere documenti, rispondere a domande, generare pareri e
						molto altro.
					</p>
				</div>
			</div>
			<div class="feature mb-12">
				<div class="feature-text">
					<h3 class="my-3 text-lg font-bold">
						Ricerca avanzata tra norme, sentenze, e altri documenti
					</h3>
					<p class="mb-3">
						Avrai a disposizione un semplice tool di ricerca per cercare tra migliaia di documenti
						legali, sempre aggiornati! Utilizziamo algoritmi avanzati basati su AI per fornirti solo
						i migliori risultati.
					</p>
				</div>
				<div class="feature-icon">
					<img src="./img/library.png" class="feature-image" alt="Library" />
				</div>
			</div>
			<div class="text-center">
				<a href="#demo" class="btn btn-lg my-4 bg-purple-950 text-white hover:bg-purple-800"
					>Prova ricerca avanzata</a
				>
			</div>
		</div>
	</section>

	<div id="chi-siamo" class="relative my-24 text-white">
		<MyParticles id="tsparticles2" />
		<div class="container relative z-20 mx-auto py-8">
			<h2 class="mb-6 text-center text-2xl font-bold">Chi siamo</h2>
			<div class="team-members">
				<div class="card glass w-[350px]">
					<figure class="h-[350px] w-full pt-1">
						<img
							src="./img/vito_conversano.jpeg"
							alt="Vito Conversano"
							class="h-[325px] w-[325px] rounded-xl"
						/>
					</figure>
					<div class="card-body items-center text-center">
						<h2 class="card-title">Vito Conversano</h2>
						<p>
							MBA, esperienza direttiva internazionale in società di consulenza strategica ed
							informatica. Interlacciato con ecosistema startup e portato a profitto alcune nel giro
							di un anno.
						</p>
					</div>
				</div>
				<div class="card glass my-6 w-[350px] md:my-0">
					<figure class="h-[350px] w-full pt-1">
						<img
							src="./img/lorenzo_valgimigli.jpeg"
							alt="Lorenzo Valgimigli"
							class="h-[325px] w-[325px] rounded-xl"
						/>
					</figure>
					<div class="card-body items-center text-center">
						<h2 class="card-title">Lorenzo Valgimigli</h2>
						<p>
							Phd in Intelligenza Artificiale, ampia visione e esperienza operativa su tecnologie
							emergenti.
						</p>
					</div>
				</div>
				<div class="card glass w-[350px]">
					<figure class="h-[350px] w-full pt-1">
						<img
							src="./img/renzo_mancini.png"
							alt="Renzo Mancini"
							class="h-[325px] w-[325px] rounded-xl"
						/>
					</figure>
					<div class="card-body items-center text-center">
						<h2 class="card-title">Renzo Mancini</h2>
						<p>
							Sviluppatore e tecnico informatico. Attuale studente di Ingegneria Informatica e
							dell'Automazione.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<section class="mx-12 my-24 h-48 text-black md:px-24">
		<div class="h-24">
			<h2 class="text-center text-2xl font-bold">Stato dei lavori</h2>
			<div class="my-progress-bar">
				<div class="my-progress-line">
					<div class="my-progress-line-fill" style="width: {progressPercentage}%;"></div>
				</div>
				{#each Array(totalSteps)
					.fill(0)
					.map((_, index) => index) as step (step)}
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

	<section id="demo" class="relative mt-24 py-12 text-center text-black md:px-24">
		<MyParticles id="tsparticles3" />
		<div class="container relative z-20 mx-auto pt-10">
			<div class="card glass mx-6 my-auto max-w-[750px] text-white shadow-xl md:mx-auto">
				<div class="card-body">
					<h2 class="text-center text-2xl font-bold">Accedi alla demo gratuitamente</h2>
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
