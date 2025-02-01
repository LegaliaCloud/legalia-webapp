<script>
	import { onMount } from "svelte";
    //import Hammericon from "../misc/hammericon.svelte";
    //import LawBookIcon from "../misc/lawbookicon.svelte";
</script>
<div class="stats lg:stats-horizontal stats-vertical shadow-xl my-8 bg-white text-left">
    <div class="stat">
      <!--<div class="stat-figure text-primary ml-4">
        <Hammericon />
      </div>-->
      <div class="stat-title text-lg text-black font-bold">Sentenze</div>
      <div class="stat-value text-primary">+200K</div>
      <div class="stat-desc text-black">Tutta la giurisprudenza italiana</div>
    </div>
  
    <div class="stat">
      <!--<div class="stat-figure text-secondary">
        <LawBookIcon />
      </div>-->
      <div class="stat-title text-lg text-black font-bold">Norme</div>
      <div class="stat-value text-secondary">+500K</div>
      <div class="stat-desc text-black">La legge italiana sempre aggiornata</div>
    </div>
  </div>