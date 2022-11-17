const express = require('express')
const cors = require('cors');
const mysql2 = require('mysql2');
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const app = express();
app.use(cors({
    origin: "*",
}))
//token
const secretKey = 'wzyybnb';
//sign方法
//不要把密码加入token中
app.use(expressJWT({
    secret: secretKey,
    algorithms: ['HS256']
}).unless({
    path: [/^\/api\//]
}))
//可以把解析的信息挂载再req.user
app.use(express.json());
app.use((err, req, res, next) => {
    //token解析失败
    if (err.name === "UnauthorizeError") {
        return res.send({
            status: 401,
            message: '无效的token'
        })
    }
    res.send({
        status: 500,
        message: '未知错误'
    })

})
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'select',
    port: '3306',

})
app.get('/getName', (req, respond) => {
    let sql_name = 'select * from name';
    let count='select count(name) as counts from name;'
    db.query(sql_name, (err, res) => {
        db.query(count,(err,res1)=>{
            let data={
                name:[...res],
                count:res1[0].counts
            }
            respond.send(data).status(200);
        })
    })
})
app.get('/api/password', (req, respond) => {
    let sql_name = 'select * from password';
    db.query(sql_name, (err, res) => {
        if (res[0].password === req.query.password) {
            const tokens = jwt.sign({
                password: req.query.password
            }, secretKey, {
                expiresIn: '1h'
            })
            respond.send({
                status: 200,
                token: tokens
            });
        } else {
            respond.send(401);
        }
    })
})
app.listen(8088, () => {
    console.log('8088 is running');
})