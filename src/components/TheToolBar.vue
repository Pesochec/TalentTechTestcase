<template>
  <v-app-bar
    app
    color="primary"
    dark
  >
    <h1 class="text-h5">Weather Widget</h1>
    <v-spacer></v-spacer>
    <v-menu
      open-on-hover
      bottom
      left
      offset-y
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue darken-3"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ currentLang }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in langs"
          :key="index"
          @click.prevent="changeLang(item)"
        >
          {{ item }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import currentLang from '../mixins/currentLang'

export default {
  name: 'TheToolBar',
  mixins: [currentLang],
  computed: {
    langs () {
      return Object.keys(this.$vuetify.lang.locales)
    }
  },
  methods: {
    changeLang (lang) {
      if (this.currentLang === lang) return
      this.$vuetify.lang.current = lang
      this.$router.push({
        query: {
          ...this.$route.query,
          lang
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
