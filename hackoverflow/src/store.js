import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import swal from 'sweetalert'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url: `http://localhost:3000`,
    user: {},
    questions: [],
    questionDetail: {},
    answersList: [],
  },
  mutations: {
    mutateUser (state, user) {
      state.user = user
    },
    mutateQuestion (state, questions) {
      state.questions = questions
    },
    mutateAddQuestion (state, question) {
      state.questions.unshift(question)
    },
    mutateQuestionDetail (state, question) {
      state.questionDetail = question
    },
    mutateGetAnswer (state, answers) {
      state.answersList = answers
    },
    mutateLogOut (state) {
      state.user = ''
    },
  },
  actions: {
    login ({commit}, data) {
      axios({
        method: 'post',
        url: `${this.state.url}/users/login`,
        data
      })
      .then(resp => {
        commit('mutateUser', resp.data.data)
        localStorage.setItem('token', resp.data.token)
        router.push({ name: 'home'})
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    register ({commit}, data) {
      axios({
        method: 'post',
        url: `${this.state.url}/users`,
        data
      })
      .then(resp => {
        commit('mutateUser', resp.data.data)
        localStorage.setItem('token', resp.data.token)
        router.push({ name: 'home'})
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    logOut ({ commit }) {
      commit('mutateLogOut')
      localStorage.removeItem('token')
    },
    getUser ({commit}) {
      axios({
        method: 'get',
        url: `${this.state.url}/users`,
        headers: {
          token: localStorage.token
        }
      })
      .then(resp => {
        commit('mutateUser', resp.data.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    addQuestion ({commit}, data) {
      axios({
        method: 'post',
        url: `${this.state.url}/questions`,
        data,
        headers: {
          token: localStorage.token
        }
      })
      .then(resp => {
        commit('mutateAddQuestion', resp.data.data)
        console.log('masuk action then')
        router.push({ name: 'home'})
      })
      .catch(err => {
        console.log(err, 'ini error')
      })
    },
    getQuestion ({ commit }) {
      axios({
        method: 'get',
        url: `${this.state.url}/questions`
      })
      .then(resp => {
        commit('mutateQuestion', resp.data.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getOneQuestion ({ commit }, id) {
      axios({
        method: 'get',
        url: `${this.state.url}/questions/${id}`
      })
      .then(resp => {
        commit('mutateQuestionDetail', resp.data.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    getAnswer ({ commit }, id) {
      axios({
        method: 'get',
        url: `${this.state.url}/answers/${id}`
      })
      .then(resp => {
        commit('mutateGetAnswer', resp.data.data)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    updateQuestion ({commit}, ques) {
      axios({
        method: 'put',
        url: `${this.state.url}/questions/${ques._id}`,
        data: ques,
        headers: {
          token: localStorage.token
        }
      })
      .then(resp => {
        this.dispatch('getOneQuestion', ques._id)
        this.dispatch('getQuestion')
      })
    },
    upVote ({commit}, ques) {
      if (this.state.user) {
        let checkUp = ques.upvotes.map(function(e) { return e._id }).indexOf(this.state.user._id)
        let checkDown = ques.downvotes.map(function(e) { return e._id }).indexOf(this.state.user._id)

        if (checkUp == -1) {
          if (checkDown !== -1) {
            ques.downvotes.splice(checkDown, 1)
          } else {
            ques.upvotes.push(this.state.user._id)
          }
          if (ques.hasOwnProperty('question')) {
            this.dispatch('updateAnswer', ques)
          } else {
            this.dispatch('updateQuestion', ques)
          }
  
        } else {
          if (checkDown !== -1) {
            ques.downvotes.splice(checkDown, 1)
            ques.upvotes.push(this.state.user._id)
            if (ques.hasOwnProperty('question')) {
              this.dispatch('updateAnswer', ques)
            } else {
              this.dispatch('updateQuestion', ques)
            }
          } else {
            swal("Sorry!", "You already upvote!", "info")
            // console.log('udh uypvotes g bisa lagi')
          }
        }
      } else {
        swal('Please login first', '', 'info')
      }
    },
    downVote ({ commit }, ques) {
      if (this.state.user) {
        let checkUp = ques.upvotes.map(function(e) { return e._id }).indexOf(this.state.user._id)
        let checkDown = ques.downvotes.map(function(e) { return e._id }).indexOf(this.state.user._id)

        if (checkDown == -1) {
          if (checkUp !== -1) {
            ques.upvotes.splice(checkUp, 1)
          } else {
            ques.downvotes.push(this.state.user._id)
          }
          if (ques.hasOwnProperty('question')) {
            this.dispatch('updateAnswer', ques)
          } else {
            this.dispatch('updateQuestion', ques)
          }
  
        } else {
          if (checkUp !== -1) {
            ques.upvotes.splice(checkUp, 1)
            ques.downvotes.push(this.state.user._id)
            if (ques.hasOwnProperty('question')) {
              this.dispatch('updateAnswer', ques)
            } else {
              this.dispatch('updateQuestion', ques)
            }
          } else {
            swal("Sorry!", "You already downvote!", "info")
            // console.log('udh downvotes g bisa lagi')
          }
        }
      } else {
        swal('Please login first', '', 'info')
      }
    },
    addAnswer ({ commit }, answer) {
      return axios({
        method: 'post',
        url: `${this.state.url}/answers/${router.currentRoute.params.id}`,
        data: answer,
        headers: {
          token: localStorage.token
        }
      })
 
    },
    updateAnswer ({commit}, answer) {
      axios({
        method: 'put',
        url: `${this.state.url}/answers/${answer._id}`,
        data: answer,
        headers: {
          token: localStorage.token
        }
      })
      .then(resp => {
        this.dispatch('getAnswer', router.currentRoute.params.id)
      })
      .catch(err => {
        console.log(err.response)
      })
    },
    search ({commit}, query) {
      if (query !== '' ) {
        let q = new RegExp(query.toLowerCase())
        let listQuestion = this.state.questions.filter(el => el.title.toLowerCase().match(q))
        commit('mutateQuestion', listQuestion)
      } else {
        this.dispatch('getQuestion')
      }
    }
  },
})
