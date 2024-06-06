<template>
  <div class="container">
    <!-- 左边占 70% -->
    <div class="left-block">
      <!-- 纵向布局 -->
      <div class="vertical-layout">
        <!-- 第一个部分 -->
        <div class="section section1">
          <div class="input-group">
            <h3>基本情况</h3>
            <el-input v-model="symbol" placeholder="请输入代码" style="width: 350px;margin-right: 20px;"></el-input>
            <!--            <el-select v-model="model" placeholder="选择模型" style="width: 230px;margin-right: 10px;">-->
            <!--              <el-option-->
            <!--                  v-for="item in modelOptions"-->
            <!--                  :key="item.value"-->
            <!--                  :label="item.label"-->
            <!--                  :value="item.value"-->
            <!--              ></el-option>-->
            <!--            </el-select>-->
            <el-button type="primary" @click="showBasicInfo">基本情况</el-button>
            <!--            <el-button type="primary" @click="predict">点击预测</el-button>-->
          </div>
        </div>

        <!-- 第二个部分 -->
        <div class="section section2">
          <div v-if="showLine" id="chart-container" style="height: 350px;"></div>
          <div v-if="showKLine" id="chart-container2" style="height: 350px;"></div>
        </div>
        <!-- 第三个部分 -->
        <div class="section3">
          <!--          <div v-if="showLine" id="chart-container3" style="height: 350px;"></div>-->
          <div id="chart-container3" style="height: 220px"></div>
        </div>
      </div>
    </div>
    <!-- 右边占 30% -->
    <div class="right-block">
      <!-- 纵向布局 -->
      <div class="vertical-layout">

        <!-- 第0个部分 -->
        <div class="section right-section0">
          <el-p><strong>{{ statement }}</strong></el-p>
        </div>

        <!-- 第一个部分 -->
        <div class="section right-section1">
          <el-p><strong>资金综合评价：</strong>{{ evaluation1 }}</el-p>
          <el-rate v-model="ratevalue1" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue1" :title="title1" style="margin-top: 5px"></el-statistic>

        </div>

        <!-- 第二个部分 -->
        <div class="section right-section2">
          <el-p><strong>估值综合评价：</strong>{{ evaluation2 }}</el-p>
          <el-rate v-model="ratevalue2" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue2" :title="title2" style="margin-top: 5px"></el-statistic>
        </div>

        <!-- 第三个部分 -->
        <div class="section right-section3">
          <el-p><strong>财务综合评价：</strong>{{ evaluation3 }}</el-p>
          <el-rate v-model="ratevalue3" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue3" :title="title3" style="margin-top: 5px"></el-statistic>


        </div>

        <!-- 第四个部分 -->
        <div class="section right-section4">
          <el-p><strong>技术综合评价：</strong>{{ evaluation4 }}</el-p>
          <el-rate v-model="ratevalue4" disabled show-score text-color="#ff9900" score-template="{value}" :colors="colors" style="margin-top: 5px;"></el-rate>
          <el-statistic group-separator="," :precision="2" :value="statisticvalue4" :title="title4" style="margin-top: 5px"></el-statistic>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {getStockDataBySymbol} from "@/api"

export default {
  data() {
    return {
      showLine:true,
      showKLine:false,
      statement:'相关建议',
      ratevalue1:0,
      ratevalue2:0,
      ratevalue3:0,
      ratevalue4:0,
      statisticvalue1:0,
      statisticvalue2:0,
      statisticvalue3:0,
      statisticvalue4:0,
      evaluation1:'',
      evaluation2:'',
      evaluation3:'',
      evaluation4:'',
      title1:'换手率',
      title2:'市盈率',
      title3:'市值',
      title4:'涨跌幅',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      symbol: '',
      // model: '',
      // modelOptions: [
      //   { label: '模型1', value: 'model1' },
      //   { label: '模型2', value: 'model2' },
      //   { label: '模型3', value: 'model3' }
      // ],
      response: []
      // 存储后台返回的数据
    };
  },
  methods: {
    showBasicInfo() {
      console.log('显示基本情况');
      this.showLine=true;
      this.showKLine=false;
      // 执行显示基本情况的逻辑
      this.initLineChart();
      this.initRadarChart();
    },

    initRadarChart(){
      var chartDom3 = document.getElementById('chart-container3');
      var myChart3 = echarts.init(chartDom3);
      var option3;

      option3 = {
        title: {
          text: '综合判断'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '资金', max: 6500 },
            { name: '技术', max: 16000 },
            { name: '估值', max: 30000 },
            { name: '财务', max: 38000 },
          ]
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [4200, 3000, 20000, 35000],
              },
            ]
          }
        ]
      };

      myChart3.setOption(option3);
    },

    initLineChart() {
      // 初始化折线图
      const chartContainer = document.getElementById('chart-container');
      const myChart = echarts.init(chartContainer);
      var symbol=this.symbol
      console.log(symbol)

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
              end: 50,
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
                data: seriesData.map(item => item[0])
              },
              {
                name: '收盘价',
                type: 'line',
                data: seriesData.map(item => item[1])
              },
              {
                name: '最低价',
                type: 'line',
                data: seriesData.map(item => item[2])
              },
              {
                name: '最高价',
                type: 'line',
                data: seriesData.map(item => item[3])
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

          //换手率
          if(averageTurnoverRate<=0.4){
            this.evaluation1='强度很低'
            this.ratevalue1=1
          }
          else if(averageTurnoverRate<=0.8){
            this.evaluation1='强度低'
            this.ratevalue1=2
          }
          else if(averageTurnoverRate<=1.6){
            this.evaluation1='强度中等'
            this.ratevalue1=3
          }
          else if(averageTurnoverRate<=1.8){
            this.evaluation1='强度高'
            this.ratevalue1=4
          }
          else{
            this.evaluation1='强度很高'
            this.ratevalue1=5
          }


          //市盈率
          if(averagePe<=5){
            this.evaluation2='价值低'
            this.ratevalue2=1
          }
          else if(averagePe<=10){
            this.evaluation2='价值较低'
            this.ratevalue2=2
          }
          else if(averagePe<=15){
            this.evaluation2='价值中等'
            this.ratevalue2=3
          }
          else if(averagePe<=20){
            this.evaluation2='价值较高'
            this.ratevalue2=4
          }
          else{
            this.evaluation2='价值高'
            this.ratevalue2=5
          }

          //市值
          if(averagemv<=5){
            this.ratevalue3=1
          }
          else if(averagemv<=10){
            this.ratevalue3=2
          }
          else if(averagemv<=15){
            this.ratevalue3=3
          }
          else if(averagemv<=20){
            this.ratevalue3=4
          }
          else{
            this.ratevalue3=5
          }
          this.evaluation3=this.ratevalue3

          //涨跌幅
          if(averagepct_chg<=0){
            this.evaluation4='很差'
            this.ratevalue4=1
          }
          else if(averagepct_chg<=5){
            this.evaluation4='差'
            this.ratevalue4=2
          }
          else if(averagepct_chg<=10){
            this.evaluation4='中等'
            this.ratevalue4=3
          }
          else if(averagepct_chg<=15){
            this.evaluation4='好'
            this.ratevalue4=4
          }
          else{
            this.evaluation4='很好'
            this.ratevalue4=5
          }

          //建议
          var sum= this.ratevalue1+this.ratevalue2+this.ratevalue3+this.ratevalue4
          if(sum<=6){
            this.statement='建议减持'
          }
          else if(sum<=12){
            this.statement='建议观望'
          }
          else{
            this.statement='建议增持'
          }

        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },

    //点击预测按钮
    predict() {
      // 进行预测的逻辑
      console.log('进行预测');
      this.showLine=false;
      this.showKLine=true;
      // 初始化 K 线图
      this.initKLineChart();

    },


    initKLineChart() {
      const chartContainer2 = document.getElementById('chart-container2');
      const myChart2 = echarts.init(chartContainer2);
      const upColor = '#ec0000';
      const upBorderColor = '#8A0000';
      const downColor = '#00da3c';
      const downBorderColor = '#008F28';
      const rawData=[
        {
          "close": 10.19,
          "high": 10.15,
          "low": 10.1,
          "open": 10.15,
          "tradeDate": "2023-11-20"
        },
        {
          "close": 10.28,
          "high": 10.23,
          "low": 10.22,
          "open": 10.23,
          "tradeDate": "2023-11-21"
        },
        {
          "close": 10.16,
          "high": 10.26,
          "low": 10.14,
          "open": 10.26,
          "tradeDate": "2023-11-22"
        },
        {
          "close": 10.15,
          "high": 10.15,
          "low": 10.07,
          "open": 10.15,
          "tradeDate": "2023-11-23"
        },
        {
          "close": 10.1,
          "high": 10.11,
          "low": 10.08,
          "open": 10.11,
          "tradeDate": "2023-11-24"
        },
        {
          "close": 10.01,
          "high": 10.09,
          "low": 9.97,
          "open": 10.09,
          "tradeDate": "2023-11-27"
        },
        {
          "close": 9.95,
          "high": 9.99,
          "low": 9.95,
          "open": 9.99,
          "tradeDate": "2023-11-28"
        },
        {
          "close": 9.72,
          "high": 9.95,
          "low": 9.7,
          "open": 9.95,
          "tradeDate": "2023-11-29"
        },
        {
          "close": 9.68,
          "high": 9.69,
          "low": 9.62,
          "open": 9.69,
          "tradeDate": "2023-11-30"
        },
        {
          "close": 9.66,
          "high": 9.65,
          "low": 9.58,
          "open": 9.65,
          "tradeDate": "2023-12-01"
        },
        {
          "close": 9.63,
          "high": 9.67,
          "low": 9.61,
          "open": 9.67,
          "tradeDate": "2023-12-04"
        },
        {
          "close": 9.48,
          "high": 9.61,
          "low": 9.47,
          "open": 9.61,
          "tradeDate": "2023-12-05"
        },
        {
          "close": 9.5,
          "high": 9.44,
          "low": 9.4,
          "open": 9.44,
          "tradeDate": "2023-12-06"
        },
        {
          "close": 9.44,
          "high": 9.49,
          "low": 9.38,
          "open": 9.49,
          "tradeDate": "2023-12-07"
        },
        {
          "close": 9.3,
          "high": 9.41,
          "low": 9.3,
          "open": 9.41,
          "tradeDate": "2023-12-08"
        },
        {
          "close": 9.35,
          "high": 9.22,
          "low": 9.13,
          "open": 9.22,
          "tradeDate": "2023-12-11"
        },
        {
          "close": 9.42,
          "high": 9.31,
          "low": 9.3,
          "open": 9.31,
          "tradeDate": "2023-12-12"
        },
        {
          "close": 9.16,
          "high": 9.38,
          "low": 9.15,
          "open": 9.38,
          "tradeDate": "2023-12-13"
        },
        {
          "close": 9.15,
          "high": 9.21,
          "low": 9.15,
          "open": 9.21,
          "tradeDate": "2023-12-14"
        },
        {
          "close": 9.21,
          "high": 9.2,
          "low": 9.19,
          "open": 9.2,
          "tradeDate": "2023-12-15"
        },
        {
          "close": 9.13,
          "high": 9.18,
          "low": 9.09,
          "open": 9.18,
          "tradeDate": "2023-12-18"
        },
        {
          "close": 9.1,
          "high": 9.12,
          "low": 9.07,
          "open": 9.12,
          "tradeDate": "2023-12-19"
        },
        {
          "close": 9.03,
          "high": 9.11,
          "low": 9.03,
          "open": 9.11,
          "tradeDate": "2023-12-20"
        },
        {
          "close": 9.17,
          "high": 9.01,
          "low": 8.99,
          "open": 9.01,
          "tradeDate": "2023-12-21"
        },
        {
          "close": 9.2,
          "high": 9.19,
          "low": 9.11,
          "open": 9.19,
          "tradeDate": "2023-12-22"
        },
        {
          "close": 9.19,
          "high": 9.18,
          "low": 9.14,
          "open": 9.18,
          "tradeDate": "2023-12-25"
        },
        {
          "close": 9.1,
          "high": 9.19,
          "low": 9.07,
          "open": 9.19,
          "tradeDate": "2023-12-26"
        },
        {
          "close": 9.12,
          "high": 9.1,
          "low": 9.02,
          "open": 9.1,
          "tradeDate": "2023-12-27"
        },
        {
          "close": 9.45,
          "high": 9.11,
          "low": 9.08,
          "open": 9.11,
          "tradeDate": "2023-12-28"
        },
        {
          "close": 9.39,
          "high": 9.42,
          "low": 9.35,
          "open": 9.42,
          "tradeDate": "2023-12-29"
        },
        {
          "close": 9.21,
          "high": 9.39,
          "low": 9.21,
          "open": 9.39,
          "tradeDate": "2024-01-02"
        },
        {
          "close": 9.2,
          "high": 9.19,
          "low": 9.15,
          "open": 9.19,
          "tradeDate": "2024-01-03"
        },
        {
          "close": 9.11,
          "high": 9.19,
          "low": 9.08,
          "open": 9.19,
          "tradeDate": "2024-01-04"
        },
        {
          "close": 9.27,
          "high": 9.1,
          "low": 9.07,
          "open": 9.1,
          "tradeDate": "2024-01-05"
        },
        {
          "close": 9.15,
          "high": 9.23,
          "low": 9.11,
          "open": 9.23,
          "tradeDate": "2024-01-08"
        },
        {
          "close": 9.18,
          "high": 9.16,
          "low": 9.09,
          "open": 9.16,
          "tradeDate": "2024-01-09"
        },
        {
          "close": 9.09,
          "high": 9.16,
          "low": 9.09,
          "open": 9.16,
          "tradeDate": "2024-01-10"
        },
        {
          "close": 9.17,
          "high": 9.08,
          "low": 9.03,
          "open": 9.08,
          "tradeDate": "2024-01-11"
        },
        {
          "close": 9.19,
          "high": 9.13,
          "low": 9.11,
          "open": 9.13,
          "tradeDate": "2024-01-12"
        },
        {
          "close": 9.21,
          "high": 9.16,
          "low": 9.13,
          "open": 9.16,
          "tradeDate": "2024-01-15"
        },
        {
          "close": 9.34,
          "high": 9.19,
          "low": 9.16,
          "open": 9.19,
          "tradeDate": "2024-01-16"
        },
        {
          "close": 9.23,
          "high": 9.33,
          "low": 9.23,
          "open": 9.33,
          "tradeDate": "2024-01-17"
        },
        {
          "close": 9.2,
          "high": 9.21,
          "low": 9.0,
          "open": 9.21,
          "tradeDate": "2024-01-18"
        },
        {
          "close": 9.17,
          "high": 9.16,
          "low": 9.1,
          "open": 9.16,
          "tradeDate": "2024-01-19"
        },
        {
          "close": 9.1,
          "high": 9.16,
          "low": 9.04,
          "open": 9.16,
          "tradeDate": "2024-01-22"
        },
        {
          "close": 9.16,
          "high": 9.05,
          "low": 8.96,
          "open": 9.05,
          "tradeDate": "2024-01-23"
        },
        {
          "close": 9.33,
          "high": 9.23,
          "low": 9.07,
          "open": 9.23,
          "tradeDate": "2024-01-24"
        },
        {
          "close": 9.5,
          "high": 9.33,
          "low": 9.27,
          "open": 9.33,
          "tradeDate": "2024-01-25"
        },
        {
          "close": 9.62,
          "high": 9.47,
          "low": 9.44,
          "open": 9.47,
          "tradeDate": "2024-01-26"
        },
        {
          "close": 9.7,
          "high": 9.69,
          "low": 9.58,
          "open": 9.69,
          "tradeDate": "2024-01-29"
        },
        {
          "close": 9.5,
          "high": 9.61,
          "low": 9.49,
          "open": 9.61,
          "tradeDate": "2024-01-30"
        },
        {
          "close": 9.46,
          "high": 9.46,
          "low": 9.38,
          "open": 9.46,
          "tradeDate": "2024-01-31"
        },
        {
          "close": 9.41,
          "high": 9.41,
          "low": 9.34,
          "open": 9.41,
          "tradeDate": "2024-02-01"
        },
        {
          "close": 9.27,
          "high": 9.42,
          "low": 9.07,
          "open": 9.42,
          "tradeDate": "2024-02-02"
        },
        {
          "close": 9.38,
          "high": 9.19,
          "low": 9.11,
          "open": 9.19,
          "tradeDate": "2024-02-05"
        },
        {
          "close": 9.68,
          "high": 9.3,
          "low": 9.29,
          "open": 9.3,
          "tradeDate": "2024-02-06"
        },
        {
          "close": 9.61,
          "high": 9.62,
          "low": 9.48,
          "open": 9.62,
          "tradeDate": "2024-02-07"
        },
        {
          "close": 9.67,
          "high": 9.58,
          "low": 9.52,
          "open": 9.58,
          "tradeDate": "2024-02-08"
        },
        {
          "close": 9.81,
          "high": 9.76,
          "low": 9.65,
          "open": 9.76,
          "tradeDate": "2024-02-19"
        },
        {
          "close": 9.82,
          "high": 9.79,
          "low": 9.73,
          "open": 9.79,
          "tradeDate": "2024-02-20"
        },
        {
          "close": 10.8,
          "high": 9.78,
          "low": 9.77,
          "open": 9.78,
          "tradeDate": "2024-02-21"
        },
        {
          "close": 10.9,
          "high": 10.65,
          "low": 10.62,
          "open": 10.65,
          "tradeDate": "2024-02-22"
        },
        {
          "close": 10.85,
          "high": 10.88,
          "low": 10.84,
          "open": 10.88,
          "tradeDate": "2024-02-23"
        },
        {
          "close": 10.53,
          "high": 10.78,
          "low": 10.5,
          "open": 10.78,
          "tradeDate": "2024-02-26"
        },
        {
          "close": 10.5,
          "high": 10.49,
          "low": 10.46,
          "open": 10.49,
          "tradeDate": "2024-02-27"
        },
        {
          "close": 10.49,
          "high": 10.51,
          "low": 10.4,
          "open": 10.51,
          "tradeDate": "2024-02-28"
        },
        {
          "close": 10.59,
          "high": 10.42,
          "low": 10.41,
          "open": 10.42,
          "tradeDate": "2024-02-29"
        },
        {
          "close": 10.49,
          "high": 10.59,
          "low": 10.43,
          "open": 10.59,
          "tradeDate": "2024-03-01"
        },
        {
          "close": 10.33,
          "high": 10.45,
          "low": 10.32,
          "open": 10.45,
          "tradeDate": "2024-03-04"
        },
        {
          "close": 10.43,
          "high": 10.3,
          "low": 10.26,
          "open": 10.3,
          "tradeDate": "2024-03-05"
        },
        {
          "close": 10.33,
          "high": 10.4,
          "low": 10.33,
          "open": 10.4,
          "tradeDate": "2024-03-06"
        },
        {
          "close": 10.38,
          "high": 10.33,
          "low": 10.33,
          "open": 10.33,
          "tradeDate": "2024-03-07"
        },
        {
          "close": 10.38,
          "high": 10.35,
          "low": 10.3,
          "open": 10.35,
          "tradeDate": "2024-03-08"
        },
        {
          "close": 10.47,
          "high": 10.38,
          "low": 10.34,
          "open": 10.38,
          "tradeDate": "2024-03-11"
        },
        {
          "close": 10.56,
          "high": 10.48,
          "low": 10.41,
          "open": 10.48,
          "tradeDate": "2024-03-12"
        },
        {
          "close": 10.33,
          "high": 10.53,
          "low": 10.3,
          "open": 10.53,
          "tradeDate": "2024-03-13"
        },
        {
          "close": 10.23,
          "high": 10.3,
          "low": 10.2,
          "open": 10.3,
          "tradeDate": "2024-03-14"
        },
        {
          "close": 10.6,
          "high": 10.55,
          "low": 10.5,
          "open": 10.55,
          "tradeDate": "2024-03-15"
        },
        {
          "close": 10.54,
          "high": 10.56,
          "low": 10.49,
          "open": 10.56,
          "tradeDate": "2024-03-18"
        },
        {
          "close": 10.4,
          "high": 10.53,
          "low": 10.39,
          "open": 10.53,
          "tradeDate": "2024-03-19"
        },
        {
          "close": 10.45,
          "high": 10.38,
          "low": 10.37,
          "open": 10.38,
          "tradeDate": "2024-03-20"
        },
        {
          "close": 10.47,
          "high": 10.45,
          "low": 10.42,
          "open": 10.45,
          "tradeDate": "2024-03-21"
        },
        {
          "close": 10.36,
          "high": 10.45,
          "low": 10.31,
          "open": 10.45,
          "tradeDate": "2024-03-22"
        },
        {
          "close": 10.4,
          "high": 10.35,
          "low": 10.32,
          "open": 10.35,
          "tradeDate": "2024-03-25"
        },
        {
          "close": 10.6,
          "high": 10.45,
          "low": 10.42,
          "open": 10.45,
          "tradeDate": "2024-03-26"
        },
        {
          "close": 10.53,
          "high": 10.56,
          "low": 10.51,
          "open": 10.56,
          "tradeDate": "2024-03-27"
        },
        {
          "close": 10.49,
          "high": 10.51,
          "low": 10.38,
          "open": 10.51,
          "tradeDate": "2024-03-28"
        },
        {
          "close": 10.52,
          "high": 10.45,
          "low": 10.43,
          "open": 10.45,
          "tradeDate": "2024-03-29"
        },
        {
          "close": 10.64,
          "high": 10.52,
          "low": 10.51,
          "open": 10.52,
          "tradeDate": "2024-04-01"
        },
        {
          "close": 10.55,
          "high": 10.63,
          "low": 10.53,
          "open": 10.63,
          "tradeDate": "2024-04-02"
        },
        {
          "close": 10.46,
          "high": 10.53,
          "low": 10.42,
          "open": 10.53,
          "tradeDate": "2024-04-03"
        },
        {
          "close": 10.43,
          "high": 10.42,
          "low": 10.37,
          "open": 10.42,
          "tradeDate": "2024-04-08"
        },
        {
          "close": 10.4,
          "high": 10.43,
          "low": 10.36,
          "open": 10.43,
          "tradeDate": "2024-04-09"
        },
        {
          "close": 10.28,
          "high": 10.38,
          "low": 10.27,
          "open": 10.38,
          "tradeDate": "2024-04-10"
        },
        {
          "close": 10.25,
          "high": 10.24,
          "low": 10.12,
          "open": 10.24,
          "tradeDate": "2024-04-11"
        },
        {
          "close": 10.06,
          "high": 10.22,
          "low": 10.04,
          "open": 10.22,
          "tradeDate": "2024-04-12"
        },
        {
          "close": 10.29,
          "high": 10.07,
          "low": 10.06,
          "open": 10.07,
          "tradeDate": "2024-04-15"
        },
        {
          "close": 10.28,
          "high": 10.28,
          "low": 10.22,
          "open": 10.28,
          "tradeDate": "2024-04-16"
        },
        {
          "close": 10.62,
          "high": 10.26,
          "low": 10.21,
          "open": 10.26,
          "tradeDate": "2024-04-17"
        },
        {
          "close": 10.8,
          "high": 10.58,
          "low": 10.56,
          "open": 10.58,
          "tradeDate": "2024-04-18"
        },
        {
          "close": 10.69,
          "high": 10.71,
          "low": 10.66,
          "open": 10.71,
          "tradeDate": "2024-04-19"
        },
        {
          "close": 10.5,
          "high": 10.64,
          "low": 10.45,
          "open": 10.64,
          "tradeDate": "2024-04-22"
        },
        {
          "close": 10.54,
          "high": 10.51,
          "low": 10.46,
          "open": 10.51,
          "tradeDate": "2024-04-23"
        },
        {
          "close": 10.53,
          "high": 10.52,
          "low": 10.46,
          "open": 10.52,
          "tradeDate": "2024-04-24"
        },
        {
          "close": 10.61,
          "high": 10.5,
          "low": 10.48,
          "open": 10.5,
          "tradeDate": "2024-04-25"
        },
        {
          "close": 10.6,
          "high": 10.59,
          "low": 10.48,
          "open": 10.59,
          "tradeDate": "2024-04-26"
        },
        {
          "close": 10.81,
          "high": 10.56,
          "low": 10.52,
          "open": 10.56,
          "tradeDate": "2024-04-29"
        },
        {
          "close": 10.79,
          "high": 10.8,
          "low": 10.73,
          "open": 10.8,
          "tradeDate": "2024-04-30"
        },
        {
          "close": 10.89,
          "high": 10.96,
          "low": 10.84,
          "open": 10.96,
          "tradeDate": "2024-05-06"
        },
        {
          "close": 10.88,
          "high": 10.87,
          "low": 10.76,
          "open": 10.87,
          "tradeDate": "2024-05-07"
        },
        {
          "close": 10.73,
          "high": 10.84,
          "low": 10.71,
          "open": 10.84,
          "tradeDate": "2024-05-08"
        },
        {
          "close": 10.76,
          "high": 10.71,
          "low": 10.71,
          "open": 10.71,
          "tradeDate": "2024-05-09"
        },
        {
          "close": 10.94,
          "high": 10.77,
          "low": 10.76,
          "open": 10.77,
          "tradeDate": "2024-05-10"
        },
        {
          "close": 10.97,
          "high": 10.9,
          "low": 10.81,
          "open": 10.9,
          "tradeDate": "2024-05-13"
        },
        {
          "close": 10.91,
          "high": 11.0,
          "low": 10.88,
          "open": 11.0,
          "tradeDate": "2024-05-14"
        },
        {
          "close": 10.83,
          "high": 10.9,
          "low": 10.81,
          "open": 10.9,
          "tradeDate": "2024-05-15"
        },
        {
          "close": 11.17,
          "high": 10.85,
          "low": 10.83,
          "open": 10.85,
          "tradeDate": "2024-05-16"
        },
        {
          "close": 11.42,
          "high": 11.18,
          "low": 11.13,
          "open": 11.18,
          "tradeDate": "2024-05-17"
        },
        {
          "close": 10.347528457641602,
          "high": 10.722537994384766,
          "low": 9.80942153930664,
          "open": 10.608260154724121,
          "tradeDate": "2024-05-17"
        },
        {
          "close": 9.418842315673828,
          "high": 9.564557075500488,
          "low": 9.83443832397461,
          "open": 9.473048210144043,
          "tradeDate": "2024-05-18"
        },
        {
          "close": 9.770512580871582,
          "high": 9.870448112487793,
          "low": 10.192225456237793,
          "open": 9.742644309997559,
          "tradeDate": "2024-05-19"
        },
        {
          "close": 9.66156005859375,
          "high": 9.320693969726562,
          "low": 10.53893756866455,
          "open": 9.440893173217773,
          "tradeDate": "2024-05-20"
        },
        {
          "close": 9.989450454711914,
          "high": 10.05319595336914,
          "low": 9.963583946228027,
          "open": 10.282246589660645,
          "tradeDate": "2024-05-21"
        },
        {
          "close": 10.122386932373047,
          "high": 10.276298522949219,
          "low": 9.181052207946777,
          "open": 10.506187438964844,
          "tradeDate": "2024-05-22"
        },
        {
          "close": 9.650490760803223,
          "high": 9.719793319702148,
          "low": 9.865714073181152,
          "open": 9.51169204711914,
          "tradeDate": "2024-05-23"
        },
        {
          "close": 9.440484046936035,
          "high": 9.493138313293457,
          "low": 10.137826919555664,
          "open": 9.60489559173584,
          "tradeDate": "2024-05-24"
        },
        {
          "close": 10.600258827209473,
          "high": 10.57246208190918,
          "low": 9.849289894104004,
          "open": 10.093379974365234,
          "tradeDate": "2024-05-25"
        },
        {
          "close": 10.203163146972656,
          "high": 10.463747024536133,
          "low": 9.513803482055664,
          "open": 10.117884635925293,
          "tradeDate": "2024-05-26"
        },
        {
          "close": 10.588818550109863,
          "high": 11.067228317260742,
          "low": 9.708891868591309,
          "open": 10.810323715209961,
          "tradeDate": "2024-05-27"
        },
        {
          "close": 10.374187469482422,
          "high": 10.532516479492188,
          "low": 10.2979097366333,
          "open": 9.805244445800781,
          "tradeDate": "2024-05-28"
        },
        {
          "close": 10.104720115661621,
          "high": 10.162446975708008,
          "low": 10.061197280883789,
          "open": 10.006599426269531,
          "tradeDate": "2024-05-29"
        },
        {
          "close": 10.340387344360352,
          "high": 10.474507331848145,
          "low": 10.508952140808105,
          "open": 9.485934257507324,
          "tradeDate": "2024-05-30"
        },
        {
          "close": 10.424543380737305,
          "high": 10.370497703552246,
          "low": 10.088543891906738,
          "open": 9.595953941345215,
          "tradeDate": "2024-05-31"
        },
        {
          "close": 10.290007591247559,
          "high": 10.428032875061035,
          "low": 10.440226554870605,
          "open": 9.735239028930664,
          "tradeDate": "2024-06-01"
        },
        {
          "close": 9.287757873535156,
          "high": 9.377493858337402,
          "low": 8.93619441986084,
          "open": 9.823907852172852,
          "tradeDate": "2024-06-02"
        },
        {
          "close": 9.892189979553223,
          "high": 10.14389705657959,
          "low": 9.998353958129883,
          "open": 10.505615234375,
          "tradeDate": "2024-06-03"
        },
        {
          "close": 10.06346321105957,
          "high": 10.241355895996094,
          "low": 10.466690063476562,
          "open": 9.907407760620117,
          "tradeDate": "2024-06-04"
        },
        {
          "close": 9.437606811523438,
          "high": 9.505117416381836,
          "low": 9.339468002319336,
          "open": 10.196632385253906,
          "tradeDate": "2024-06-05"
        },
        {
          "close": 10.097249031066895,
          "high": 10.34665584564209,
          "low": 9.810873985290527,
          "open": 9.738755226135254,
          "tradeDate": "2024-06-06"
        },
        {
          "close": 10.112998008728027,
          "high": 10.029386520385742,
          "low": 9.799482345581055,
          "open": 9.469178199768066,
          "tradeDate": "2024-06-07"
        },
        {
          "close": 9.92668628692627,
          "high": 9.983674049377441,
          "low": 10.41728401184082,
          "open": 9.930644989013672,
          "tradeDate": "2024-06-08"
        },
        {
          "close": 10.789060592651367,
          "high": 10.809569358825684,
          "low": 10.15259075164795,
          "open": 10.785629272460938,
          "tradeDate": "2024-06-09"
        },
        {
          "close": 10.484731674194336,
          "high": 10.406472206115723,
          "low": 9.586722373962402,
          "open": 10.432074546813965,
          "tradeDate": "2024-06-10"
        },
        {
          "close": 9.620827674865723,
          "high": 9.578241348266602,
          "low": 9.677919387817383,
          "open": 9.995853424072266,
          "tradeDate": "2024-06-11"
        },
        {
          "close": 10.125947952270508,
          "high": 10.082987785339355,
          "low": 9.673564910888672,
          "open": 10.510499954223633,
          "tradeDate": "2024-06-12"
        },
        {
          "close": 10.573573112487793,
          "high": 10.508822441101074,
          "low": 8.960262298583984,
          "open": 10.125039100646973,
          "tradeDate": "2024-06-13"
        },
        {
          "close": 9.694647789001465,
          "high": 9.985814094543457,
          "low": 9.816727638244629,
          "open": 9.78118896484375,
          "tradeDate": "2024-06-14"
        },
        {
          "close": 9.080002784729004,
          "high": 9.175006866455078,
          "low": 9.590008735656738,
          "open": 9.824504852294922,
          "tradeDate": "2024-06-15"
        },
        {
          "close": 10.187793731689453,
          "high": 10.038483619689941,
          "low": 10.262001037597656,
          "open": 10.35668659210205,
          "tradeDate": "2024-06-16"
        },
        {
          "close": 9.821773529052734,
          "high": 9.718276977539062,
          "low": 10.124107360839844,
          "open": 9.97234058380127,
          "tradeDate": "2024-06-17"
        },
        {
          "close": 10.255022048950195,
          "high": 10.149275779724121,
          "low": 9.707587242126465,
          "open": 10.35758113861084,
          "tradeDate": "2024-06-18"
        },
        {
          "close": 10.348983764648438,
          "high": 9.966780662536621,
          "low": 10.276467323303223,
          "open": 9.519956588745117,
          "tradeDate": "2024-06-19"
        },
        {
          "close": 10.437392234802246,
          "high": 10.371036529541016,
          "low": 9.544331550598145,
          "open": 10.842168807983398,
          "tradeDate": "2024-06-20"
        },
        {
          "close": 8.890693664550781,
          "high": 8.825593948364258,
          "low": 10.012430191040039,
          "open": 9.67537784576416,
          "tradeDate": "2024-06-21"
        },
        {
          "close": 10.070005416870117,
          "high": 10.137983322143555,
          "low": 9.60770034790039,
          "open": 9.996915817260742,
          "tradeDate": "2024-06-22"
        },
        {
          "close": 9.303540229797363,
          "high": 9.872987747192383,
          "low": 9.854077339172363,
          "open": 9.689774513244629,
          "tradeDate": "2024-06-23"
        },
        {
          "close": 10.649362564086914,
          "high": 10.89551067352295,
          "low": 10.016334533691406,
          "open": 10.383878707885742,
          "tradeDate": "2024-06-24"
        },
        {
          "close": 9.749184608459473,
          "high": 10.037908554077148,
          "low": 9.768333435058594,
          "open": 10.197857856750488,
          "tradeDate": "2024-06-25"
        },
        {
          "close": 9.600427627563477,
          "high": 10.026041030883789,
          "low": 9.864656448364258,
          "open": 9.606956481933594,
          "tradeDate": "2024-06-26"
        },
        {
          "close": 10.34044361114502,
          "high": 10.323809623718262,
          "low": 9.994292259216309,
          "open": 10.428204536437988,
          "tradeDate": "2024-06-27"
        },
        {
          "close": 10.686102867126465,
          "high": 10.853372573852539,
          "low": 9.511719703674316,
          "open": 10.650843620300293,
          "tradeDate": "2024-06-28"
        },
        {
          "close": 10.435032844543457,
          "high": 10.212183952331543,
          "low": 11.061362266540527,
          "open": 9.175880432128906,
          "tradeDate": "2024-06-29"
        },
        {
          "close": 9.835762023925781,
          "high": 9.981118202209473,
          "low": 9.738276481628418,
          "open": 9.792342185974121,
          "tradeDate": "2024-06-30"
        },
        {
          "close": 9.813870429992676,
          "high": 10.094347953796387,
          "low": 9.816190719604492,
          "open": 9.957982063293457,
          "tradeDate": "2024-07-01"
        },
        {
          "close": 10.471711158752441,
          "high": 10.474347114562988,
          "low": 8.56501579284668,
          "open": 10.418542861938477,
          "tradeDate": "2024-07-02"
        },
        {
          "close": 10.006319046020508,
          "high": 10.193001747131348,
          "low": 9.51639175415039,
          "open": 10.286212921142578,
          "tradeDate": "2024-07-03"
        },
        {
          "close": 9.164131164550781,
          "high": 9.619959831237793,
          "low": 9.709423065185547,
          "open": 9.731160163879395,
          "tradeDate": "2024-07-04"
        },
        {
          "close": 9.65346908569336,
          "high": 10.043649673461914,
          "low": 9.735013961791992,
          "open": 9.829339981079102,
          "tradeDate": "2024-07-05"
        },
        {
          "close": 9.736445426940918,
          "high": 9.97503662109375,
          "low": 10.267547607421875,
          "open": 9.942713737487793,
          "tradeDate": "2024-07-06"
        },
        {
          "close": 10.575733184814453,
          "high": 10.68928337097168,
          "low": 10.152827262878418,
          "open": 9.751675605773926,
          "tradeDate": "2024-07-07"
        },
        {
          "close": 9.94757080078125,
          "high": 9.984728813171387,
          "low": 9.97301197052002,
          "open": 9.646515846252441,
          "tradeDate": "2024-07-08"
        },
        {
          "close": 9.977437019348145,
          "high": 9.815732955932617,
          "low": 10.803023338317871,
          "open": 9.997496604919434,
          "tradeDate": "2024-07-09"
        },
        {
          "close": 9.839390754699707,
          "high": 10.054581642150879,
          "low": 9.629154205322266,
          "open": 10.303909301757812,
          "tradeDate": "2024-07-10"
        },
        {
          "close": 10.01080322265625,
          "high": 10.117664337158203,
          "low": 9.92373275756836,
          "open": 10.021455764770508,
          "tradeDate": "2024-07-11"
        },
        {
          "close": 10.267308235168457,
          "high": 10.77292251586914,
          "low": 9.089495658874512,
          "open": 10.517557144165039,
          "tradeDate": "2024-07-12"
        },
        {
          "close": 9.959503173828125,
          "high": 10.235422134399414,
          "low": 10.080245018005371,
          "open": 10.105025291442871,
          "tradeDate": "2024-07-13"
        },
        {
          "close": 9.643269538879395,
          "high": 10.02348518371582,
          "low": 9.679051399230957,
          "open": 10.072827339172363,
          "tradeDate": "2024-07-14"
        },
        {
          "close": 10.127349853515625,
          "high": 10.229884147644043,
          "low": 9.82526969909668,
          "open": 10.317550659179688,
          "tradeDate": "2024-07-15"
        },
        {
          "close": 10.781291007995605,
          "high": 10.756196022033691,
          "low": 10.439062118530273,
          "open": 10.147991180419922,
          "tradeDate": "2024-07-16"
        },
        {
          "close": 9.998723983764648,
          "high": 9.868408203125,
          "low": 10.61906623840332,
          "open": 9.54228401184082,
          "tradeDate": "2024-07-17"
        },
        {
          "close": 10.274845123291016,
          "high": 10.115078926086426,
          "low": 9.778471946716309,
          "open": 9.62696647644043,
          "tradeDate": "2024-07-18"
        },
        {
          "close": 9.950316429138184,
          "high": 10.155292510986328,
          "low": 9.735238075256348,
          "open": 10.158528327941895,
          "tradeDate": "2024-07-19"
        },
        {
          "close": 10.124397277832031,
          "high": 10.180500030517578,
          "low": 9.346883773803711,
          "open": 10.504863739013672,
          "tradeDate": "2024-07-20"
        },
        {
          "close": 10.794187545776367,
          "high": 10.790726661682129,
          "low": 10.035594940185547,
          "open": 10.60405445098877,
          "tradeDate": "2024-07-21"
        },
        {
          "close": 9.588010787963867,
          "high": 9.751309394836426,
          "low": 9.917155265808105,
          "open": 10.371343612670898,
          "tradeDate": "2024-07-22"
        },
        {
          "close": 9.071904182434082,
          "high": 9.377161026000977,
          "low": 9.71113395690918,
          "open": 9.516851425170898,
          "tradeDate": "2024-07-23"
        },
        {
          "close": 10.060433387756348,
          "high": 10.140134811401367,
          "low": 9.977312088012695,
          "open": 10.172308921813965,
          "tradeDate": "2024-07-24"
        },
        {
          "close": 10.341951370239258,
          "high": 10.173399925231934,
          "low": 10.371217727661133,
          "open": 10.255712509155273,
          "tradeDate": "2024-07-25"
        },
        {
          "close": 10.18929672241211,
          "high": 10.367583274841309,
          "low": 9.899152755737305,
          "open": 10.413861274719238,
          "tradeDate": "2024-07-26"
        },
        {
          "close": 10.227838516235352,
          "high": 9.839455604553223,
          "low": 9.845093727111816,
          "open": 9.608133316040039,
          "tradeDate": "2024-07-27"
        },
        {
          "close": 9.966854095458984,
          "high": 9.834793090820312,
          "low": 10.04662036895752,
          "open": 10.228199005126953,
          "tradeDate": "2024-07-28"
        },
        {
          "close": 10.130382537841797,
          "high": 10.108786582946777,
          "low": 10.30412483215332,
          "open": 10.091212272644043,
          "tradeDate": "2024-07-29"
        },
        {
          "close": 9.740023612976074,
          "high": 9.952388763427734,
          "low": 9.968439102172852,
          "open": 10.146108627319336,
          "tradeDate": "2024-07-30"
        },
        {
          "close": 9.960062980651855,
          "high": 10.285024642944336,
          "low": 10.105437278747559,
          "open": 9.865715980529785,
          "tradeDate": "2024-07-31"
        },
        {
          "close": 10.25302791595459,
          "high": 10.115829467773438,
          "low": 9.964552879333496,
          "open": 9.370853424072266,
          "tradeDate": "2024-08-01"
        },
        {
          "close": 10.217094421386719,
          "high": 10.471222877502441,
          "low": 10.815389633178711,
          "open": 10.051863670349121,
          "tradeDate": "2024-08-02"
        },
        {
          "close": 10.28736400604248,
          "high": 10.206649780273438,
          "low": 9.670151710510254,
          "open": 10.164572715759277,
          "tradeDate": "2024-08-03"
        },
        {
          "close": 10.051986694335938,
          "high": 10.066978454589844,
          "low": 10.564167022705078,
          "open": 9.104168891906738,
          "tradeDate": "2024-08-04"
        },
        {
          "close": 10.868526458740234,
          "high": 10.792901992797852,
          "low": 9.850480079650879,
          "open": 10.057035446166992,
          "tradeDate": "2024-08-05"
        },
        {
          "close": 9.868484497070312,
          "high": 9.989168167114258,
          "low": 10.540335655212402,
          "open": 9.355445861816406,
          "tradeDate": "2024-08-06"
        },
        {
          "close": 10.146764755249023,
          "high": 10.350287437438965,
          "low": 10.040279388427734,
          "open": 10.245158195495605,
          "tradeDate": "2024-08-07"
        },
        {
          "close": 10.176243782043457,
          "high": 10.49001407623291,
          "low": 10.23309326171875,
          "open": 10.099936485290527,
          "tradeDate": "2024-08-08"
        },
        {
          "close": 9.443510055541992,
          "high": 9.380756378173828,
          "low": 10.224547386169434,
          "open": 9.715229988098145,
          "tradeDate": "2024-08-09"
        },
        {
          "close": 9.780122756958008,
          "high": 10.122246742248535,
          "low": 9.493887901306152,
          "open": 10.3817720413208,
          "tradeDate": "2024-08-10"
        },
        {
          "close": 10.626094818115234,
          "high": 10.312450408935547,
          "low": 9.60701847076416,
          "open": 9.943743705749512,
          "tradeDate": "2024-08-11"
        },
        {
          "close": 10.048957824707031,
          "high": 10.292386054992676,
          "low": 10.201598167419434,
          "open": 9.826881408691406,
          "tradeDate": "2024-08-12"
        },
        {
          "close": 9.63330078125,
          "high": 9.899869918823242,
          "low": 9.98196792602539,
          "open": 9.743219375610352,
          "tradeDate": "2024-08-13"
        },
        {
          "close": 9.872577667236328,
          "high": 10.340950965881348,
          "low": 9.545328140258789,
          "open": 10.600471496582031,
          "tradeDate": "2024-08-14"
        },
        {
          "close": 10.062369346618652,
          "high": 10.278051376342773,
          "low": 9.952128410339355,
          "open": 9.844643592834473,
          "tradeDate": "2024-08-15"
        },
        {
          "close": 9.64569091796875,
          "high": 9.63745403289795,
          "low": 9.678102493286133,
          "open": 9.358359336853027,
          "tradeDate": "2024-08-16"
        },
        {
          "close": 9.891159057617188,
          "high": 9.484234809875488,
          "low": 10.110885620117188,
          "open": 9.310077667236328,
          "tradeDate": "2024-08-17"
        },
        {
          "close": 10.454048156738281,
          "high": 10.402515411376953,
          "low": 9.554211616516113,
          "open": 10.088278770446777,
          "tradeDate": "2024-08-18"
        },
        {
          "close": 10.160571098327637,
          "high": 10.676761627197266,
          "low": 10.354973793029785,
          "open": 10.473871231079102,
          "tradeDate": "2024-08-19"
        },
        {
          "close": 9.777503967285156,
          "high": 10.189935684204102,
          "low": 10.039904594421387,
          "open": 9.763031959533691,
          "tradeDate": "2024-08-20"
        },
        {
          "close": 10.360359191894531,
          "high": 10.50988483428955,
          "low": 9.72080135345459,
          "open": 10.477241516113281,
          "tradeDate": "2024-08-21"
        },
        {
          "close": 9.711615562438965,
          "high": 10.016939163208008,
          "low": 9.822829246520996,
          "open": 10.068502426147461,
          "tradeDate": "2024-08-22"
        },
        {
          "close": 9.835957527160645,
          "high": 9.786019325256348,
          "low": 9.63442325592041,
          "open": 9.565311431884766,
          "tradeDate": "2024-08-23"
        },
        {
          "close": 9.691723823547363,
          "high": 9.846139907836914,
          "low": 9.690996170043945,
          "open": 9.841064453125,
          "tradeDate": "2024-08-24"
        },
        {
          "close": 10.495448112487793,
          "high": 10.270082473754883,
          "low": 10.406111717224121,
          "open": 10.597262382507324,
          "tradeDate": "2024-08-25"
        },
        {
          "close": 9.807372093200684,
          "high": 10.005186080932617,
          "low": 9.316049575805664,
          "open": 9.907769203186035,
          "tradeDate": "2024-08-26"
        },
        {
          "close": 9.717507362365723,
          "high": 10.188959121704102,
          "low": 9.672520637512207,
          "open": 9.93795108795166,
          "tradeDate": "2024-08-27"
        },
        {
          "close": 9.70297622680664,
          "high": 9.754292488098145,
          "low": 10.236202239990234,
          "open": 9.434988975524902,
          "tradeDate": "2024-08-28"
        },
        {
          "close": 10.157512664794922,
          "high": 9.81440544128418,
          "low": 9.86931324005127,
          "open": 9.805166244506836,
          "tradeDate": "2024-08-29"
        },
        {
          "close": 9.824647903442383,
          "high": 10.264955520629883,
          "low": 9.311521530151367,
          "open": 10.281136512756348,
          "tradeDate": "2024-08-30"
        },
        {
          "close": 9.811783790588379,
          "high": 9.343891143798828,
          "low": 9.873309135437012,
          "open": 10.232072830200195,
          "tradeDate": "2024-08-31"
        },
        {
          "close": 10.112808227539062,
          "high": 10.315128326416016,
          "low": 10.651167869567871,
          "open": 10.067591667175293,
          "tradeDate": "2024-09-01"
        },
        {
          "close": 10.034542083740234,
          "high": 9.94186019897461,
          "low": 10.510231018066406,
          "open": 9.609610557556152,
          "tradeDate": "2024-09-02"
        },
        {
          "close": 10.243839263916016,
          "high": 10.109567642211914,
          "low": 9.053245544433594,
          "open": 9.885822296142578,
          "tradeDate": "2024-09-03"
        },
        {
          "close": 10.40099811553955,
          "high": 10.416027069091797,
          "low": 10.365477561950684,
          "open": 10.34173583984375,
          "tradeDate": "2024-09-04"
        },
        {
          "close": 9.511341094970703,
          "high": 9.434738159179688,
          "low": 9.993522644042969,
          "open": 10.251120567321777,
          "tradeDate": "2024-09-05"
        },
        {
          "close": 9.718398094177246,
          "high": 9.984301567077637,
          "low": 9.914151191711426,
          "open": 9.68013858795166,
          "tradeDate": "2024-09-06"
        },
        {
          "close": 9.830657005310059,
          "high": 10.183332443237305,
          "low": 9.61385440826416,
          "open": 9.532614707946777,
          "tradeDate": "2024-09-07"
        },
        {
          "close": 10.162834167480469,
          "high": 10.770050048828125,
          "low": 9.601609230041504,
          "open": 10.113468170166016,
          "tradeDate": "2024-09-08"
        },
        {
          "close": 9.514878273010254,
          "high": 9.666045188903809,
          "low": 10.226197242736816,
          "open": 10.129938125610352,
          "tradeDate": "2024-09-09"
        },
        {
          "close": 9.87473201751709,
          "high": 10.073685646057129,
          "low": 10.184654235839844,
          "open": 10.210097312927246,
          "tradeDate": "2024-09-10"
        },
        {
          "close": 9.550289154052734,
          "high": 9.554264068603516,
          "low": 9.739760398864746,
          "open": 9.578795433044434,
          "tradeDate": "2024-09-11"
        }
      ]
      const data0 = this.splitData(rawData);

      const option2 = {
        // title: {
        //   text: '上证指数',
        //   left: 0
        // },
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
            start: 0,
            end: 20,
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

      myChart2.setOption(option2);
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
  }
};
</script>

<style scoped>

/**{*/
/*  padding: 0;*/
/*  margin:0;*/
/*}*/
.container {
  display: flex;
}

.left-block {
  flex: 80%;
}

.right-block {
  flex: 20%;
}

.vertical-layout {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
}

.section {
  padding: 0;
  margin: 0;
}

.input-group h3 {
  margin-left: 20px;
  margin-right: 20px;
  /*margin-top: 15px;*/
}

.section p {
  margin-bottom: 0;
}

.section1 {
  height: 60px;
  /*background-color: blue;*/
}

.section2 {}

.section3 {
  margin-top: -10px;
}

.input-group {
  display: flex;
  margin-top: 10px;
  align-items: center;
}

.input-group > * {
  margin-right: 10px;
}

.right-section0{
  /* 在样式表中添加以下样式 */
  /*border: 1px solid #ccc;*/
  padding-bottom: 5px;
  padding-top: 5px;
  font-size: 25px;
  text-align: center;
  color:green;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
  /*padding-top: -10px; !* 为了更好地分隔模块 *!*/
}

.right-section1{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}


.right-section2{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}

.right-section3{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}

.right-section4{
  /* 在样式表中添加以下样式 */
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px; /* 圆角半径为 5px */
  margin-bottom: 10px; /* 为了更好地分隔模块 */
}
</style>
