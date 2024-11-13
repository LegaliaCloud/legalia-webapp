<script lang="ts">
    import { page } from '$app/stores';
    
    
    // You might want to make this dynamic based on your auth system
    const userImageUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp';
  </script>
  
  <nav class="navbar bg-white">
    <div class="flex-1 ml-10">
      <a href="/" class="font-bold text-purple-900 text-2xl">LegalIA</a>
    </div>
    
    <div class="flex-none gap-4 mr-24">
      <div class="hidden md:flex text-gray-800">
        <ul class="menu menu-horizontal px-1 text-lg mr-7">
          <li>
            <a 
              href="/app" 
              class="hover:text-purple-600 {$page.url.pathname === '/app' ? 'text-purple-600' : ''}"
            >
              Chatbot
            </a>
          </li>
          <li>
            <a 
              href="app/search" 
              class="hover:text-purple-600 {$page.url.pathname === 'app/search' ? 'text-purple-600' : ''}"
            >
              Ricerca
            </a>
          </li>
        </ul>
      </div>
      
      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar w-16">
          <div class="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-[0.3px]">
            <img alt="User avatar" src={userImageUrl} />
          </div>
        </div>
        <ul class="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow mt-2 items-center translate-x-14 text-l text-slate-900">
          <li><a class="hover:bg-purple-950 hover:text-white" href="/plan">Il tuo abbonamento</a></li>
          <li><a class="hover:bg-purple-950 hover:text-white" href="/account">Il tuo account</a></li>
          <li class="mt-5">
            <button 
              class="btn btn-error btn-sm text-white w-full"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>