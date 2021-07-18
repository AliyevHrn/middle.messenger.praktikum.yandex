const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.static(__dirname + '/dist'));
console.log(__dirname);


app.listen(PORT, () => {
    console.log(`Запускаем наше приложение на порту ${PORT}`);
});
