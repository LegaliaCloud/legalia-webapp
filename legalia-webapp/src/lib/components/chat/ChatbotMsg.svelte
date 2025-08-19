<script lang="ts">
	import ShildIcon from '../misc/ShildIcon.svelte';
	import { marked } from 'marked';
	import { goto } from '$app/navigation';
	import { activateSgProject } from '../safeguard/SafeguardModule.svelte';
	import type { SgProject }  from '../safeguard/SafeguardModule.svelte';
 
	export let text: string;

	let SgProjectTitle:string = '';
	let createSgProjectModal:HTMLDialogElement;
	

	async function startSafeguardProject(){
		const authHeader = sessionStorage.getItem('authHeader');
		if (SgProjectTitle != '' && authHeader != null) {
			let payload = { 
				title: SgProjectTitle,
				text: text,
				status: "review",
				progress: 0
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
				const newProject:SgProject = await response.json()
				activateSgProject(newProject)
				goto('/safeguard')
			} catch (err) {
				console.log(err);
			}
		}
	}
</script>

<div class="chat chat-start">
	<div class="avatar chat-image">
		<div class="w-10 rounded-full">
			<img alt="Tailwind CSS chat bubble component" src="/img/AI.png" />
		</div>
	</div>
	<div class="chat-header pl-2 text-white flex mb-1">
		<p class="mr-1">Legalia</p>
		{#if text !== '<span class="loading loading-dots loading-md"></span>'}
			<button 
			class="btn btn-xs tooltip rounded-full text-black capitalize bg-neutral-200 border-neutral-200 hover:text-white" 
			data-tip="Correggi con SafeGuard"
			on:click={createSgProjectModal.showModal()}
			>
				<ShildIcon />
			</button>
		{/if}
	</div>
	<div class="chat-bubble text-wrap bg-purple-300 text-black">
		{@html marked(text)}
	</div>
	<!--<div class="chat-footer opacity-50">
        <time class="text-xs text-white">12:45</time>
    </div>-->
</div>

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


