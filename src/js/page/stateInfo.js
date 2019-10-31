let back = app.back

class StateInfo{
  get obj(){
    let main = dq('.stateInfo')
    return {
      main,
      gasLimit:dq('.stateInfo > div:nth-child(2) div'),
      gasPrice:dq('.stateInfo > div:nth-child(3) div'),
    }
  }
  init(){
    let self = this
    back.get(`/info`).then(res=>{
      res = res.data
      let t = self.obj.main.qa('span')
      t[0].innerHTML = res.blockNumber
      t[1].innerHTML = res.difficulty
      self.initGasLimit(res.gasLimit)
      self.initGasPrice(res.gasPrice)
    })
  }
  initGasLimit(res){
    let myChart = echarts.init(this.obj.gasLimit)
    let option = {
      title:{
        text:'gasLimit',
        left:'40%',
      },
      tooltip:{
        show:true,
        trigger:'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        show:false,
        type: 'category',
      },
      yAxis: {
        show:false,
        type: 'value',
        min:0x470000
      },
      series: [{
        data: res,
        type: 'line',
        smooth: true
      }]
    }
    myChart.setOption(option)
  }
  initGasPrice(res){
    let myChart = echarts.init(this.obj.gasPrice)
    let option = {
      title:{
        text:'gasPrice',
        left:'40%',
      },
      tooltip:{
        show:true,
        trigger:'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      xAxis: {
        show:false,
        type: 'category',
      },
      yAxis: {
        show:false,
        type: 'value',
        min:0x470000
      },
      series: [{
        data: res,
        type: 'line',
        smooth: true
      }]
    }
    myChart.setOption(option)
  }
}

module.exports = StateInfo