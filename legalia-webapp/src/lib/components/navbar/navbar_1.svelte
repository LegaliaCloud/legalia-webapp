<script>
  import { page } from '$app/stores';
</script>
<div class="navbar text-white py-6 relative z-30 font-roboto">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <ul tabindex="0" class="menu menu-sm dropdown-content bg-purple-950 rounded-box mt-3 w-52 p-2 shadow">
          {#if $page.url.pathname === '/search'}
            <li><a href="/">Home</a></li>
            <li><a href="/">Altro</a></li>
          {:else}
            <li><a href="#chi-siamo">Chi siamo</a></li>
            <li><a href="#demo">Demo</a></li>
          {/if}
        </ul>
      </div>
      <h1 class="text-xl ml-8 font-bold">LegalIA</h1>
    </div>
    <div class="navbar-end hidden lg:flex">
      <ul class="menu menu-horizontal px-1">
        {#if $page.url.pathname === '/search'}
            <li class="font-bold mx-2"><a href="/">Home</a></li>
            <li class="font-bold mx-2"><a href="/">Altro</a></li>
        {:else}
            <li><a class="font-bold mx-2" href="#chi-siamo">Chi siamo</a></li>
            <li><a class="font-bold mx-2" href="#demo">Demo</a></li>
        {/if}  
      </ul>
    </div>
</div>