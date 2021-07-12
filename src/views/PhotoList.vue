<template>
  <div class="about">
    <v-row align="center" justify="center">
      <v-col cols="12" class="mt-2 mb-0 py-0">
        <p class="text-center mb-0">
          {{ selectedPhoto && selectedPhoto.fileData.name }}
        </p>
      </v-col>
      <v-col class="mt-2 mb-0 py-0">
        <v-img v-if="selectedPhoto"
               :src="`file://${selectedPhoto.fileData.path}`"
               max-height="calc( 100vh - 150px )"
               contain
               :lazy-src="`file://${selectedPhoto.dataUrl}`"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { SELECTED_PHOTO } from '../store/index'

@Component({
  computed: {
    selectedPhoto ():PhotoList {
      return this.$store.getters[SELECTED_PHOTO]
    }
  }
})
export default class PhotoList extends Vue {

}
</script>
