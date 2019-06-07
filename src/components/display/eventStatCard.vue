<template>
<div class="q-pa-xs row ">
    <div v-if="myEvent">
        {{stats}} {{event}}
    </div>

    <div v-else>
        <q-btn label="Create an Event" />
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
