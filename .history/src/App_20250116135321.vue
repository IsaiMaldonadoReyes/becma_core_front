<template>
  <v-app>
    <v-app-bar> </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <v-card flat tile width="100%" color="#E6E9F5">
        <v-card-text class="grey--text text--darken-3 d-flex align-end justify-center">
          <v-tooltip bottom color="primary">
            <template v-slot:activator="{ on, attrs }">
              <a href="https://solucionesbecma.com" target="_blank">
                <v-img
                  contain
                  max-height="20"
                  max-width="30"
                  :src="require('./assets/images/becma_isotipo_gris.png')"
                  v-bind="attrs"
                  v-on="on"
                />
              </a>
            </template>
            <span> Soluciones Administrativas BECMA, S.A. de C.V </span>
          </v-tooltip>
          © {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card></v-footer
    >
  </v-app>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import router from './router'
</script>
<style>
/*html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100vw;
}*/
</style>
