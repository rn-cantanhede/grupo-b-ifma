const axios = require('axios');
axios.get('http://localhost:3000/movimentacoes')
    .then(res => {
        console.log(JSON.stringify(res.data[0], null, 2));
    })
    .catch(err => console.error(err.message));
