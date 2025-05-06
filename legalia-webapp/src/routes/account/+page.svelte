<script>
	import '../../app.css';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Profile from '$lib/components/profile/Profile.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		if (sessionStorage.getItem('authHeader') == null) {
			goto('/login');
		}
	});
</script>

<div class="min-h-screen bg-white">
	<Navbar />
	<div class="container min-w-full pt-2">
		<div class="grid h-full min-w-full grid-cols-5" style="height: 82vh;">
			<!-- First column (1X width) -->
			<div class="col-span-1">
				<Sidebar></Sidebar>
			</div>
			<div class="col-span-4">
				<Profile />
			</div>
		</div>
	</div>
</div>
