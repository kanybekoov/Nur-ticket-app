import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import TicketList from '../views/TicketList.vue'
import TicketDetails from '../views/TicketDetails.vue'


const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/tickets', name: 'TicketList', component: TicketList },
   { path: '/tickets/:id', name: 'TicketDetails', component: TicketDetails }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
