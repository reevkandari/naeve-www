<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div v-for="(issue, index) in issues" :key="index">
                    <q-expansion-item
                        expand-separator
                        icon="question_answer"
                        :label="issue.question"
                    >
                        <q-card>
                        <q-card-section>
                            {{issue.answer}}
                        </q-card-section>
                        </q-card>
                    </q-expansion-item>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            issues: [
                {question: "I have forgotten my password? How do i reset?",
                answer: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,"},
                {question: "I have forgotten my password? How do i reset?",
                answer: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,"},
                {question: "I have forgotten my password? How do i reset?",
                answer: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,"},
                {question: "I have forgotten my password? How do i reset?",
                answer: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,"},
                {question: "I have forgotten my password? How do i reset?",
                answer: " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,"},
            ]
        }
    }
}
</script>

<style>

</style>
