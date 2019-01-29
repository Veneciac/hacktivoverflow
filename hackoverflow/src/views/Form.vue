<template>
    <div class="container">
        <b-card class="text-left mt-5 mx-auto" style="width: 100vh">
            <div slot="header">
                <h4>
                    {{ this.$route.name.toUpperCase() }} FORM
                </h4>
            </div>
            <login-form v-if="this.$route.name == 'login'"/>
            <registration v-if="this.$route.name == 'signin'"/>
            <form-question v-if="this.$route.name == 'question'" />
        </b-card>
    </div>
</template>

<script>
import loginForm from '@/components/formLogin.vue'
import registration from '@/components/formRegis.vue'
import formQuestion from '@/components/formQuestion.vue'

export default {
    name: 'userForm',
    components: {
        loginForm,
        registration,
        formQuestion
    }

}
</script>

<style>

</style>
