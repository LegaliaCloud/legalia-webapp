<script lang="ts">
	import { onMount } from 'svelte';
	import CircularProgress from './CircularProgress.svelte'
	
	let planName = 'free';
	let renewalDate = new Date().toLocaleDateString();

	let max_storage = 200_000_000;
	let used_storage = 50_000_000;

	let max_safeguard_usage = 1;
	let used_safeguard_usage = 0;

	let max_research: number | string = 'INF';
	let used_research = 0;

	let max_model_messages = 50;
	let used_model_messages = 0;

	let max_defense_line_generation = 1;
	let used_defense_line_generation = 0;

	export let refreshCounter;

	async function fetchPlanData() {
    try {
        const authHeader = sessionStorage.getItem('authHeader') ?? '';
        const res = await fetch('/plan/', {
            headers: { 'Authorization': authHeader }
        });

        if (!res.ok) throw new Error('Errore API: ' + res.status);

        const data = await res.json();

        // Aggiorna il piano corrente
        planName = data.plan.name;
		renewalDate = new Date(data.plan.renewal_date).toLocaleString();

        // Aggiorna le quote
        max_storage = data.quota.storage.max;
        used_storage = data.quota.storage.used;

		max_safeguard_usage = data.quota.safeguard_usage.max;
		used_safeguard_usage = data.quota.safeguard_usage.used;

        max_research = data.quota.advanced_ai_research.max === 1000 ? 1000 : 'INF';
        used_research = data.quota.advanced_ai_research.used;

        max_model_messages = data.quota.model_messages.max;
        used_model_messages = data.quota.model_messages.used;

        max_defense_line_generation = data.quota.defense_line_generation.max;
        used_defense_line_generation = data.quota.defense_line_generation.used;

		} catch (err) {
			console.error('Errore durante il fetch del piano:', err);
    	}
	}

	onMount(fetchPlanData);

	$: if (refreshCounter !== undefined) {
		fetchPlanData();
	}

	const plansJSON = {
		free: { price: 0.0, quota: { max_storage_space: 200_000_000, max_safeguard_usage: 1, max_model_messages: 50, max_defense_line_generation: 1, max_advanced_ai_research: 1 }},
		betatester: { price: 0.0, quota: { max_storage_space: 1_000_000_000, max_safeguard_usage: 30, max_model_messages: 5000, max_defense_line_generation: 50, max_advanced_ai_research: 1000 }},
		basic: { price: 19.0, quota: { max_storage_space: 500_000_000, max_safeguard_usage: 2, max_model_messages: 150, max_defense_line_generation: 3, max_advanced_ai_research: 5 }},
		professional: { price: 59.0, quota: { max_storage_space: 2_000_000_000, max_safeguard_usage: 10, max_model_messages: 1000, max_defense_line_generation: 10, max_advanced_ai_research: 50 }},
		advanced: { price: 99.0, quota: { max_storage_space: 5_000_000_000, max_safeguard_usage: 20, max_model_messages: 3000, max_defense_line_generation: 20, max_advanced_ai_research: 150 }}
	};

	const planNames: (keyof typeof plansJSON)[] = ["free", "betatester", "basic", "professional", "advanced"];
	const planLabels = { free: "Free", betatester: "Beta Tester", basic: "Basic", professional: "Professional", advanced: "Advanced" };
	const planDescriptions = { free: "Good to get started", betatester: "For early adopters", basic: "For personal projects", professional: "Best for professionals", advanced: "For large teams" };

	function switchPlan(key: string) {
		console.log("Switching to plan:", key);
		planName = key; // Aggiorna localmente per testare
	}
</script>

<div class="p-8 bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen w-full">
	<div class="rounded-2xl bg-white shadow-xl p-8">

		<!-- HEADER -->
		<div class="flex justify-between items-center border-b pb-4 mb-6">
			<div>
				<h2 class="text-2xl font-semibold text-gray-800">Credits usage</h2>
				<p class="text-sm text-gray-500">Next renewal: {renewalDate}</p>
			</div>
		</div>

		<!-- PROGRESSI -->
		<div class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))] mb-10">

			<!-- Storage -->
			<div class="rounded-xl border border-gray-200 p-4 flex flex-col items-center shadow-sm">
				<p class="text-lg font-semibold text-gray-700 mb-4">Storage</p>
				<CircularProgress used={used_storage} max={max_storage} color="indigo" isBytes={true} />
			</div>

			<!-- Safeguard Usage -->
			<div class="rounded-xl border border-gray-200 p-4 flex flex-col items-center shadow-sm">
				<p class="text-lg font-semibold text-gray-700 mb-4">Safeguard Usage</p>
				<CircularProgress used={used_safeguard_usage} max={max_safeguard_usage} color="emerald" />
			</div>

			<!-- Model Messages -->
			<div class="rounded-xl border border-gray-200 p-4 flex flex-col items-center shadow-sm">
				<p class="text-lg font-semibold text-gray-700 mb-4">Model Messages</p>
				<CircularProgress used={used_model_messages} max={max_model_messages} color="pink" />
			</div>

			<!-- Defense Line Generation -->
			<div class="rounded-xl border border-gray-200 p-4 flex flex-col items-center shadow-sm">
				<p class="text-lg font-semibold text-gray-700 mb-4">Defense Line Generation</p>
				<CircularProgress used={used_defense_line_generation} max={max_defense_line_generation} color="yellow" />
			</div>

			<!-- Advanced AI Research -->
			<div class="rounded-xl border border-gray-200 p-4 flex flex-col items-center shadow-sm">
				<p class="text-lg font-semibold text-gray-700 mb-4">Advanced AI Research</p>
				<CircularProgress used={used_research} max={max_research} color="purple" />
			</div>
		</div>

		<!-- SUBSCRIPTION PLANS -->
		<div>
			<h3 class="text-xl font-semibold text-gray-800 mb-6">Subscription</h3>
			<div class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(240px,1fr))]">
				{#each planNames as key}
					<div class={`rounded-2xl border p-4 shadow transition ${
						planName === key
							? 'border-2 border-purple-600 bg-gradient-to-b from-purple-700 to-fuchsia-600 text-white'
							: 'border-gray-200 bg-white'
					}`}>
						<p class={`text-sm mb-2 ${planName === key ? 'text-white font-semibold' : 'text-gray-500'}`}>
							{planDescriptions[key]}
						</p>
						<h4 class={`text-2xl font-bold mb-2 ${planName === key ? 'text-white' : 'text-gray-800'}`}>
							{planLabels[key]}
						</h4>
						<p class={`text-3xl font-extrabold mb-4 ${planName === key ? 'text-white' : 'text-gray-900'}`}>
							${plansJSON[key].price} <span class="text-base font-medium">/user/mo</span>
						</p>
						<ul class={`text-sm space-y-1 mb-4 ${planName === key ? 'text-gray-100' : 'text-gray-600'}`}>
							<li>Storage: {(plansJSON[key].quota.max_storage_space / 1_000_000_000).toFixed(2)} GB</li>
							<li>Pareri: {plansJSON[key].quota.max_safeguard_usage}</li>
							<li>Advanced AI Research: {plansJSON[key].quota.max_advanced_ai_research}</li>
							<li>Model Messages: {plansJSON[key].quota.max_model_messages}</li>
							<li>Defense Line Generation: {plansJSON[key].quota.max_defense_line_generation}</li>
						</ul>
						<button class={`w-full px-4 py-2 rounded-lg ${
							planName === key
								? 'bg-white text-purple-700 font-bold shadow'
								: 'bg-gray-200 text-gray-500 cursor-not-allowed'
						}`} disabled>
							{planName === key ? 'Current Plan' : 'Not Available'}
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
