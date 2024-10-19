<script>
  import UserMsg from "./user-msg.svelte";
  import ChatbotMsg from "./chatbot-msg.svelte";
  //let sender_text = "I hate you!";
</script>

<div class="mx-8  px-6 py-8 bg-purple-950 rounded-box">
  <ChatbotMsg></ChatbotMsg>
  <UserMsg></UserMsg>
  <div class = "grid grid-cols-8 gap-2 w-full mt-3">
    <div class="col-span-7">
        <input type="text" placeholder="Type here" class="input input-bordered w-full bg-white" />
    </div>
    <div class="col-span-1">
        <button class="btn w-full bg-green-200 text-black">Invia</button>
    </div>     
  </div>
</div>