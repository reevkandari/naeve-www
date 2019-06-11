<template>
<div class="bg-grey-3 q-pb-lg">
<q-toolbar class="bg-primary text-white">
    <q-toolbar-title>Manage Event</q-toolbar-title>
    <q-btn flat round dense icon="close" v-close-popup />
</q-toolbar>

<div class="row justify-around q-mt-md">
<div class="col-xl-3 col-lg-3 col-md-3 col-12">
    <div class="q-mb-md shadow-3 bg-white q-pa-xs">
            How it Works ?
            <br />
            <span v-for="(item,index) in howItWorks" :key="index">
                <q-chip dense>{{item}}</q-chip> <br />
            </span>
    </div>
</div>
<div class="col-xl-8 col-lg-8 col-md-8 col-12">
    <q-list separator class="">
        <q-item dense class="shadow-3 bg-white row q-mb-sm" v-for="(item, index) in applies" :key="index">
            <q-item-section avatar class="col-auto">
            <q-avatar>
                <img :src="item.avatar | ourMedia"  />
            </q-avatar>
            </q-item-section>

            <q-item-section class="col-4">
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
                        <q-item v-for="(item2,index) in actionsAvailable[item.status]" :key=index 
                        dense clickable @click.native="act(item2,item)" v-close-popup>
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

<q-dialog v-model="confirmBox" position="top" >
      <q-card class="bg-white q-px-sm q-mt-md">

        <q-card-section>
            <span class="name">{{user.name}}</span>
            {{actionResult[action]}}
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
            
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat class="bg-primary text-white" label="Confirm" v-close-popup 
          @click='performAct' />
        </q-card-actions>
      </q-card>    
</q-dialog>



</div>

</div>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
            user:{},
            confirmBox:false,
            applies:false,
            action:'',
            howItWorks:[
                "Recruiter Posts an event",
                "User fitting the criteria shows an interest",
                "Recruiter checks their profile and makes an offer",
                "User can decline that offer",
                "If the user accepts offer, they get selected"
            ],
            actionResult:{
                'select':'will be selected for the event',
                'adverse':'and you both will be asked some questions about the same',
                'unfit':'will be marked unfit for the event'
            },
            actionsAvailable:{
                'applied':['select','unfit'],
                'selected':['unfit'],
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
    methods:{
        dam(){
            console.log('asa');
        },
        act(name,user){
            this.action=name;
            this.user=user;
            this.confirmBox=true;
        },
        async performAct(){
            var res = await this.$axios.post('manage',{
                action:this.action,
                userId:this.user.user_id,
                eventId:this.id,
            });
            this.fetchApplications();
        },
        async fetchApplications(){
            var res = await this.$axios.get('applications',{params:{eventId:this.id}});
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
    font-family: 'Lato';
    font-size: 1.1em;
}
.statusText{
    font-weight:400;
    font-size:1.05em;
}
</style>
