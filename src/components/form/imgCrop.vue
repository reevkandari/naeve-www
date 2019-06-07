<template>
<div>
    <q-card style="min-width: 400px">
    <q-card-section>
        <div class="text-h6">Crop Image</div>
    </q-card-section>

    <q-card-section>
        <vue-cropper
        ref='cropper'
        :guides="true"
        :view-mode="2"
        drag-mode="crop"
        :auto-crop-area="0.5"
        :max-container-width="300"
        :max-container-height="300"
        :background="true"
        :rotatable="true"
        :src="imgSrc"
        :aspect-ratio="1"
        alt="Source Image"
        :img-style="{ 'width': '300px', 'height': '400px' }">
    </vue-cropper>
    </q-card-section>

    <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Crop" @click="uploadAvatar"  />
        <q-btn flat label="Rotate" @click="rotate" />
        <q-btn flat label="Cancel" v-close-popup />
    </q-card-actions>
    </q-card>
</div>
</template>

<script>
export default {
methods:{
    openImageCropper(e) {
      this.prompt = true;
      const file = e.target.files[0];
        if (!file.type.includes('image/')) {
          alert('Please select an image file');
          return;
        }
        if (typeof FileReader === 'function') {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.imgSrc = event.target.result;
            // rebuild cropperjs with the updated source
            this.$refs.cropper.replace(event.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          alert('Sorry, FileReader API not supported');
        }
    },
    rotate() {
        this.$refs.cropper.rotate(90);
    }    
}
}
</script>

<style>

</style>
