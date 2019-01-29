<template>
    <div class="container mt-4">
        <ques-card />
        <h2 class="text-left mt-2"> {{ answersList.length }} Answer</h2>
        <hr style="width: 100%; color: grey; height: 1px; background-color: grey; margin-top: 0">
        <answer-card v-for="answer in answersList" :key="answer._id" :answer="answer" />
        <form-answer />
        <form-edit-question/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import formAnswer from '@/components/formAnswer.vue'
import quesCard from '@/components/questionCard.vue'
import answerCard from '@/components/answerCard.vue'
import formEditQuestion from '@/components/formEditQuestion.vue'

export default {
    name: 'questionDetail',
    components: {
        formAnswer,
        quesCard,
        answerCard,
        formEditQuestion
    },
    methods: {
        upVote () {
            this.$store.dispatch('upVote', this.questionDetail)
        },
        downVote () {
            this.$store.dispatch('downVote', this.questionDetail)
        },
    },
    created() {
        this.$store.dispatch('getOneQuestion', this.$route.params.id)
        this.$store.dispatch('getAnswer', this.$route.params.id)
    },
    computed: mapState(['questionDetail', 'answersList'])
}
</script>

<style>

</style>
