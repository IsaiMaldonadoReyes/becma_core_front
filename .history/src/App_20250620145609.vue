<template>
  <v-app>
    <navigation-drawer
      :border-children="navigationDrawerProps.borderHijo"
      :drawer-children="navigationDrawerProps.drawerHijo"
      :drawer-parent="navigationDrawerProps.drawerPadre"
      :rail-children="navigationDrawerProps.railHijo"
    />
    <v-app-bar app height="60">
      <v-btn-group divided>
        <v-btn @click.stop="onClickDrawerParent" :icon="iconMenuParent" />
        <v-btn @click.stop="onClickDrawerChildren" :icon="iconChildren" />
      </v-btn-group>
      <v-toolbar-title>
        <v-img class="" :src="logoSrc" contain height="40" />
      </v-toolbar-title>
      <v-spacer />
      <!--v-btn @click="changePrimaryColor('#285697')">Cambiar a Rojo</v-btn-->
      <!--v-btn @click="changePrimaryColor('blue')">Cambiar a Azul</v-btn>
      <v-btn @click="changePrimaryColor('green')">Cambiar a Verde</v-btn-->
      <template v-slot:append>
        <v-switch
          color="primary"
          false-icon="mdi-weather-night"
          hide-details
          inset
          true-icon="mdi-white-balance-sunny"
          @change="onChageTheme"
        />
        <notificacion />
        <v-divider class="mx-2" vertical></v-divider>
        <avatar />
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app>
      <v-card flat tile width="100%" class="bg-surface-light">
        <v-card-text class="d-flex align-center justify-center text-medium-emphasis">
          <v-tooltip interactive>
            <template v-slot:activator="{ props: tooltipProps }">
              <v-img
                v-bind="tooltipProps"
                :src="logoSrc"
                style="
                  max-width: 60px;
                  max-height: 60px;
                  width: auto;
                  height: auto;
                  cursor: pointer;
                "
                @click.stop="abrirSitio"
              />
            </template>
            <span>Soluciones Administrativas BECMA, S.A. de C.V</span>
          </v-tooltip>

          &nbsp;©&nbsp;{{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import router from "./router";
import { ref, defineComponent, computed, mergeProps } from "vue";
import { useTheme } from "vuetify";
import NavigationDrawer from "./components/core/NavigationDrawer.vue";
import Notificacion from "./components/core/Notification.vue";
import Avatar from "./components/core/Avatar.vue";

export default defineComponent({
  components: { NavigationDrawer, Notificacion, Avatar },

  setup() {
    const theme = useTheme();
    const changePrimaryColor = (color: string) => {
      theme.themes.value.light.colors.primary = color;
    };

    const onChageTheme = () => {
      theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
    };

    const logoSrc = computed(() => {
      return theme.global.current.value.dark
        ? "/src/assets/images/becma_logo.png"
        : "/src/assets/images/becma_logo_color.png";
    });

    const abrirSitio = () => {
      window.open("https://solucionesbecma.com", "_blank");
    };

    // NavigationDrawer
    const navigationDrawerProps = ref({
      borderHijo: false,
      drawerHijo: true,
      drawerPadre: false,
      railHijo: false,
    });
    const iconMenuParent = ref("mdi-format-list-bulleted");
    const iconChildren = ref("mdi-format-list-bulleted");
    const clickCount = ref(0);

    const onClickDrawerParent = () => {
      if (navigationDrawerProps.value.drawerPadre) {
        navigationDrawerProps.value.drawerPadre = false;
        iconMenuParent.value = "mdi-menu";
      } else {
        navigationDrawerProps.value.drawerPadre = true;
        iconMenuParent.value = "mdi-format-list-bulleted";
      }
    };

    const onClickDrawerChildren = () => {
      clickCount.value = (clickCount.value + 1) % 3;
      switch (clickCount.value) {
        case 0:
          navigationDrawerProps.value.borderHijo = true;
          navigationDrawerProps.value.drawerHijo = true;
          navigationDrawerProps.value.railHijo = true;
          iconChildren.value = "mdi-format-list-bulleted";
          break;
        case 1:
          navigationDrawerProps.value.borderHijo = false;
          navigationDrawerProps.value.drawerHijo = true;
          navigationDrawerProps.value.railHijo = false;
          iconChildren.value = "mdi-menu-open";
          break;
        case 2:
          navigationDrawerProps.value.borderHijo = false;
          navigationDrawerProps.value.drawerHijo = false;
          navigationDrawerProps.value.railHijo = true;
          iconChildren.value = "mdi-menu";
          break;
      }
    };

    return {
      changePrimaryColor,
      iconChildren,
      iconMenuParent,
      logoSrc,
      mergeProps,
      navigationDrawerProps,
      onChageTheme,
      abrirSitio,
      onClickDrawerChildren,
      onClickDrawerParent,
    };
  },
});
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
