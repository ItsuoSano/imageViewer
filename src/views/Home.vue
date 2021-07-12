<template>
  <v-row align="center"
         justify="center"
         class="button-container"
         no-gutters
  >
    <v-alert color="red" :value="fileError" transition="slide-y-transition">
      画像ファイルが含まれていません
    </v-alert>
    <v-col cols="auto" />
    <v-responsive width="100%" />
    <v-col cols="auto" class="mt-10">
      <DirectorySelector @change="onChangeFiles" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import DirectorySelector from '../components/DirectorySelector.vue'
import { ACTION_PHOTO_LIST } from '../store/index'
// eslint-disable-next-line import/no-webpack-loader-syntax
// import Worker from 'worker-loader!@/worker/FileRead.worker'

@Component({
  components: {
    DirectorySelector
  }
})
export default class Home extends Vue {
  fileError = false;

  onChangeFiles (files:File[]):void {
    if (files.length) {
      this.fileError = false
      this.$store.dispatch(ACTION_PHOTO_LIST, files)
      this.$router.push('list')
    } else {
      this.fileError = true
    }
  }
}
</script>
