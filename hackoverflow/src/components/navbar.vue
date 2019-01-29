<template>
    <b-navbar toggleable="md" type="light" variant="light">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <router-link :to="{ name: 'home'}">
            <b-navbar-brand>HacktivOverflow</b-navbar-brand>
        </router-link>

        <b-collapse is-nav id="nav_collapse">
            <b-nav-form @keyup="search">
                <b-form-input v-model="query" style="width: 100vh" class=" ml-5 mr-sm-2" type="text" placeholder="Search"/>
                <!-- <b-button class="my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></b-button> -->
            </b-nav-form>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                 <div v-if="user">
                    <router-link :to="{name: 'profile' ,params: {id: user._id} }">
                        <b-button class="mr-2" variant="link" style="color: black">Profile</b-button>
                    </router-link>
                    <b-button @click="logOut" class="mr-2">Log Out</b-button>
                </div>
                <div v-else>
                    <router-link :to="{name: 'login' }">
                        <b-button class="mr-2">Log In</b-button>
                    </router-link>
                    <router-link :to="{name: 'signin' }">
                        <b-button>Sign Up</b-button>
                    </router-link>
                </div>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'navbar',
    computed: mapState(['user']),
    data () {
        return {
            query: ''
        }
    },
    methods: {
        search () {
            this.$store.dispatch('search', this.query)
        },
        logOut () {
            this.$store.dispatch('logOut')
        }
    }
}
</script>

<style>

</style>
