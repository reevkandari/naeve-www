import {api} from 'boot/axios';
/*
var isNode = require('detect-node');
import axios from 'axios';
const api = axios.create();
axios.defaults.baseURL = isNode ? process.env.api_ip : process.env.api_proxy_path;
*/

export default {
    namespaced: true,
    state: () => ({
        page:false
    }),
    getters:{
        default(state){ return state.page } ,
    },
    mutations:{
        set(state,data){
            state.page = data;
        }
    },
    actions:{
        fetch(context, inp){
            return new Promise(resolve=>{
                api.get(inp.path,{params:inp.params})   
                .then(function(res){                    
                    context.commit('set',res.data);
                    resolve();
                });
                
            });            
        }
    }
}
