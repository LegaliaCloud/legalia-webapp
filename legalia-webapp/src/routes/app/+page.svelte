<script lang="ts">
	import '../../app.css';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Chat from '$lib/components/chat/Chat.svelte';
	import ResearchResults from '$lib/components/researchresult/ResearchResultsSidebar.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	function checkAuthentication() {
		if (sessionStorage.getItem('authHeader') == null) {
			goto('/login');
		}
	}

	onMount(checkAuthentication);
</script>

<div class="min-h-screen bg-white">
	<Navbar />
	<div class="container min-w-full pt-2">
		<div class="grid h-full min-w-full grid-cols-5">
			<!-- First column (1X width) -->
			<div class="col-span-1">
				<Sidebar></Sidebar>
			</div>

			<!-- Center column (3X width) -->
			<div class="col-span-3">
				<Chat></Chat>
			</div>

			<!-- Last column (1X width) -->
			<div class="col-span-1">
				<ResearchResults />
			</div>
		</div>
	</div>
</div>
