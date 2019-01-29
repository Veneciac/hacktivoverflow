<template>
    <b-form @submit.prevent="login"  >
        <b-form-group label="Your Email:">
            <b-form-input type="email" v-model="email" required placeholder="Enter email" />
        </b-form-group>
        <b-form-group label="Your Password:">
            <b-form-input type="password" v-model="password" required placeholder="Enter password" />
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <router-link :to="{name: 'home' }">
            <b-button type="reset" variant="light">Close</b-button>
        </router-link>
    </b-form>
</template>

<script>
export default {
    name: 'login',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            let data = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('login', data)
        }
    }
}
</script>

<style>

</style>
