<template>
<q-no-ssr>
<q-page>
<div class="row justify-center">
    <div class="col-md-8 col-lg-8 col-xl-8 col-12">
        <div class="bg-white shadow-5">
            <div class="row justify-around shadow-3 q-mb-sm q-pa-xs">
                <div class="full-width text-right q-pr-sm">
                    <span class="cursor-pointer" @click="markAsRead">
                        Mark all as Read
                    </span> 
                </div>
            </div>
            <q-list v-if="alerts.length > 0" bordered separator>
                <q-item  class="cursor-pointer notifText" dense v-for="(item,index) in alerts" 
                :key="index"  :class="{'seen':item.seen}"  @click.native=act(index)> 
                    <q-item-section class="col-12" >
                        <div>
                            You have been 
                            <q-chip square dense :color=action[item.action][1] 
                            :text-color=action[item.action][2]>
                                {{action[item.action][0]}}
                            </q-chip> 
                            <span class="hero"> "{{item.title}}" </span>

                        </div>
                        <span class="age text-right">{{item.born | timeRelative}}</span>                                                
                    </q-item-section>  
            
                </q-item>
            </q-list>
            <div v-else class="notifText q-pa-md">
                No new Alerts here
            </div>
        </div>        
    </div>
</div>
</q-page>
</q-no-ssr>
</template>

<script>

export default {
    data(){
        return{
            alerts:[],
            action:{
                'select':['selected for','primary','white'],
                'fire':['fired from','orange','black'] ,
                'unfit':['marked unfit','green','white'],
                'adverse':['reported as adverse','black','white'],
                'backout':['reported as adverse','brown','white'],
            }
        }
    },    
    computed:{
        recruiter(){
            return this.$store.getters['user/recruiter'];
        }
    },
    methods:{
        async fetchAlerts(){
            var res = await this.$axios.get('alerts');
            this.alerts = res.data; 
        },
        act(index){
            var alert = this.alerts[index];
            //marking as seen
            if(!alert.seen) this.markAsRead(index);
            //if()
        },
        markAsRead(index=-1){
            var toBeMarked = [];
            if(index >= 0){
                this.alerts[index].seen = true;
                toBeMarked.push( this.alerts[index].id )
            }
            else{
                for(var i=0; i<this.alerts.length;i++){
                    if(!this.alerts[i].seen){
                        this.alerts[i].seen = true;
                        toBeMarked.push(this.alerts[i].id);
                    }
                }
            }
            this.$store.commit('user/unAlert',toBeMarked.length);
            this.$axios.post('mark_alert_seen',{alertList:toBeMarked});
        }
    },
    created(){
        this.fetchAlerts();
    }
}
</script>

<style>
.notifText{
    font-size:1.1em;
    font-family: 'Poppins';
    line-height: 60%;
}
.hero{
    font-style: italic;
    font-weight: 300;
}
.age{
    font-size:0.8em;
    padding-bottom: 5px;
}
.seen{
    background-color: aliceblue;
}
</style>
