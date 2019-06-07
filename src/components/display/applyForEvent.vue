<template>
<div>
<!-- Toolbar -->
<div class="row bg-green shadow-3 q-pa-xs text-center">
    <span class="col title"> {{title}} </span>

</div>
<!-- Toolbar -->

<!--Main Body-->
<div class="q-pa-sm" >

<!--For logged In users-->
<div v-if=loggedIn  class="row justify-center">
    <div class="currStatusText q-pb-sm full-width">
        {{currStatusDict[status] }}
    </div>
    <!--If status is vrigin, try applying for event-->
    <q-btn v-if="status=='virgin'" label="I'm Interested" color="primary" @click="act('interest')" />
    <!--If offer has been made allow to accept of decline-->
    <div v-if="status=='offer'" class="row justify-around">
        <q-btn class="col-5" label="Decline" color="red" @click="act('decline')"/>
        <q-btn  class="col-5" label="Accept" color="primary" @click="act('accept')"/>            
    </div>   
    <!-- If you were selected back out-->
    <q-btn v-if="status=='selected'" label="Back-Out" color="brown-5" @click="act('backout')" />
</div>

<!-- Not logged in folks-->
<div v-else class="row justify-center">
    <div class="q-py-sm mustBe">
        You must be logged In to apply for this event.
    </div>
    <q-btn dense class="col-8" label="Log-In" color="primary" 
    @click="$router.push({name:'login',params:{redirect:$route.path}})" />
</div>
</div>
<!--Main Body-->


<!-- Modals -->

    <q-dialog v-model=actionConfirmModal >
        <q-card style="width: 400px" class="q-pt-sm q-px-sm">
    
            <div class="warningText q-pb-sm full-width">
               {{warning[action]}}
            </div>
            <div class="text-subtitle2 full-width">
               Do you wish to continue ?
            </div>            

            <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn color="primary" class="text-capitalize" label="Yes" @click="performAction"
             v-close-popup />
            </q-card-actions>
        </q-card>

    </q-dialog>
<!-- Modals -->

</div>
</template>

<script>
import error from './error';

export default {
    components:{
        error
    },
    props:['id'],
    data(){
        return{
            actionConfirmModal:false,
            action:false,
            status:false,
            warning:{
                'accept':"By accepting this offer, you will automatically be selected for the event",
                'decline': "You are declining a opportunity to attend this event",
                'backout': "Backing out after selection will result in a penalty of "+
                process.env.penalty_amount+"₹",
                "interest": "If selected by the recruiter, You will be sent an offer to confirm participation",
            },
            currStatusDict:{
                virgin:"You have not yet applied for this event",
                closed:"This event is not accepting applications",
                interest:"You have already applied for this event",
                offer:"The recruiter has offered to select you",
                decline:"The recruiter offered to select you. But you declined",
                selected:"You have been selected for the event",
                backout:"You accepted the offer and later declined to attend the event",
                adverse:"You were selected, but did not sucesfully complete the event",                
                complete:"You successfully completed this event",
            },
            btn:{

            }
        }
    },
    computed:{
        loggedIn(){
            return this.$store.getters['user/loggedIn'];
        },
        title(){
            return (this.status) ?  'Application Status' : 'Apply for Event'; 
        }

    },
    watch:{
        inp(){
            this.applyStatus();
        }     
    },
    methods:{
        async performAction(){
            var res = await this.$axios.post('user_event_action',{
                eventId:this.id, action: this.action});
            this.applyStatus(); 
        },
        act(name){
            this.action = name;
            this.actionConfirmModal = true;
        },
        async applyStatus(){
            if(!this.loggedIn) return;
            var res = await this.$axios.get('application_status', 
            {params: {eventId:this.id} });
            this.status = res.data;
        }
    },
    created(){
        this.applyStatus();
    }
}
</script>

<style>
.title{
    font-size: 1.25em;
    font-weight: 450;
    color:whitesmoke;
}
.mustBe{
    font-size: 1.1em;
}
.errorMsg{
    font-family: 'Lato';
    font-size: 1.1em;
}
.warningText{
    font-family: 'Lato';
    font-size: 1.15em;
}
.currStatusText{
    font-family: 'Noto Sans';
    font-weight: 420;
    font-size: 1.1em;
}
</style>
