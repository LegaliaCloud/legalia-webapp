<script lang="ts">
    const colors = ['green-500', 'secondary', 'purple-500' , 'yellow-400', 'red-400'];
    
    function RandomColor(){
        let index = Math.floor(Math.random()*colors.length);
        return colors[index];
    }
    let a = RandomColor();
    export let title, date, emettitore: String; 
</script>
<div
  class="w-full flex items-center rounded-lg border-l-4 transition-colors duration-200 my-2 p-0 border-{RandomColor()}"
>
    <div class="flex-grow min-w-0 rounded-md py-3 px-2 bg-white text-black hover:bg-gray-200" style="min-width: 75%;">
      <p class="text-md font-medium truncate text" style="width: 90%">
        {title}
      </p>
      <div class="grid grid-cols-2">
        <div class="col-span-1">
            <p class="text-xs">Data: {date}</p>
        </div>
        <div class="col-span-1">
            <p class="text-xs">Emettitore: {emettitore}</p>
        </div>
      </div>
    </div> 
</div>