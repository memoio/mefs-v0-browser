let css = app.css,
back = app.back

class BlockInfo{
  async show(id){
    let data = await back.get(`/block/${id}`)
    dq('.blockInfo table').innerHTML = this.getInfo(data.data)
    css.convertRemoveClassByGroup(dqa('.content>div'),2,'hide')
    app.page.history('/blockInfo')
  }
  getInfo(res){
    let html = ''
    html += '<tr><td>属性</td><td>值</td></tr>'
    for(let v in res){
      if(v == 'transactions'){
        html += `<tr><td>${v}</td><td>`
        for(let tx of res[v]){
          html += `${tx.hash}<br>`
        }
        html += '</td></tr>'
        continue
      }
      html += `<tr><td>${v}</td><td>${res[v]}</td></tr>`
    }
    return html
  }
}

module.exports = BlockInfo