<template>
    <b-form @submit.prevent="ask" >
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
            <router-link :to="{name: 'home' }">
                <b-button type="reset" variant="light">Close</b-button>
            </router-link>
        </div>
    </b-form>
</template>

<script>
export default {
    name: 'askQuestion',
    data () {
        return {
            title: '',
            description: '',
            tags: [],
            temp: ''
        }
    },
    methods: {
        ask () {
            let data = {
                title: this.title,
                description: this.description,
                tags: this.tags
            }
            this.$store.dispatch('addQuestion', data)
            // this.$router.push({ name: 'home'})
        },
        pushTag () {
            this.tags.push(this.temp)
            this.temp = ""
        }
    },
    components: {
        
    }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
