<script>
	import '../app.css';
	import Navbar from '$lib/components/navbar/Navbar1.svelte';
	import BetaTesterForm from '$lib/components/betatesterform/BetaTesterForm.svelte';
	import { onMount } from 'svelte';
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

	function addMessage(message, index) {
		setTimeout(() => {
			displayedMessages = [...displayedMessages, message];
		}, index * 2000);
	}

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
						chatObserver.disconnect();
					}
				});
			},
			{
				threshold: 0.5
			}
		);

		chatObserver.observe(chatContainer);
	});

	let totalSteps = 4;
	let completedSteps = 3;
	let progressPercentage = 0;

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
						progressObserver.disconnect();
					}
				});
			},
			{
				threshold: 1
			}
		);

		progressObserver.observe(progressSection);
	});	
</script>

<div class="font-roboto mx-auto min-h-dvh bg-white">
	<!-- HERO -->
	<div class="relative mb-24 min-h-screen overflow-hidden bg-gradient-to-br from-[#0f0b1a] via-[#1a0f2e] to-[#220f3f]">
		<MyParticles id="tsparticles-hero" />
		<Navbar />
		<div class="relative z-20 flex flex-col items-center justify-center px-6 pt-32 text-center text-white lg:px-24">
		<h1 class="flex items-center text-8xl font-bold mb-4 tracking-tight">
			<img src="/img/logo.svg" alt="Logo" class="h-28 w-28"/>
			<span class="text-white">Legal</span><span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">IA</span>
		</h1>
			<h2 class="mb-6 max-w-3xl text-2xl font-semibold text-gray-200">
				Il tuo alleato AI legale, affidabile, rapido, preciso.
			</h2>
			<p class="mb-8 max-w-2xl text-lg text-gray-300">
				Paura delle allucinazioni? Vieni a scoprire
				<a href="#Safeguard" class="font-bold text-cyan-400 hover:underline">Safeguard</a>.
			</p>
			<div class="flex flex-col gap-4 sm:flex-row hero-buttons">
				<a href="#demo" class="nav-btn">Provami</a>
				<a href="#chi-siamo" class="nav-btn">Chi siamo</a>
			</div>

			<!-- Feature boxes -->
			<div class="mt-12 grid gap-6 sm:grid-cols-3 justify-center">
			<!-- Box 1 -->
			<div class="w-[280px] h-[120px] rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg p-4 flex flex-col justify-center items-center border border-purple-400/30 transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
				<h3 class="text-lg font-bold">500K Sentenze</h3>
				<p class="text-sm mt-1 text-center">civile e penale</p>
			</div>
			<!-- Box 2 -->
			<div class="w-[280px] h-[120px] rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg p-4 flex flex-col justify-center items-center border border-purple-400/30 transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
				<h3 class="text-lg font-bold">Tutti i codici</h3>
				<p class="text-sm mt-1 text-center">Per ogni bisogno</p>
			</div>
			<!-- Box 3 -->
			<div class="w-[280px] h-[120px] rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg p-4 flex flex-col justify-center items-center border border-purple-400/30 transition-all duration-300 hover:scale-105 hover:border-purple-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
				<h3 class="text-lg font-bold">Le migliori AI</h3>
				<p class="text-sm mt-1 text-center">chatta, scrivi documenti, cerca</p>
			</div>
		</div>
	</div>
	</div>

	<section id="scopri" class="relative my-24 px-6 md:px-24">
	<!-- Header Section -->
	<div class="mx-auto max-w-6xl text-center">
		<div class="inline-flex items-center space-x-2 rounded-lg bg-cyan-300 px-4 py-2">
		<img src="/img/puzzle.png" alt="Puzzle Icon" class="w-8 h-8">
		<span class="text-lg font-semibold text-black">FEATURES</span>
		</div>
		<h2 class="text-4xl font-bold mt-6 mb-4 text-[#0f0b1a]">
		Legal<span class="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">IA</span>
		</h2>
		<p class="mx-auto mb-6 max-w-3xl text-lg text-gray-700">
		Le tecnologie e gli strumenti più avanzati per assicurarti tutto ciò di cui hai bisogno
		</p>
	</div>
	<!-- GRID -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mt-12">
		<div class="flex justify-center">
		<div class="mockup-phone border-purple-700 shadow-2xl max-w-[340px] w-full">
			<div class="camera"></div>
			<div class="display">
			<div class="artboard artboard-demo phone-1">
				<div class="w-full bg-purple-950 pb-2 pt-8 text-center font-bold text-white">
				LegalIA
				</div>
				<div class="chat-messages p-2" id="chatMessages">
				{#each displayedMessages as message (message.text)}
					<div class="message {message.sender ? 'sender' : 'receiver'} mb-2 rounded-lg px-3 py-2 text-sm">
					{message.text}
					</div>
				{/each}
				</div>
			</div>
			</div>
		</div>
		</div>
		<div class="flex flex-col gap-8 h-full">
		<div id="scopriai" class="flex-1 rounded-2xl bg-purple-100 p-8 shadow-lg flex flex-col justify-center">
			<h3 class="text-2xl font-bold text-purple-900 mb-4">Le migliori AI</h3>  
			<p class="text-lg text-purple-900 leading-relaxed mb-6">
			Abbiamo selezionato e sviluppato le migliori AI per ogni situazione
			</p>
			<ul class="text-lg text-purple-900 space-y-2 mb-6">
			<li>→ Chatbot</li>
			<li>→ Ricerca avanzata</li>
			<li>→ Generazione linee difensive</li>
			</ul>
			<p class="text-lg text-purple-900 font-semibold">
			Testato da avvocati e magistrati
			</p>
		</div>
		<div class="flex-1 rounded-2xl bg-purple-100 p-6 shadow-lg border border-purple-200 flex flex-col justify-center">
			<h3 class="text-2xl font-bold text-purple-900 mb-2">Ampia base di dati</h3>
			<p class="text-lg text-purple-900 mb-4">
			Norme e giurisprudenza a portata di un 
			<a href="#!" class="text-blue-600 font-semibold hover:underline">click</a>
			</p>
			<ul class="text-base text-purple-900 space-y-1 list-disc list-inside">
			<li>500K sentenze</li>
			<li>Tutti i codici principali</li>
			<li>Motore di ricerca veloce e preciso</li>
			<li>Algoritmo di ricerca AI avanzato</li>
			<li>Carica i tuoi documenti nel tuo cloud privato</li>
			</ul>
		</div>
		</div>
		<div id="Safeguard" class="flex justify-center">
		<div class="rounded-2xl bg-purple-100 p-8 shadow-lg flex flex-col justify-between border border-purple-200 w-full min-h-[650px]">
			<div>
			<h3 class="text-2xl font-bold text-purple-900 text-center">Safeguard</h3>
			<p class="text-lg text-purple-900 mt-6 leading-relaxed text-center">
				Tutte le AI producono informazioni false dette 
				<span class="text-red-600 font-semibold">Allucinazioni</span>
			</p>
			<p class="text-lg text-purple-900 mt-6 leading-relaxed text-center">
				<span class="text-purple-700 font-semibold">Legal<span class="text-blue-600">IA</span></span> 
				ti offre il primo strumento per la loro identificazione e correzione 
				<span class="italic font-semibold">assistendo l’utente</span> durante la rilettura
			</p>
			<ul class="text-lg text-purple-900 mt-8 space-y-2 list-disc list-inside">
				<li>Identifica parti del testo ad alto rischio</li>
				<li>Mostra all’utente cosa controllare</li>
				<li>Tiene traccia delle modifiche dell’utente</li>
			</ul>
			</div>
			<div class="mt-12 text-center">
			<p class="text-lg font-semibold text-purple-900 mb-6">
				Prova oggi <span class="text-blue-600">LegalIA</span>
			</p>
			<a href="#demo" 
				class="inline-block bg-purple-950 text-white px-10 py-3 rounded-xl shadow-md hover:bg-purple-800 transition font-semibold">
				Provami
			</a>
			</div>
		</div>
		</div>
	</div>
	</section>

	<div id="chi-siamo" class="relative my-24 text-white"> 
	<MyParticles id="tsparticles2" />
		<div class="container relative z-20 mx-auto py-8">
			<div class="mx-auto max-w-6xl text-center mb-10">
				<div class="inline-flex items-center space-x-2 rounded-lg bg-cyan-300 px-4 py-2">
					<img src="/img/team.png" alt="Team Icon" class="w-8 h-8">
					<span class="text-lg font-semibold text-black">TEAM</span>
				</div>
			</div>
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
			<h2 style="text-align: center; font-size: 2rem; font-weight: bold; color: #3b0764;">Stato dei lavori</h2>
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
