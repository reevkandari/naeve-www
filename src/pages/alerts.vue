<template>
<q-page>
<div class="row justify-center">
    <div class="col-md-8 col-lg-8 col-xl-8 col-12">
        <div class="bg-white shadow-3">
            <div class="row justify-around shadow-2 q-mb-sm q-pa-xs">
                <div class="col-11 text-right cursor-pointer">
                    Mark all as Read
                </div>
            </div>
            <q-list bordered separator>
                <q-item class="notifText" :to="{name:'event',params:{id:item.event_id}}" 
                dense v-for="(item,index) in alerts" :key="index">
                    <q-item-section class="col-11">
                        <div>
                            You have been {{action[item.content]}} {{item.title}}
                        </div>                        
                        
                            {{item.born | timeRelative}}
                    </q-item-section>                    
                </q-item>
            </q-list>
        </div>        
    </div>
</div>
</q-page>
</template>

<script>

export default {
    data(){
        return{
            alerts:[],
            action:{
                'select':'selected for',
                'fire':'fired from',
                'unfit':'marked unfit',
                'adverse':'reported as adverse'
            }
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
.notifText{
    font-size:1.2em;
}
</style>
