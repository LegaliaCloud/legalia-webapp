<script>
    import ResearchItem from "./research_item.svelte";
    
    let norme = [
        {id: 1,title: "Proprietà privata", date: "09/11/2024", emettitore: "Senato"},
        {id: 2,title: "Proprietà privata", date: "09/11/2024", emettitore: "Senato"},
        {id: 3,title: "Proprietà privata", date: "09/11/2024", emettitore: "Senato"}
    ]

    let sentenze =[
        {id: 1,title: "Proprietà privata", date: "09/11/2024", emettitore: "TAR"}
    ]
</script>
<div class="bg-purple-950 h-full w-full rounded-l-xl position-items-center p-6" style=" background: linear-gradient(170deg, #3b0764 30%, #712da4);">
    <div class="text-center mb-4">
        <p class="text-xl font-bold text-white">Risultati ricerca</p>
    </div>
    <div>
        <p class="text-lg font-semibold text-white pb-2">Norme</p>
        {#each norme as norma}
            <ResearchItem title={norma.title} date={norma.date} emettitore={norma.emettitore}/>
        {/each}
    </div>
    <div class="divider"></div>
    <div>
        <p class="text-lg font-semibold text-white">Giurisprudenza</p>
        {#each sentenze as sentenza}
            <ResearchItem title={sentenza.title} date={sentenza.date} emettitore={sentenza.emettitore}/>
        {/each}
    </div>
</div>