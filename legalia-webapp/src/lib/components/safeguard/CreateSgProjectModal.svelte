<script lang="ts">
    import ShildIcon from '../misc/ShildIcon.svelte';
    import { goto } from '$app/navigation';
	import { activateSgProject } from '../safeguard/SafeguardModule.svelte';
	import type { SgProject }  from '../safeguard/SafeguardModule.svelte';

    let SgProjectTitle:string = '';
	let createSgProjectModal:HTMLDialogElement;
	let SgLoadingModal:HTMLDialogElement;

    export let text:string;
    export let message_btn:boolean;

    async function startSafeguardProject(){
		const authHeader = sessionStorage.getItem('authHeader');
		if (SgProjectTitle != '' && authHeader != null) {
			SgLoadingModal.showModal()
			let payload = { 
				title: SgProjectTitle,
				text: text
			};
			SgProjectTitle = '';
			try {
				const response = await fetch('/safeguard/projects/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': authHeader
					},
					body: JSON.stringify(payload)
				});
				if (!response.ok) {
					let error = `Errore HTTP: ${response.status}`;
					throw new Error(error);
				}
				const newProject:SgProject = await response.json();
				activateSgProject(newProject);
				goto('/safeguard');
			} catch (err) {
				console.log(err);
			} finally{
				SgLoadingModal.close()
			}
		}
	}
</script>

{#if message_btn}
    <button 
			class="btn btn-xs tooltip rounded-full text-black capitalize bg-neutral-200 border-neutral-200 hover:text-white" 
			data-tip="Correggi con SafeGuard"
			on:click={createSgProjectModal.showModal()}
			>
				<ShildIcon />
	</button>
    {:else}
	<form method="dialog">
		<button 
			class="btn bg-purple-950 capitalize text-white" 
			on:click={createSgProjectModal.showModal()}
			>
				<ShildIcon /> Correggi con SafeGuard
		</button>
	</form>
{/if}

<dialog bind:this={createSgProjectModal} class="modal">
	<div class="modal-box bg-white text-black">
		<h3 class="text-lg font-bold">Crea un nuovo progetto SafeGuard</h3>
		<p class="text-right text-sm">Premi ESC per uscire</p>
		<div>
			<div class="my-4 w-full">
				<input
					bind:value={SgProjectTitle}
					type="text"
					placeholder="Titolo progetto SafeGuard"
					class="input w-full bg-neutral-200 text-black"
					required
				/>
		</div>
		<div class="text-center">
			<form method="dialog">
				<!-- if there is a button in form, it will close the modal -->
				<button
					on:click={startSafeguardProject}
					class="btn bg-purple-950 capitalize text-white">Crea progetto SafeGuard</button
				>
			</form>
		</div>
	</div>
</dialog>

<dialog bind:this={SgLoadingModal} class="modal">
	<div class="modal-box bg-white text-black text-center text-lg">
		<h4 class="mb-6 font-bold">LegalIA sta analizzando il testo</h4>
		<span class="loading loading-ring text-purple-950" style="height: 100px; width: 100px;"></span>
		<p class="text-sm">Individuo allucinazioni...</p>
	</div>
</dialog>
