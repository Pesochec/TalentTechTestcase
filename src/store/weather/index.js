import WeatherSearch from '../../helpers/WeatherSearch'

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
        const data = await WeatherSearch.searchById(lang, city)
        commit('SET_WEATHER', data)
        return data
      } catch (error) {
        console.error('Ошибка', error.message)
        throw error
      }
    }
  }
}
