<script lang="ts" context="module">

    export function dateFormat(dateString:string){
      let dateNtime = dateString.split('T');
      let date = dateNtime[0].split('-');
      let time = dateNtime[1].split(':');
      time.pop();
      return date[2]+"/"+date[1]+"/"+date[0]+" "+time.join(':');
    }
</script>