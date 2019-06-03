const router = require('koa-router')()
const MovieModel = require('../models/Movie')

router.get(`/api/movie/list`, async (ctx, next) => {
  await MovieModel.find({}, (err, movie) => {
    if(err) ctx.throw(500, '查询数据出错')
    ctx.response.status = 200
    ctx.body = {
      code: 0,
      data: movie,
      message: ''
    }
  })
  next()
})

router.post(`/api/movie/update`, async (ctx, next) => {
  const Movie = ctx.request.body
  if(!Movie.name) {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `电影名称不能为空!`
    }
    return
  }
  if(!Movie.alias) {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `电影别名不能为空!`
    }
    return
  }
  if(!Movie.publish) {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `电影上映日期不能为空!`
    }
    return
  }
  if(Movie.name && Movie.alias && Movie.publish){
    await MovieModel.updateOne({_id: Movie._id}, Movie, {multi: true}, (err, res) => {
      if(err) throw new Error(err)
      ctx.response.status = 200
      ctx.body = {
        code: 0,
        data: null,
        message: `修改电影信息成功！`
      }
    })
  }
})

router.post(`/api/movie/add`, async (ctx, next) => {
  const newMovie = ctx.request.body
  if(!newMovie.name) {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `电影名称不能为空!`
    }
    return
  }
  if(!newMovie.alias) {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `电影别名不能为空!`
    }
    return
  }
  if(!newMovie.publish) {
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `电影上映日期不能为空!`
    }
    return
  }
  if(newMovie.name && newMovie.alias && newMovie.publish){
    await MovieModel.create(newMovie)
    ctx.response.status = 200
    ctx.body = {
      code: 0,
      data: null,
      message: `新增电影成功！`
    }
  }
})

router.delete(`/api/movie/delete`, async (ctx, next) => {
  const data = ctx.request.body
  if(!data.id){
    ctx.response.status = 200
    ctx.body = {
      code: 1,
      data: null,
      message: `id不能为空！`
    }
    return
  }
  await MovieModel.remove({ _id: data.id })
  ctx.response.status = 200
  ctx.body = {
    code: 0,
    data: data,
    message: `删除电影成功！`
  }
})
module.exports = router