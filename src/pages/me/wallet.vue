<template>
<div class="no-padding">
  <q-item clickable v-for="(item,index) in wallet" :key="index" class="row"  >
            <div class="col-12 row">
                <div class="col-7">
                    {{item.title}}
                </div>
                <div class="col-1">
                    {{item.amount}}
                </div>   
                <div class="col-2">
                    {{item.born | dateHuman}}
                </div>                
                <q-chip class="col-auto text-capitalize absolute-right" dense square >
                {{item.action}}
                </q-chip>
            </div>
    
  </q-item>
</div>
</template>

<script>
export default {
    data(){
        return{
          wallet:false
        }
    },
    methods:{
      async fetchWallet(){
        var res = await this.$axios.get('wallet');
        this.wallet = res.data;
      }
    },
    created(){
      this.fetchWallet();
    }
}
</script>

<style>

</style>
