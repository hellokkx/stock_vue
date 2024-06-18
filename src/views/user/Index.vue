<template>
  <div>
    <div class = "class">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="上证指数" name="1"></el-tab-pane>
        <el-tab-pane label="深证指数" name="2"></el-tab-pane>
        <el-tab-pane label="创业板指数" name="3"></el-tab-pane>
        <el-tab-pane label="科创50" name="4"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="container">
      <div class="left-container">
        <div id="chart-container" style="width: 100%; height: 400px;"></div>
        <div class="hot-topics">
          <h2 style="padding-left:5px; font-size: 16px; font-family: Arial, sans-serif;">热门话题</h2>
          <div :data="topics"     class="topics-list">
            <div class="topic-item" v-for="(topic, index) in topics" :key="index" :style="getTopicColor(index)">
              {{ index % 2 === 0 ? index/2+1  : (index+1)/2+5 }}. {{ topic}}
            </div>
          </div>
        </div>
      </div>


      <div class="right-container">
        <h2 style="font-size: 16px; font-family: Arial, sans-serif;">龙虎榜</h2>
        <table :data="stocks" class="stock-rise">
          <thead>
          <tr>
            <th>股票名称</th>
            <th>当前价</th>
            <th>涨跌幅</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stock in stocks" :key="stock.code">
            <td class="stock-name" >{{ stock.name }}</td>
            <td class="stock-price">{{ stock.close }}</td>
            <td class="stock-change">{{ stock.pct_change }}</td>
          </tr>
          </tbody>
        </table>
        <h2 style="font-size: 16px; font-family: Arial, sans-serif;">沪深涨幅榜</h2>
        <table class="stock-rise">
          <thead>
          <tr>
            <th>股票名称</th>
            <th>当前价</th>
            <th>涨跌幅</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="stock in stocks" :key="stock.code">
            <td class="stock-name" >{{ stock.name }}</td>
            <td class="stock-price">{{ stock.close }}</td>
            <td class="stock-change">{{ stock.pct_change }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Cookies from "js-cookie";
import {getMarketData, getTopList, predictStockData} from "@/api";
import {getMajorNews} from "@/api";

export default {
  name: 'Index',
  data() {
    return {
      activeName: '1',
      chart: null,
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      stocks: [],
      topics: [],
      response: [],
      showLine:true,
      showKLine:false,
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      id: '1',
    };
  },
  created() {
    this.token = localStorage.getItem('token')
    console.log("token"+this.token)
    this.getData();
  },
  mounted() {
    this.initKLineChart();
  },
  methods: {
    handleClick(tab, event) {
      this.id = tab.name;
      this.initKLineChart();
    },
    //大盘指数画图
    initKLineChart() {
      const chartContainer = document.getElementById('chart-container');
      const myChart = echarts.init(chartContainer);
      const upColor = '#ec0000';
      const upBorderColor = '#8A0000';
      const downColor = '#00da3c';
      const downBorderColor = '#008F28';

      //请求数据
      var id = this.id;
      getMarketData({id}).then(res=> {
        console.log(res)
        if (res.code === 200) {
          const rawData=res.response.simpleStocks
          console.log(rawData)

          //处理数据da
          const data0 = this.splitData(rawData);
          const option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              },
            },
            legend: {
              top:5,
              data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '15%'
            },
            xAxis: {
              type: 'category',
              data: data0.categoryData,
              boundaryGap: false,
              axisLine: { onZero: false },
              splitLine: { show: false },
              min: 'dataMin',
              max: 'dataMax'
            },
            yAxis: {
              scale: true,
              splitArea: {
                show: true
              }
            },
            dataZoom: [
              {
                type: 'inside',
                start: 40,
                end: 100,
                height: 10 // 设置滑动条高度为20像素
              },
              {
                show: true,
                type: 'slider',
                top: '90%',
                start: 0,
                end: 20,
                height: 10 // 设置滑动条高度为20像素
              }
            ],
            series: [
              {
                name: '日K',
                type: 'candlestick',
                data: data0.values,
                itemStyle: {
                  color: upColor,
                  color0: downColor,
                  borderColor: upBorderColor,
                  borderColor0: downBorderColor
                },
                markPoint: {
                  label: {
                    formatter: function (param) {
                      return param != null ? Math.round(param.value) + '' : '';
                    }
                  },
                  data: [
                    {
                      name: 'Mark',
                      // coord: ['2013/5/31', 2300],
                      // value: 2300,
                      // itemStyle: {
                      //   color: 'rgb(41,60,85)'
                      // }
                    },
                    {
                      name: 'highest value',
                      type: 'max',
                      symbolSize: 35, // 设置标记点大小为5像素
                      symbol:'pin',
                      valueDim: 'highest',
                      itemStyle: {
                        color: 'rgb(41,60,85)'
                      }
                    },
                    {
                      name: 'lowest value',
                      type: 'min',
                      symbolSize: 35, // 设置标记点大小为5像素
                      symbol:'pin',
                      valueDim: 'lowest',
                      itemStyle: {
                        color: 'rgb(41,60,85)'
                      }
                    },
                    {
                      name: 'average value on close',
                      type: 'average',
                      symbolSize: 35, // 设置标记点大小为5像素
                      symbol:'pin',
                      valueDim: 'close',
                      itemStyle: {
                        color: 'rgb(41,60,85)'
                      }
                    }
                  ],
                  tooltip: {
                    formatter: function (param) {
                      return param.name + '<br>' + (param.data.coord || '');
                    }
                  }
                },
                markLine: {
                  symbol: ['none', 'none'],
                  data: [
                    [
                      {
                        name: 'from lowest to highest',
                        type: 'min',
                        valueDim: 'lowest',
                        symbol: 'circle',
                        symbolSize: 10,
                        label: {
                          show: false
                        },
                        emphasis: {
                          label: {
                            show: false
                          }
                        }
                      },
                      {
                        type: 'max',
                        valueDim: 'highest',
                        symbol: 'circle',
                        symbolSize: 10,
                        label: {
                          show: false
                        },
                        emphasis: {
                          label: {
                            show: false
                          }
                        }
                      }
                    ],
                    {
                      name: 'min line on close',
                      type: 'min',
                      valueDim: 'close'
                    },
                    {
                      name: 'max line on close',
                      type: 'max',
                      valueDim: 'close'
                    }
                  ]
                }
              },
              {
                name: 'MA5',
                type: 'line',
                data: this.calculateMA(5, data0),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'MA10',
                type: 'line',
                data: this.calculateMA(10, data0),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'MA20',
                type: 'line',
                data: this.calculateMA(20, data0),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              },
              {
                name: 'MA30',
                type: 'line',
                data: this.calculateMA(30, data0),
                smooth: true,
                lineStyle: {
                  opacity: 0.5
                }
              }
            ]
          };

          myChart.setOption(option);

        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },
    splitData(rawData) {
      const categoryData = [];
      const values = [];
      for (let i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].tradeDate); // 提取时间戳
        values.push([
          rawData[i].open, // 开盘价
          rawData[i].close, // 收盘价
          rawData[i].low, // 最低价
          rawData[i].high // 最高价
        ]);
      }
      return {
        categoryData: categoryData,
        values: values
      };
    },
    //计算移动平均
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += +data.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    getData() {
      //获取龙虎榜数据
      getTopList().then(res=>{
        if(res.code===200){
          console.log(res)
          this.stocks = res.response.slice(0, 10).map(item => {
            return {
              name: item.name,
              close: item.close,
              pct_change: item.pct_change
            };
          });
        }
        else{
          this.$notify.error(res.msg)
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
      //获取热门话题数据
      getMajorNews().then(res=>{
        if(res.code===200){
          console.log(res)
          this.topics = res.response.slice(0,10).map(item => {
            return item.title;
          });
          console.log(this.topics);
        }
        else{
          this.$notify.error(res.msg)
        }
      }).catch(err=>{
        //异常处理
        console.log(err)
        this.$message.error(err.data)
      })
    },
    getTopicColor(index) {
      return {
        color: index === 0
      };
    },
  },
};
</script>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
}

.left-container {
  float: left;
  width: 700px;
}

.right-container {
  float: right;
  width: 20%;
}

.container::after {
  content: "";
  display: table;
  clear: both;
}
.stock-rise {
  margin-right: 25px;
  border: 1px solid rgb(211, 211, 211);
  box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 14px;
  border-collapse: collapse;
  border-spacing: 0;

}

.stock-rise tbody tr:nth-child(odd) {
  background-color: white; /* 奇数行背景颜色为白色 */
}

.stock-rise tbody tr:nth-child(even) {
  background-color: AliceBlue ; /* 偶数行背景颜色为淡蓝色 */
}

.stock-name {
  color: DeepSkyBlue  ;
  font-weight: lighter;
  font-size: 12px;
  padding: 4px;
}

.stock-price,
.stock-change {
  color: red;
  font-weight: lighter;
  font-size: 12px;
  padding: 4px;
}

.hot-topics {
  width: 90%;
  margin-top: 20px;
  margin-left: 30px;
  padding-left:5px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgb(211, 211, 211);
  box-shadow: -2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border-top: 1px solid indianred;
}

.topics-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.topic-item {
  width: 50%;
  padding: 5px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.hot-topics ul {
  list-style-type: none;
  padding: 0;
}

.hot-topics li {
  margin-bottom: 10px;
  font-size: 14px;
  font-weight: lighter;
}

</style>