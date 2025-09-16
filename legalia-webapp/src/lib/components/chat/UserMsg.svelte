<script lang="ts">
	import { marked } from "marked";

	let username = sessionStorage.getItem('username');
	export let text:string;
</script>

<div class="chat chat-end">
	<div class="avatar chat-image">
		<div class="w-10 rounded-full">
			<img alt="Tailwind CSS chat bubble component" src="./img/user.png" />
		</div>
	</div>
	<div class="chat-header text-white pr-2">
		{username}
	</div>
	<div class="chat-bubble bg-green-200 text-black prose">{@html marked(text)}</div>
	<!--<div class="chat-footer opacity-50">
        <time class="text-xs text-white">12:46</time>
    </div>-->
</div>
