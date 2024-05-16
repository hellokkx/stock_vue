<template>
  <div class="container">
    <img src="https://cdn.joinquant.com/help/img/bg2.png" alt="classImage">
    <!-- 标签页导航 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="新手专区" name="newbie"></el-tab-pane>
      <el-tab-pane label="Python专区" name="python"></el-tab-pane>
      <el-tab-pane label="策略专区" name="strategy"></el-tab-pane>
      <el-tab-pane label="经济与市场" name="economics"></el-tab-pane>
    </el-tabs>

    <!-- 内容区域 -->
    <div class="content">
      <!-- 新手专区 -->
      <div id="newbie" class="cards-row">
        <el-row :gutter="50" >
          <el-col :span="6" v-for="(card, index) in cards1" :key="index">
            <el-card @click="handleCardClick"  :style="{ marginBottom: index % 4 === 3 ? '30px' : '0', border: '1px solid lightblue'}">
              <div style="padding: 14px; height:75px;">
                <span>{{ card }}</span>
                <el-divider></el-divider>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div>
        <el-divider></el-divider>
      </div>

      <!-- Python 编程 -->
      <div id="python" class="cards-row">
        <el-row :gutter="50">
          <el-col :span="6" v-for="(card, index) in cards2" :key="index">
            <el-card :style="{ marginBottom: index % 4 === 3 ? '30px' : '0', border: '1px solid orange' }">
              <div style="padding: 14px;height:75px;">
                <span>{{ card }}</span>
                <el-divider ></el-divider>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div>
        <el-divider></el-divider>
      </div>

      <!-- 策略与应用 -->
      <div id="strategy" class="cards-row">
        <el-row :gutter="50">
          <el-col :span="6" v-for="(card, index) in cards3" :key="index">
            <el-card :style="{ marginBottom: index % 4 === 3 ? '30px' : '0', border: '1px solid red'}">
              <div style="padding: 14px;height:75px;">
                <span>{{ card }}</span>
                <el-divider></el-divider>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div>
        <el-divider></el-divider>
      </div>

      <!-- 经济与市场 -->
      <div id="economics" class="cards-row">
        <el-row :gutter="50">
          <el-col :span="6" v-for="(card, index) in cards4" :key="index">
            <el-card :style="{ marginBottom: index % 4 === 3 ? '30px' : '0', border: '1px solid green'}">
              <div style="padding: 14px;height:75px;">
                <span>{{ card }}</span>
                <el-divider></el-divider>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'newbie',
      tabPosition: 'top',
      targetPositions: {
        newbie: 100,
        python: 600,
        strategy: 900,
        economics: 1200,
      },
      cards1: [
        '因子专题：数据获取',
        '因子专题：策略构建',
        '因子专题：模型评估',
        '因子专题：回测分析',
        '因子专题：实盘交易',
        '因子专题：风险控制',
        '因子专题：资金管理',
        '>>查看更多',
      ],
      cards2: [
        'Python 基础',
        'Python 进阶',
        'Python 应用',
        'Python 爬虫',
        'Python 数据分析',
        'Python 量化',
        'Python 机器学习',
        '>>查看更多',
      ],
      cards3: [
        '策略专题：趋势策略',
        '策略专题：均值回归',
        '策略专题：套利策略',
        '策略专题：事件驱动',
        '策略专题：市场中性',
        '策略专题：多因子策略',
        '策略专题：组合策略',
        '>>查看更多',
      ],
      cards4: [
        '经济专题：宏观经济',
        '经济专题：微观经济',
        '经济专题：产业经济',
        '经济专题：金融经济',
        '经济专题：国际经济',
        '经济专题：政策经济',
        '经济专题：经济周期',
        '>>查看更多',
      ],
    };
  },
  mounted() {
    // 在组件挂载完成后获取目标元素位置信息
    // this.targetPositions = {
    //   newbie: this.$refs.newbie.getBoundingClientRect().top + window.pageYOffset,
    //   python: this.$refs.python.getBoundingClientRect().top + window.pageYOffset,
    //   strategy: this.$refs.strategy.getBoundingClientRect().top + window.pageYOffset,
    //   economics: this.$refs.economics.getBoundingClientRect().top + window.pageYOffset,
    // };
  },
  methods: {
    // 点击标签页时，滚动到对应的位置
    handleClick(tab) {
      console.log('scrollTo method called with id:', tab.name);
      const top = this.targetPositions[tab.name];
      window.scrollTo({ top: top, behavior: 'smooth' });
    },
    handleCardClick() {
      window.location.href = 'https://www.joinquant.com/view/community/detail/63c2508b996897cd0bdf2214dee9cde2';
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.container img {
  max-width: 100%;
  height: auto;
}

.cards-row {
  margin-bottom: 20px;
}

.el-tabs {
  position: sticky;
  top: 0px;
  z-index: 1;
  background-color: white
}

.el-tabs /deep/ .el-tabs__item {
  margin-left: 20px;
  font-size: 18px;
  color: rgb(128, 128, 128);
}

.el-tabs /deep/ .el-tabs__active-bar {
  left: 3% !important;
  width: 94px !important;

}
</style>