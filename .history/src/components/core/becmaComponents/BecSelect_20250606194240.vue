<v-select
  :items="['Quincenal', 'Semanal']"
  chips
  clear-icon="mdi-close"
  clearable
  color="primary"
  hide-details="auto"
  item-color="primary"
  label="Perioricidad"
  placeholder=""
  prepend-inner-icon="mdi-cash-clock"
  variant="outlined"
>
                        <template v-slot:chip="{ props, item }">
                          <v-chip
                            v-bind="props"
                            :text="item.raw"
                            color="primary"
                            variant="flat"
                          />
                        </template>
                        <template v-slot:prepend>
                          <v-tooltip interactive>
                            <template v-slot:activator="{ props: tooltip }">
                              <v-icon
                                icon="mdi-information-slab-circle-outline"
                                v-bind="mergeProps(tooltip)"
                              />
                            </template>
                            <span>
                              Primero selecciona el campo <b><i>Cliente</i></b> para
                              habilitar esta opción.
                            </span>
                          </v-tooltip>
                        </template>
                      </v-select>
