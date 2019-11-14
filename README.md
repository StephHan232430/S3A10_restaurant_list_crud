# 餐廳清單_CRUD

學期3 A10:建立餐廳清單的CRUD

## 功能列表

- 首頁列出seeder內所有餐廳卡片，點選卡片可查看詳細資訊
- 首頁常駐新增卡片欄位，以虛線框線標記，並以＋號提示使用者
- 首頁及詳細資訊頁面皆可點選編輯按鈕進入編輯模式，編輯完成點選save按鍵後導回前一頁
- 首頁及詳細資訊頁面皆可刪除餐廳卡片，點擊刪除按鈕後，呈現警語頁面，使用者可再度確認是否刪除
- 可搜尋餐廳名稱及餐廳類型關鍵字

## 專案安裝流程
1. 開啟terminal，將此專案clone至本機

```
git clone https://github.com/StephHan232430/S3A10_restaurant_list_crud.git
```

2. 進入專案資料夾

```
cd S3A10_restaurant_list_crud
```

3. 安裝專案所需套件

```
npm install
```

4. 進入 /models/seeds 資料夾，於terminal輸入指令匯入種子資料
```
node restaurantSeeder.js
```

5. 輸入後待terminal出現db connected! 即表示種子資料已新增至資料庫

6. 執行專案
```
npm run dev
```

7. 開啟網頁瀏覽器，於網址列輸入
```
http://localhost:3000
```

## 使用工具

- 開發環境：[Visual Studio Code v1.39.2](https://code.visualstudio.com/)
- 資料庫管理系統：[MongoDB Community Server v4.0.13](https://www.mongodb.com/download-center/community)
- 物件映射技術：[Mongoose v5.7.10](https://www.npmjs.com/package/mongoose)
- 開發框架：[Express v4.17.1](https://expressjs.com/zh-tw/)
- 模板引擎：[Express-Handlebars v3.1.0](https://github.com/ericf/express-handlebars)
- 執行環境：[Node.js v12.13.0]()