<template>
  <v-container class="d-flex align-center justify-center fill-height login-body" fluid>
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>

    <v-card color="#4B4B4D" elevation="16" width="55%">
      <v-row>
        <v-col cols="12" lg="6">
          <v-card color="#DCDCDD" elevation="0" class="rainbow">
            <vue3-lottie
              width="100%"
              :animation-link="'/src/assets/images/login_barron_animation.json'"
            />
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" class="d-flex align-stretch justify-stretch">
          <v-card color="#4B4B4D" elevation="0" width="100%">
            <v-row class="d-flex align-center justify-center mt-2" style="height: 30%">
              <v-img
                src="https://giefbsa.com/wp-content/uploads/2024/12/Logo-GIEFBSA-001.png"
                contain
                height="100px"
              />
              <!--div class="pt-10">
                <div class="containe-x">
                  <div class="box">
                    <div class="title">
                      <span class="block"></span>
                      <h1 class="nombre-proyecto">Giefbsa Core<span></span></h1>
                    </div>
                    <div class="role">
                      <div class="block"></div>
                      <p>ADMINISTRADOR</p>
                    </div>
                  </div>
                </div>
              </div-->
            </v-row>
            <v-row class="d-flex align-center justify-center" style="height: 40%">
              <v-col cols="12" lg="8" md="8" sm="12">
                <v-form ref="form" v-model="isValid">
                  <v-card-text>
                    <v-text-field
                      v-model="datosForm.email"
                      :rules="[rules.email, rules.required]"
                      clearable
                      color="white"
                      dark
                      label="Email"
                      variant="outlined"
                      clear-icon="mdi-close"
                      density="compact"
                    />
                    <v-text-field
                      v-model="datosForm.password"
                      :append-inner-icon="visiblePassword ? 'mdi-eye-off' : 'mdi-eye'"
                      :rules="[rules.required]"
                      :type="visiblePassword ? 'text' : 'password'"
                      class="custom-text-field"
                      clearable
                      color="white"
                      counter
                      hint="Ingresa al menos 8 caracteres"
                      label="Contraseña"
                      name="input-10-1"
                      variant="outlined"
                      @click:append-inner="visiblePassword = !visiblePassword"
                      clear-icon="mdi-close"
                      density="compact"
                    />
                  </v-card-text>
                  <v-card-actions>
                    <v-btn
                      class="primary--text"
                      color="white"
                      variant="elevated"
                      @click="login()"
                      block
                    >
                      ENTRAR
                      <template v-slot:append>
                        <v-icon color="#001F32">mdi-arrow-right-circle</v-icon>
                      </template>
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-col>
            </v-row>
            <v-row class="d-flex align-end justify-center mt-2" style="height: 18%">
              <v-divider class="border-opacity-25" color="white" width="60%"></v-divider>

              <a href="https://solucionesbecma.com" target="_blank">
                <v-img class="ml-1" src="/src/assets/images/becma_logo.png" width="50"></v-img>
              </a>
              <span class="text-body-2"> &nbsp;&#169; {{ new Date().getFullYear() }} </span>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <dialog-information
        :dialog-color="dialogInformation.color"
        :dialog-content="dialogInformation.cuerpo"
        :dialog-icon="dialogInformation.icono"
        :dialog-speed-icon="dialogInformation.velocidad"
        :dialog-title="dialogInformation.titulo"
        :dialog-view="dialogInformation.dialog"
        @close="onCloseDialogInformation"
      />
    </v-card>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import { useRouter } from 'vue-router'
import { sessionStore } from '../stores/modules/Core/sesion'
import DialogInformation from '../components/core/dialogMessage/DialogInformation.vue'

export default defineComponent({
  name: 'Login',
  components: { DialogInformation, Vue3Lottie },
  setup() {
    const router = useRouter()
    const session = sessionStore()

    // DialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

    const datosForm = ref({
      email: ref('isai@gmail.com'),
      password: ref('123456'),
    })

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const rules = {
      required: (v: string) => !!v || 'Este dato es requerido para continuar.',
      email: (v: string) => emailRegex.test(v) || 'Correo electrónico no válido',
    }

    const visiblePassword = ref(false)
    const isValid = ref(false)
    const form = ref()

    async function login() {
      const isValidForm = await form.value?.validate()

      if (isValidForm.valid) {
        let data = new FormData()
        data.append('email', datosForm.value.email)
        data.append('password', datosForm.value.password)

        try {
          await session.login(data)
          await form.value?.reset()
          router.push({ name: 'CoreSistemaList' })
        } catch (error) {
          onOpenDialogInformation('#438701', `Datos incorrectos`, 'incorrect', 'Login', 1)
        }
      }
    }

    const onCloseDialogInformation = () => {
      dialogInformation.value.dialog = false
    }

    const onOpenDialogInformation = (
      color: string,
      cuerpo: string,
      icono: string,
      titulo: string,
      velocidad: number,
    ) => {
      dialogInformation.value = {
        color: color,
        cuerpo: cuerpo,
        dialog: true,
        icono: icono,
        titulo: titulo,
        velocidad: velocidad,
      }
    }

    return {
      isValid,
      visiblePassword,
      datosForm,
      form,
      rules,
      dialogInformation,
      login,
      onCloseDialogInformation,
      onOpenDialogInformation,
    }
  },
})
</script>

<style scoped>
@import '../styles/background.css';
.login-body {
  background-color: #f0f0f0 !important;
}

.login-body .theme--light {
  color: #e6e9f5 !important;
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}

.rainbow {
  position: relative;
  z-index: 0;
  overflow: hidden;
  padding: 5px;

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      #AB2F32 0deg 60deg,
      #FF6000 60deg 120deg,
      #ED3237 120deg 180deg,
      #00335F 180deg 240deg,
      #00A859 240deg 300deg,
      #025595 300deg 360deg
    );
    animation: rotate 10s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    left: 6px;
    top: 6px;
    width: calc(100% - 12px);
    height: calc(100% - 12px);
    background: white;
    border-radius: 5px;
  }
}

.parallelogram {
  -webkit-transform: skew(-40deg);
  -moz-transform: skew(-40deg);
  -o-transform: skew(-40deg);
  transform: skew(-40deg);
  position: absolute;
  z-index: -9;
}

/* Colors */
:root {
  --color1: #025595;
  --color2: #00a859;
  --color3: #ff6000;
}

/* Keyframes */
@keyframes moveBar {
  100% {
    transform: skew(-40deg) translateY(-1000px);
  }
}
</style>
