<template>
    <div class="container">
        <div class="col">
            <div class="row">
                <h1 v-if="myQuestion.length !== 0">
                    {{ myQuestion[0].user.name }} <em> DASHBOARD </em>
                </h1>
                <h1 v-else>
                    {{ user.name }}  <em> DASHBOARD </em>
                </h1>
            </div>
            <hr style="width: 100%; color: grey; height: 1px; background-color: grey; margin-top: 0">
            <div class="row">
                <question v-for="question in myQuestion" :key="question._id" :question="question" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import question from '@/components/question.vue'

export default {
    name: 'profile',
    data () {
        return {
            myQuestion: []
        }
    },
    components: {
        question
    },  
    computed: mapState(['user', 'questions']),
    created () {
        this.myQuestion = this.questions.filter(el => String(el.user._id) == String(this.$route.params.id))
    }

}
</script>

<style>

</style>
