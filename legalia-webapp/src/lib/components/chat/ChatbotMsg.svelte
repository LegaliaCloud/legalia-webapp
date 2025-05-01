<script lang="ts">
	import { marked } from 'marked';
	export let text: string;
</script>

<div class="chat chat-start">
	<div class="avatar chat-image">
		<div class="w-10 rounded-full">
			<img alt="Tailwind CSS chat bubble component" src="/img/AI.png" />
		</div>
	</div>
	<div class="chat-header pl-2">Legal IA</div>
	<div class="chat-bubble text-wrap bg-purple-300 text-black">
		{@html marked(text)}
	</div>
	<!--<div class="chat-footer opacity-50">
        <time class="text-xs text-white">12:45</time>
    </div>-->
</div>
