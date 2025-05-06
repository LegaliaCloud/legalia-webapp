<script lang="ts">
	let max_research = 'INF';
	let max_storage = 2000;
	let max_pareri = 200;
	let used_research = 1225;
	let used_storage = 1600;
	let used_pareri = 25;
</script>

<div class="mx-8 grid h-full grid-cols-4 gap-4">
	<div class="col-span-1 m-auto">
		<div class="rounded-box bg-purple-950 p-4">
			<p class="mb-3 text-center text-xl font-bold text-white">Il tuo piano</p>
			<div class="rounded-box bg-white px-8 py-4">
				<p class="text-center text-lg font-bold text-green-700">Professional</p>
				<ul class="mt-3 text-center text-sm font-semibold text-black">
					<li>Chatbot</li>
					<li>Ricerca {max_research == 'INF' ? 'illimitata' : max_research}</li>
					<li>{max_pareri} pareri</li>
					<li>{max_storage / 1000}GB Storage</li>
				</ul>
			</div>
			<div class="mt-3 text-center">
				<button class="btn bg-green-200 text-black hover:bg-green-400">Upgrade</button>
			</div>
		</div>
	</div>
	<div class="col-span-1 m-auto">
		<p class="my-3 text-center text-lg font-bold text-black">Storage</p>
		<div
			class="radial-progress bg-neutral-200 font-semibold text-purple-950"
			style="--value:{Math.floor(
				(used_storage / max_storage) * 100
			)}; --size:12rem; --thickness: 2rem;"
			role="progressbar"
		>
			{used_storage / 1000}/{max_storage / 1000} GB
		</div>
	</div>
	<div class="col-span-1 m-auto">
		<p class="my-3 text-center text-lg font-bold text-black">Pareri</p>
		<div
			class="radial-progress bg-neutral-200 font-semibold text-purple-950"
			style="--value:{Math.floor(
				(used_pareri / max_pareri) * 100
			)}; --size:12rem; --thickness: 2rem;"
			role="progressbar"
		>
			{used_pareri}/{max_pareri}
		</div>
	</div>
	<div class="col-span-1 m-auto">
		<p class="my-3 text-center text-lg font-bold text-black">Ricerche</p>
		<div
			class="radial-progress bg-neutral-200 font-semibold text-green-600"
			style="--value:100; --size:12rem; --thickness: 2rem;"
			role="progressbar"
		>
			{used_research}/{max_research}
		</div>
	</div>
	<!--<div class="col-span-3 my-auto">
        <p class="text-center text-black font-bold text-xl">Contatori</p>
        <div class="grid-rows-3">
            <div class="my-4">
                <label for=""></label>
                <progress class="progress progress-primary w-full h-4" value="70" max="100"></progress>
            </div>
            <div class="my-4">
                <progress class="progress progress-primary w-full h-4" value="70" max="100"></progress>
            </div>
            <div class="my-4">
                <progress class="progress progress-primary w-full h-4" value="70" max="100"></progress>
            </div>
        </div>
    </div>-->
</div>
