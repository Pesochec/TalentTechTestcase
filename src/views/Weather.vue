<template>
  <div class="container">
    <search @submit="searchWeatherInCity" :search-history="searchHistory" class="mb-2" />
    <template v-if="weather">
      <weather-widget :weather="weather"/>
    </template>
  </div>
</template>

<script>
// Немного не по ТЗ, но в рамках пользовательского опыта, я думаю будет лучше, если нужно все по тз, смогу быстро переделать.

import { mapActions, mapState } from 'vuex'
import WeatherSearchError from '../helpers/WeatherSearchError'
import currentLang from '../mixins/currentLang'

export default {
  name: 'Weather',
  components: {
    Search () {
      return import('../components/Search')
    },
    WeatherWidget () {
      return import('../components/WeatherWidget')
    }
  },
  data () {
    return {
      searchHistory: []
    }
  },
  mixins: [currentLang],
  async mounted () {
    this.$vuetify.lang.current = this.$route.query?.lang || this.currentLang
    const searchHistory = localStorage.getItem('search-history')
    if (searchHistory && JSON.parse(searchHistory)) {
      this.searchHistory = JSON.parse(searchHistory)
    }
    if (this.city) {
      await this.searchWeatherInCity(this.city)
    }
  },
  watch: {
    currentLang (newValue, oldValue) {
      console.log(newValue, oldValue)
      if (this.city && newValue !== oldValue) {
        this.searchWeatherInCity(this.city)
      }
    }
  },
  computed: {
    ...mapState({
      weather: state => state.weather.weather
    }),
    city: {
      get () {
        return this.$route.query?.city
      },
      set (city) {
        if (city !== this.city) {
          this.$router.push({
            query: {
              ...this.$route.query,
              city: city
            }
          })
        }
      }
    }
  },
  methods: {
    ...mapActions({
      fetchWeather: 'weather/fetchWeather'
    }),
    async searchWeatherInCity (city) {
      try {
        this.searchHistory.unshift(city)
        localStorage.setItem('search-history', JSON.stringify(this.searchHistory))
        await this.fetchWeather({
          city,
          lang: this.$vuetify.lang.current
        })
        this.city = city
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
