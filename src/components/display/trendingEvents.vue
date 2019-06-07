<template>
<div>
    <div class="row">
        <router-link v-for="(item,index) in events" :key="index" 
        class="full-width q-pa-xs noDeco itemName" :to="{name:'event',params:{id:item.id}}">
            {{item.label}}
        </router-link>
    </div>
    <div class="row bg-indigo shadow-3 q-pa-xs  text-center">
        <span class="col title">Trending 🔥🔥</span>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            events:[
                {label:'Dancing For Uber',id:1},
                {label:'Eating For Zomato',id:2},
                {label:'Sleeping for HR',id:3}
            ]
        }
    }
}
</script>

<style>
.title{
    font-size: 1.4em;
    font-weight: 450;
    color:aliceblue;
}
.itemName{
    font-size: 1.25em;
}
</style>
