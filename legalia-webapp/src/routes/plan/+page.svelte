<script>
    import '../../app.css';
    import Sidebar from '$lib/components/sidebar/sidebar.svelte';
    import Navbar from '$lib/components/navbar/navbar.svelte';
    import Plan from '$lib/components/plan/plan.svelte';
</script>

<div class="min-h-screen bg-white"  style="height: 100vh;">
	<Navbar/>
    <div class="container pt-2 min-w-full">
        <div class="grid grid-cols-5 h-full min-w-full" style="height: 82vh;">
            <!-- First column (1X width) -->
            <div class="col-span-1 overflow-y-auto">
                <Sidebar></Sidebar>
            </div>
            <div class="col-span-4">
                <Plan/>
            </div>
        </div>
    </div>
</div>