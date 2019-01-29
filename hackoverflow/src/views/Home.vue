<template>
  <div class="home container">
    <div v-if="user" class="row mt-2 mb-2">
      <router-link :to="{name: 'question' }" >
        <b-button class="text-right">Ask a Question</b-button>
      </router-link>
    </div>

    <div class="row" v-for="question in questions" :key="question._id">
      <question :question="question" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import question from '@/components/question.vue'

export default {
  name: 'home',
  components: {
    question
  },
  computed: mapState(['questions', 'user']),

}
</script>
