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
  res.render('new')
})

// 新增一間restaurant
app.post('/restaurants', (req, res) => {
  // 建立Restaurant model的實例
  const restaurant = new Restaurant({
    name: req.body.name,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    google_map: req.body.google_map,
    phone: req.body.phone,
    rating: req.body.rating,
    description: req.body.description
  })

  // 存入資料庫
  restaurant.save(err => {
    if (err) return console.error(err)
    return res.redirect('/')  //儲存完成後，導回首頁
  })
})

// 顯示一間restaurant的詳細資訊
app.get('/restaurants/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail', { restaurant })
  })
})

// detail頁面的restaurant修改頁面
app.get('/restaurants/:id/detail_edit', (req, res) => {
  const backURL = req.headers.referer
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('detail_edit', { restaurant, backURL })
  })
})

// index頁面的restaurant修改頁面
app.get('/restaurants/:id/index_edit', (req, res) => {
  const backURL = req.headers.referer
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('index_edit', { restaurant, backURL })
  })
})

// 以session紀錄進入編輯模式的路徑，修改restaurant後，依session的記錄代號重導向至對應頁面
app.post('/restaurants/:id', (req, res) => {
  if (req.headers.referer.includes('detail')) {
    req.session = 1
  } else if (req.headers.referer.includes('index')) {
    req.session = 0
  }
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.name = req.body.name
    restaurant.category = req.body.category
    restaurant.image = req.body.image
    restaurant.location = req.body.location
    restaurant.google_map = req.body.google_map
    restaurant.phone = req.body.phone
    restaurant.rating = req.body.rating
    restaurant.description = req.body.description
    restaurant.save(err => {
      if (err) {
        return console.error(err)
      } else if (req.session === 1) {
        return res.redirect(`/restaurants/${restaurant.id}`)
      } else if (req.session === 0) {
        return res.redirect('/')
      }
    })
  })
})

// 確認刪除restaurant頁面
app.get('/restaurants/:id/delete', (req, res) => {
  const backURL = req.headers.referer
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    return res.render('warning', { restaurant, backURL })
  })
})

// 刪除restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurant) => {
    if (err) return console.error(err)
    restaurant.remove(err => {
      if (err) return console.error(err)
      return res.redirect('/')
    })
  })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find((err, restaurants) => {
    if (err) console.error(err)
    const matchedRestaurants = restaurants.filter(restaurant => {
      return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.toLowerCase())
    })
    res.render('index', { restaurants: matchedRestaurants, keyword })
  })
})

// 啟動並監聽伺服器
app.listen(3000, () => {
  console.log('App is running!')
})