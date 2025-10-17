<template>
  <v-container ref="vconPrincipalRef" class="fill-height login-body" fluid>
    <div class="lines">
      <div class="line"></div>
      <div class="line"></div>
      <div class="line"></div>
    </div>
    <v-row>
      <v-img
        src="https://salorma.com/wp-content/uploads/2023/01/Salorma-Pharma-logo.png"
        contain
        :style="{
          left: '40%',
          position: 'absolute',
          transform: smAndDown ? 'translateY(20px)' : 'translateY(-60px)',
          width: '150px',
          zIndex: 1,
        }"
      />
      <!-- vtimContenidoRef Responsive -->
      <v-col v-if="smAndDown" cols="12" md="2" ref="vtimContenidoRef">
        <v-timeline
          align="center"
          class="pa-3"
          direction="horizontal"
          line-inset="5"
          side="start"
          truncate-line="both"
          :style="{
            zIndex: 1,
            transform: 'translateY(85px)',
          }"
        >
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="step.value"
            :dot-color="itemColor(i)"
            :line-color="itemColor(i)"
            class="cursor-pointer"
            fill-dot
            size="60px"
            @click="goTo(i)"
          >
            <template v-slot:icon>
              <v-icon
                size="30px"
                :color="i < current ? 'white' : i === current ? '#722B81' : '#722B81'"
                :icon="i < current ? 'mdi-check' : i === current ? 'mdi-progress-clock' : step.icon"
              />
            </template>

            <v-card
              :width="getTimelineItemWidth"
              :style="{
                fontSize: '14px',
                color: '#722B81',
              }"
              class="d-flex align-center justify-center text-center rounded-lg"
              color="#E1DDE8"
              elevation="16"
              min-height="60px"
            >
              {{ step.title }}
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
      <v-col ref="vcarContenidoRef" class="d-flex align-center justify-end" cols="12" md="9">
        <vue3-lottie
          v-if="!smAndDown"
          :animation-link="'/src/assets/images/doctor4.json'"
          height="auto"
          style="bottom: 0; left: 0; position: absolute; z-index: 1; pointer-events: none"
          width="26vw"
        />

        <v-row justify="end">
          <v-col cols="12" md="9">
            <v-card
              :class="{
                'rounded-lg': true,
                'pa-15': !smAndDown,
                'px-5': smAndDown,
                'pt-16': smAndDown,
                'ma-5': smAndDown,
              }"
              :style="getCardContenidoHeight"
              color="#E6E6E6"
              elevation="16"
            >
              <!-- vrowTituloRef -->
              <v-row ref="vrowTituloRef">
                <v-col cols="12" class="d-flex align-center">
                  <v-card-title v-if="current === 0" class="text-h5" style="color: #722b81">
                    <v-icon color="#722b81">mdi-invoice-text</v-icon>
                    1. Recibo
                  </v-card-title>
                  <v-card-title v-if="current === 1" class="text-h5" style="color: #722b81">
                    <v-icon color="#722b81">mdi-badge-account</v-icon> 2. Datos fiscales
                  </v-card-title>
                  <v-card-title v-if="current === 2" class="text-h5" style="color: #722b81">
                    <v-icon color="#722b81">mdi-file-download</v-icon> 3. Descarga
                  </v-card-title>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-divider class="border-opacity-50" />
                </v-col>
              </v-row>

              <!-- vrowBarraPrincipalRef -->
              <v-row ref="vrowBarraPrincipalRef">
                <v-col v-if="current === 0" cols="12">
                  <v-row>
                    <v-col cols="10" lg="11">
                      <bec-autocomplete
                        v-model="modelKiosco.id_sucursal"
                        :color="'#722b81'"
                        :item-subtitle="(item) => `${item.numero}`"
                        :item-title="'nombre'"
                        :item-value="'id'"
                        :items="itemsEmpresas"
                        :label="'Empresa *'"
                        :multiple="false"
                        :prepend-icon="'mdi-store'"
                        :return-object="false"
                        :show-chips="true"
                      >
                        <template #tooltip>
                          <v-card color="transparent" elevation="0" class="py-3">
                            <v-row>
                              <v-col cols="1" class="d-flex align-center justify-center">
                                <v-icon class="mr-1" color="white" icon="mdi-store" />
                              </v-col>
                              <v-col cols="11">
                                Seleccione una sucursal antes de agregar recibos. Esto permite
                                asociar correctamente la información al punto de venta o plantel
                                correspondiente y garantizar que los datos se reflejen en la factura
                                correcta.
                              </v-col>
                            </v-row>
                            <v-divider class="border-opacity-50 my-2 mx-4" />
                            <v-row>
                              <v-col cols="1" class="d-flex align-center justify-center">
                                <v-icon class="mr-1" color="white" icon="mdi-alert" />
                              </v-col>
                              <v-col cols="11">
                                <span style="font-weight: bold">Nota:</span>
                                los campos marcados con (*) son obligatorios para continuar con el
                                proceso de facturación.
                              </v-col>
                            </v-row>
                          </v-card>
                        </template>
                      </bec-autocomplete>
                    </v-col>
                    <v-col cols="2" lg="1" class="d-flex justify-end">
                      <v-tooltip bottom color="primary" interactive>
                        <template v-slot:activator="{ props: tooltipProps }">
                          <v-btn
                            v-bind="mergeProps(tooltipProps)"
                            :disabled="!sucursalSeleccionada"
                            class="mr-1"
                            color="#722b81"
                            flat
                            height="40px"
                            min-width="40px"
                            width="40px"
                            @click="onOpenModalForm('Recibo')"
                          >
                            <v-icon color="white" icon="mdi-plus" size="24px" />
                          </v-btn>
                        </template>
                        <span>Agregar ticket para facturar</span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col v-if="current === 1" cols="12">
                  <v-tabs
                    v-model="vtabPaso2"
                    color="#722B81"
                    class="text-medium-emphasis border"
                    grow
                    height="40px"
                  >
                    <v-tab
                      v-for="tab in vtabPaso2Items"
                      :key="tab.value"
                      :value="tab.value"
                      :variant="vtabPaso2 == tab.value ? 'tonal' : 'text'"
                    >
                      <v-icon left class="px-5" size="24px">{{ tab.icon }}</v-icon>
                      {{ tab.title }}
                    </v-tab>
                  </v-tabs>
                </v-col>
                <v-col v-if="current === 2" cols="12">
                  <v-card-text class="text-medium-emphasis">
                    Dé clic en el botón del archivo que necesite descargar de su factura. Puede
                    obtener el PDF para visualizar o imprimir el comprobante, y el XML para
                    conservar el archivo fiscal válido ante el SAT.
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-divider class="border-opacity-50" />
                </v-col>
              </v-row>

              <!-- vrowContenidoPrincipalRef -->
              <v-row
                ref="vrowContenidoPrincipalRef"
                :style="getRowTablaRecibosHeight"
                class="overflow-auto"
              >
                <v-col cols="12">
                  <v-tabs-window v-model="current" color="transparent">
                    <!--Paso 1-->
                    <v-tabs-window-item key="s1" value="s1" color="transparent">
                      <v-data-iterator :items="itemsRecibos" items-per-page="-1">
                        <template v-slot:default="{ items }">
                          <v-row>
                            <v-col v-for="item in items" key="id" cols="12" md="12">
                              <v-card
                                class="rounded d-flex justify-center align-center my-2 mx-4 pa-2"
                                color="#f0f0f0"
                                elevation="5"
                                min-height="60px"
                              >
                                <v-row v-if="!smAndDown">
                                  <v-col :class="{ 'pl-2': true }" cols="12" md="3">
                                    <v-card-title
                                      style="color: #722b81; font-size: 10px; font-weight: bold"
                                    >
                                      Fecha
                                    </v-card-title>
                                    <v-card-text>{{ item.raw.fechaFormato }}</v-card-text>
                                  </v-col>
                                  <v-col cols="12" md="4">
                                    <v-card-title
                                      style="color: #722b81; font-size: 10px; font-weight: bold"
                                    >
                                      Folio
                                    </v-card-title>
                                    <v-card-text>{{ item.raw.folio }}</v-card-text>
                                  </v-col>
                                  <v-col class="d-flex align-center justify-end" cols="12" md="3">
                                    <v-card-title
                                      class="d-flex align-center justify-end"
                                      style="color: #722b81; font-size: 16px; font-weight: bold"
                                    >
                                      $ {{ item.raw.importe }}
                                    </v-card-title>
                                  </v-col>
                                  <v-col class="d-flex justify-end align-center" cols="12" md="2">
                                    <!-- vbtnEliminar -->
                                    <v-tooltip bottom color="primary" interactive>
                                      <template v-slot:activator="{ props: tooltipProps }">
                                        <v-btn
                                          v-bind="mergeProps(tooltipProps)"
                                          class="mr-1"
                                          color="#722B81"
                                          flat
                                          height="40px"
                                          min-width="40px"
                                          width="40px"
                                          @click="onRemoveReceipt(item.raw.folio)"
                                        >
                                          <v-icon color="white" icon="mdi-delete" size="24px" />
                                        </v-btn>
                                      </template>
                                      <span>Quitar recibo</span>
                                    </v-tooltip>
                                  </v-col>
                                </v-row>
                                <v-row v-else class="pa-2">
                                  <v-col cols="9">
                                    <v-row>
                                      <v-col
                                        class="d-flex align-center"
                                        cols="6"
                                        style="color: #722b81; font-size: 14px; font-weight: bold"
                                      >
                                        Fecha
                                      </v-col>
                                      <v-col cols="6" class="d-flex align-center justify-end">
                                        {{ item.raw.fechaFormato }}
                                      </v-col>
                                      <v-col
                                        cols="6"
                                        style="color: #722b81; font-size: 14px; font-weight: bold"
                                      >
                                        Folio
                                      </v-col>
                                      <v-col cols="6" class="d-flex align-center justify-end">
                                        {{ item.raw.folio }}
                                      </v-col>
                                      <v-col
                                        cols="6"
                                        style="color: #722b81; font-size: 14px; font-weight: bold"
                                      >
                                        Importe
                                      </v-col>
                                      <v-col cols="6" class="d-flex align-center justify-end">
                                        {{ item.raw.importe }}
                                      </v-col>
                                    </v-row>
                                  </v-col>
                                  <v-col cols="3" class="d-flex align-center justify-end">
                                    <!-- vbtnEliminar -->
                                    <v-divider vertical class="mr-3 my-2 border-opacity-25" />
                                    <v-tooltip bottom color="primary" interactive>
                                      <template v-slot:activator="{ props: tooltipProps }">
                                        <v-btn
                                          v-bind="mergeProps(tooltipProps)"
                                          color="#722B81"
                                          flat
                                          height="40px"
                                          min-width="40px"
                                          width="40px"
                                          @click="onRemoveReceipt(item.raw.folio)"
                                        >
                                          <v-icon color="white" icon="mdi-delete" size="24px" />
                                        </v-btn>
                                      </template>
                                      <span>Quitar recibo</span>
                                    </v-tooltip>
                                  </v-col>
                                </v-row>
                              </v-card>
                            </v-col>
                          </v-row>
                        </template>
                      </v-data-iterator>
                    </v-tabs-window-item>
                    <!--Paso 2-->
                    <v-tabs-window-item key="s2" value="s2" color="transparent">
                      <v-tabs-window v-model="vtabPaso2">
                        <v-form ref="formClienteRef">
                          <v-tabs-window-item value="tab1" eager>
                            <v-row>
                              <v-col cols="12" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.rfc"
                                  :color="'#722B81'"
                                  :label="'RFC *'"
                                  :placeholder="'Ingrese el RFC'"
                                  :prepend-icon="'mdi-card-account-details'"
                                  :rules="[validationRules.required, validationRules.rfc]"
                                  @keypress="inputFilters.onlyRFC"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="py-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-card-account-details"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Capture el RFC del contribuyente tal como aparece en su
                                          constancia fiscal para emitir la factura correctamente.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2 mx-4" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="12" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.razon_social"
                                  :color="'#722B81'"
                                  :label="'Razón social *'"
                                  :placeholder="'Razón social'"
                                  :prepend-icon="'mdi-account-credit-card'"
                                  :rules="[validationRules.required]"
                                  @keypress="inputFilters.onlyAlphanumericWithSpaces"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="py-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-account-credit-card"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese la razón social tal como aparece en su constancia
                                          de situación fiscal para evitar errores en la factura.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2 mx-4" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="12" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.correo"
                                  :color="'#722B81'"
                                  :label="'Correo electrónico *'"
                                  :placeholder="'Correo electrónico'"
                                  :prepend-icon="'mdi-email'"
                                  :rules="[
                                    validationRules.required,
                                    validationRules.emailIfNotEmpty,
                                  ]"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="py-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-email" />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese un correo electrónico válido donde se enviarán
                                          automáticamente los archivos PDF y XML de su factura una
                                          vez generada.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2 mx-4" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="12" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.observaciones"
                                  :color="'#722B81'"
                                  :label="'Observaciones'"
                                  :placeholder="'Observaciones'"
                                  :prepend-icon="'mdi-account-eye'"
                                  @keypress="inputFilters.onlyAlphanumeric"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="py-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-account-eye"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Puede ingresar una observación o comentario relacionado
                                          con su factura. Este campo es opcional y no afecta la
                                          emisión.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                            </v-row>
                          </v-tabs-window-item>
                          <v-tabs-window-item value="tab2" eager>
                            <v-row>
                              <v-col cols="6" class="pa-3">
                                <bec-autocomplete
                                  v-model:search="search"
                                  v-model="modelKiosco.codigo_postal"
                                  :color="'#722b81'"
                                  :item-title="'d_codigo'"
                                  :item-value="'d_codigo'"
                                  :items="itemsCodigosPostal"
                                  :label="'Código postal *'"
                                  :loading="loadingCodigosPostales"
                                  :multiple="false"
                                  :prepend-icon="'mdi-home-group'"
                                  :return-object="false"
                                  :show-chips="true"
                                  @update:model-value="buscarDireccionPorCodigo"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-home-group"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese el código postal tal como aparece en su constancia
                                          de situación fiscal para validar correctamente su
                                          domicilio.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-autocomplete>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.estado"
                                  :color="'#722B81'"
                                  :label="'Estado *'"
                                  :placeholder="'Estado'"
                                  :prepend-icon="'mdi-home-map-marker'"
                                  disabled
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-home-map-marker"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese el Estado tal como aparece en su constancia de
                                          situación fiscal para asegurar que la factura sea válida.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.ciudad"
                                  :color="'#722B81'"
                                  :label="'Ciudad *'"
                                  :placeholder="'Ciudad'"
                                  :prepend-icon="'mdi-city'"
                                  disabled
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-city" />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese la ciudad tal como aparece en su constancia de
                                          situación fiscal para asegurar la correcta emisión de la
                                          factura.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.municipio"
                                  :color="'#722B81'"
                                  :label="'Municipio *'"
                                  :placeholder="'Municipio'"
                                  :prepend-icon="'mdi-home-city'"
                                  disabled
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-home-city" />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese el municipio tal como aparece en su constancia de
                                          situación fiscal para garantizar la correcta emisión de su
                                          factura.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-autocomplete
                                  v-model="modelKiosco.colonia"
                                  :color="'#722b81'"
                                  :item-title="'d_asenta'"
                                  :item-value="'d_asenta'"
                                  :items="itemsAsentamientos"
                                  :label="'Colonia *'"
                                  :loading="loadingCodigosPostales"
                                  :multiple="false"
                                  :prepend-icon="'mdi-city-switch'"
                                  :return-object="false"
                                  :show-chips="true"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-city-switch"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese la colonia de su domicilio fiscal según su
                                          constancia de situación fiscal.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-autocomplete>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.calle"
                                  :color="'#722B81'"
                                  :label="'Calle *'"
                                  :placeholder="'Calle'"
                                  :prepend-icon="'mdi-home-switch'"
                                  :rules="[validationRules.required]"
                                  @keypress="inputFilters.onlyAlphanumeric"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-home-switch"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese el nombre de la calle tal como aparece en su
                                          constancia de situación fiscal.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.numero_exterior"
                                  :color="'#722B81'"
                                  :label="'Número exterior *'"
                                  :placeholder="'Número exterior'"
                                  :prepend-icon="'mdi-warehouse'"
                                  :rules="[
                                    (v: any) =>
                                      validationRules.validateNumericField(v, {
                                        required: true,
                                        min: 1,
                                        max: 10,
                                      }),
                                  ]"
                                  @keypress="inputFilters.onlyNumbers"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-warehouse" />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese el número exterior indicado en su constancia de
                                          situación fiscal.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                              <v-col cols="6" class="pa-3">
                                <bec-text-field
                                  v-model="modelKiosco.numero_interior"
                                  :color="'#722B81'"
                                  :label="'Número interior'"
                                  :placeholder="'Número interior'"
                                  :prepend-icon="'mdi-home-floor-1'"
                                  :rules="[
                                    (v: any) =>
                                      validationRules.validateNumericField(v, {
                                        required: false,
                                        min: 1,
                                        max: 10,
                                      }),
                                  ]"
                                  @keypress="inputFilters.onlyNumbers"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-home-floor-1"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Ingrese el número interior de su domicilio fiscal, si
                                          aplica, según su constancia de situación fiscal.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-text-field>
                              </v-col>
                            </v-row>
                          </v-tabs-window-item>
                          <v-tabs-window-item value="tab3" eager>
                            <v-row>
                              <v-col cols="12" class="pa-3">
                                <bec-autocomplete
                                  v-model="modelKiosco.uso_cfdi"
                                  :color="'#722b81'"
                                  :item-subtitle="(item) => `${item.codigo}`"
                                  :item-title="'descrip'"
                                  :item-value="'codigo'"
                                  :items="itemsUsoCfdi"
                                  :label="'Uso de CFDI *'"
                                  :multiple="false"
                                  :prepend-icon="'mdi-home-group'"
                                  :return-object="false"
                                  :show-chips="true"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-shield-account-variant"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Seleccione el uso de CFDI conforme a su constancia de
                                          situación fiscal. Este dato indica el motivo o finalidad
                                          por la cual se emite la factura.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-autocomplete>
                              </v-col>
                              <v-col cols="12" class="pa-3">
                                <bec-autocomplete
                                  v-model="modelKiosco.regimen_fiscal"
                                  :color="'#722b81'"
                                  :item-subtitle="(item) => `${item.codigo}`"
                                  :item-title="'descrip'"
                                  :item-value="'codigo'"
                                  :items="itemsRegimenFiscal"
                                  :label="'Régimen Fiscal *'"
                                  :multiple="false"
                                  :prepend-icon="'mdi-home-group'"
                                  :return-object="false"
                                  :show-chips="true"
                                >
                                  <template #tooltip>
                                    <v-card color="transparent" elevation="0" class="pa-3">
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon
                                            class="mr-1"
                                            color="white"
                                            icon="mdi-account-tie"
                                          />
                                        </v-col>
                                        <v-col cols="11">
                                          Seleccione el régimen fiscal tal como aparece en su
                                          constancia de situación fiscal. Este dato identifica el
                                          tipo de contribuyente ante el SAT.
                                        </v-col>
                                      </v-row>
                                      <v-divider class="border-opacity-50 my-2" />
                                      <v-row>
                                        <v-col cols="1" class="d-flex align-center justify-center">
                                          <v-icon class="mr-1" color="white" icon="mdi-alert" />
                                        </v-col>
                                        <v-col cols="11">
                                          <span style="font-weight: bold">Nota:</span>
                                          los campos marcados con (*) son obligatorios para
                                          continuar con el proceso de facturación.
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                  </template>
                                </bec-autocomplete>
                              </v-col>
                            </v-row>
                          </v-tabs-window-item>
                        </v-form>
                      </v-tabs-window>
                    </v-tabs-window-item>
                    <!--Paso 3-->
                    <v-tabs-window-item key="s3" value="s3" color="transparent">
                      <v-row
                        :style="getRowTablaRecibosHeight"
                        class="d-flex align-center justify-center overflow-auto"
                      >
                        <v-col cols="12" md="4" class="d-flex align-center justify-center pa-2">
                          <v-btn
                            class="d-flex align-center justify-center"
                            color="#f0f0f0"
                            elevation="5"
                            height="13vw"
                            icon=""
                            width="13vw"
                          >
                            <vue3-lottie
                              :animation-link="'/src/assets/images/pdf_animation.json'"
                              height="80%"
                              width="80%"
                            />
                          </v-btn>
                        </v-col>
                        <v-col cols="12" md="4" class="d-flex align-center justify-center pa-2">
                          <v-btn
                            class="d-flex align-center justify-center"
                            color="#f0f0f0"
                            elevation="5"
                            height="13vw"
                            icon=""
                            width="13vw"
                          >
                            <vue3-lottie
                              :animation-link="'/src/assets/images/xml_animation.json'"
                              height="80%"
                              width="80%"
                            />
                          </v-btn>
                        </v-col>
                        <!--v-col cols="12" md="4" class="d-flex align-center justify-center pa-2">
                          <v-btn
                            class="d-flex align-center justify-center"
                            color="#f0f0f0"
                            elevation="5"
                            height="13vw"
                            icon=""
                            width="13vw"
                          >
                            <vue3-lottie
                              :animation-link="'/src/assets/images/zip_animation.json'"
                              height="80%"
                              width="80%"
                            />
                          </v-btn>
                        </v-col-->
                      </v-row>
                    </v-tabs-window-item>
                  </v-tabs-window>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-divider class="border-opacity-50 my-2" />
                </v-col>
              </v-row>

              <v-card-actions ref="vactFootRef" class="justify-end">
                <v-btn
                  :disabled="isPrevDisabled"
                  border
                  class="text-none mr-2"
                  color="#722B81"
                  height="40px"
                  prepend-icon="mdi-arrow-left-thin"
                  variant="text"
                  width="120px"
                  @click="prev"
                >
                  Anterior
                </v-btn>
                <v-btn
                  :disabled="isNextDisabled"
                  append-icon="mdi-arrow-right-thin"
                  class="text-none"
                  color="#722B81"
                  height="40px"
                  variant="flat"
                  width="120px"
                  @click="next"
                >
                  {{ nextButtonLabel }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- vtimContenidoRef-->
      <v-col v-if="!smAndDown" cols="12" md="2" ref="vtimContenidoRef">
        <v-timeline
          align="center"
          class="pa-0 ma-0"
          direction="vertical"
          line-inset="5"
          side="start"
          truncate-line="both"
          :style="{
            zIndex: 1,
            transform: smAndDown ? 'none' : 'translateX(-50px)',
            ...getCardContenidoHeight,
          }"
        >
          <v-timeline-item
            v-for="(step, i) in steps"
            :key="step.value"
            :dot-color="itemColor(i)"
            :line-color="itemColor(i)"
            class="cursor-pointer"
            fill-dot
            size="55px"
            @click="goTo(i)"
          >
            <template v-slot:icon>
              <!--v-icon
                size="100x"
                :color="i < current ? 'white' : i === current ? '#722B81' : '#722B81'"
                :icon="i < current ? 'mdi-check' : i === current ? 'mdi-progress-clock' : step.icon"
              >
              </v-icon-->
              <div class="d-flex align-center justify-center" style="width: 200px; height: 200px">
                <vue3-lottie
                  v-if="i >= current"
                  :animation-link="step.icon"
                  style="
                    position: absolute;
                    z-index: 1;
                    pointer-events: none;
                    width: 150px;
                    height: 150px;
                  "
                />
                <vue3-lottie
                  v-if="i < current"
                  :animation-link="'/src/assets/images/paso_completado_animation.json'"
                  style="
                    position: absolute;
                    z-index: 1;
                    pointer-events: none;
                    width: 150px;
                    height: 150px;
                  "
                />
              </div>
            </template>

            <template v-slot:opposite>
              <div :class="[current === i ? 'text-h5' : 'text-h5', 'pl-3']" style="color: white">
                {{ step.title }}
              </div>
              <div v-if="current === i" class="text-body-2 pl-3" style="color: #e1dde8">
                {{ step.subtitle }}
              </div>
            </template>
          </v-timeline-item>
        </v-timeline>
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

    <kiosko-modal-form
      :dialog-title="modalFormPropiedades.titulo"
      :dialog-view="modalFormPropiedades.dialog"
      :id-sucursal="modalFormPropiedades.idSucursal"
      @cancel="onCloseModalForm"
      @close="onCloseModalForm"
      @save="onSaveModalForm"
    />
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  shallowRef,
  mergeProps,
  computed,
  onMounted,
  nextTick,
  watch,
} from 'vue'
import { useDisplay } from 'vuetify'
import { Vue3Lottie } from 'vue3-lottie'

// import utils

// import interfaces

// import stores
import { useDialogManagerStore } from '@/stores/modules/Core/dialog'
import { kiosko } from '@/stores/modules/Core/kiosko'
import { validationRules } from '@/utils/validationRules'
import { inputFilters } from '@/utils/inputFilters'

// import components
import BecSelect from '@/components/core/becmaComponents/BecSelect.vue'
import BecAutocomplete from '@/components/core/becmaComponents/BecAutocomplete.vue'
import BecTextField from '@/components/core/becmaComponents/BecTextField.vue'
import DialogInformation from '@/components/core/dialogMessage/DialogInformation.vue'

// import views
import KioskoModalForm from '@/views/KioskoModalForm.vue'

interface Empresa {
  id: number
  nombre: string
  numero: string
}

interface CodigoPostal {
  d_codigo: string
}

interface Asentamiento {
  d_asenta: string
}

interface UsoCfdi {
  codigo: string
  descripcion: string
}

interface RegimenFiscal {
  codigo: string
  descripcion: string
}

export interface Recibo {
  id: number
  fecha: string
  fechaFormato: string
  folio: string
  importe: number
  codigo: number
}

export interface Kiosco {
  id_sucursal: number | null
  rfc: string
  razon_social: string
  correo: string
  observaciones: string
  codigo_postal: string
  estado: string
  ciudad: string
  municipio: string
  colonia: string
  calle: string
  numero_exterior: string
  numero_interior: string
  uso_cfdi: string
  regimen_fiscal: string
}

export default defineComponent({
  name: 'Login',
  components: {
    DialogInformation,
    Vue3Lottie,
    BecSelect,
    BecAutocomplete,
    BecTextField,
    KioskoModalForm,
  },
  setup() {
    // 1. Imports
    // 2. Props y Emits
    // 3. Composables (funciones reusables)
    // 4. Reactive
    // 5. Computed properties
    // 6. Watchers
    // 7. Lifecycle hooks (onMounted, mounted)
    // 8. Functions (fetch, metodos, async)

    // 3. Composables | Vuetify
    const { name, mobile, smAndDown } = useDisplay()

    // 3. Composables | Store
    const storeKiosko = kiosko()

    // 3. Composables | Store
    const dialogConfirmation = useDialogManagerStore()

    // 4. Reactive | dialogInformation
    const dialogInformation = ref({
      color: '',
      cuerpo: '',
      dialog: false,
      icono: '',
      titulo: '',
      velocidad: 0,
    })

    // 4. Reactive | ref
    const vconPrincipalRef = ref()
    const vcarContenidoRef = ref()
    const vrowTituloRef = ref()
    const vrowBarraPrincipalRef = ref()
    const vactFootRef = ref()

    const stepsTitulos = ref(['Recibos', 'Cliente', 'Final'])
    const formClienteRef = ref()
    const formClienteValido = ref(false)

    const idReciboEncabezado = ref(0)
    const loadingEsperaPeticion = ref(false)

    const search = ref('')
    const loadingCodigosPostales = ref(false)

    type Step = { value: string; title: string; subtitle?: string; icon?: string }
    const steps: Step[] = [
      {
        value: 's1',
        title: '1. Recibo',
        subtitle:
          'Capturé los datos tal como aparecen en su recibo de compra para evitar errores en el proceso de facturación.',
        icon: '/src/assets/images/paso1_animation.json',
      },
      {
        value: 's2',
        title: '2. Datos fiscales',
        subtitle:
          'Ingrese sus datos fiscales tal como aparecen en su constancia de situación fiscal.',
        icon: '/src/assets/images/paso2_animation.json',
      },
      {
        value: 's3',
        title: '3. Descarga',
        subtitle: 'Descargue su factura en el formato de su preferencia.',
        icon: '/src/assets/images/paso3_animation.json',
      },
    ]

    // 4. Reactive | recibo
    const modelKiosco = ref(<Kiosco>{
      id_sucursal: null,
      rfc: '',
      razon_social: '',
      correo: '',
      observaciones: '',
      codigo_postal: '',
      estado: '',
      ciudad: '',
      municipio: '',
      colonia: '',
      calle: '',
      numero_exterior: '',
      numero_interior: '',
      uso_cfdi: '',
      regimen_fiscal: '',
    })

    const itemsEmpresas = ref<Empresa[]>([])

    const itemsCodigosPostal = ref<CodigoPostal[]>([])
    const itemsAsentamientos = ref<Asentamiento[]>([])

    const itemsUsoCfdi = ref<UsoCfdi[]>([])
    const itemsRegimenFiscal = ref<RegimenFiscal[]>([])

    const itemsRecibos = ref<Recibo[]>([])

    // Recibos de prueba
    itemsRecibos.value = []

    // 4. Reactive | timeline
    const current = ref(0)

    const palette = {
      done: '#722B81',
      active: '#F0F0F0',
      pending: '#F0F0F0',
    }

    //4. Reactive | modalForm
    const modalFormPropiedades = ref({
      dialog: false,
      titulo: '',
      idSucursal: null as number | null,
    })

    // 5. Computed | getHeight
    const getCardContenidoHeight = computed(() => {
      const alto = ref(0)
      if (vcarContenidoRef.value) {
        alto.value = vconPrincipalRef.value.$el.clientHeight * 0.8
      }
      return { height: `${alto.value}px !important` }
    })

    const getRowTablaRecibosHeight = computed(() => {
      if (vcarContenidoRef.value) {
        let alto = 0
        alto =
          vconPrincipalRef.value.$el.clientHeight * 0.8 -
          vrowTituloRef.value.$el.clientHeight -
          vrowBarraPrincipalRef.value.$el.clientHeight -
          vactFootRef.value.$el.clientHeight -
          190

        return { height: `${alto}px !important` }
      }
      return { height: '0px' }
    })

    const getTimelineItemWidth = computed(() => {
      if (vcarContenidoRef.value) {
        const ancho = (vcarContenidoRef.value.$el.clientWidth - 180) / 3
        console.log(vcarContenidoRef.value.$el.clientWidth)
        return `${ancho}px`
      }
      return '0px'
    })

    const sucursalSeleccionada = computed(() => {
      return !!modelKiosco.value.id_sucursal // true si tiene valor, false si está vacío o null
    })

    const isPrevDisabled = computed(() => {
      // Tab 1 → no se puede retroceder
      return current.value === 0 || current.value === stepsTitulos.value.length - 1
    })

    const isNextDisabled = computed(() => {
      if (current.value === 0) {
        // Paso 1: deshabilitado si no hay recibos
        return itemsRecibos.value.length === 0
      } else if (current.value === 1) {
        // Paso 2: deshabilitado si el formulario de cliente no es válido
        return !formClienteValido.value
      } else {
        // Paso 3: ya no se puede avanzar
        return true
      }
    })

    // Texto dinámico para el botón siguiente
    const nextButtonLabel = computed(() => {
      if (current.value === stepsTitulos.value.length - 1) return 'Finalizado'
      if (current.value === 1) return 'Continuar'
      return 'Siguiente'
    })

    // 6. Watch

    watch(search, async (val) => {
      if (val && val !== modelKiosco.value.codigo_postal) {
        await fetchCodigosPostales(val)
      }
    })

    watch(
      () => modelKiosco.value,
      async () => {
        if (current.value === 1 && formClienteRef.value) {
          const form = await formClienteRef.value.validate()
          formClienteValido.value = form.valid
        }
      },
      { deep: true },
    )

    // 7. Lifecycle hooks | onMounted, onBeforeUnmount
    onMounted(async () => {
      nextTick(() => {
        fetchEmpresas()

        fetchCatalogos()
      })

      const form = await formClienteRef.value?.validate()
      formClienteValido.value = form?.valid ?? false
    })

    // 8. Functions (fetch, metodos, async) | fetchs
    const fetchEmpresas = async () => {
      try {
        await storeKiosko.storeEmpresas()
        itemsEmpresas.value = storeKiosko.resultEmpresas.data
      } catch (error) {
      } finally {
      }
    }

    const fetchCatalogos = async () => {
      itemsUsoCfdi.value = []
      itemsRegimenFiscal.value = []
      try {
        await storeKiosko.storeCatalogos()

        const usoCfdi = storeKiosko.resultUsoCfdi
        const regimen = storeKiosko.resultRegimenFiscal

        if (Array.isArray(usoCfdi)) {
          itemsUsoCfdi.value = usoCfdi
        } else {
          itemsUsoCfdi.value = []
        }
        if (Array.isArray(regimen)) {
          itemsRegimenFiscal.value = regimen
        } else {
          itemsRegimenFiscal.value = []
        }
      } catch (error) {
      } finally {
      }
    }

    const fetchCodigosPostales = async (codigo: string) => {
      if (!codigo || codigo.trim() === '') return

      try {
        loadingCodigosPostales.value = true
        itemsCodigosPostal.value = [] // Limpia antes de nueva búsqueda

        await storeKiosko.storeCodigosPostales(codigo)

        // Verifica que la respuesta del store tenga estructura válida
        const result = storeKiosko.resultCodigosPostales
        if (result?.code === 200 && Array.isArray(result.data)) {
          itemsCodigosPostal.value = result.data
        } else {
          itemsCodigosPostal.value = []
        }
      } catch (error) {
        itemsCodigosPostal.value = []
      } finally {
        loadingCodigosPostales.value = false
      }
    }

    const buscarDireccionPorCodigo = async (codigo: string) => {
      itemsAsentamientos.value = []
      try {
        loadingCodigosPostales.value = true
        await storeKiosko.storeDireccion(codigo)

        const direccion = storeKiosko.resultDireccion
        const colonias = storeKiosko.resultAsentamientos

        if (direccion && Object.keys(direccion).length > 0) {
          modelKiosco.value.estado = direccion.d_estado || ''
          modelKiosco.value.ciudad = direccion.d_ciudad || ''
          modelKiosco.value.municipio = direccion.d_mnpio || ''
        } else {
          modelKiosco.value.estado = ''
          modelKiosco.value.ciudad = ''
          modelKiosco.value.municipio = ''
        }

        itemsAsentamientos.value = colonias || []
        // Si hay colonias, puedes seleccionar la primera por defecto
        modelKiosco.value.colonia = colonias.length > 0 ? colonias[0].d_asenta : ''
      } catch (error) {
        modelKiosco.value.estado = ''
        modelKiosco.value.ciudad = ''
        modelKiosco.value.municipio = ''
        modelKiosco.value.colonia = ''
      } finally {
        loadingCodigosPostales.value = false
      }
    }

    // 8. Functions (fetch, metodos, async) | timeline
    const itemColor = (i: number) => {
      if (i < current.value) return palette.done
      if (i === current.value) return palette.active
      return palette.pending
    }

    async function next() {
      // Paso 1 → Validar recibos
      if (current.value === 0 && itemsRecibos.value.length === 0) {
        dialogConfirmation.onOpenDialogInformation(
          'Debe agregar al menos un ticket antes de continuar con la facturación.',
          'Validación requerida',
          'warning',
          '#FFA500',
          2,
        )
        return
      }

      // Paso 2 → validar formulario y enviar al backend
      if (current.value === 1) {
        const form = await formClienteRef.value?.validate()
        formClienteValido.value = form?.valid || false

        if (!formClienteValido.value) {
          dialogConfirmation.onOpenDialogInformation(
            'Por favor, complete correctamente todos los campos obligatorios antes de continuar.',
            'Formulario incompleto',
            'warning',
            '#FFA500',
            2,
          )
          return
        }

        try {
          // Llamada a tu backend
          loadingEsperaPeticion.value = true // puedes usar otro loading si lo prefieres

          // 🔹 Aquí mandas los datos combinados (cliente + recibos)
          const payload = {
            dataModel: modelKiosco.value,
            tickets: itemsRecibos.value,
          }

          await storeKiosko.storeGuardarFactura(payload)

          const response = storeKiosko.resultUpdateTicket

          if (response?.code === 200) {
            // ✅ Éxito → avanzar al paso 3
            //current.value++
            idReciboEncabezado.value = response.data.idReciboEncabezado || 0

            estatusTicket()
          } else {
            // ⚠️ Error controlado del backend
            dialogConfirmation.onOpenDialogInformation(
              response?.message || 'No se pudo completar la operación.',
              'Error al guardar los datos',
              'incorrect',
              '#FF0000',
              2,
            )
          }
        } catch (error) {
          console.error('Error al guardar factura:', error)
          dialogConfirmation.onOpenDialogInformation(
            'Ocurrió un error inesperado al intentar guardar la factura. Inténtelo de nuevo más tarde.',
            'Error del servidor',
            'incorrect',
            '#FF0000',
            2,
          )
        } finally {
          loadingEsperaPeticion.value = false
        }

        return
      }

      // Avanzar si no es el último paso
      if (current.value < stepsTitulos.value.length - 1) {
        current.value++
      }
    }

    async function estatusTicket() {
      try {
        loadingEsperaPeticion.value = true // puedes usar otro loading si lo prefieres

        await storeKiosko.storeEstatusTicket(idReciboEncabezado.value)

        const response = storeKiosko.resultEstatusTicket.data

        // el ticket se proceso correctamente
        if (response.pendiente == '2') {
          current.value++
        } else if (response.pendiente == '1' && (response.error == '' || response.error == null)) {
          setTimeout(() => {
            estatusTicket()
          }, 5000)
        } else if (response.error != '' && response.error != null) {
          dialogConfirmation.onOpenDialogInformation(
            response.error || 'No se pudo completar la operación.',
            'Error al consultar el estatus del ticket',
            'incorrect',
            '#FF0000',
            2,
          )
          eliminarTicket()
        }
      } catch (error) {
        console.error('Error al consultar estatus del ticket:', error)
        dialogConfirmation.onOpenDialogInformation(
          'Ocurrió un error inesperado al intentar consultar el estatus del ticket. Inténtelo de nuevo más tarde.',
          'Error del servidor',
          'incorrect',
          '#FF0000',
          2,
        )
      } finally {
        loadingEsperaPeticion.value = false
      }
    }

    function prev() {
      // Solo permitir retroceder si no estás en el primer paso ni en el último
      if (current.value > 0 && current.value < stepsTitulos.value.length - 1) {
        current.value--
      }
    }

    function goTo(i: number) {
      current.value = i
    }

    // 8. Functions (fetch, metodos, async) | modalForm
    const onCloseModalForm = () => {
      modalFormPropiedades.value.dialog = false
    }

    const onSaveModalForm = (recibo: Recibo) => {
      modalFormPropiedades.value.dialog = false

      if (recibo.codigo == 1) {
        // El ticket se encuentra facturado, si es el primer ticket se manda a xml y pdf, si es el segundo manda una advertencia

        if (itemsRecibos.value.length === 0) {
          // mandar al ultimo paso para mostrar los archivos
        } else {
          dialogConfirmation.onOpenDialogInformation(
            'El ticket ingresado ya fue timbrado anteriormente. No es necesario volver a generarlo.',
            'Ticket ya facturado',
            'incorrect',
            '#FF0000',
            2,
          )
        }
      } else if (recibo.codigo == 3) {
        // el ticket es valido, pero hay que validar si ya se encuentra en la lista
        const existe = itemsRecibos.value.find((r) => r.folio === recibo.folio)
        if (existe) {
          dialogConfirmation.onOpenDialogInformation(
            'El ticket ingresado ya se encuentra en la lista de comprobantes pendientes. No es necesario volver a agregarlo.',
            'Ticket duplicado',
            'incorrect',
            '#FF0000',
            2,
          )
        } else {
          itemsRecibos.value.push(recibo)
        }
      }
    }

    const onOpenModalForm = (titulo: string) => {
      modalFormPropiedades.value = {
        dialog: true,
        titulo: titulo,
        idSucursal: modelKiosco.value?.id_sucursal ?? null,
      }
    }

    const validarSucursal = (nuevaSucursalId: any) => {
      if (itemsRecibos.value.length === 0) {
        modelKiosco.value.id_sucursal = nuevaSucursalId
        return
      }

      let titulo = 'Verificar cambio de sucursal'
      let mensaje = 'Al cambiar de sucursal se eliminarán los recibos agregados. ¿Desea continuar?'

      dialogConfirmation.onOpenDialogConfirmation(
        mensaje,
        () => limpiarRecibos(nuevaSucursalId), // << callback directo
        [],
        titulo,
        'alert',
      )
    }

    const limpiarRecibos = (nuevaSucursalId: any) => {
      itemsRecibos.value = []
      modelKiosco.value.id_sucursal = nuevaSucursalId
    }

    // 8. Functions (fetch, metodos, async) | dialogInformation
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

    const onRemoveReceipt = (folio: string) => {
      const index = itemsRecibos.value.findIndex((recibo) => recibo.folio === folio)
      if (index !== -1) {
        itemsRecibos.value.splice(index, 1)
      }
    }

    // Tabs

    // 4. Reactive | vrowTabMenuRef
    const vrowTabMenuRef = ref()

    const vtabPaso2 = ref<any>('tabBarV')

    // 4. Reactive  | vrowContenidoRef
    const vtabPaso2Items = ref([
      {
        icon: 'mdi-account-box',
        title: 'Personal',
        value: 'tab1',
      },
      {
        icon: 'mdi-home-account',
        title: 'Dirección',
        value: 'tab2',
      },
      {
        icon: 'mdi-badge-account-horizontal',
        title: 'Fiscal',
        value: 'tab3',
      },
    ])

    return {
      buscarDireccionPorCodigo,
      current,
      dialogInformation,
      formClienteRef,
      getCardContenidoHeight,
      getRowTablaRecibosHeight,
      getTimelineItemWidth,
      goTo,
      inputFilters,
      isNextDisabled,
      isPrevDisabled,
      itemColor,
      itemsAsentamientos,
      itemsCodigosPostal,
      itemsEmpresas,
      itemsRecibos,
      itemsRegimenFiscal,
      itemsUsoCfdi,
      loadingCodigosPostales,
      mergeProps,
      modalFormPropiedades,
      modelKiosco,
      next,
      nextButtonLabel,
      onCloseDialogInformation,
      onCloseModalForm,
      onOpenDialogInformation,
      onOpenModalForm,
      onRemoveReceipt,
      onSaveModalForm,
      prev,
      search,
      smAndDown,
      steps,
      sucursalSeleccionada,
      vactFootRef,
      validarSucursal,
      validationRules,
      vcarContenidoRef,
      vconPrincipalRef,
      vrowBarraPrincipalRef,
      vrowTabMenuRef,
      vrowTituloRef,
      vtabPaso2,
      vtabPaso2Items,
    }
  },
})
</script>

<style scoped>
@import '../styles/background.css';

.login-body {
  min-height: 100vh;
  /* 0→33.333% color A, el resto color B */
  background: linear-gradient(to left, #71618c 0 40%, #f0f0f0 40% 100%);
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
      #ab2f32 0deg 60deg,
      #ff6000 60deg 120deg,
      #ed3237 120deg 180deg,
      #00335f 180deg 240deg,
      #00a859 240deg 300deg,
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

.v-timeline .v-timeline-divider__dot {
  background: transparent !important;
}
</style>
