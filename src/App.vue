<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <div class="d-flex align-center">
        <v-expand-x-transition>
          <v-icon v-if="isListPage"
                  x-large
                  class="mr-2"
                  @click="$router.push('/')"
          >
            mdi-chevron-left
          </v-icon>
        </v-expand-x-transition>
        <h1 v-if="!isListPage" transition="scale-transition">
          Image Viewer
        </h1>
      </div>
    </v-app-bar>
    <NaviDrawer />
    <v-main>
      <div class="main-container">
        <transition :name="transitionName">
          <router-view />
        </transition>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import NaviDrawer from './components/NaviDrawer.vue'
@Component<App>({
  components: {
    NaviDrawer
  },
  watch: {
    '$route' (to) {
      this.transitionName = to.path.match('list') ? 'slide-page' : 'slide-page-reverse'
    }
  }
})
export default class App extends Vue {
  transitionName:'slide-page' | 'slide-page-reverse' = 'slide-page'
  get isListPage ():boolean {
    return !!this.$route.path.match('list')
  }
}
</script>
<style lang="scss">
.main_wrapper {
  min-height: 100vh;
}

.main-container {
  position: relative;
  padding: 1em 2em;
}

.slide-page-enter-active,
.slide-page-leave-active,
.slide-page-reverse-enter-active,
.slide-page-reverse-leave-active {
  position: absolute;
  width: calc(100% - 4em);
  transition: 1s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}

.slide-page-enter-active {
  transform: translateX(100vw);
}

.slide-page-enter-to {
  transform: translateX(0);
}

.slide-page-leave-active {
  transform: translateX(0);
}

.slide-page-leave-to {
  transform: translateX(-100vw);
  opacity: 0;
}

.slide-page-reverse-enter-active {
  transform: translateX(-100vw);
}

.slide-page-reverse-enter-to {
  transform: translateX(0);
}

.slide-page-reverse-leave-active {
  transform: translateX(0);
}

.slide-page-reverse-leave-to {
  transform: translateX(100vw);
  opacity: 0;
}

</style>
