<script lang="ts">
    import { marked } from "marked";
    export let text: string; 
</script>

<div class="chat chat-start">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img
          alt="Tailwind CSS chat bubble component"
          src="/img/AI.png" />
      </div>
    </div>
    <div class="chat-header text-white pl-2">
      Legalia
    </div>
    <div class="chat-bubble bg-purple-300 text-black text-wrap">
      {@html marked(text)}
    </div>
    <!--<div class="chat-footer opacity-50">
        <time class="text-xs text-white">12:45</time>
    </div>-->
</div>