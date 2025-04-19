<script lang="ts">
    import '../../app.css';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
    import Chat from '$lib/components/chat/chat.svelte';
	import ResearchResults from '$lib/components/researchResult/researchResultsSidebar.svelte';
	import {goto} from '$app/navigation';
	import { onMount } from 'svelte';

	function checkAuthentication(){
		if(sessionStorage.getItem('authHeader') == null){
			goto('/login');
		}
	}

	onMount(checkAuthentication);
  </script>
  
  <div class="min-h-screen bg-white">
	<Navbar />
	<div class="container pt-2 min-w-full">
	  <div class="grid grid-cols-5 h-full min-w-full">
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
		  <ResearchResults/>
		</div>
	  </div>
	</div>
  </div>