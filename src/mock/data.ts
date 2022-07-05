import { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
const Random = Mock.Random
// 昨日概况数据
const generalData: MockMethod = {
  url: '/api/mockGetGeneralData',
  method: 'get',
  timeout: 1500,
  response: () => {
    return {
      list: [
        Random.natural(5000, 30000),
        Random.natural(5000, 60000),
        Random.natural(5000, 50000),
        Random.natural(5000, 20000)
      ]
    }
  }
}
const tableData: any[] = []
for (let i = 0; i < 215; i++) {
  const template = {
    id: Random.natural(),
    age: Random.natural(18, 65),
    name: Random.cname(),
    address: Random.county(true),
    account: Random.natural(10000),
    level: Random.natural(1, 10),
    gold: Random.natural(5000, 20000),
    active: Random.natural(0, 1),
    accountType: Random.natural(1, 2),
    activeTime: Random.natural(1000, 160000),
    headPhoto: Random.image('80x80', Random.color(), '#FFF', 'png', Random.county()),
    date: new Date().getTime() - Random.natural(100000000, 500000000)
  }
  tableData.push(template)
}
const getTableData: MockMethod = {
  url: '/api/mockGetTableData',
  method: 'post',
  timeout: 1000,
  response: (params) => {
    const { currentPage, pageSize, name } = params.body
    let dataList: any[] = tableData
    if (name) {
      dataList = tableData.filter((item) => item.name.indexOf(name) !== -1)
    }
    const newDataList = dataList.slice(pageSize * (currentPage - 1), pageSize * (currentPage - 1) + pageSize)
    return {
      list: newDataList,
      total: tableData.length,
      code: '0000'
    }
  }
}

const editTableData: MockMethod = {
  url: '/api/mockEditTableData',
  method: 'post',
  timeout: 1000,
  response: (params) => {
    const { id } = params.body
    tableData[tableData.findIndex((item) => item.id === id)] = params.body
    return {
      code: '0000',
      msg: '修改成功！！！'
    }
  }
}

export { generalData, getTableData, editTableData }
