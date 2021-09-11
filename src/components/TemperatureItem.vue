<template>
    <v-col
      cols="3"
    >
      {{ $vuetify.lang.currentLocale(locale) }}
      <p class="text-h3">
        {{ value }}&deg;C
      </p>
    </v-col>
</template>

<script>
export default {
  name: 'TemperatureItem',
  props: {
    value: {
      type: Number,
      default: 0
    },
    locale: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
