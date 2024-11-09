<script>
    let history = [
        {id: 1, chat_title: "Requisiti del contratto 1234", date: "09/11/2024"},
        {id: 2, chat_title: "Requisiti del contratto", date: "09/11/2024"},
        {id: 3, chat_title: "Requisiti del contratto", date: "09/11/2024"}
    ];
</script>
<div class="grid grid-cols-3 gap-1 w-full px-6 place-items-center">
    {#each history as chat}
        <div class="bg-purple-950 w-52 h-24 py-2 px-4 rounded-box hover:w-full">
            <div class="text-center text-white truncate">
                <p class="font-bold">{chat.chat_title}</p>
                <p class="text-sm">{chat.date}</p>
                <div class="py-1">
                    <button class="btn btn-sm bg-green-200 text-black hover:bg-green-400">Chat</button>
                </div>          
            </div>
        </div>
    {/each}
</div>