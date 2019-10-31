let root = __dirname+'/'
let log = console.log,
dir = console.dir
let obj = {
  // 给对象添加或设置属性
  attr(obj,attr){
    for(let v in attr){
      obj[v] = attr[v]
    }
  }
}
let global = window
Element.prototype.q = function(key){
  return this.querySelector(key)
}
Element.prototype.qa = function(key){
  return this.querySelectorAll(key)
}
obj.attr(global,{
  log,dir,obj,
  dq:function(key){
    return document.querySelector(key)
  },
  dqa:function(key){
    return document.querySelectorAll(key)
  },
})

let config = {
  root:root,
  // 以太坊地址
  ethUrl:'/eth/',
  // 后端地址
  backUrl:'/ethBack',
}

let css = require('./css')
let axios = require('axios')
global.app = {
  config,css,axios,
}
let back = require('./back')
obj.attr(global.app,{
  back,
})

// 页面
global.app.page = {}
let StateInfo = require('./page/stateInfo')
let stateInfo = new StateInfo()
let BlockInfo = require('./page/blockInfo')
let blockInfo = new BlockInfo()
let BlockList = require('./page/blockList')
let blockList = new BlockList()
let TxList = require('./page/txList')
let txList = new TxList()
let TxInfo = require('./page/txInfo')
let txInfo = new TxInfo()
let AddrList = require('./page/addrList')
let addrList = new AddrList()
obj.attr(global.app.page,{
  blockInfo,blockList,txList,txInfo,addrList,stateInfo,
})
let Search = require('./page/search')
let search = new Search()
let Newest = require('./page/newest')
let newest = new Newest()

obj.attr(global.app.page,{
  search,newest,
})
require('./page/index')
let page = global.app.page

// 初始化页面
page.init()