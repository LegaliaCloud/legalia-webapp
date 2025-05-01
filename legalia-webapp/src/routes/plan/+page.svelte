<script>
    import '../../app.css';
    import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
    import Navbar from '$lib/components/navbar/Navbar.svelte';
    import Plan from '$lib/components/plan/Plan.svelte';
    import {onMount} from 'svelte';
    import {goto} from '$app/navigation';

    onMount(() => {
        if(sessionStorage.getItem('authHeader') == null){
			goto('/login');
		}
    });
</script>

<div class="min-h-screen bg-white">
	<Navbar/>
    <div class="container pt-2 min-w-full">
        <div class="grid grid-cols-5 h-full min-w-full" style="height: 82vh;">
            <!-- First column (1X width) -->
            <div class="col-span-1">
                <Sidebar></Sidebar>
            </div>
            <div class="col-span-4">
                <Plan/>
            </div>
        </div>
    </div>
</div>