<template>
<div>
     {{id}}
    <q-btn v-if="me" label="Upload Photos" class="q-px-sm" dense color="primary"  
    @click="$refs.newPhoto.click()">
      <input @change="uploadMedia" ref="newPhoto"  type="file"
      accept="image/x-png,image/gif,image/jpeg" style="display:none"/>   
    </q-btn>    
    <div v-if="media.length == 0" class="q-pa-sm">
        <span class="text-subtitle1 "> 
        {{ (me) ? "You haven't uploaded any" : 'No'}}    Photos yet
        </span> 
    </div>
    <div v-else class="row q-py-sm">
        <div class="col-3 q-pa-sm cursor-pointer" v-for="(item,index) in media" :key="index">
            <img class="galleryItem"  :src="item.name | ourMedia" />
        </div>
    </div>
</div>
</template>

<script>
export default {
    props:['id'],
    data(){
        return{
            media:[]
        }
    },
    methods:{
        async getMyMedia(){
            var res = await this.$axios.get('media',{params:{id:this.id}});
            this.media = res.data;
        },
        async uploadMedia(){
            var newMedia = this.$refs.newPhoto.files[0];
            formData.append('newMedia',newMedia);
            await this.$axios.post('new_media',formData);
            this.getMyMedia();
        },
    },
    computed:{
        me(){
            var myId =  this.$store.getters['user/id'];
            return (this.id == myId);
        }
    },
    created(){
        this.getMyMedia();
    }
}
</script>

<style>
.galleryItem{
    width: 100%;
}
</style>
