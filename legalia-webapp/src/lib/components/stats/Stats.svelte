<script>
	import { onMount } from 'svelte';
	//import Hammericon from "../misc/hammericon.svelte";
	//import LawBookIcon from "../misc/lawbookicon.svelte";
</script>

<div class="stats stats-vertical my-8 bg-white text-left shadow-xl lg:stats-horizontal">
	<div class="stat">
		<!--<div class="stat-figure text-primary ml-4">
        <Hammericon />
      </div>-->
		<div class="stat-title text-lg font-bold text-black">Sentenze</div>
		<div class="stat-value text-primary">+200K</div>
		<div class="stat-desc text-black">Tutta la giurisprudenza italiana</div>
	</div>

	<div class="stat">
		<!--<div class="stat-figure text-secondary">
        <LawBookIcon />
      </div>-->
		<div class="stat-title text-lg font-bold text-black">Norme</div>
		<div class="stat-value text-secondary">+500K</div>
		<div class="stat-desc text-black">La legge italiana sempre aggiornata</div>
	</div>
</div>
