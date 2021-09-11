export default class WeatherSearchError extends Error {
  constructor (message, statusCode) {
    super(message)
    this.statusCode = statusCode
    this.name = 'Weather Search Error'
  }
}
