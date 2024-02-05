<template>
  <div class="card">
    <h1>Привет на главной</h1>
    <p>Тут ты можешь перейти на любую страницу и почитать заранее заготовленные письма :)</p>
    <router-link to="/mail">To Mail</router-link>
    <br/>
    <router-link :to="{ name: 'email' }">В почту</router-link>
  </div>
</template>

<script>
export default {
  // В компоненте тоже есть свои хуки: beforeRouteLeave, beforeRouteUpdate и т.д.
  // Порядок будет такой: глобальный beforeEach -> beforeEnter у роута -> beforeRouteEnter у компонента
  beforeRouteEnter() {
    console.log('beforeRouteEnter');
  },
  beforeRouteLeave(to, from, next) { // используется при попытке уйти со страницы, например, когда не заполнена форма
    const answer = confirm('Вы уверены, что хотите покинуть страницу?');

    if (answer) {
      next();
    } else {
      next(false); // либо вообще не вызывать
    }
  }
}
</script>