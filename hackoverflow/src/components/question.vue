<template>
    <b-card class="text-center mb-2"  style="width: 100vw">
        <div class="row">
            <div class="col-2">
                <div class="row">
                    <div class="col">
                       <strong> {{ question.upvotes.length - question.downvotes.length }} </strong><br> votes
                    </div>
                    <div class="col">
                       <strong> {{ question.answer.length }} </strong>answers
                    </div>
                </div>
            </div>
            <div class="col mt-2">
                <div class="row">
                    <router-link :to="{name: 'questionDetail', params: {id: question._id }}">
                        <h3 style="color: black" class="text-left">
                            {{ question.title }}
                        </h3>
                    </router-link>
                </div>
                <div class="row">
                    <b-badge class="ml-2" v-for="tag in question.tags" :key="tag" variant="light"> {{tag}} </b-badge>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'question',
    props: {
        question: Object
    },
    methods: {
    },
}
</script>

<style>

</style>
