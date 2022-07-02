import { MockMethod } from 'vite-plugin-mock'
// 昨日概况数据
const generalData: MockMethod = {
  url: '/api/mockGetGeneralData',
  method: 'get',
  timeout: 1500,
  response: () => {
    return {
      list: [42502, 17480, 32296, 12057]
    }
  }
}
const names = ['张三', '李思', '王五', '吴六', '赵七', '白八', '钱九', '刘十', '陈二', '谭一']
const addressList = ['江西省宜春市袁州区', '江西省南昌市红谷滩区', '江西省赣州市章贡区']
const tableData: any[] = []
for (let i = 0; i < 100; i++) {
  const item = {
    name: names[Math.floor(Math.random() * 10 + 1)],
    age: Math.floor(Math.random() * 50),
    address: addressList[Math.floor(Math.random() * 4)],
    account: 'f' + Math.floor(Math.random() * 1325112512),
    level: Math.floor(Math.random() * 10 + 1),
    prenticeAccount: 'z' + Math.floor(Math.random() * 18151151),
    gold: Math.floor(Math.random() * 10000),
    active: Math.floor(Math.random() * 2),
    activeTime: Math.floor(Math.random() * 1000),
    date: new Date().getTime() - Math.floor(Math.random() * 942542000),
    headPhoto: 'https://avatars.githubusercontent.com/u/30490423?v=4'
  }
  tableData.push(item)
}
const getTableData: MockMethod = {
  url: '/api/mockGetTableData',
  method: 'post',
  timeout: 1000,
  response: (data) => {
    const { currentPage, pageSize } = data.body
    return {
      list: tableData.slice(pageSize * (currentPage - 1), pageSize * (currentPage - 1) + pageSize),
      total: tableData.length,
      code: '0000'
    }
  }
}

export { generalData, getTableData }
