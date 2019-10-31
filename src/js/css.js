/*
是否有一个或多个类
删除,添加一个或多个类
切换类,1个类,2个类,多个类
一组对象,某个对象添加或删除类
*/
let css = {
  // 删除一个属性
  // @param {object} obj 要处理的对象
  // @param {string} cn 要删除的属性名
  removeClass(obj,cn){
    let cnList = obj.className.split(' ')
    for(let i=0; i<cnList.length; i++){
      if(cnList[i] == cn){
        cnList[i] = ''
      }
    }
    obj.className = cnList.join(' ')
  },
  // 判断是否有某个类
  havaClass(obj,cn){
    let cnList = obj.className.split(' ')
    for(let i=0; i<cnList.length; i++){
      if(cnList[i] == cn){
        return true
      }
    }
    return false
  },
  addClass(obj,cn){
    let cnList = obj.className.split(' ')
    let flag = true
    for(let i=0; i<cnList.length; i++){
      if(cnList[i] == cn){
        flag = false
      }
    }
    if(flag){
      cnList.push(cn)
      obj.className = cnList.join(' ')
    }
  },
  // 切换类
  convertClass(obj,cn){
    if(!this.havaClass(obj,cn)){
      this.addClass(obj,cn)
    }else{
      this.removeClass(obj,cn)
    }
  },
  // 把类名 a 替换成 b
  replaceClass(obj,a,b){
    if(this.havaClass(obj,a)){
      this.removeClass(obj,a)
      this.addClass(obj,b)
    }else if(this.havaClass(obj,b)){
      this.removeClass(obj,b)
      this.addClass(obj,a)
    }
  },
  // 转换css,只有一个对象添加类,其它则去掉此类
  convertAddClassByGroup(list,index,cn){
    for(let i=0; i<list.length; i++){
      this.removeClass(list[i],cn)
    }
    this.addClass(list[index],cn)
  },
  convertRemoveClassByGroup(list,index,cn){
    for(let i=0; i<list.length; i++){
      this.addClass(list[i],cn)
    }
    this.removeClass(list[index],cn)
  },
}

module.exports = css