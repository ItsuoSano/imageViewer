<template>
  <v-navigation-drawer app
                       clipped
                       :value="isListPage"
                       :stateless="true"
                       class="py-3"
                       @keyup="onKeyUp"
  >
    <v-list-item v-for="(photo,index) in photoList" :key="index">
      <v-card class="mb-2"
              width="100%"
              outlined
              elevation="0"
              :color="index===selectedIndex ? 'red lighten-1' : null"
              @click="clickData(photo,index)"
      >
        <v-img min-height="100"
               :src="photo.dataUrl && `file://${photo.dataUrl}`"
               min-width="100%"
        >
          <template #placeholder>
            <v-row align="center" justify="center" class="fill-height ma-0">
              <v-progress-circular indeterminate color="grey" />
            </v-row>
          </template>
        </v-img>
        <p class="text-center my-0 py-1">
          {{ photo.fileData.name }}
        </p>
      </v-card>
    </v-list-item>
  </v-navigation-drawer>
</template>
<script lang="ts">
import { GET_PHOTO_LIST, SELECTED_PHOTO } from '../store/index'
import { Component, Vue, Watch } from 'vue-property-decorator'
@Component({
  computed: {
    photoList ():File[] {
      return this.$store.getters[GET_PHOTO_LIST]
    },
    isListPage ():boolean {
      return !!this.$route.path.match('list')
    }
  }
})
export default class PhotoList extends Vue {
  selectedIndex:number | null = null
  @Watch('$route.path')
  pathWatch (value:string) :void{
    if (value.match('list')) {
      this.selectedIndex = null
    }
  }

  clickData (photo:PhotoList, index:number):void {
    this.$store.commit(SELECTED_PHOTO, photo)
    this.selectedIndex = index
  }

  mounted () :void{
    this.selectedIndex = null
  }
}
</script>
