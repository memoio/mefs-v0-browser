let css = app.css,
blockInfo = app.page.blockInfo,
txInfo = app.page.txInfo
addrList = app.page.addrList

class Search{
  init(){
    let self = this
    // 下拉框
    let s = dq('.search .select')
    s.querySelector('span').onclick = function(){
      css.replaceClass(s.querySelector('span i'),'fa-chevron-down','fa-chevron-up')
      css.convertClass(s.querySelector('ul'),'hide')
    }
    s.querySelectorAll('li').forEach(obj=>{
      obj.onclick = function(){
        s.querySelector('span span').innerHTML = obj.innerHTML
        css.replaceClass(s.querySelector('span i'),'fa-chevron-down','fa-chevron-up')
        css.convertClass(s.querySelector('ul'),'hide')
      }
    })
    // 搜索
    dq('.search button').onclick = async function(){
      let res = self.get()
      switch(res.type){
        case 'block':
          blockInfo.show(res.value)
          break;
        case 'tx':
          txInfo.show(res.value)
          break;
        case 'addr':
          addrList.show(res.value)
          break;
      }
    }
  }
  get(){
    let res = {
      type:'',
      value:'',
    }
    switch(dqa('.search span')[1].innerHTML){
      case '块':res.type='block';break;
      case '交易':res.type='tx';break;
      case '地址':res.type='addr';break;
    }
    res.value = dq('.search input').value
    return res
  }
}

module.exports = Search