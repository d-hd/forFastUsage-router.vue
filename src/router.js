import { createRouter, createWebHistory } from 'vue-router'
import Login from './views/Login'
import Forget from './views/Forget'
import Dashboard from './views/Dashboard'
// import Mail from './views/Mail' // Так мы грузим все в бандл
import AppEmailBody from './components/AppEmailBody'
import NotFound from './views/NotFound'

const Mail = () => import('./views/Mail.vue') // Так мы диначически подгрузим страницу (Lazy Loading) в виде чанка

/*
createWebHistory - история будет сохраняться по слешу /
createMemoryHistory - не будет изменения в адрессной строке, переходы будут сохранться в оперативке
createWebHashHistory - позволяет переходить по хешам - #Название_страницы
*/

const router =  createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login', component: Login, alias: '/' },
    { path: '/forget', component: Forget, meta: {
      cantEnter: true  //просто объект сданными
    }},
    { path: '/dashboard', 
      component: Dashboard, 
      name: 'home', // name - внутреннее название роута. если поменяется path, не придется менять везде по коду. Можно передавать как в метод роутер, так и в next
      beforeEnter() { // Метод(хук) для конкретного роута
        console.log('beforeEnter')
      }
    }, 
    { path: '/mail', name: 'email', component: Mail, children: [ // children так указываются дочерние роуты
      { path: ':mailId?', component: AppEmailBody, props: true }  // props так передается параметр mailId в виде пропса
    ]}, // /mail/123 - знак вопроса в конце :mailId? означает необязательность параметра 
    // { path: '/:404(.*)', redirect: '/login' } // так можно делать редирект
    { path: '/:404(.*)', component: NotFound } // 404 страница
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

// Глобальные методы
router.beforeEach((to, from, next) => { // Вызывается при переходе на страницу
  console.log('beforeEach')
  
  if (to.meta.cantEnter) {
    // next(false) // запрещает переход
    next({name: 'home'}) // редиректит
  } else {
    next()
  }
})

router.afterEach((to, from) => { // Вызывается после того, как перешли на страницу. Например, можно собирать аналитику по переходам

})

export default router