<script lang="ts">
    import '../../app.css';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
    import Chat from '$lib/components/chat/chat.svelte';
	import ChatHistory from '$lib/components/chat/chat_history.svelte';
	import ResearchResults from '$lib/components/research/research_results.svelte';
  </script>
  
  <div class="min-h-screen bg-white"  style="height: 100vh;">
	<Navbar />
	<div class="container pt-2 min-w-full">
	  <div class="grid grid-cols-5 h-full min-w-full" style="height: 82vh;">
		<!-- First column (1X width) -->
		<div class="col-span-1 overflow-y-auto">
		  <Sidebar></Sidebar>
		</div>
		
		<!-- Center column (3X width) -->
		<div class="col-span-3">
			<Chat></Chat>
			<div class="divider divider-purple-950 text-purple-950 mx-3">Storico conversazioni</div>
			<ChatHistory/>
		</div>

		<!-- Last column (1X width) -->
		<div class="col-span-1">
		  <ResearchResults/>
		</div>
	  </div>
	</div>
  </div>
