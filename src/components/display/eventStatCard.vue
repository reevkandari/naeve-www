<template>
<div class="q-pa-xs">
    <div v-if="myEvent" class="row">
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/ree
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
