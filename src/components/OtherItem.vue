<template>
  <v-list-item>
    <v-list-item-title>
      {{ $vuetify.lang.currentLocale(titleLocale) }}
    </v-list-item-title>
    <v-list-item-subtitle>
      <slot name="content"></slot>
    </v-list-item-subtitle>
  </v-list-item>
</template>

<script>
export default {
  name: 'OtherItem',
  props: {
    titleLocale: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
