const express = require('express');
const cors =require('cors');
const app = express();
const models = require('./models');
const port = 8080;


app.use(express.json());
app.use(cors());

app.use(cors());

app.get("/products", (req, res) => {
    const query = req.query;
    console.log(query);
    models.Product.findAll()
    .then((result) => {
      res.send({
        products:result
      })
    })
    .catch((error)=>{
      console.log(error);
      res.send("에러발생");
    })
    res.send({    
        "products" : [
          {
              "id" : 1,
            "name": "농구공",
            "price": 100000,
            "seller": "조던",
            "imageUrl": "products/basketball1.jpeg"
          },
          {
              "id": 2,
            "name": "축구공",
            "price": 50000,
            "seller": "메시",
            "imageUrl": "products/basketball1.jpeg"
          },
          {
              "id" : 3,
            "name": "키보드",
            "price": 10000,
            "seller": "그랩",
            "imageUrl": "products/basketball3.jpg"
          }
    ]
    });
});

app.post("/products", (req,res) => {
    const body = req.body;
    const {name, desc ,price, seller} = body;

   

    if(!name || !desc || !price || !seller){
      res.send("모든 필드를 입력해주세요.");
    }


    models.Product.create({
      name,
      desc,
      price,
      seller
    }).then((result) => {
      console.log("상품 생성 결과: ", result);
      res.send({
        result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.send("상품 업로드에 문제가 발생했습니다.");
    });
    res.send(
        {
            // body : body
            body,
        }
    );
});

app.listen(port, () => {
    console.log("그랩의 쇼핑몰 서버가 돌아가고 있습니다.");
    models.sequelize.sync().then( () => {
      console.log('DB연결 성공!');
    }).catch((err) => {
      console.log(err);
      console.log('DB연결 에러ㅠ');
      process.exit();
    })
});

