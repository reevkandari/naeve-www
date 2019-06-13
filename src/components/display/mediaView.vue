<template>
<div>
     {{id}}
    <q-btn v-if="me" label="Upload Photos" class="q-px-sm" dense color="primary"  
    @click="$refs.newPhoto.click()">
      <input @change="cropModal = true" ref="newPhoto"  type="file"
      accept="image/x-png,image/gif,image/jpeg" style="display:none"/>   
    </q-btn>    
    <div v-if="media.length == 0" class="q-pa-sm">
        <span class="text-subtitle1 "> 
        {{ (me) ? "You haven't uploaded any" : 'No'}}    Photos yet
        </span>
        <lightbox :images="images"></lightbox>
    </div>
    <div v-else class="row q-py-sm">
        <div class="col-3 q-pa-sm cursor-pointer" v-for="(item,index) in media" :key="index">
            <img class="galleryItem"  :src="item.name | ourMedia" />
            
        </div>
    </div>
</div>
</template>

<script>
import lightbox from 'vlightbox';

export default {
    props:['id'],
    components: {
        lightbox
    },
    data(){
        return{
            cropModal:false,
            media:[],
            images: [
    {
        src: 'https://unsplash.it/500',
        caption: 'Image 1',
    },
    {
        src: 'https://unsplash.it/501',
    },
],
        }
    },
    methods:{
        async getMyMedia(){
            var res = await this.$axios.get('media',{params:{id:this.id}});
            this.media = res.data;
        },
        async uploadAvatar(){  
        },        
    },
    computed:{
        me(){
<<<<<<< HEAD
            var myId =   this.$store.getters['user/id'];
=======
            var myId =  this.$store.getters['user/id'];
>>>>>>> 18864319f4d07a566b8810720566133f2140e00f
            return (this.id == myId);
        }
    },
    created(){
        this.getMyMedia();
    },
}
</script>

<style>
.galleryItem{
    width: 100%;
}
</style>
