require('dotenv').config();

module.exports = {
    name: process.env.NAME,
    lastname: process.env.LAST_NAME,
    apimel: {
        url: 'https://api.mercadolibre.com',
    }
}