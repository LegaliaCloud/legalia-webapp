<script lang="ts">
    import CheckIcon from "../misc/CheckIcon.svelte";
    import CancIcon from "../misc/CancIcon.svelte";
    import { decodeAttentionPointKind, validateAttentionPoint, makeEvident, deleteAttentionPoint } from "./SafeguardModule.svelte";
    import type { AttentionPoint } from "./SafeguardModule.svelte";

    export let attentionPoint:AttentionPoint ;
</script>

<div class="w-full flex items-center rounded-lg border-l-4 my-2"
    class:border-green-500={attentionPoint.state === 'human_validated'}
    class:border-red-700={attentionPoint.state === 'not_validated'}
    class:border-warning={attentionPoint.state === 'partial_validated'}
>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex-grow min-w-0 rounded-md py-3 px-4 bg-white text-black hover:bg-gray-200"
    style="min-width: 75%;"
    on:click={makeEvident(attentionPoint.start_position, attentionPoint.offset, attentionPoint.state)}>
        <div class="flex justify-between items-center">
            <div class="mr-2" style="min-width:65%; max-width:65%">
                <p class="text-sm font-medium truncate">{attentionPoint.text}</p>
                <p class="text-xs">Tipo: {decodeAttentionPointKind[attentionPoint.kind]}</p>
            </div>
            {#if attentionPoint.state != 'human_validated'}
                <div>
                    <button class="btn btn-sm bg-transparent border-transparent text-green-500 hover:bg-green-500 hover:border-green-500 hover:text-white tooltip capitalize"
                    data-tip="Valida"
                    on:click={validateAttentionPoint(attentionPoint)}>
                        <CheckIcon />
                    </button>
                </div>
            {/if}
            <div>
                <button class="btn btn-sm bg-transparent border-transparent text-red-700 hover:bg-red-700 hover:border-red-700 hover:text-white tooltip capitalize"
                data-tip="Cancella"
                on:click={deleteAttentionPoint(attentionPoint.id)}>
                    <CancIcon />
                </button>
            </div>
        </div>
    </div>
</div>