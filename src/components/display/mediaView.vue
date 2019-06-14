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
        
       <div>
    <button @click="imageViewerFlag = true">点击查看图片</button>
    <image-viewer-vue 
        v-if="imageViewerFlag" 
        @closeImageViewer="imageViewerFlag = false" 
        @clickImage="clickImage"
        :imgUrlList="imgUrlList"
        :index="currentIndex"
        :title="title"
        :closable=true
        :cyclical=false>
    </image-viewer-vue>
  </div>

    

    </div>
    <div v-else class="row q-py-sm">
        <div class="col-3 q-pa-sm cursor-pointer" v-for="(item,index) in media" :key="index">
            <img class="galleryItem"  :src="item.name | ourMedia" />   
        </div>
    </div>
</div>
</template>

<script>

// import 'viewerjs/dist/viewer.css'
// import Viewer from 'v-viewer'
import imageViewer from 'image-viewer-vue'

export default {

    props:['id'],
    components: {
        imageViewer
    },
    data(){
        return{
            cropModal:false,
            media:[],
            imgUrlList: [
        'https://picsum.photos/200/200',
      	'https://picsum.photos/300/200',
        'https://picsum.photos/250/200'
      ],
      imageViewerFlag: false,
                currentIndex: 1,
                title: 'hello',

        }
    },
    methods:{
        async getMyMedia(){
            var res = await this.$axios.get('media',{params:{id:this.id}});
            this.media = res.data;
        },
        async uploadAvatar(){  
        },
        
        toggle() {

    }
    },
    computed:{
        me(){
            var myId =  this.$store.getters['user/id'];
            return (this.id == myId);
        },
        onClick(i) {
      this.index = i;
    },
    clickImage(index){
                console.log(index)
            }
    },
    created(){
        this.getMyMedia();
    },
}
</script>

<style scoped>
.galleryItem{
    width: 100%;
}

.image {
    height: 200px;
    cursor: pointer;
    margin: 5px;
    display: inline-block;
  }
</style>
