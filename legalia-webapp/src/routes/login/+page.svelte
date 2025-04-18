<script lang="ts">
    import '../../app.css';
    import MyParticles from '$lib/components/particles/my-particles.svelte';
    import {goto} from '$app/navigation';

    let username:string, password:string;

    async function authenticate() {
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
                throw new Error('Autenticazione fallita');
            }
            
            // Salva l'authentication header in sessione
            sessionStorage.setItem('authHeader', authHeader);
            goto('/app');
        } catch (error) {
            console.error('Errore durante l\'autenticazione:', error);
            throw error;
        }
    }

    // Controlla se l'utente è autenticato
    export function isAuthenticated() {
        return sessionStorage.getItem('authHeader') !== null;
    }

    // Recupera l'header di autenticazione
    export function getAuthHeader() {
        return sessionStorage.getItem('authHeader');
    }

    // Logout - rimuove l'header
    export function logout() {
        sessionStorage.removeItem('authHeader');
    }
</script>

<section class="relative" style="height:100vh">
    <MyParticles id="loginParticles"/>
    <div class="card bg-white text-black w-96 z-20 shadow-xl centered">
        <div class="card-body">
            <h2 class="text-xl font-bold text-center">Login</h2>
            
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