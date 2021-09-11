import WeatherSearchError from '../../helpers/WeatherSearchError'

export default {
  namespaced: true,
  state: () => ({
    weather: null
  }),

  mutations: {
    SET_WEATHER (state, payload) {
      state.weather = payload
    }
  },

  actions: {
    async fetchWeather ({ commit }, { city, lang }) {
      try {
        // можно было бы использовать axios, но в данном случае от него нет смысла
        const response = await fetch(`${process.env.VUE_APP_API_URL}/weather?appid=${process.env.VUE_APP_API_KEY}&q=${city}&lang=${lang}&units=metric`)
        if (response.status === 404) {
          throw new WeatherSearchError('City not found', response.status)
        }
        const data = await response.json()
        commit('SET_WEATHER', {
          weather: data.weather,
          main: data.main
        })
        return data
      } catch (error) {
        console.log('Ошибка', error.message)
        throw error
      }
    }
  }
}
