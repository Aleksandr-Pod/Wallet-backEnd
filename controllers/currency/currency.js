const axios = require("axios");

module.exports.currency = async(_req, res) => {
    await axios.get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    .then(r => res.json(r.data))
} 