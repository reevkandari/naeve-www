<template>
<div>
{{user}}
</div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    computed:{
      user(){
        return this.$store.getters['user/profile'];
      }
    }
}
</script>

<style>

</style>
