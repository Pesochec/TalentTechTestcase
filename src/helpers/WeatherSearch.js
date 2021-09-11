import WeatherSearchError from './WeatherSearchError'
// Можно было бы использовать axios, но в данном случае от него нет смысла

export default class WeatherSearch {
  // можно запариться и сделать промежуточные значения, например: юго-восток
  static sideWorld (azimut) {
    if (azimut > 0 && azimut < 90) return 'weather.wind.direction.n'
    if (azimut > 90 && azimut < 180) return 'weather.wind.direction.e'
    if (azimut > 180 && azimut < 270) return 'weather.wind.direction.s'
    return 'weather.wind.direction.w'
  }

  static async searchById (lang, city) {
    const response = await fetch(`${process.env.VUE_APP_API_URL}/weather?appid=${process.env.VUE_APP_API_KEY}&q=${city}&lang=${lang}&units=metric`)
    if (response.status === 404) {
      throw new WeatherSearchError('City not found', response.status)
    }
    const data = await response.json()
    const sideWorld = this.sideWorld(data.wind.deg)
    return {
      weather: data.weather[0],
      name: data.name,
      wind: {
        ...data.wind,
        sideWorld
      },
      main: data.main
    }
  }
}
