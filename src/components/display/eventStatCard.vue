<template>
<div class="q-pa-xs">
    <div v-if="myEvent" class="row">
        <div class="col-12">
            <q-chip square class="bg-primary text-white" dense>
                {{stats.applications}} interested
            </q-chip>
            <q-chip square class="bg-grey-7 text-white" dense>
                {{stats.selected}} selected
            </q-chip>            
        </div>
        <q-btn class="full-width q-mt-sm" color="red" label="Manage Applications" 
        @click="$emit('manage')" />

    </div>

    <div v-else class="notMyEvent">
        You may also create events and hire people
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
.notMyEvent{
    font-family:'Poppins';
    font-size:1.2em;
}
</style>
