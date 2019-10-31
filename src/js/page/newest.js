let css = app.css,
back = app.back,
blockInfo = app.page.blockInfo,
blockList = app.page.blockList,
txList = app.page.txList,
txInfo = app.page.txInfo

class Newest{
  async init(){
    let self = this
    let newest = dqa('.newest ul')
    // 填充内容
    newest[0].innerHTML += await this.getLastBlock()
    newest[1].innerHTML += await this.getLastTx()
    // 添加事件监控
    newest[0].querySelector('li:first-child button').onclick = function(){
      blockList.show()
    }
    newest[0].querySelectorAll('li:not(:first-child)').forEach(obj=>{
      obj.onclick = function(){
        blockInfo.show(this.innerHTML)
      }
    })
    newest[1].querySelector('li:first-child button').onclick = function(){
      txList.show()
    }
    newest[1].querySelectorAll('li:not(:first-child)').forEach(obj=>{
      obj.onclick = function(){
        txInfo.show(this.innerHTML)
      }
    })
  }
  async getLastBlock(){
    let res = await back.get('/lastBlock/10')
    let html = ''
    for(let v of res.data){
      html += `<li>${v.hash}</li>`
    }
    return html
  }
  async getLastTx(){
    let res = await back.get('/lastTx/10')
    let html = ''
    for(let v of res.data){
      html += `<li>${v.hash}</li>`
    }
    return html
  }
}

module.exports = Newest