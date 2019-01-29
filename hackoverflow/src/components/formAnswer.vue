<template>
    <div>
        <h2 class="mt-3 text-left">
            Your Answer
        </h2>
        <hr>
        <b-form @submit.prevent="answer" class="text-left mt-2" >
            <b-form-group label="Title:">
                <b-form-input type="text" v-model="title" placeholder="Enter title" />
            </b-form-group>

            <p>Description:</p>
            <wysiwyg v-model="description" />

            <div class="float-right mt-3">
                <b-button class="mr-2 mb-4" type="submit" variant="dark">Post your answer</b-button>
            </div>
        </b-form>
    </div>
   
</template>

<script>
export default {
    name: 'addAnswer',
    data () {
        return {
            title: '',
            description: '',
        }
    },
    methods: {
        answer () {
            let data = {
                title: this.title,
                description: this.description,
            }
            this.$store.dispatch('addAnswer', data)
                 .then(resp => {
                     this.title = ''
                     this.description = ''
                    this.$store.dispatch('getAnswer', this.$route.params.id)
                })
                .catch(err => {
                    console.log(err.response)
                })
        }
    },
    components: {
        
    }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css"

</style>
