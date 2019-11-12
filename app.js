// 載入框架、套件
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// 設定連線至mongoDB，連線後回傳connection物件
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
// db連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// db連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 載入Restaurant model
const Restaurant = require('./models/restaurant')

// 設定靜態資料夾
app.use(express.static('public'))

// 設定body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定樣版引擎
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'main' }))
app.set('view engine', 'hbs')

// 設定路由
// restaurant首頁
app.get('/', (req, res) => {
  return res.redirect('/restaurants')
})

// 列出全部restaurant
app.get('/restaurants', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err)
    return res.render('index', { restaurants })
  })
})

// 新增一間restaurant頁面
app.get('/restaurants/new', (req, res) => {
  res.send('新增restaurant頁面')
})

// 新增一間restaurant
app.post('/restaurants', (req, res) => {
  res.send('建立restaurant')
})

// 顯示一間restaurant的詳細資訊
app.get('restaurants/:id', (req, res) => {
  res.send('顯示restaurant的詳細內容')
})

// 修改restaurant頁面
app.get('/restaurants/:id/edit', (req, res) => {
  res.send('修改restaurant頁面')
})

// 修改restaurant
app.post('restaurants/:id/edit', (req, res) => {
  res.send('修改restaurant')
})

// 刪除restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  res.send('刪除restaurant')
})

// 啟動並監聽伺服器
app.listen(3000, () => {
  console.log('App is running!')
})