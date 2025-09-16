<script>  
	import { page } from '$app/stores';
</script>

<div class="navbar text-white py-6 relative z-30 font-roboto">
    <!-- NAVBAR START (solo logo) -->
    <div class="navbar-start flex items-center space-x-3">
		<!-- LOGO + BRAND -->
		<a href="/" class="flex items-center space-x-2 ml-4">
			<img src="/img/logo.svg" alt="Logo" class="h-10 w-10 drop-shadow-lg"/>
			<span class="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
				LegalIA
			</span>
		</a>
    </div>

    <!-- NAVBAR END (tutti i bottoni) -->
    <div class="navbar-end">
		<!-- Menu mobile -->
		<div class="dropdown lg:hidden">
			<div tabindex="0" role="button" class="btn btn-ghost">
				<svg xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor">
					<path stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16" />
				</svg>
			</div>
			<ul class="menu menu-sm dropdown-content bg-purple-950 rounded-box mt-3 w-52 p-2 shadow">
				{#if $page.url.pathname === '/search'}
					<li><a href="/app">Dashboard</a></li>
					<li><a href="/search">Ricerca</a></li>
				{:else if $page.url.pathname === "/"}
					<li><a class="nav-btn" href="#scopri">Scopri LegalIA</a></li>
					<li><a href="#demo">Demo</a></li>
					<li><a href="#chi-siamo">Chi siamo</a></li>
					<li><a href="/login">Accedi</a></li>
				{:else}
					<li><a href="/">Home</a></li>
				{/if}
			</ul>
		</div>

		<!-- Menu desktop -->
		<ul class="hidden lg:flex space-x-4 mr-4">
			{#if $page.url.pathname === '/search'}
				<li><a class="nav-btn" href="/app">Dashboard</a></li>
				<li><a class="nav-btn" href="/search">Ricerca</a></li>
			{:else if $page.url.pathname === "/"}
				<li><a class="nav-btn" href="#scopri">Scopri LegalIA</a></li>
				<li><a class="nav-btn" href="#demo">Demo</a></li>
				<li><a class="nav-btn" href="#chi-siamo">Chi siamo</a></li>
				<li><a class="nav-btn-cta" href="/login">Accedi</a></li>
			{:else}
				<li><a class="nav-btn" href="/">Home</a></li>
			{/if}  
		</ul>
    </div>
</div>

<style lang="postcss">
:global(.nav-btn) {
	@apply px-4 py-2 font-bold rounded-full transition duration-500;
	@apply bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500;
	background-size: 200% 200%;
	animation: gradientShift 5s ease infinite;
}

:global(.nav-btn:hover) {
	transform: scale(1.05);
	box-shadow: 0 0 20px rgba(56, 189, 248, 0.7);
}

:global(.nav-btn-cta) {
	@apply px-5 py-2 font-bold rounded-full transition duration-500 text-white;
	@apply bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500;
	background-size: 200% 200%;
	animation: gradientShift 4s ease infinite;
}

:global(.nav-btn-cta:hover) {
	transform: scale(1.1);
	box-shadow: 0 0 25px rgba(236, 72, 153, 0.8);
}

@keyframes gradientShift {
	0% { background-position: 0% 50%; }
	50% { background-position: 100% 50%; }
	100% { background-position: 0% 50%; }
}
</style>
