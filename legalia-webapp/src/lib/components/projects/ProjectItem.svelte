<script lang="ts">
	import Dotsicon from '../misc/DotsIcon.svelte';
	import { project_toggle } from './ProjectsModule.svelte';

	export let id: number;
	export let projectname: string;
	export let active: boolean;
</script>

<div
	class="flex w-full items-center rounded-lg border-l-4 p-0 transition-colors duration-200
{active
		? 'border-green-400 bg-green-700  hover:bg-green-400'
		: 'border-purple-300 bg-purple-600 hover:bg-purple-700'}"
>
	<div class="min-w-0 flex-grow rounded-md bg-purple-900 py-3" style="min-width: 75%;">
		<p class="text-md text truncate pl-2 font-medium text-gray-100" style="width: 90%">
			{projectname}
		</p>
	</div>
	<div class="dropdown-active dropdown dropdown-end pr-2 pt-1">
		<div
			tabindex="0"
			role="button"
			class="btn btn-ghost btn-xs h-full hover:no-animation hover:bg-transparent"
			style="padding: 0"
		>
			<Dotsicon />
		</div>
		<ul class="menu dropdown-content rounded-box z-[2] w-44 bg-purple-200 shadow">
			<li>
				<p class="text-purple-950 hover:bg-purple-800 hover:text-purple-100">Rinomina progetto</p>
			</li>
			{#if !active}
				<li>
					<button
						on:click={() => project_toggle(id)}
						class="text-purple-950 hover:bg-purple-800 hover:text-purple-100"
						>Attiva progetto</button
					>
				</li>
			{/if}
			<li><button class="btn btn-error text-center align-middle">Elimina progetto</button></li>
		</ul>
	</div>
</div>
