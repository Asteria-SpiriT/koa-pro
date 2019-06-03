const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MovieSchema = new Schema({
  name: String,
  alias: [ String ],
  publish: Date,
  created_at: { type: Date, default: Date.now },
  images: {
    coverSmall: String,
    coverBig: String,
  },
  source: [{
    source: String,
    link: String,
    swfLink: String,
    quality: String,
    version: String,
    lang: String,
    subTitle: String,
    create_date: { type: Date, default: Date.now }
  }]
})

const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie