<script lang="ts">
    import { goto } from "$app/navigation";
    // You might want to make this dynamic based on your auth system
    const userImageUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';

    function logout(){
      sessionStorage.removeItem("authHeader");
      goto('/login');
    }
  </script>
  
  <div class="navbar bg-white px-10">
    <div class="navbar-start">
      <a href="./app" class="text-purple-950 font-bold text-xl">LegalIA</a>
    </div>
    <div class="navbar-end">
      <ul class="menu menu-horizontal px-1 mr-4">
        <li><a class="font-bold text-purple-800 mx-2" href="./app">Dashboard</a></li>
        <li><a class="font-bold text-purple-800 mx-2" href="./search">Ricerca</a></li>
      </ul>
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 border-purple-950 border-1 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={userImageUrl} />
          </div>
        </div>
        <ul class="menu menu-sm dropdown-content bg-white text-black rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a href="./account" class="mx-auto">Profile</a></li>
          <li><a href="./plan" class="mx-auto">Plan</a></li>
          <li><button class="btn btn-sm mx-4 btn-error" on:click={logout}>Logout</button></li>
        </ul>
      </div>
    </div>
  </div>