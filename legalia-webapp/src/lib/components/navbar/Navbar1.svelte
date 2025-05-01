<script>
	import { page } from '$app/stores';
</script>

<div class="font-roboto navbar relative z-30 py-6 text-white">
	<div class="navbar-start">
		<div class="dropdown">
			<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h8m-8 6h16"
					/>
				</svg>
			</div>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="menu dropdown-content rounded-box menu-sm mt-3 w-52 bg-purple-950 p-2 shadow"
			>
				{#if $page.url.pathname === '/search'}
					<li><a href="/app">Chatbot</a></li>
					<li><a href="/search">Ricerca</a></li>
				{:else if $page.url.pathname === '/'}
					<li><a href="#chi-siamo">Chi siamo</a></li>
					<li><a href="#demo">Demo</a></li>
					<li><a href="/login">Accedi</a></li>
				{:else}
					<li><a href="/">Home</a></li>
				{/if}
			</ul>
		</div>
		<h1 class="ml-8 text-xl font-bold">LegalIA</h1>
	</div>
	<div class="navbar-end hidden lg:flex">
		<ul class="menu menu-horizontal px-1">
			{#if $page.url.pathname === '/search'}
				<li class="mx-2 font-bold"><a href="/app">Chatbot</a></li>
				<li class="mx-2 font-bold"><a href="/search">Ricerca</a></li>
			{:else if $page.url.pathname === '/'}
				<li><a class="mx-2 font-bold" href="#chi-siamo">Chi siamo</a></li>
				<li><a class="mx-2 font-bold" href="#demo">Demo</a></li>
				<li><a class="mx-2 font-bold" href="/login">Accedi</a></li>
			{:else}
				<li><a class="mx-2 font-bold" href="/">Home</a></li>
			{/if}
		</ul>
	</div>
</div>
