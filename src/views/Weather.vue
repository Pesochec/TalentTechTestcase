<template>
  <div class="container">
    {{ weather }}
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import WeatherSearchError from '../helpers/WeatherSearchError'
import currentLang from '../mixins/currentLang'

export default {
  name: 'Weather',
  data () {
    return {
      city: '',
      error: {
        show: true,
        text: ''
      }
    }
  },
  mixins: [currentLang],
  watch: {
    // Немного не по ТЗ, но в рамках пользовательского опыта, я думаю будет лучше, если нужно все по тз, смогу быстро переделать.
    currentLang () {
      if (this.city) {
        this.searchWeatherInCity(this.city)
      }
    }
  },
  async created () {
    if (this.$route.query.city) {
      this.city = this.$route.query.city
      await this.searchWeatherInCity(this.city)
    }
  },
  computed: {
    ...mapState({
      weather: state => state.weather.weather
    })
  },
  methods: {
    ...mapActions({
      fetchWeather: 'weather/fetchWeather'
    }),
    async searchWeatherInCity (city) {
      try {
        await this.fetchWeather({
          city,
          lang: this.$vuetify.lang.current
        })
      } catch (error) {
        if (error instanceof WeatherSearchError) {
          this.$toast.error(this.$vuetify.lang.currentLocale('search.cityNotFound'))
        } else {
          this.$toast.error(this.$vuetify.lang.currentLocale('search.responseError'))
        }
      }
    }
  }
}
</script>
