<template>
   <b-modal no-close-on-backdrop id="modal1" hide-footer size="lg" title="Edit question" >
      <div class="d-block text-left">
        <b-form @submit.prevent="edit" >
            <b-form-group label="Title:">
                <b-form-input type="text" v-model="title" placeholder="Enter title" />
            </b-form-group>

            <p>Description:</p>
            <wysiwyg v-model="description" />

            <p class="mt-3" >Tag: </p>
            <b-input-group class="mb-2" style="width: 30vw">
                <b-form-input v-model="temp"></b-form-input>
                <b-input-group-append>
                    <b-btn @click="pushTag" variant="outline-info">Add</b-btn>
                </b-input-group-append>
            </b-input-group>

            <b-badge v-for="tag in tags" :key="tag" variant="light"> <h6> {{ tag }} </h6> </b-badge>

            <div class="float-right mt-3">
                <b-button class="mr-2" type="submit" variant="primary">Submit</b-button>
            </div>
        </b-form>   
      </div>
    </b-modal>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'editQuestion',
    data () {
        return {
            title: '',
            description: '',
            tags: [],
            temp: ''
        }
    },
    methods: {
        edit () {
            let data = {
                ...this.questionDetail,
                title: this.title,
                description: this.description,
                tags: this.tags
            }
            console.log('masuk edit')
            this.$store.dispatch('updateQuestion', data)
           
        },
        pushTag () {
            this.tags.push(this.temp)
            this.temp = ""
        },
    },
    computed: mapState(['user', 'questionDetail']),
    watch: {
        questionDetail (val) {
            this.title = val.title
            this.description = val.description
            this.tags = val.tags
        }
    }
}
</script>
 r
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css"

</style>
