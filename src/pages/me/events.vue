<template>
<div>
  Stuff about events
</div>
</template>

<script>
export default {
    data(){
        return{
          events:[]
        }
    },
    methods:{
      async fetchEvents(){
        var res = await this.$axios.get('my_events');
      }
    },
    created:{

    }
}
</script>

<style>

</style>
