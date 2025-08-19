<script lang="ts">
	import '../../app.css';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
    import SafeguardProjects from '$lib/components/safeguard/SafeguardProjects.svelte';
    import AttentionPoints from '$lib/components/safeguard/AttentionPoints.svelte';
	import SafguardEditor from '$lib/components/safeguard/SafguardEditor.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
				<SafeguardProjects></SafeguardProjects>
			</div>

			<!-- Center column (3X width) -->
			<div class="col-span-3">
				<SafguardEditor />
			</div>

			<!-- Last column (1X width) -->
			<div class="col-span-1">
				<AttentionPoints />
			</div>
		</div>
	</div>
</div>
