<template>
  <v-app>
    <navigation-drawer
      :border-children="navigationDrawerProps.borderHijo"
      :drawer-children="navigationDrawerProps.drawerHijo"
      :drawer-parent="navigationDrawerProps.drawerPadre"
      :rail-children="navigationDrawerProps.railHijo"
      v-if="sessionUsuario"
    />
    <v-app-bar app height="60" v-if="sessionUsuario">
      <v-btn-group divided>
        <v-btn @click.stop="onClickDrawerParent" :icon="iconMenuParent" />
        <v-btn @click.stop="onClickDrawerChildren" :icon="iconChildren" />
      </v-btn-group>
      <v-toolbar-title>
        <v-img :src="logoSrcGape" contain height="40" />
      </v-toolbar-title>

      <v-btn @click="changePrimaryColor('#FD720D')">Cambiar a Rojo</v-btn>
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

    <v-footer app v-if="sessionUsuario">
      <v-card flat tile width="100%" class="bg-surface-light">
        <v-card-text class="d-flex align-center justify-center text-medium-emphasis">
          <v-tooltip interactive>
            <template v-slot:activator="{ props: tooltipProps }">
              <v-img
                v-bind="tooltipProps"
                :src="logoSrc"
                style="
                  max-width: 65px;
                  max-height: 65px;
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
    <!--dialog-confirmation
      :dialog-content="dialogStore.dialogConfirmation.cuerpo"
      :dialog-icon="dialogStore.dialogConfirmation.icono"
      :dialog-items="dialogStore.dialogConfirmation.items"
      :dialog-title="dialogStore.dialogConfirmation.titulo"
      :dialog-view="dialogStore.dialogConfirmation.dialog"
      @clickNo="dialogStore.onCloseDialogConfirmation"
      @clickYes="handleClickYesDialog"
    />

    <dialog-information
      :dialog-color="dialogStore.dialogInformation.color"
      :dialog-speed-icon="dialogStore.dialogInformation.velocidad"
      :dialog-content="dialogStore.dialogInformation.cuerpo"
      :dialog-icon="dialogStore.dialogInformation.icono"
      :dialog-title="dialogStore.dialogInformation.titulo"
      :dialog-view="dialogStore.dialogInformation.dialog"
      @close="dialogStore.onCloseDialogInformation"
    /-->
  </v-app>
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import router from "./router";
import { ref, getCurrentInstance, defineComponent, computed, mergeProps } from "vue";
import { useTheme } from "vuetify";
import NavigationDrawer from "./components/core/NavigationDrawer.vue";
import Notificacion from "./components/core/Notification.vue";
import Avatar from "./components/core/Avatar.vue";
import { sessionStore } from "@/stores/modules/Core/sesion";

//import DialogConfirmation from "@/components/core/dialogManager/DialogConfirmation.vue";

//import DialogInformation from "@/components/core/dialogManager/DialogInformation.vue";

//import { useDialogManagerStore } from "@/stores/modules/Core/dialog";

export default defineComponent({
  components: {
    NavigationDrawer,
    Notificacion,
    Avatar,
    //DialogConfirmation,
    //DialogInformation,
  },

  setup() {
    //const dialogStore = useDialogManagerStore();
    const session = sessionStore();

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

    const logoSrcGape = computed(() => {
      return theme.global.current.value.dark
        ? "https://static.wixstatic.com/media/b39cbd_eff5ff2e532f46a481354452f7c7e138~mv2.png/v1/fill/w_440,h_156,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/LOGO%20GAPE%20BLANCO%202024.png"
        : "https://static.wixstatic.com/media/b39cbd_db1477d2cd87416fa6f7257894b5035f~mv2.png/v1/fill/w_269,h_88,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/GAPE%202024.png";
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

    /*const handleClickYesDialog = () => {
      dialogStore.onConfirmDialog();
    };*/

    const sessionUsuario = computed(() => session.auth);

    return {
      abrirSitio,
      changePrimaryColor,
      iconChildren,
      iconMenuParent,
      logoSrc,
      logoSrcGape,
      mergeProps,
      navigationDrawerProps,
      onChageTheme,
      onClickDrawerChildren,
      onClickDrawerParent,
      sessionUsuario,
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
