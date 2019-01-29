<template>
    <div class="card-text">
        <div class="row ml-3">
            <div class="col-1">
                <div class="row ml-2">
                    <h3>
                        <i @click="upVote" class="fas fa-sort-up"></i>
                    </h3>
                </div>
                <div class="row ml-2">
                    <h3>
                        {{ answer.upvotes.length - answer.downvotes.length}}
                    </h3>
                </div>
                <div class="row ml-2">
                    <h3>
                        <i @click="downVote" class="fas fa-sort-down"></i>
                    </h3>
                </div>
            </div>
            <div class="col text-left">
                <div class="row">
                    <h4 class="ml-1">
                        {{ answer.title }}
                    </h4>
                </div>
                <hr style="margin-top: 0rem">
                <div class="row" >
                    <p v-html="answer.description">
                    </p>
                </div>
                <div class="row-3 float-right">
                    <div class="col"></div>
                    <div class="col-3 bg-light" style="">

                    </div>
                </div>
            </div>
        </div>
        <hr style="margin-top: 0" />
    </div>
</template>

<script>
export default {
    name: 'answerCard',
    props: {
        answer: Object
    },
    methods: {
        upVote () {
            this.$store.dispatch('upVote', this.answer)
        },
        downVote () {
            this.$store.dispatch('downVote', this.answer)
        }
    },
}
</script>

<style>

</style>
