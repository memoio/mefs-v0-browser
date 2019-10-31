let css = app.css,
back = app.back

class TxInfo{
  async show(id){
    let res = await back.get(`/tx/${id}`)
    dq('.txInfo table').innerHTML = this.getInfo(res.data)
    css.convertRemoveClassByGroup(dqa('.content>div'),4,'hide')
    app.page.history('/txInfo')
  }
  getInfo(res){
    let html = ''
    html += '<tr><td>属性</td><td>值</td></tr>'
    for(let v in res){
      html += `<tr><td>${v}</td><td>${res[v]}</td></tr>`
    }
    return html
  }
}

module.exports = TxInfo