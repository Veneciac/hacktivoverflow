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
                    <small>answered {{ new Date(answer.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}) }}</small>
                    <br>
                    <div v-if="answer.user" >
                            <router-link :to="{name: 'profile', params: {id: answer.user._id} }" >
                                <small class="float-right">by {{ answer.user.name }} </small>
                            </router-link>
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
