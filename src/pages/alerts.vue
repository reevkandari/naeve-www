<template>
<q-page class="">
    <div class="bg-white shadow-3">
        <q-list v-for="(item,index) in alerts" :key="index">
            {{item}}
        </q-list>
    </div>
</q-page>
</template>

<script>

export default {
    data(){
        return{
            alerts:[]
        }
    },    
    methods:{
        async fetchAlerts(){
            var res = await this.$axios.get('alerts');
            this.alerts = res.data; 
        }
    },
    created(){
        this.fetchAlerts();
    }
}
</script>

<style>

</style>
