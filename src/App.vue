<template>
  <the-navbar :visible="isAuth" />
  <div class="container with-nav">
    <router-view />
</div>
</template>

<script>
import TheNavbar from './components/TheNavbar';

export default {
  data() {
    return {
      isAuth: false
    }
  },
  methods: {
    login() {
      this.isAuth = true

      if (this.$route.query.page) {
        this.$router.replace(this.$route.query.page);
      } else {
        this.$router.replace('/dashboard'); // replace не сохраняет наши переходы в историю
      }
    },
    logout() {
      this.isAuth = false
      this.$router.push({
        path: '/login',
        query: {
          page: this.$route.path // Запоминание последней посещенной страницы, откуда был совершен выход
        }
      })
    }
  },
  components: {TheNavbar},
  provide() {
    return {
      login: this.login,
      logout: this.logout,
      emails: [
        {id: 1, theme: 'Письмо 1'},
        {id: 2, theme: 'Письмо 2'},
        {id: 3, theme: 'Письмо 3'},
        {id: 4, theme: 'Письмо 4'},
        {id: 5, theme: 'Письмо 5'}
      ]
    }
  }
}
</script>