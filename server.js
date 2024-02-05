import server from 'bunrest'
import axios from 'axios'
import cors from 'buncors'
const app = server()

app.use(cors())
axios.defaults.headers.common['Accept-Encoding'] = 'gzip'

app.get('/bybit-sell', async (req, res) => {
  const { data } = await axios.post('https://api2.bybit.com/fiat/otc/item/online', {
    userId: '',
    tokenId: 'USDT',
    currencyId: 'RUB',
    payment: [],
    side: '0',
    size: '20',
    page: '1',
    amount: '',
    authMaker: false,
    canTrade: false
  })

  res.status(200).json(data)
})

app.get('/bybit-buy', async (req, res) => {
  const { data } = await axios.post('https://api2.bybit.com/fiat/otc/item/online', {
    userId: '',
    tokenId: 'USDT',
    currencyId: 'RUB',
    payment: [],
    side: '0',
    size: '20',
    page: '1',
    amount: '',
    authMaker: false,
    canTrade: false
  })

  res.status(200).json(data)
})

app.get('/htx-sell', async (req, res) => {
  const { data } = await axios.get('https://www.htx.com/-/x/otc/v1/data/trade-market', {
    params: {
      coinId: 2,
      currency: 11,
      tradeType: 'buy',
      currPage: 1,
      payMethod: 0,
      acceptOrder: -1,
      country: null,
      blockType: 'general',
      online: 1,
      range: 0,
      amount: null,
      onlyTradable: false,
      isFollowed: false
    }
  })

  res.status(200).json(data)
})

app.get('/htx-buy', async (req, res) => {
  const { data } = await axios.post('https://api2.bybit.com/fiat/otc/item/online', {
    userId: '',
    tokenId: 'USDT',
    currencyId: 'RUB',
    payment: [],
    side: '0',
    size: '20',
    page: '1',
    amount: '',
    authMaker: false,
    canTrade: false
  })

  res.status(200).json(data)
})

app.get('/abcex-sell', async (req, res) => {
  const {
    data: { bid }
  } = await axios.get('https://abcex.io/api/v1/exchange/public/market-data/depth', {
    params: {
      marketId: 'USDTRUB'
    }
  })

  res.status(200).json(bid)
})

app.get('/abcex-buy', async (req, res) => {
  const { data } = await axios.post('https://api2.bybit.com/fiat/otc/item/online', {
    userId: '',
    tokenId: 'USDT',
    currencyId: 'RUB',
    payment: [],
    side: '0',
    size: '20',
    page: '1',
    amount: '',
    authMaker: false,
    canTrade: false
  })

  res.status(200).json(data)
})

app.get('/commex-sell', async (req, res) => {
  const { data } = await axios.post('https://www.commex.com/bapi/c2c/v1/friendly/c2c/ad/search', {
    asset: 'USDT',
    fiat: 'RUB',
    page: 1,
    rows: 20,
    tradeType: 'SELL'
  })

  res.status(200).json(data)
})

app.get('/commex-buy', async (req, res) => {
  const { data } = await axios.post('https://api2.bybit.com/fiat/otc/item/online', {
    userId: '',
    tokenId: 'USDT',
    currencyId: 'RUB',
    payment: [],
    side: '0',
    size: '20',
    page: '1',
    amount: '',
    authMaker: false,
    canTrade: false
  })

  res.status(200).json(data)
})

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
