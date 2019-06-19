<template>
<div class="row">
    <div v-for="item in helpItems" :key="item" class="col-xl-8 col-lg-8 col-md-8 col-12">
<q-expansion-item  class="bg-white shadow-3" :label="item.label">
    <q-card>
        <q-card-section>
            {{item.content}}
        </q-card-section>
    </q-card>
</q-expansion-item>
<!-- <q-separator/> -->
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            helpItems:[
                {label:'How does it works ?', 
                content:'You apply for an event. The recruiter goes through your profile and selects you. In the meantime you can apply for more events.'},

                {label: 'How does the payment works',
                content: 'Your payment will be initiated after 24 hours if the event has been completed by you sucessfully.'},

                {label: 'Different types of application status',
                content: 'There are 4 types of application status. Applied, Selected, Back out, Fired. Whenever you apply for an event your applicaton status changes to applied. A selection from the recruiters end changes your application status to selected. If you wish to back out from an event your application status changes to backed out. If adverse activities has been observed at the event you status will be changed to fired.'},

                {label: 'What if I backout ?',
                content: 'If you backout from an event before the actual event date your application will be taken back and you will be not charge any sort of fine. Backing out at the event date will leave with some fine in your wallet section.'},

                {label: 'What if the user doesnt show up ?',
                content: 'If a user doesnt shows up at the event his/her account will be fined for a certain amount.'},

                {label: 'How to become a recruiter',
                content: 'The registaration pages for the employee and the recruiter accounts are the same. Just make sure to select the recruiter check button to register as a recruiter.'},

            ]
        }
    }
}
</script>

<style>

</style>
