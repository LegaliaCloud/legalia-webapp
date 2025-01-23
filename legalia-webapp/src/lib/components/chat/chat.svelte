<script>
  import UserMsg from "./user-msg.svelte";
  import ChatbotMsg from "./chatbot-msg.svelte";
</script>

<div class="mx-8 px-6 py-4 bg-purple-950 rounded-box h-96">
  <div class="grid grid-rows-5 h-full">
    <div class="row-span-4">
      <ChatbotMsg text="Salve, sono Legalia, assistente AI nell'ambito della legge italiana. In cosa posso assisterla oggi?"></ChatbotMsg>
      <UserMsg></UserMsg>
    </div>
    <div class="row-span-1">
      <div class = "grid grid-cols-8 gap-2 mt-3">
        <div class="col-span-7">
            <input type="text" placeholder="Type here" class="input input-md input-bordered w-full bg-white" />
        </div>
        <div class="col-span-1">
            <button class="btn w-full bg-green-200 text-black hover:bg-green-400">Invia</button>
        </div>     
      </div>
    </div>
  </div>
</div>