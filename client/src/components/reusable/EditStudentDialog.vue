<template>
  <v-dialog max-width="290">
    <i
      slot="activator"
      class="material-icons"
      style="cursor: pointer">
      edit
    </i>
    <v-card>
      <v-card-title class="headline">Editar Estudiante</v-card-title>
      <v-card-text>
        <v-text-field
          label="Nombre"
          v-model="nombre"
          type="text">
        </v-text-field>
        <v-text-field
          label="Carnet"
          v-model="carnet"
          type="text">
        </v-text-field>
        <v-text-field
          label="Documento"
          v-model="documento"
          type="text">
        </v-text-field>
        <v-autocomplete
          :items="carreras"
          label="Plan Académico"
          v-model="planAcademico"
          type="text">
        </v-autocomplete>
        <v-autocomplete
          :items="documentos"
          label="Tipo Documento"
          v-model="tipoDoc"
          type="text">
        </v-autocomplete>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="dialog = false">
          Cancelar
        </v-btn>
        <v-btn
          color="green darken-1"
          flat="flat"
          @click="dialog = false">
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
