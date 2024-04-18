<template>
  <div class="home-view">
    <!-- Top Section - Introduction -->
    <div class="intro-section">
      <h1 class="intro-title">量化投资，从理财大师开始</h1>
      <h1 class="intro-text">我们提供免费的量化数据、投研工具、量化学习体系、在线交流社区</h1>
    </div>
    <!-- Middle Section - Strategy Selection -->
    <div class="strategy-section">
      <h2 class="strategy-title">策略精选</h2>

      <div class="strategy-images">

        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center; text-align: center;margin: 30px">
          <img :src="strategy1" alt="strategy" style="width: 300px" />
          <el-button type="primary" size="small" style="margin-top: 20px">获取源码</el-button>
        </div>

        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center; text-align: center;margin: 30px">
        <img :src="strategy1" alt="strategy" style="width: 300px" />
          <el-button type="primary" size="small" style="margin-top: 20px">获取源码</el-button>
        </div>

        <div style="display: flex;flex-direction: column;align-items: center;justify-content: center; text-align: center;margin: 30px">
        <img :src="strategy1" alt="strategy" style="width: 300px" />
          <el-button type="primary" size="small" style="margin-top: 20px">获取源码</el-button>
        </div>
      </div>
    </div>
    <!-- Bottom Section - bottom -->
    <el-divider></el-divider>
    <div class="bottom-content">
      <!-- 图片部分 -->
      <div class="bottom-image">
        <img src="../home/image/home2.png" alt="Bottom Image" />
      </div>
      <!-- 文字部分 -->
      <div class="bottom-text">
        <h2>从零开始的量化投资之路</h2>
        <p>只有持续学习才能不断进取，最终攀登量化投资高峰，通过模型赢得属于自己的胜利。量化课堂为你准备了从基础知识到投资策略模型的完整解读。无论你是交易者、还是金融从业者、还是IT开发者，在量化课堂，都可以提升开发实力，启迪策略思路。</p>
        <a href="link_to_quantitative_classroom">→点击进入量化课堂</a>
      </div>
    </div>
    <div class="bottom-section">
    </div>


  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      strategy1: require('@/views/home/image/strategy1.png'),
      strategy2: require('@/views/home/image/strategy2.png'),
      strategy3: require('@/views/home/image/strategy3.png')
    }
  }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  /*max-width: 1000px;*/
  padding: 0px;
  margin-right: 10px;

}

.intro-section {
  height: 230px;
  width: 100%;
  background-image: url("image/home1.png");
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center; /* 水平居中 */
  justify-content: center; /* 垂直居中 */
  text-align: center; /* 对齐文本内容 */
}

.intro-title {
  font-size: 32px;
  color: white;
  text-align: center;
}

.intro-text {
  font-weight: lighter;
  font-size: 16px;
  color: white;
  text-align: center;
  /*margin-left: 400px;*/
}

.strategy-title {
  text-align: center;
  font-size: 24px;
  color: black;
}

.strategy-section {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  background-color: white;
}

.strategy-images {
  padding: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 85%;
}

.strategy-images img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  object-position: center;
}

.bottom-section {
  height: 70px;
  background-image: url("image/home1.png");
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bottom-content {
  display: flex;
  justify-content: space-between;
}

.bottom-image {
  width: 50%;
}

.bottom-image img {
  width: 100%;
}

.bottom-text {
  width: 50%;
  padding: 20px;
}

.bottom-text h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.bottom-text p {
  font-size: 16px;
  margin-bottom: 20px;
}

.bottom-text a {
  font-size: 16px;
  color: #1a73e8;
  text-decoration: none;
}
</style>