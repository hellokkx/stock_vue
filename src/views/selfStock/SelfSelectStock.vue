<template>
  <div class="self-select-stock">
    <!-- 左侧边栏 -->
    <div class="sidebar">
      <el-menu :default-active="activeIndex" style="margin: 0;padding: 0">
        <!-- 收藏夹名称 -->
        <el-menu-item index="1" style="align-items: center;border-bottom: solid 1px red">
          <span style="font-size: 16px; font-weight: bold;">BOC PAY</span>
        </el-menu-item>
        <!-- 股票列表 -->
        <el-menu-item v-for="stock in stocks" :key="stock.symbol" :index="'2-' + stock.symbol" @click="selectStock(stock)">
          {{ stock.name }}
        </el-menu-item>
      </el-menu>

    </div>
    <!-- K线图 -->
<!--    <div ref="chart" class="chart"></div>-->
    <div ref="chart" class="chart" id="chart-container"></div>
    <!-- 右侧的股票信息表格 -->
    <div class="stock-info">
      <el-descriptions title="股票信息" :data="selectedStock" :column="1"
                       size="small">
        <el-descriptions-item label="名字">{{ selectedStock.name }}</el-descriptions-item>
        <el-descriptions-item label="股票代码">
          {{ selectedStock.symbol }}
          <el-button style="height: 0; padding: 0;margin-left:2px "
                     type="text"
                     icon="el-icon-document-copy"
                     @click.stop="copyStockCode"
          ></el-button>
        </el-descriptions-item>
<!--        <el-descriptions-item label="换手率">{{ selectedStock.turnoverRate }}</el-descriptions-item>-->
<!--        <el-descriptions-item label="市盈率">{{ selectedStock.peRatio }}</el-descriptions-item>-->
<!--        <el-descriptions-item label="成交量">{{ selectedStock.volume }}</el-descriptions-item>-->
<!--        <el-descriptions-item label="总市值">{{ selectedStock.marketCap }}</el-descriptions-item>-->
<!--        <el-descriptions-item label="成交额">{{ selectedStock.turnover }}</el-descriptions-item>-->
<!--        <el-descriptions-item label="总股本">{{ selectedStock.totalShares }}</el-descriptions-item>-->
      </el-descriptions>
      <!-- 股票公告栏 -->
      <div class="announcements-container">
        <el-card class="announcement-card" v-for="announcement in announcements" :key="announcement.symbol">
          <div class="announcement-title">
            <a :href="announcement.url" target="_blank" class="announcement-link">
              {{ announcement.title }}
            </a>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {getCollectionStock, getStockAnnouncement, getStockDataBySymbol} from "@/api";
import Cookies from "js-cookie";

export default {
  name: 'Index',
  data() {
    return {
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      activeIndex: '1',
      stocks: [],
      selectedStock: {},
      chart: null,
      announcements: []
    };
  },
  created() {
    this.token =  localStorage.getItem('token')
    this.getCollectionStock()
  },
  methods: {
    getCollectionStock() {
      var collectionid= '1';
      getCollectionStock({collectionid}).then(res => {
        if(res.code === 200){
          this.stocks = res.response;
          this.selectStock(this.stocks[0]);
          console.log(this.stocks);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    selectStock(stock) {
      this.selectedStock = stock;
      console.log('stock:' + stock.symbol);
      this.getStockAnnouncements(stock.symbol);
      this.initLineChart(stock.symbol)
    },
    getStockAnnouncements(symbol) {
      console.log("symbol"+symbol)
      getStockAnnouncement({symbol}).then(res => {
        console.log(res.response)
        if (res.code === 200) {
          this.announcements = res.response;
          console.log(this.announcements);
        } else {
          console.error('获取失败:', res.msg);
        }
      }).catch(error => {
        console.error('获取股票公告失败', error);
      });
    },
    copyStockCode() {
      const symbol = this.selectedStock.symbol;
      const textarea = document.createElement('textarea');
      textarea.value = symbol;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      this.$message.success('股票代码复制成功！');
    },

    //---------------------------------LINE_CHART----------------------------------------
    initLineChart (symbol) {
      // 初始化折线图
      const chartContainer = document.getElementById('chart-container');
      const myChart = echarts.init(chartContainer);

      //请求数据
      getStockDataBySymbol({symbol}).then(res=>{
        console.log(res)
        if(res.code===200){
          console.log(res.response)

          //绘制折线图
          // 获取横坐标数据
          const xAxisData = res.response.map(item => item.tradeDate);
          // 获取系列数据
          const seriesData = res.response.map(item => [
            item.open, // 开盘价
            item.close, // 收盘价
            item.low, // 最低价
            item.high // 最高价
          ]);

          // 配置折线图的选项
          const option = {
            // title: {
            //   text: ''
            // },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['开盘价', '最高价', '最低价', '收盘价']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: xAxisData
            },
            yAxis: {
              type: 'value',
              min: 'dataMin', // 最小值为数据中的最小值
              max: 'dataMax'  // 最大值为数据中的最大值
            },

            dataZoom: [{ // 添加数据缩放功能
              type: 'inside',
              start: 0,
              end: 20,
              top:'90%',
              height:10,
            }, {
              type: 'slider',
              show: true,
              start: 0,
              end: 50,
              top:'90%',
              height:10,
            }],
            series: [
              {
                name: '开盘价',
                type: 'line',
                data: seriesData.map(item => item[0]),
                itemStyle: {
                  color: '#162a55' // 修改为你想要的颜色
                }
              },
              {
                name: '收盘价',
                type: 'line',
                data: seriesData.map(item => item[1]),
                itemStyle: {
                  color: '#e8a215' // 修改为你想要的颜色
                }
              },
              {
                name: '最低价',
                type: 'line',
                data: seriesData.map(item => item[2]),
                itemStyle: {
                  color: '#05857d' // 修改为你想要的颜色
                }
              },
              {
                name: '最高价',
                type: 'line',
                data: seriesData.map(item => item[3]),
                itemStyle: {
                  color: '#a8000b' // 修改为你想要的颜色
                }
              }
            ]

          };

          // 使用配置项渲染折线图
          myChart.setOption(option);

          //获取评分数据
          // 解析后端返回的 JSON 数据中的 response 字段
          var responseArray = res.response;

          // 初始化 turnover_rate 总和为 0
          let totalTurnoverRate = 0;
          let totalPe = 0;
          let Total_mv = 0;
          let totalpct_chg = 0;

          // 遍历所有对象，计算 turnover_rate 的总和
          responseArray.forEach(obj => {
            totalTurnoverRate += obj.turnover_rate;
            totalPe += obj.pe;
            Total_mv += obj.total_mv;
            totalpct_chg += obj.pctChg;
          });

          // 计算平均值
          const averageTurnoverRate = totalTurnoverRate / responseArray.length;
          const averagePe = totalPe / responseArray.length;
          const averagemv = Total_mv / responseArray.length;
          const averagepct_chg = totalpct_chg / responseArray.length;
          console.log("平均 turnover_rate:", averageTurnoverRate);
          this.statisticvalue1=averageTurnoverRate
          this.statisticvalue2=averagePe
          this.statisticvalue3=averagemv
          this.statisticvalue4=averagepct_chg


        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },
  },
};
</script>

<style scoped>
.self-select-stock {
  display: flex;
  justify-content: flex-start;
}

.sidebar {
  width: 10%;
  box-sizing: border-box;
  margin-left: 0;
  padding-left: 0;
}

.chart {
  flex-grow: 1;
  height: 400px;
}

.stock-info {
  flex: 0 0 15%;
}

/deep/ .el-menu-item {
  height: 30px;
  line-height: 30px; /* 调整行高以改变文字垂直居中问题 */
}

</style>