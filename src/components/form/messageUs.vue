<template>
<div class="row justify-center">
    
    <q-input class="full-width" placeholder="What's the matter ?" dense outlined v-model=msg autogrow />
    <div class="col-9 q-pa-xs">
        <q-chip color="red" square text-color="white" dense>Enquire</q-chip>
        <q-chip color="yellow" square text-color="black" dense>Suggest</q-chip>
        <q-chip color="black" square text-color="white" dense>Complain</q-chip>
    </div>
    <q-btn class="col-3 q-my-xs" label="Send" color="primary" @click="submit" />
</div>
</template>

<script>
export default {
    data(){
        return{
            msg:''
        }
    },
    methods:{
        submit(){

        }        
    }
}
</script>

<style>

</style>
