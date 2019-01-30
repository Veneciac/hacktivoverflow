<template>
    <b-card class="text-center">
        <div class="card-text">
            <div class="row">
                <div class="col">
                    <h2 class="text-left ml-4">
                        {{ questionDetail.title }}
                    </h2>
                </div>
                <div class="col-2 float-right" v-if="questionDetail.user && user">
                    <i style="cursor: pointer" v-if="questionDetail.user._id == user._id" v-b-modal.modal1 class="fas fa-edit">Edit</i>
                    <i style="cursor: pointer" v-if="questionDetail.user._id == user._id" @click="deleteQues" class="fas fa-trash-alt ml-3"></i>
                </div>
            </div>
            <hr>
            <div class="row ml-3">
                <div class="col-1">
                    <div class="row ml-2">
                        <h3>
                            <i style="cursor: pointer" @click="upVote" class="fas fa-sort-up"></i>
                        </h3>
                    </div>
                    <div class="row ml-2">
                        <h3 v-if="questionDetail.upvotes && questionDetail.downvotes">
                            {{ questionDetail.upvotes.length - questionDetail.downvotes.length}}
                        </h3>
                    </div>
                    <div class="row ml-2">
                        <h3>
                            <i style="cursor: pointer" @click="downVote" class="fas fa-sort-down"></i>
                        </h3>
                    </div>
                    <div class="row">
                        <b-badge variant="light"> {{ status }} </b-badge>
                    </div>
                </div>
                <div class="col text-left">
                    <div class="row" >
                        <p v-html="questionDetail.description">
                        </p>
                    </div>
                    <div class="row-1">
                        <b-badge class="mr-2" v-for="tag in questionDetail.tags" :key="tag" style="color: black; background-color: #e1e3e8"> {{tag}} </b-badge>
                    </div>
                    <div class="row-3 float-right">
                        <small>asked {{ new Date(questionDetail.createdAt).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'}) }}</small>
                        <br>
                        <div v-if="questionDetail.user" >
                            <router-link :to="{name: 'profile', params: {id: questionDetail.user._id} }" >
                                <small class="float-right">by {{ questionDetail.user.name }} </small>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'questionCard',
    data () {
        return {
            status: ''
        }
    },
    methods: {
        upVote () {
            this.$store.dispatch('upVote', this.questionDetail)
        },
        downVote () {
            this.$store.dispatch('downVote', this.questionDetail)
        },
        cekStatus () {
            if (this.user) {
                let status = ''
                this.questionDetail.upvotes.forEach(el => {
                    if (el._id == this.user._id) {
                       status = 'upvoted'
                    } 
                });
                this.questionDetail.downvotes.forEach(el => {
                   if (el._id == this.user._id) {
                        status = 'downvoted'
                    }
                });
                this.status = status
            }
        },
        showModal () {
            this.$emit('showModal')
        },
        deleteQues () {
            this.$store.dispatch('deleteQuestion', this.$route.params.id)
        }
    },
    computed: mapState(['questionDetail', 'user']),
    watch: {
        questionDetail (val) {
             this.cekStatus()
        }
    }
}
</script>

<style>

</style>
