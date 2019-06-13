<template>
<div class="row justify-center">
    
    <q-input class="full-width" placeholder="What's the matter ?" 
    dense outlined v-model=msg autogrow maxlength="200"/>
    <div class="col-9 q-pa-xs">
        <q-chip v-for="(item,index) in chips" :key="index" 
        :color=item[1] square :text-color=item[2] dense>{{item[0]}}</q-chip>

    </div>
    <q-btn class="col-3 q-my-xs" label="Send" color="primary" @click="submit" />
</div>
</template>

<script>
export default {
    data(){
        return{
            msg:'',
            chips:[
                ['Ask','red','white'],
                ['Suggest','yellow','black'],
                ['Complain','brown','white'],
                ['Help','blue','white']
            ]
    }
    },
    methods:{
        async submit(){
            if(this.msg.length < 10) return;
            var res = await this.$axios.post('support_message',{message:this.msg});
            if(res.status!=202) return;
            this.$q.notify('Your Message has been sent. We will look into it ASAP.');
            this.msg = ''
        }        
    }
}
</script>

<style>

</style>
