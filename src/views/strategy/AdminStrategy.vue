<template>
  <div>


    <div class="container">
<!--      <div class="handle-box">-->
        <h3 style="margin-left: 20px">策略审核</h3>
<!--        <el-button-->
<!--            type="primary"-->
<!--            class="handle-add mr10"-->
<!--            @click="addStockList"-->
<!--        >批量添加</el-button>-->
<!--        <el-button-->
<!--            type="danger"-->
<!--            class="handle-add mr10"-->
<!--            @click="deleteStockList"-->
<!--        >批量删除</el-button>-->
<!--      </div>-->
      <el-table
          :data="tableData"
          border
          stripe
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          @selection-change="handleSelectionChange"
          :default-sort = "{prop: 'symbol', order: 'transactionDate'}"
      >

        <el-table-column prop="strid" label="id" width="55" align="center"></el-table-column>
        <el-table-column prop="strname" label="策略名" align="center"></el-table-column>
        <el-table-column prop="account" label="上传者账号" align="center"></el-table-column>
        <!--        <el-table-column prop="symbol" label="全球唯一标识符" align="center"></el-table-column>-->
        <el-table-column prop="ifpass" label="是否在策略池中" align="center"></el-table-column>
        <el-table-column prop="strdate" label="上传日期" align="center"></el-table-column>
        <el-table-column prop="strgrade" label="策略等级" align="center"></el-table-column>

        <el-table-column label="策略审核" align="left" header-align="50px">
          <template v-slot="scope">
            <el-button type="primary" @click="visable">点击审核</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

    <!-- 审核盒子 -->
    <div class="auditbox">
      <el-dialog :visible.sync="auditVisible" width="70%">
        <h2 style="margin-top: 0px">策略审核</h2>

        <div class="box-container">
          <!--        Info部分-->
          <div class="Info" style="margin-left: 10px;">
            <div class="info-row">
              <div class="label">
                <span>策略名</span>
              </div>
              <div class="content">
                <span>{{ strategy.name }}</span>
              </div>
            </div>
            <div class="info-row">
              <div class="label">
                <span>上传者账号</span>
              </div>
              <div class="content">
                <span>{{ strategy.account }}</span>
              </div>
            </div>
            <div class="info-row">
              <div class="label">
                <span>策略代码 </span>
              </div>
              <div class="content">
                <el-button type="primary">下载文件</el-button>
              </div>
            </div>
            <div class="info-row">
              <div class="label">
                <span>策略等级 </span>
              </div>
              <div class="content">
                <el-select v-model="strategyLevel" placeholder="请选择策略等级">
                  <el-option label="普通" value="1"></el-option>
                  <el-option label="VIP" value="2"></el-option>
                </el-select>
              </div>
            </div>
            <div class="info-row">
              <div class="label">
                <span>是否入池</span>
              </div>
              <div class="content">
                <el-select v-model="isInPool" placeholder="请选择是否入池">
                  <el-option label="是" value="yes"></el-option>
                  <el-option label="否" value="no"></el-option>
                </el-select>
              </div>
            </div>
            <!--          <el-button type="danger" @click="deleteStrategy">删除策略</el-button>-->
          </div>

          <!--        Code部分-->
          <div class="code">
            <div class="toolbar">
              <h3 style="flex-grow: 1;  display: flex;  justify-content: center;">{{ strategy.name }}</h3>
              <div style="display: flex;justify-content: flex-end;">
                <el-button icon="el-icon-search"></el-button>
                <el-button icon="el-icon-setting"></el-button>
              </div>
            </div>
            <div class="code-window">
              <pre v-html="highlightedCode"><code>{{ code }}</code></pre>
            </div>
          </div>
        </div>


      </el-dialog>
    </div>

  </div>
</template>

<script>
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import {addToCollection, getStocklist, getStrategy} from "@/api";
import Cookies from "js-cookie";

export default {
  name: 'StockList',
  data() {
    return {
      auditVisible:false,
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      //表格属性
      tableData: [],
      strategy: {name: '多因子估值回归模型', account: 'deng20030213'},

      code: `# 导入函数库
from jqdata import *

# 初始化函数，设定基准等等
def initialize(context):
    # 设定沪深300作为基准
    set_benchmark('000300.XSHG')
    # 开启动态复权模式(真实价格)
    set_option('use_real_price', True)
    # 输出内容到日志 log.info()
    log.info('初始函数开始运行且全局只运行一次')
    # 过滤掉order系列API产生的比error级别低的log
    # log.set_level('order', 'error')

    ### 股票相关设定 ###
    # 股票类每笔交易时的手续费是：买入时佣金万分之三，卖出时佣金万分之三加千分之一印花税, 每笔交易佣金最低扣5块钱
    set_order_cost(OrderCost(close_tax=0.001, open_commission=0.0003, close_commission=0.0003, min_commission=5), type='stock')

    ## 运行函数（reference_security为运行时间的参考标的；传入的标的只做种类区分，因此传入'000300.XSHG'或'510300.XSHG'是一样的）
      # 开盘前运行
    run_daily(before_market_open, time='before_open', reference_security='000300.XSHG')
      # 开盘时运行
    run_daily(market_open, time='open', reference_security='000300.XSHG')
      # 收盘后运行
    run_daily(after_market_close, time='after_close', reference_security='000300.XSHG')

## 开盘前运行函数
def before_market_open(context):
    # 输出运行时间
    log.info('函数运行时间(before_market_open)：'+str(context.current_dt.time()))

    # 给微信发送消息（添加模拟交易，并绑定微信生效）
    # send_message('美好的一天~')

    # 要操作的股票：平安银行（g.为全局变量）
    g.security = '000001.XSHE'

## 开盘时运行函数
def market_open(context):
    log.info('函数运行时间(market_open):'+str(context.current_dt.time()))
    security = g.security
    # 获取股票的收盘价
    close_data = get_bars(security, count=5, unit='1d', fields=['close'])
    # 取得过去五天的平均价格
    MA5 = close_data['close'].mean()
    # 取得上一时间点价格
    current_price = close_data['close'][-1]
    # 取得当前的现金
    cash = context.portfolio.available_cash

    # 如果上一时间点价格高出五天平均价1%, 则全仓买入
    if (current_price > 1.01*MA5) and (cash > 0):
        # 记录这次买入
        log.info("价格高于均价 1%%, 买入 %s" % (security))
        # 用所有 cash 买入股票
        order_value(security, cash)
    # 如果上一时间点价格低于五天平均价, 则空仓卖出
    elif current_price < MA5 and context.portfolio.positions[security].closeable_amount > 0:
        # 记录这次卖出
        log.info("价格低于均价, 卖出 %s" % (security))
        # 卖出所有股票,使这只股票的最终持有量为0
        order_target(security, 0)

## 收盘后运行函数
def after_market_close(context):
    log.info(str('函数运行时间(after_market_close):'+str(context.current_dt.time())))
    #得到当天所有成交记录
    trades = get_trades()
    for _trade in trades.values():
        log.info('成交记录：'+str(_trade))
    log.info('一天结束')
    log.info('##############################################################')`,

    };
  },

  //代码
  computed: {
    highlightedCode() {
      let language = Prism.languages.javascript; // 你的代码的语言
      return Prism.highlight(this.code, language);
    },
  },

  created() {
    this.token = localStorage.getItem('token')
    console.log("token"+this.token)
    this.getData();
  },
  methods: {
    visable(){
      this.auditVisible=true
    },
    //获取策略数据
    getData() {
      var strname=''
      getStrategy({strname}).then(res=>{
        if(res.code===200){
          console.log(res)
          this.tableData=res.response

          // 遍历数据，处理日期属性
          this.tableData.forEach(item => {
            // 将日期字符串转换为 Date 对象
            let date = new Date(item.strdate);

            // 获取年月日信息
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1
            let day = date.getDate().toString().padStart(2, '0');

            // 拼接日期字符串
            item.strdate = `${year}-${month}-${day}`;
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
    },

    //将某只股票添加到收藏夹内
    add(row) {
      this.$prompt('请输入收藏夹ID', '添加至收藏夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d+$/,
        inputErrorMessage: '收藏夹ID必须为数字',
        inputPlaceholder: '请输入收藏夹ID'
      }).then(({ value: collectionId }) => {
        // 检查收藏夹ID是否为空
        if (!collectionId.trim()) {
          this.$message.error('收藏夹ID不能为空');
          // return;
        }
        else{
          this.addToCollection(row.symbol,collectionId);
        }
      }).catch(() => {
        // 用户点击取消后的操作
        // 可以不做任何处理
      });
    },
    addToCollection(symbol,collectionid) {
      // 调用后端接口添加至收藏夹
      addToCollection({symbol,collectionid}).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message.success("收藏成功");
          this.getData(); // 重新加载数据
        }
      }).catch(err => {
        console.log(err);
        this.$message.error(err.data);
      });
    },

    //后面没用的
    addStockList(){

    },
    deleteStockList(){

    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    },
    selectCode(){},
    getSelectValue(){},

  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 900px;
  padding: 0px;
  margin-right: 50px;
}
.handle-box {
  margin-bottom: 20px;
}

.table {
  width: 100%;
  font-size: 14px;
}
.mr10 {
  /*margin-right: 10px;*/
}
.getSelect{
  margin-left: 10px;
}

.info-row {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.info-row .label {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-row .content {
  flex: 1;
  display: flex;
  align-items: flex-start;
}
.toolbar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.code-window {
  background-color: black;
  color: white;
  padding: 10px;
  height: 380px;
  overflow: auto;
}
.code-window pre {
  margin: 0;
}
.code-window code {
  font-family: monospace;
}


.box-container {
  display: flex;
  justify-content: space-between;
}

.Info, .code {
  width: 48%;
}


</style>
