<template>
  <div id="app">
    <div id="nav">
        <navbar/>
    </div>
    <router-view/>
  </div>
</template>

<script>

import navbar from '@/components/navbar.vue'
import { mapState } from 'vuex'
export default {
  name: 'All',
  components: {
    navbar,
  },
  data () {
    return {

    }
  },
  methods: {
  },
  created () {
    this.$store.dispatch('getQuestion')
    if (localStorage.token) {
      this.$store.dispatch('getUser')
    }
  },
  computed: mapState(['user'])
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>