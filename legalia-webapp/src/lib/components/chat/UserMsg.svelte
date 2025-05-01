<script lang="ts">
	let username = 'You';
	export let text: String;
</script>

<div class="chat chat-end">
	<div class="avatar chat-image">
		<div class="w-10 rounded-full">
			<img alt="Tailwind CSS chat bubble component" src="./img/user.png" />
		</div>
	</div>
	<div class="chat-header pr-2">
		{username}
	</div>
	<div class="chat-bubble bg-green-200 text-black">{@html text}</div>
	<!--<div class="chat-footer opacity-50">
        <time class="text-xs text-white">12:46</time>
    </div>-->
</div>
