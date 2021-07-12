<template>
  <div >
    <v-btn class="ma-2"
           x-large
           @click="clickButton"
    >
      <v-icon left>
        mdi-folder
      </v-icon>
      ディレクトリを選択
    </v-btn>
    <input ref="fileInput"
           type="file"
           class="file-input"
           webkitdirectory
           @change="fileChange"
    >
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  methods: {
    clickButton () {
      const fileInput = this.$refs.fileInput as HTMLInputElement
      fileInput.dispatchEvent(new MouseEvent('click'))
    }
  }
})
export default class DirectorySelector extends Vue {
  fileChange (event:Event) :void{
    const files = (event.target as HTMLInputElement)?.files
    if (files?.length) {
      const filterdFiles = Array.from(files).filter(file => {
        return file.type.match(/jpeg|png|gif/)
      }).sort((a, b) => {
        return a.name > b.name ? 1 : -1
      })
      this.$emit('change', filterdFiles)
    }
  }
}

</script>
<style lang="scss" scoped>
.file-input {
  display: none;
}
</style>
