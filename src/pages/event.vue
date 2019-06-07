<template>
<q-page>
<q-no-ssr>
<div v-if="event" class="row justify-center" 
:class="{'q-mx-md':$q.platform.is.mobile, 'q-my-md': $q.platform.is.mobile}">    
    <div class="col-xl-3 col-lg-3 col-md-3 col-12">
        <profileCard :inp="recruiterDetails" class="bg-white shadow-3"
        :class="{'q-mb-md': $q.platform.is.mobile}"/>
    </div>

    <div class="col-xl-6 col-lg-6 col-md-6 col-12" >
        <div class="col-11" :class="{'q-ml-md':$q.platform.is.desktop}">
            <eventListCard :inp="eventListCard" class="bg-white shadow-3" />
            <eventDetails :inp="event" class="q-pa-md bg-white shadow-3 q-mt-md" />
        </div>
    </div>

    <div class="col-xl-3 col-lg-3 col-md-3 col-12 row justify-center " >
        <div class="col-xl-11 col-lg-11 col-md-11 col-12" :class="{'q-mt-md':$q.platform.is.mobile}" >
            <div class="bg-white shadow-3">
                <eventStatCard v-if=recruiter :inp=eventStats />
                <applyForEvent v-else :id=this.event.id />
            </div>          
        </div>
    </div>

</div>    

<div v-else class="row justify-center">
    <img class="col-2" src="~assets/sad.svg" />
</div>

</q-no-ssr>
</q-page>
</template>
<script>
import profileCard from 'components/display/profileCard';
import eventDetails from 'components/display/eventDetails';
import eventListCard from  'components/display/eventListCard';
import trendingEvents from  'components/display/trendingEvents';
import applyForEvent from  'components/display/applyForEvent';
import eventStatCard from 'components/display/eventStatCard';

import {pick} from  'lodash';

export default{
    preFetch ({ store, currentRoute }) {
        var inp = {path:'event',params:{id:currentRoute.params.id} } ;
        return store.dispatch('page/fetch',inp);
    },
    meta(){
        return{
            meta:{
                og_title:{
                    property:'og:title',
                    content:this.event.title,
                },                    
                og_description:{
                    property:'og:description',
                    content:this.event.pay_per_day+' ₹ per day | On '+ 
                    this.$options.filters.dateHuman(this.event.begin) +
                    ' | ' + this.event.days +' Days'
                },                                
            }
        }
    },
    components:{
        eventDetails,
        profileCard,
        eventListCard,
        trendingEvents,
        applyForEvent,
        eventStatCard        
    },
    watch:{
        $route(val){
            var inp = {path:'event',params:{id:val.params.id} } ;
            this.store.dispatch('page/fetch',inp);            
        }
    },
    computed:{
        recruiter(){
            return this.$store.getters['user/recruiter'];
        },
        eventStats(){
            return pick(this.event,['id','user_id','status','begin','end'])
        },        
        event(){
            return this.$store.getters["page/default"];
        },
        recruiterDetails() {
            return pick(this.event,['name','bio','avatar','user_id', 'recruiter']);
        },
        eventListCard() {
            return pick(this.event,['id','status','title', 'venue', 'strength', 'pay_per_day', 'days', 'begin','gender'])
        }

    }
}


</script>