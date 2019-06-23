<template>
  <q-layout view="hHh lpR fff" class="bg">
    <q-header >
      <q-toolbar class="row bg-grey-9" :class="{'justify-center':$q.platform.is.desktop}">
        <div class="col-lg-10 col-md-10 col-xl-10 col-12 row items-center">
          <q-toolbar-title class="col-3 siteName">
            <router-link class="noDeco siteName" to="/">
            naeve
            </router-link>
          </q-toolbar-title>

          <q-space />
          <q-tabs >
            <q-route-tab dense shrink v-for="(item,index) in navigation" :key="index" 
             :name=item.name  :to=item.to :label=item.label :icon=item.icon >
             <q-badge v-if="showBadge(item)" color="orange-5" text-color="black">
               {{me[item.name]}}
             </q-badge>
            </q-route-tab>             
          </q-tabs>

        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="page row justify-center screen-height">
      <router-view class="col-xl-10 col-lg-10 col-md-10 col-12 justify-center"
       :class="{'q-py-md':$q.platform.is.desktop}" />    
    </q-page-container>


    <q-footer class="bg-grey-10 text-white q-py-sm ">
      <div class="row justify-center">
        <div class="text-center col-xl-8 col-lg-8 col-md-8 col-11">
          <q-chip  color="grey-9" dense text-color="white" square v-for="(item,index) in footerMenu" :key="index">
            <router-link :to=item.path class="noDeco"><span class="footerChip text-white">{{item.name}}</span></router-link>
          </q-chip>
        </div>
      </div>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",
  meta(){
    return{
      meta:{
        og_site_url:{
          property:'og:url',
          content: process.env.site_url
        },
        og_title:{
            property:'og:title',
            content:'Get paid working for Events'
        },  
        og_description:{
            property:'og:description',
            content:'Volunteer for events and make some quick cash'
        },
        og_image:{
          property:'og:image',
          content:process.env.site_url + 'statics/logo.png'
        }        
      }
    }
  },
  data() {
    return {
      navigationNew:[
        {name:"Login",to:"/login",label:"Login"},
        {name:"Signup",to:"/signup",label:"Signup"}
      ],      
      navigationExisting:[
        {name:"home",to:"/home",icon:"home"},
        {name:"alerts",to:"/alerts",icon:"notifications"},
        {name:"me",to:"/me",icon:"person"}
      ],
      footerMenu: [
        {name:'About-Us',path:'/about'},
        {name:'Help',path:'/help'},
        //{name:'Work With Us',path:'/work-with-us'},
        {name:'Become a Recruiter',path:'/help'},
        {name:'Log-In',path:'/login'},
        {name:'Create an account',path:'/signup'},
        //{name:'Browse for events',path:'/events'},
        {name:'Privacy Policy',path:'/privacy'},
        {name:'Terms & Conditions',path:'/terms'}
      ]
      }
  },
  computed: {
    navigation(){
      return (this.loggedIn) ? this.navigationExisting : this.navigationNew;
    },
    me(){
      return this.$store.getters['user/profile'];
    },
    loggedIn(){
      return this.$store.getters['user/loggedIn'];
    }
  },
  methods:{
    showBadge(item){
      return (item.name=='alerts' && this.me.alerts>0);
    }
  }
};
</script>

<style>

.footerChip{
  font-size: 1.1em;
  text-decoration: none;
}
.toolBarLogo{
  max-width:100%;
  max-height:40px;
}
.siteName{
  font-family: 'Poppins';
  letter-spacing: 1px;
  color:white;
}

.page{
  min-height: 100vh;
}
@media only screen and (max-width: 1200px) {
  .footerChip{
    font-size: 0.95em;
  }
}
</style>


