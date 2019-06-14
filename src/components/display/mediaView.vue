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
{{ this.media }}
        <div class="q-gutter-md row items-start">
            <q-img
                v-for="image in media"
                :key="image"
                transition="fade"
                :src="image | ourMedia"
                style="width: 150px; cursor:pointer"
                ratio="1"
            />

            <q-img
                v-for="image in images"
                :key="image"
                transition="fade"
                :src="image"
                style="width: 150px; cursor:pointer"
                ratio="1"
                @click="openModal(image)"
            />
        </div>
  </div>

    <div v-else class="row q-py-sm">
        <div class="col-3 q-pa-sm cursor-pointer" v-for="(item,index) in media" :key="index">
            <img class="galleryItem"  :src="item.name | ourMedia" />   
        </div>
    </div>

    <q-dialog v-model="prompt" persistent>
          <q-card style="min-width: 400px">

            <q-card-section>
              <q-img
                :src="this.src"
               />
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="Close" v-close-popup />
            </q-card-actions>
          </q-card>
    </q-dialog>
</div>
</template>

<script>

export default {

    props:['id'],
    components: {

    },
    data(){
        return{
            media:[],
            images: ['../../statics/catering.jpg', '../../statics/apply.jpg', '../../statics/attend.jpg'],
            src: '',
            prompt: false
        }
    },
    methods:{
        async getMyMedia(){
            var res = await this.$axios.get('media',{params:{id:this.id}});
            this.media = res.data;
            console.log(this.media)
        },
        async uploadMedia(){
            var newMedia = this.$refs.newPhoto.files[0];
            formData.append('newMedia',newMedia);
            await this.$axios.post('new_media',formData);
            this.getMyMedia();
        },
        openModal(image) {
            this.src = image;
            this.prompt = true
        }
    },
    computed:{
        me(){
            var myId =  this.$store.getters['user/id'];
            return (this.id == myId);
        },
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

</style>
