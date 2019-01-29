<template>
    <b-form @submit.prevent="regis" >
        <b-form-group label="Your Name:">
            <b-form-input type="text" v-model="name" placeholder="Enter your name" />
        </b-form-group>
        <b-form-group label="Your Email:">
            <b-form-input type="email" v-model="email" required placeholder="Enter email" />
        </b-form-group>
        <b-form-group label="Your Password:">
            <b-form-input type="password" v-model="password" required placeholder="Enter password" />
        </b-form-group>
         <b-form-group label="Your Birthday:">
            <b-form-input type="date" v-model="birthday" placeholder="Enter your birthday" />
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <router-link :to="{name: 'home' }">
            <b-button type="reset" variant="light">Close</b-button>
        </router-link>
    </b-form>
</template>

<script>
export default {
    name: 'registration',
    data () {
        return {
            email: '',
            name: '',
            password: '',
            birthday: ''
        }
    },
    methods: {
        regis() {
            let data = {
                name: this.name,
                email: this.email,
                password: this.password,
                birthday: this.birthday
            }
            this.$store.dispatch('register', data)
        }
    }
}
</script>

<style>

</style>
