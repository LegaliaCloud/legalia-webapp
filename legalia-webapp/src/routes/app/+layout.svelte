<script lang="ts">
    import '../../app.css';
	import Navbar from '$lib/components/navbar/navbar.svelte';
	import Sidebar from '$lib/components/sidebar/sidebar.svelte';
    import Chat from '$lib/components/chat/chat.svelte';
  </script>
  
  <div class="min-h-screen bg-white">
	<Navbar />
	
	<main class="container py-8">
	  <div class="grid grid-cols-5">
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
		  <!-- Additional content can go here -->
		</div>
	  </div>
	</main>
  </div>
