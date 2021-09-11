<template>
  <v-app>
    <TheToolBar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import TheToolBar from './components/TheToolBar'
import currentLang from './mixins/currentLang'

export default {
  name: 'App',
  components: { TheToolBar },
  mixins: [currentLang],
  computed: {
    langs () {
      return Object.keys(this.$vuetify.lang.locales)
    }
  }
}
</script>
