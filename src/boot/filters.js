import { date } from 'quasar';

export default async ({ Vue, ssrContext, store}) => {
    Vue.filter('dateHuman',dateHuman);
    Vue.filter('dateHumanFull',dateHumanFull);
    Vue.filter('ourMedia',ourMedia);
    Vue.filter('formatName',formatName);
}

function dateClean(value){
    let diff = date.getDateDiff( new Date(Date.now()), new Date(value),  'days');
    if(diff < 1 ) return 'today';
    else if(diff < 2 ) return 'yesterday';

    /*
    else if(diff < 8 ) return 'a few days back';
    else if(diff < 10 ) return 'last week';
    else if(diff < 25) return 'a few weeks back';
    */
    else return 'on ' + date.formatDate(value, 'Do MMMM YYYY');
    //return diff; //date.formatDate(value, 'Do MMMM YYYY');
}

function dateHuman(val){
    return date.formatDate(val, 'Do MMMM');
}

function dateHumanFull(val){
    return date.formatDate(val, 'Do MMMM,  YYYY');
}

function formatName(val){

    return val.toLowerCase().replace(/(^| )(\w)/g, s => s.toUpperCase())
}
function ourMedia(value){
    if(value == null) return 'statics/user.png';
    else if(typeof value === 'object') return value;
    else if (value){
        if(value.includes(':')) return value;
        else return process.env.media_server_url+value;
    }
}
