<template>
<div class="row  items-center">
    <div class="col-4">
        <q-avatar size="80px">
        <img :src="profile.avatar | ourMedia" /> 
        </q-avatar>          
    </div>

    <div class="col-7 q-pl-sm">
        <div class="full-width name">{{profile.name}}</div>
        <div class="text-left">
            
      <q-chip>
        <q-avatar color="blue" text-color="white">{{profile.active}}</q-avatar>
        Active Events
      </q-chip>
      <q-chip>
        <q-avatar  color="light-green" text-color="white">
            <span  class="walletText">
                {{wallet}}
            </span>
            </q-avatar>
        Rupees in Wallet
      </q-chip>           
        </div>
    </div>        

<br>
<span class="full-width text-h6"></span>

</div>    
</template>

<script>
export default {
    computed:{
        wallet(){
            var val = 5500;//this.profile.wallet;
            return (val > 999) ? (val/1000).toFixed(1)+'k' : val;
        },
        profile(){
            return this.$store.getters['user/profile'];
        }
    }
}
</script>

<style scoped>
.name{
    font-size:1.3em;
}
.walletText{
    font-size: 0.9em;
}
</style>
