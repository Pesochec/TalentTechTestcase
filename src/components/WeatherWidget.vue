<template>
  <v-card
    class="mx-auto"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ weather.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-row align="center">
        <temperature-item :value="weather.main.temp" locale="weather.temperature.temperature" />
        <temperature-item :value="weather.main.feels_like" locale="weather.temperature.feelsLike" />
        <temperature-item :value="weather.main.temp_min" locale="weather.temperature.minTemp" />
        <temperature-item :value="weather.main.temp_max" locale="weather.temperature.maxTemp" />
      </v-row>
    </v-card-text>
    <other-item title-locale="weather.wind.speed.name">
      <template v-slot:content>
        {{ $vuetify.lang.currentLocale(weather.wind.sideWorld) }}
        {{ weather.wind.speed }}
        {{ $vuetify.lang.currentLocale('weather.wind.speed.measure') }}
      </template>
    </other-item>
    <other-item title-locale="weather.humidity">
      <template v-slot:content>
        {{ weather.main.humidity }}%
      </template>
    </other-item>
    <other-item title-locale="weather.pressure.name">
      <template v-slot:content>
        <v-list-item-subtitle>
          {{ weather.main.pressure }} {{$vuetify.lang.currentLocale('weather.pressure.measure') }}
        </v-list-item-subtitle>
      </template>
    </other-item>
    <other-item title-locale="weather.state">
      <template v-slot:content>
        <v-list-item-subtitle>
          {{ weather.weather.description }}
        </v-list-item-subtitle>
      </template>
    </other-item>
  </v-card>
</template>

<script>
/*
  Чтобы переиспользовать его везде где нам вздумается нужно будет перенести логику из views/Weather.vue, если нужно сделаю.
*/
import TemperatureItem from './TemperatureItem'
import OtherItem from './OtherItem'
export default {
  name: 'WeatherWidget',
  components: { OtherItem, TemperatureItem },
  props: {
    weather: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>
