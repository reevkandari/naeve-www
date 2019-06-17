<template>
<div class="row">
    <div v-for="i in 9" :key="i" class="col-xl-8 col-lg-8 col-md-8 col-12">
<q-expansion-item   label="Dam This is it" class="">
    <span v-html=xing />
</q-expansion-item>
    </div>
    Payments
    Application Status
    How to become a recruiter
    what if i backout
    what if i fire someone
    What if the user does't show up
</div>
</template>

<script>
export default {
    data(){
        return{
            helpItems:[
                {label:'Payments', content:'You will be paid within 3-6 days of the event'}
            ]
        }
    }
}
</script>

<style>

</style>
