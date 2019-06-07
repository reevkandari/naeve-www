<template>
<div>
    <div class="row bg-orange-9 shadow-3 q-pa-xs text-center">
        <span class="col title">About the {{(user.recruiter) ? 'Recruiter' : 'User'}}</span>
    </div>
    <div class="row items-center q-pa-xs q-pt-md ">
        
        <q-chip color="yellow-7" class="col-auto">
            <q-avatar size="50px">
                <img :src="user.avatar | ourMedia"/>
            </q-avatar>
            <router-link class="noDeco" :to="{name:'user',params:{id:user.user_id}}" >
                <span class="name">{{user.name | formatName}}  </span>
            </router-link>                   
        </q-chip>
        <div class="q-mt-sm">
            <div class="q-px-sm bio">
                {{user.bio}}
            </div>
        </div>

</div>

</div>
</template>

<script>
export default {
    props:['inp'],
    computed:{
        user(){
            return this.inp;
        }
    }
}
</script>


<style scoped>
.title{
    font-size: 1.25em;
    font-weight: 450;
    color:whitesmoke;
}
.name{
    font-size: 1.3em;
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
}
.bio{
    font-size: 1.0em;
    font-family: 'Monsterrat', sans-serif;
    color:dark-brown;
}

</style>
