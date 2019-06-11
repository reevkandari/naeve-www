<template>
<div class="q-pa-xs">
    <div v-if="myEvent" class="row">
        <div class="row">
            <q-chip class="bg-purple text-white" dense square>
                <q-avatar class="bg-yellow text-black">
                    {{stats.applications}} 
                </q-avatar>
                applied
            </q-chip>

            <q-chip class="bg-green-4 text-black" dense square>
                <q-avatar class="bg-primary text-white">
                    {{stats.selected}} 
                </q-avatar>
                selected
            </q-chip>     
        </div>
        <q-btn v-if="stats.applications > 0" class="col-12 q-mt-sm q-px-sm" color="brown-7"
        label="Manage Applications" dense 
        @click="$router.push({name:'manage',params:{id:event.id}}) " /> 

    </div>

    <div v-else>
        Create Events like these and hire according to your needs.
    </div>    

</div>
</template>

<script>
export default {
    props:['inp'],
    data(){
        return{
            stats:{}
        }
    },
    computed:{ 
        event(){
           return this.inp; 
        },  
        myEvent(){
            return (this.event.userId == this.myId);
        },
        myId(){
            return this.$store.getters['user/id'];
        }
    },
    watch:{
        event(){
            this.getEventStats();
        }
    },
    methods:{
        async getEventStats(){
            if(this.myEvent){
                var res = await this.$axios.get('event_stats',{ params:{eventId:this.event.id} });
                this.stats = res.data;
            }
        }
    },
    created(){
        this.getEventStats()
    }

}
</script>

<style>

</style>
