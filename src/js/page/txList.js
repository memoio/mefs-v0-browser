let css = app.css,
back = app.back

class TxList{
  // 获取此类对应的元素对象
  get element(){
    let obj = dq('.txList')
    return {
      obj,
      table:obj.q('table'),
      btn:obj.qa('button'),
      nav:{
        n:obj.q('input'),
        sum:obj.q('span'),
        row:obj.q('select'),
      }
    }
  }
  init(){
    let self = this
    // 分页
    let btn = this.element.btn
    // 分页的条数
    let row = this.element.nav.row.value
    btn[0].onclick = async function(){
      let res = await back.get(`/tx/${row}/1`)
      self.refresh(res.data)
    }
    btn[1].onclick = async function(){
      let val = parseInt(self.element.nav.n.value)-1
      let res = await back.get(`/tx/${row}/${val}`)
      self.refresh(res.data)
    }
    btn[2].onclick = async function(){
      let val = parseInt(self.element.nav.n.value)+1
      let res = await back.get(`/tx/${row}/${val}`)
      self.refresh(res.data)
    }
    btn[3].onclick = async function(){
      let val = 'last'
      let res = await back.get(`/tx/${row}/${val}`)
      self.refresh(res.data)
    }
    this.element.nav.n.onchange = async function(){
      let val = parseInt(self.element.nav.n.value)
      let res = await back.get(`/tx/${row}/${val}`)
      self.refresh(res.data)
    }
    this.element.nav.row.onchange = async function(){
      row = this.value
      let val = parseInt(self.element.nav.n.value)
      let res = await back.get(`/tx/${row}/${val}`)
      self.refresh(res.data)
    }
  }
  // 刷新值
  refresh(res){
    this.element.nav.n.value = res.n
    this.element.nav.sum.innerHTML = res.sum
    this.element.table.innerHTML = this.getList(res.data)
    this.element.table.qa('tr:not(:first-child) td:nth-child(1)').forEach(obj=>{
      obj.onclick = function(){
        app.page.txInfo.show(this.title)
      }
    })
    this.element.table.qa('tr:not(:first-child) td:nth-child(2)').forEach(obj=>{
      obj.onclick = function(){
        app.page.blockInfo.show(this.innerHTML)
      }
    })
  }
  async show(){
    let res = await back.get('/tx/10/1')
    this.refresh(res.data)
    css.convertRemoveClassByGroup(dqa('.content>div'),3,'hide')
    app.page.history('/txList')
  }
  getList(res){
    let html = ''
    html += '<tr><td>交易hash</td><td>区块号</td><td>时间</td><td>发送方</td><td>接收方</td><td>值</td><td>交易费用</td></tr>'
    for(let v of res){
      html += `<tr><td title="${v.hash}">${v.hash.substring(0,10)}</td><td>${parseInt(v.blockNumber,16)}</td><td>${v.timestamp}</td><td>${v.from}</td><td>${v.to}</td><td>${v.value}</td><td>${v.gas},${v.gasPrice}</td></tr>`
    }
    return html
  }
}

module.exports = TxList