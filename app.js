const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const app = new Koa()
const db = require('./models/db')
const router = require('./controllers/router')


app.use(bodyParser())

app.use(router.routes())

app.listen(8999, () => {
	console.log(`server is run at: http://localhost:8999`)
})