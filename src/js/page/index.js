let page = app.page
let search = page.search,
newest = page.newest,
blockInfo = page.blockInfo
blockList = page.blockList
txList = page.txList
addrList = page.addrList
stateInfo = page.stateInfo

obj.attr(page,{
  // 修改地址栏
  // @param {string} addr
  history(addr){
    history.pushState(null, null, addr)
  },
  // 初始化页面,绑定事件
  async init(){
    search.init()
    stateInfo.init()
    newest.init()
    blockList.init()
    txList.init()
    addrList.init()
  },
})

// module.exports = page