let css = app.css,
back = app.back

class BlockList{
  // 获取此类对应的元素
  element(){}
  init(){
    let self = this
    let bl = dq('.blockList')
    // 分页
    let btn = bl.qa('button')
    // 分页的条数
    let row = bl.q('select').value
    btn[0].onclick = async function(){
      let res = await back.get(`/block/${row}/1`)
      self.refresh(res.data)
    }
    btn[1].onclick = async function(){
      let val = parseInt(bl.q('input').value)-1
      let res = await back.get(`/block/${row}/${val}`)
      self.refresh(res.data)
    }
    btn[2].onclick = async function(){
      let val = parseInt(bl.q('input').value)+1
      let res = await back.get(`/block/${row}/${val}`)
      self.refresh(res.data)
    }
    btn[3].onclick = async function(){
      let val = 'last'
      let res = await back.get(`/block/${row}/${val}`)
      self.refresh(res.data)
    }
    bl.q('input').onchange = async function(){
      let val = parseInt(bl.q('input').value)
      let res = await back.get(`/block/${row}/${val}`)
      self.refresh(res.data)
    }
    bl.q('select').onchange = async function(){
      row = this.value
      let val = parseInt(bl.q('input').value)
      let res = await back.get(`/block/${row}/${val}`)
      self.refresh(res.data)
    }
  }
  async show(){
    let res = await back.get('/block/10/1')
    this.refresh(res.data)
    css.convertRemoveClassByGroup(dqa('.content>div'),1,'hide')
    app.page.history('/blockList')
  }
  // 刷新值
  refresh(res){
    dq('.blockList input').value = res.n
    dq('.blockList span').innerHTML = res.sum
    dq('.blockList table').innerHTML = this.getList(res.data)
    dqa('.blockList table tr:not(:first-child) td:nth-child(1)').forEach(obj=>{
      obj.onclick = function(){
        app.page.blockInfo.show(this.innerHTML)
      }
    })
  }
  getList(res){
    let html = ''
    html += '<tr><td>区块号</td><td>时间</td><td>交易量</td><td>矿工</td><td>燃料使用</td><td>燃料限制</td><td>奖励</td></tr>'
    for(let v of res){
      html += `<tr><td>${parseInt(v.number,16)}</td><td>${v.timestamp}</td><td>${v.transactions.length}</td><td>${v.miner}</td><td>${v.gasUsed}</td><td>${v.gasLimit}</td><td>2</td></tr>`
    }
    return html
  }
}

module.exports = BlockList