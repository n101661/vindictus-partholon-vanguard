import { createApp } from "vue"
import App from "./App.vue"
import { createRouter, createWebHashHistory } from "vue-router"
import CalculateBestTeams from "./view/CalculateBestTeams.vue"
import OwnedHeroes from "./view/OwnedHeroes.vue"
import VindictusHeroes from "./view/VindictusHeroes.vue"

createApp(App)
  .use(
    createRouter({
      history: createWebHashHistory(),
      routes: [
        {
          path: "/",
          component: CalculateBestTeams,
        },
        {
          path: "/calculate-best-teams",
          name: "calculate-best-teams",
          component: CalculateBestTeams,
        },
        {
          path: "/owned-heroes",
          name: "owned-heroes",
          component: OwnedHeroes,
        },
        {
          path: "/heroes",
          name: "heroes",
          component: VindictusHeroes,
        },
      ],
    }),
  )
  .mount("#app")
