<template>
  <v-container class="d-flex align-center justify-center fill-height login-body" fluid>
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <v-card color="#1E2022" elevation="16" width="55%">
      <v-row>
        <v-col cols="12" lg="6">
          <v-card color="#1E2022" elevation="0">
            <vue3-lottie width="90%" :animation-link="'/src/assets/images/animacion.json'" />
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" class="d-flex align-stretch justify-stretch">
          <v-card color="#285697" elevation="0" width="100%">
            <v-row class="d-flex align-center justify-center" style="height: 30%">
              <div class="pt-10">
                <div class="containe-x">
                  <div class="box">
                    <div class="title">
                      <span class="block"></span>
                      <h1 class="nombre-proyecto">Giefbsa Core<span></span></h1>
                    </div>
                    <div class="role">
                      <div class="block"></div>
                      <p>SUPERADMINISTRADOR</p>
                    </div>
                  </div>
                </div>
              </div>
            </v-row>
            <v-row class="d-flex align-center justify-center" style="height: 40%">
              <v-col cols="12" lg="8" md="8" sm="12">
                <v-form>
                  <v-card-text>
                    <v-text-field variant="outlined" clearable label="Email" color="white" dark />
                    <v-text-field
                      :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                      :type="visible ? 'text' : 'password'"
                      class="custom-text-field"
                      clearable
                      color="white"
                      counter
                      hint="Ingresa al menos 8 caracteres"
                      label="Contraseña"
                      name="input-10-1"
                      variant="outlined"
                      @click:append-inner="visible = !visible"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="white"
                      variant="elevated"
                      class="primary--text pa-2"
                      @click="login()"
                    >
                      ENTRAR
                      <template v-slot:append>
                        <v-icon color="#285697">mdi-arrow-right-circle</v-icon>
                      </template>
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="d-flex align-end justify-center ma-4" style="height: 18%">
              <v-divider class="border-opacity-25" color="white" width="60%"></v-divider>
              <p>&#169; 2024</p>
              <a href="https://solucionesbecma.com" target="_blank">
                <v-img class="ml-1" src="/src/assets/images/becma_logo.png" width="70"></v-img>
              </a>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  components: { Vue3Lottie },
  setup() {
    const router = useRouter()
  },
  data: () => ({
    visible: false,
  }),
  async login() {
    router.push()
  },
})
</script>

<style scoped>
@import '../styles/background.css';
.login-body {
  background-color: #18191b !important;
}

.login-body .theme--light {
  color: #e6e9f5 !important;
}
</style>
