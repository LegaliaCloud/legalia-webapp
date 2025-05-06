<script lang="ts">
    import '../../app.css';
    import MyParticles from '$lib/components/particles/MyParticles.svelte';
    import Navbar from '$lib/components/navbar/Navbar1.svelte';
    import {goto} from '$app/navigation';
	import { onMount } from 'svelte';

    let username:string = "", password:string = "";
    let err:string = "";
    
    onMount(() => {
        if(sessionStorage.getItem("authHeader") != null){
            goto('/app');
        }
    });

    async function authenticate() {
        if(username != "" && password != ""){
            err = "";
            try {
                // Crea l'authentication header in formato Basic Auth
                const authString = `${username}:${password}`;
                const encodedAuth = btoa(authString); // base64 encoding
                const authHeader = `Basic ${encodedAuth}`;
                
                // Tenta una richiesta a un endpoint protetto per verificare le credenziali
                const response = await fetch('/project/', {
                    method: 'GET',
                    headers: {
                        'Authorization': authHeader
                    }
                });
                
                if (!response.ok) {
                    if(response.status==401){
                        err = "Invalid username or password";
                    } else {
                        err = "Authentication proccess faild";
                    }
                    throw new Error(err);
                }
                
                // Salva l'authentication header in sessione
                sessionStorage.setItem('authHeader', authHeader);
                sessionStorage.setItem('username', username);
                goto('/app');
            } catch (error) {
                console.error('Errore durante l\'autenticazione:', error);
            }
        }
    }
</script>

<section class="relative" style="height:100vh">
    <Navbar/>
    <MyParticles id="loginParticles"/>
    <div class="card bg-white text-black w-96 z-20 shadow-xl centered">
        <div class="card-body">
            <h2 class="text-xl font-bold text-center">Login</h2>
            <div role="alert" class="alert alert-vertical bg-purple-950 text-white sm:alert-horizontal">
                <div>
                  <h3 class="font-bold">Non hai un account?</h3>
                  <div class="text-xs">Invia richiesta per diventare betatester</div>
                </div>
                <a href="/#demo" class="btn btn-sm text-white bg-green-500 border-green-500 hover:bg-green-400 hover:border-green-400">Invia</a>
            </div>
            {#if err != ""}
                <div role="alert" class="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{err}</span>
                </div>
            {/if}
            <label class="input input-bordered flex items-center gap-2 bg-neutral-200 my-2">
                <svg class="opacity-50" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                </svg>
                <input bind:value={username} type="text" class="grow bg-neutral-200" placeholder="Username" required/>
            </label>
            
            <label class="input input-bordered flex items-center gap-2 bg-neutral-200 my-2">
                <svg class="opacity-50" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                </svg>
                <input bind:value={password} type="password" class="grow bg-neutral-200" placeholder="Password" required/>
            </label>

            <div class="card-actions justify-center">
                <button on:click={authenticate} class="btn bg-purple-950 text-white capitalize">Login</button>
            </div>
            
        </div>
    </div>
</section>

<style>
    .centered {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>