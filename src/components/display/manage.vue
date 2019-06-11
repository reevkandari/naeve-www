<template>
<div class="bg-grey-3 q-pb-lg">
<q-toolbar class="bg-primary text-white">
    <q-toolbar-title>Manage Event</q-toolbar-title>
    <q-btn flat round dense icon="close" v-close-popup />
</q-toolbar>

<div class="row justify-around q-mt-md">

<div class="col-xl-3 col-lg-3 col-md-3 col-12 row justify-center">
    <div class="col-12 q-mb-md">
        <div class="full-width row shadow-3 bg-white q-pa-xs">
            <q-chip class="col" v-for="(val, key) in chip" :key="key" square
            :color="val.color" text-color="white">
            {{event[key]}} {{val.label}} 
            </q-chip>
        </div>
    </div>
</div>
<div class="col-xl-8 col-lg-8 col-md-8 col-12">
    <q-list separator class="">
        <q-item dense class="row shadow-2 bg-white q-mb-sm" v-for="(item, index) in applies" :key="index">
            <q-item-section avatar class="col-auto">
                <q-icon name="star" class="text-orange" size="20px"
                 :class="{'hide':item.status!='selected'}" />

            </q-item-section> 
                        
            <q-item-section avatar class="col-auto">
            <q-avatar class="shadow-1">
                <img :src="item.avatar | ourMedia"  />
            </q-avatar>
            </q-item-section>

            <q-item-section class="col-auto">
                <router-link :to="{name:'user',params:{id:item.user_id}}" class="noDeco" 
                target="_blank">
                    <span class="name">{{item.name}}</span>
                </router-link>
                <span class="statusText">{{statusText[item.status]}}</span>
            </q-item-section>
           
            <q-space />
            <q-item-section class="col-auto">
                <q-icon v-if="['selected','applied','completed'].indexOf(item.status) >-1" 
                    name="keyboard_arrow_down" size="25px" class="cursor-pointer">
                <q-menu >
                    <q-list style="min-width: 10vw" separator bordered>
                        <q-item v-for="(item2,index) in actionsAvailable[item.status]" 
                        :key=index v-if="!(item2=='select' && full)"
                        dense clickable @click.native="act(item2,item)" v-close-popup >
                            <q-item-section class="text-capitalize">
                                {{item2}}
                            </q-item-section>
                        </q-item>         
                    </q-list>
                </q-menu>                    
                </q-icon>
                <q-icon v-else class="text-red" name="error" size="25px" /> 

                
<!--
                <div v-if="item.status=='interest'" class="col-auto">
                    <q-btn dense label="Offer" class="q-mr-md" color="red" />
                    <q-btn dense label="Mark Unfit" color="indigo"/>      
                </div>

                <q-btn v-if="['selected','interest','complete'].indexOf(item.status) >-1" 
                :label="actBtnLabel[item.status]"
                color="primary" dense @click="act('offer',item)" /> 
                -->
            </q-item-section>
        </q-item>
    </q-list>    
</div>

<q-dialog v-model="confirmBox"  position="top" >
      <q-card class="bg-white q-mt-md confirmBox" >
        <q-card-section>
            <span class="actionResult">
                {{user.name + ' ' + actionResult[action]}}
            </span>
            <div class="actionEffect">
                {{actionEffect[action]}}
            </div>            
        </q-card-section>
        <q-card-actions dense align="right" class="text-primary">
            
          <q-btn flat dense label="Cancel" v-close-popup />
          <q-btn flat dense class="bg-primary text-white" label="Confirm" v-close-popup 
          @click='performAct' />
        </q-card-actions>
      </q-card>    
</q-dialog>



</div>

</div>
</template>

<script>
export default {
    props:['inp'],
    data(){
        return{
            chip:{
                strength:{color:'orange-8',label:'required'},
                applications:{color:'primary',label:'applied'},
                selected:{color:'brown',label:'selected'}
            },            
            user:{},
            confirmBox:false,
            applies:false,
            action:'',
            actionResult:{
                select:"will be selected for the event",
                adverse:"will be marked as adverse for the event",
                unfit:"will be marked unfit for the event",
                fire:"will be fired from the event."
            },
            actionEffect:{
                select:"Firing them from the event later will result in a penalty",
                adverse:"Our team will further investigate the matter",
                unit:"You will not be able to select them later",
                fire:"You will have to pay them 10% of the per day amount as compensation"
            },
            actionsAvailable:{
                'applied':['select','unfit'],
                'selected':['fire'],
                'completed':['adverse']
            },
            statusText:{
                'applied':'has applied',
                'selected':'has been selected',
                'unfit':'was marked unfit',
                'backout':'backed out of the event',
                'adverse':'was marked adverse',
                'complete':'has completed the event'
            }
        }
    },
    computed:{
        event(){
            return this.inp;
        },
        full(){
            return (this.event.strength == this.event.selected)
        }
    },
    methods:{
        act(name,user){
            this.action=name;
            this.user=user;
            this.confirmBox=true;
        },
        async performAct(){
            var res = await this.$axios.post('manage',{
                action:this.action,
                userId:this.user.user_id,
                eventId:this.event.id,
            });
            if(res.status!=202) return;
            this.$emit('statModified');
            this.fetchApplications();
            
        },
        async fetchApplications(){
            var res = await this.$axios.get('applications',{params:{eventId:this.event.id}});
            this.applies = res.data;
        }
    },
    created(){
        this.fetchApplications();
    }
}
</script>

<style>
.name{
    font-family: 'Poppins';
    font-size: 1.2em;
}
.actionResult{
    font-family: 'Poppins';
    font-size: 1.2em;
}
.actionEffect{
    font-family: 'Lato';
    font-size: 1.1em;
}
.statusText{
    font-weight:400;
    font-size:1.05em;
}
.confirmBox{
    border:5px solid brown;
    max-width:700px;
}
</style>
