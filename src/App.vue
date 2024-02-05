<script setup lang="ts">
import TableLite from 'vue3-table-lite'
import { computed, onMounted, reactive } from 'vue'
import axios from 'axios'
import { paymentsBybit } from '@/constants/payments'

const table = reactive({
  isLoading: false,
  columns: [
    {
      label: 'Цена',
      field: 'price',
      sortable: true,
      width: '20%',
      isKey: true
    },
    {
      label: 'Маркет',
      field: 'market',
      sortable: true
    },
    {
      label: 'Доступно',
      field: 'lastQuantity',
      sortable: true,
      width: '15%'
    },
    {
      label: 'Лимиты',
      field: 'limits',
      sortable: true,
      width: '15%'
    },
    {
      label: 'Способ оплаты',
      field: 'payments',
      sortable: true,
      width: '20%'
    },
    {
      label: 'Комментарий',
      field: 'remark',
      width: '100%'
    }
  ],
  rows: [],
  totalRecordCount: computed(() => table.rows.length),
  sortable: {
    order: 'price',
    sort: 'desc'
  }
})

const getPaymentName = (id: number) => paymentsBybit.find((payment) => payment.id === id)

const fetchBybitSell = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/bybit/sell`)

    table.rows.push(
      ...data.result.items.map((item) => {
        return {
          price: item.price,
          market: 'Bybit',
          lastQuantity: item.lastQuantity,
          limits: `${item.minAmount} - ${item.maxAmount}`,
          payments: item.payments.map((id: string) => getPaymentName(+id)?.name || id).join(', '),
          remark: item.remark
        }
      })
    )
  } catch (e) {
    console.log(e)
  }
}

const fetchHTXSell = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/htx-sell')

    table.rows.push(
      ...data.data.map((item) => {
        return {
          price: item.price,
          market: 'HTX',
          lastQuantity: item.tradeCount,
          limits: `${item.minTradeLimit} - ${item.maxTradeLimit}`,
          payments: item.payMethods.map((payMethod) => payMethod.name).join(', '),
          remark: ''
        }
      })
    )
  } catch (e) {
    console.log(e)
  }
}

const fetchAbcexSell = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/abcex-sell')

    table.rows.push(
      ...data.map((item) => {
        return {
          price: item.price,
          market: 'Abcex',
          lastQuantity: item.volume,
          limits: '',
          payments: 'Cash',
          remark: ''
        }
      })
    )
  } catch (e) {
    console.log(e)
  }
}

const fetchCommexSell = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/commex-sell')

    table.rows.push(
      ...data.data.map((item) => {
        return {
          price: item.adDetailResp.price,
          market: 'Commex',
          lastQuantity: item.adDetailResp.tradableQuantity,
          limits: `${item.adDetailResp.minSingleTransAmount} - ${item.adDetailResp.maxSingleTransAmount}`,
          payments: item.adDetailResp.tradeMethods
            .map((method) => method.tradeMethodName)
            .join(', '),
          remark: ''
        }
      })
    )
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  table.isLoading = true
  await Promise.all([fetchBybitSell(), fetchHTXSell(), fetchAbcexSell(), fetchCommexSell()])
  table.isLoading = false
})
</script>

<template>
  <table-lite
    :is-loading="table.isLoading"
    :columns="table.columns"
    :rows="table.rows"
    :total="table.totalRecordCount"
    :sortable="table.sortable"
    :is-static-mode="true"
    :page-size="table.totalRecordCount"
    class="table"
  />
</template>

<style scoped>
.table {
  width: 100%;
}
</style>
