<template>
<div class="row items-center">
    <div class="col-5 row">
        <q-avatar class="q-pr-xs" size="80px">
            <img :src="profile.avatar | ourMedia" /> 
        </q-avatar>          
    </div>

    <div class="col-7">
        <div class="full-width name text-left">{{profile.name}}</div>
        <div class="text-left">
            <q-chip square >
                <q-avatar  color="light-green" text-color="white">
                    <span  class="walletText">
                        {{wallet}}
                    </span>
                    </q-avatar>
                ₹ in Wallet
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
            var val = 1200;
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
    font-size:1.2em;
    font-family: 'Raleway';
    font-weight: 600;
}
.walletText{
    font-weight: bold;
    font-size: 0.9em;
}
</style>
