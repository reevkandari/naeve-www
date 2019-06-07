<template>
<div>
<!-- Upper Toolbar -->
<div class="row items-center q-pa-xs q-mb-md bg-white shadow-3">    
    <div class="col-9">
        <div class="q-pl-sm text-subtitle2">Page {{page}}</div>
    </div>
    <div class="col-3 text-right">
        <q-btn dense flat icon="chevron_left" :disabled="page==1" @click="prevPage" />
        <q-btn dense flat icon="chevron_right" :disabled=noMorePages @click="nextPage" />
    </div>
</div>    
<!-- Event detail Cards -->
    
<div v-if="currPageEvents.length > 0">
    <div v-for="(item,index) in currPageEvents" :key="index" class="row q-mb-md">
        <eventListCard class="bg-white shadow-3 full-width" :inp=item />
    </div>
</div>
<div v-else>
    <div class="q-pa-md bg-white shadow-3 row full-width">
        <div class="youHavent">
            Nothing To show
        </div> 
    </div>
</div>
<!--  Event detail Cards -->
<div class="row items-center q-pa-xs q-my-md bg-white shadow-3">    
    <div class="col-9">
        <div class="q-pl-sm text-subtitle2">Page {{page}}</div>
    </div>
    <div class="col-3 text-right">
        <q-btn dense flat icon="chevron_left" :disabled="page==1" @click="prevPage" />
        <q-btn dense flat icon="chevron_right" :disabled=noMorePages @click="nextPage" />
    </div>
</div>    
</div>
</template>

<script>
import eventListCard from './eventListCard';
import {concat} from 'lodash';

export default {
    components:{
        eventListCard
    },
    data(){
        return{
            page:1,
            limit:4,
            allEvents:[],
            dataPoints:[
                {key:'pay_per_day',label:'Pay Per Day'},
                {key:'begin', label:'Date'},
                {key:'days', label:'No of Days'},
                {key:'gender', label:'Gender'}
            ],
            lastPage:1
        }
    },
    computed:{
        recruiter(){
            return this.$store.getters['user/recruiter'];
        },
        currPageEvents(){
            var currPageEvents = [];
            var allEvents = this.allEvents;
            var currPageMax = this.limit * this.page;
            var currPageMin = currPageMax - this.limit;
            for(var i=currPageMin; i < currPageMax ;i++){
                if(allEvents[i]) currPageEvents.push(allEvents[i]);
            }
            return currPageEvents;
        },
        totalEvents(){
            return this.allEvents.length;
        },
        noMorePages(){
            return (this.lastPage == this.page);
        }
    },
    methods:{
        async nextPage(){
            if(this.totalEvents == (this.limit * this.page)){
                this.page = this.page+1;
                await this.getEvents();
            }else{
                this.page = this.page+1;
            }
        },
        prevPage(){
            this.page = this.page-1;
        },
        async getEvents(){
            var currPage = this.page;
            var allEvents = this.allEvents;
            var query = {limit:this.limit, skip: this.totalEvents };
            
            var path = (this.recruiter) ? 'my_events' : 'new_events'; 
            
            var res = await this.$axios.get(path,{ params: query });
            if(res.data.length > 0){
                this.allEvents = concat(allEvents, res.data);
                this.lastPage = (res.data.length < this.limit) ? currPage : currPage+1;
            }else{
                this.page = currPage - 1;
                this.lastPage = this.page;                
            }

        }
    },
    created(){
        this.getEvents();
    }

}
</script>
<style>
.youHavent{
    font-size: 1.3em;
    font-weight: 400;
    font-family: 'Lato', sans-serif;
}
</style>

