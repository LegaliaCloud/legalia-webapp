<script lang="ts">
    let max_research = 'INF';
    let max_storage = 2000;
    let max_pareri = 200;
    let used_research = 1225;
    let used_storage = 1600;
    let used_pareri = 25;
</script>
<div class="grid grid-cols-4 gap-4 h-full mx-8">
    <div class="col-span-1 m-auto">
        <div class="bg-purple-950 rounded-box p-4">
            <p class="text-white text-center text-xl font-bold mb-3">Il tuo piano</p>
            <div class="bg-white rounded-box py-4 px-8">
                <p class="text-lg text-green-700 text-center font-bold">Professional</p>
                <ul class="text-black text-center text-sm font-semibold mt-3">
                    <li>Chatbot</li>
                    <li>Ricerca {max_research == 'INF'? 'illimitata': max_research}</li>
                    <li>{max_pareri} pareri</li>
                    <li>{max_storage/1000}GB Storage</li>                    
                </ul>
            </div>
            <div class="text-center mt-3">
                <button class="btn bg-green-200 text-black hover:bg-green-400">Upgrade</button>
            </div>
        </div>
    </div>
    <div class="col-span-1 m-auto">
        <p class="text-center text-black font-bold text-lg my-3">Storage</p>
        <div
        class="radial-progress bg-neutral-200 text-purple-950 font-semibold"
        style="--value:{Math.floor((used_storage/max_storage)*100)}; --size:12rem; --thickness: 2rem;"
        role="progressbar">
            {used_storage/1000}/{max_storage/1000} GB
        </div>
    </div>
    <div class="col-span-1 m-auto">
        <p class="text-center text-black font-bold text-lg my-3">Pareri</p>
        <div
        class="radial-progress bg-neutral-200 text-purple-950 font-semibold"
        style="--value:{Math.floor((used_pareri/max_pareri)*100)}; --size:12rem; --thickness: 2rem;"
        role="progressbar">
            {used_pareri}/{max_pareri}
        </div>
    </div>
    <div class="col-span-1 m-auto">
        <p class="text-center text-black font-bold text-lg my-3">Ricerche</p>
        <div
        class="radial-progress bg-neutral-200 text-green-600 font-semibold"
        style="--value:100; --size:12rem; --thickness: 2rem;"
        role="progressbar">
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