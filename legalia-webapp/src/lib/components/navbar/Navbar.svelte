<script lang="ts">
	import { goto } from '$app/navigation';
	// You might want to make this dynamic based on your auth system
	const userImageUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

	function logout() {
		sessionStorage.removeItem('authHeader');
		goto('/login');
	}
</script>

<div class="navbar bg-white px-10">
	<div class="navbar-start">
		<a href="./app" class="text-xl font-bold text-purple-950">LegalIA</a>
	</div>
	<div class="navbar-end">
		<ul class="menu menu-horizontal mr-4 px-1">
			<li><a class="mx-2 font-bold text-purple-800" href="./app">Chatbot</a></li>
			<li><a class="mx-2 font-bold text-purple-800" href="./search">Ricerca</a></li>
		</ul>
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="avatar btn btn-circle btn-ghost">
				<div class="border-1 w-10 rounded-full border-purple-950">
					<img alt="Tailwind CSS Navbar component" src={userImageUrl} />
				</div>
			</div>
			<ul
				class="menu dropdown-content rounded-box menu-sm z-[1] mt-3 w-52 bg-white p-2 text-black shadow"
			>
				<li><a href="./account" class="mx-auto">Profile</a></li>
				<li><a href="./plan" class="mx-auto">Plan</a></li>
				<li><button class="btn btn-error btn-sm mx-4" on:click={logout}>Logout</button></li>
			</ul>
		</div>
	</div>
</div>
