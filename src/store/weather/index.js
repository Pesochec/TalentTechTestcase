
export default {
  namespace: true,
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
      // можно было бы использовать axios, но в данном случае от него нет смысла
      const data = await fetch(`${process.env.API_URL}/weather?appid=${process.env.API_KEY}&q=${city}&lang=${lang}&units=metric`)
      return data
    }
  }
}
