<script>
    import '../../app.css';
    import Sidebar from '$lib/components/sidebar/sidebar.svelte';
    import Navbar from '$lib/components/navbar/navbar.svelte';
    import Profile from '$lib/components/profile/profile.svelte';
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
                <Profile/>
            </div>
        </div>
    </div>
</div>