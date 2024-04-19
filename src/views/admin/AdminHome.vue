<template>
  <div class="homebox">
    <div class="notice">
      <el-card shadow="always">
        <h2 style="margin-left:15px; margin-bottom: 30px">系统维护情况</h2>
        <!--         <el-timeline :reverse="reverse">-->
        <!--          <el-timeline-item-->
        <!--            v-for="(activity, index) in activities"-->
        <!--            :key="index"-->
        <!--            :timestamp="activity.timestamp">-->
        <!--            {{activity.content}}-->
        <!--          </el-timeline-item>-->
        <!--         </el-timeline>-->
        <el-timeline :reverse="true">
          <el-timeline-item
              v-for="(activity, index) in list"
              :key="index"
              color="#2991FF"
              size="large"
              type="primary"
          >
            <div class="time">
              <!--            <div>-->
              <!--              <span class="year">-->
              <!--                {{ activity.time.substring(5, 11) }}-->
              <!--              </span>-->
              <!--            </div>-->
              <!--            <div class="day">{{ activity.time.substring(0, 4) }}年</div>-->
            </div>
            <div class="ml10">
              <div class="list-title">{{ activity.title }}</div>
              <!--            <div class="list-company">{{ activity.name }}</div>-->
              <div class="list-desc">{{ activity.content }}</div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import request from "@/utils/request";
import Cookies from "js-cookie";

export default {
  name: 'Home',
  data(){
    return{
      user:Cookies.get('user')?JSON.parse(Cookies.get('user')):{},
      list: [
        {
          title: '迭代1',
          content: '1111111111111111111111111111',
          name: '成都有限公司',
          time: '2022年10月25日',
        },
        // {
        //   title: '巡察公告',
        //   content: '根据区委巡察工作统一部署，区委第2巡察组从2024年4月11日起至2024年7月5日对华中科技大学协和深圳医院党委开展机动巡察。根据《中国共产党巡视工作条例》和省委实施办法及市委、区委有关要求，区委巡察组主要受理反映华中科技大学协和深圳医院党委领导班子及其成员、下一级党组织领导班子主要负责人和重要岗位领导干部问题的来信来电，重点是关于违反政治纪律、组织纪律、廉洁纪律、群众纪律、工作纪律、生活纪律等方面的举报和反映。',
        //   name: '成都有限公司',
        //   time: '2022年10月24日',
        // },
        {
          title: '迭代2',
          content: '222222222222222222',
          name: '成都有限公司',
          time: '2022年10月23日',
        },
        {
          title: '迭代3',
          content: '33333333333333333333333333',
          name: '成都有限公司',
          time: '2022年10月22日',
        },
        {
          title: '迭代4',
          content: '44444444444444444444444444',
          name: '成都有限公司',
          time: '2022年10月21日',
        },
      ],
    }
  },
  created() {

  },
  methods: {
    jumptohomeview(){
      this.$router.push('/homeview')
    },
  }
}
</script>

<style scoped>

.homebox{
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-right: 10px;
  margin-left: 5px
}

.notice{
  margin-left: 5px;
  text-align: left;
  width: 100%;
}

.notice el-card{
  padding:0 ;
}

.notice el-timeline{
  padding-left:-20px;
}


.time-line {
  margin-top: 50px;
  margin-left: 200px;
}
.list-title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #181b1e;
}
.list-company {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #2991ff;
  margin-top: 15px;
  margin-bottom: 15px;
}
.list-desc {
  margin-top: 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #596878;
}
.time {
  color: #409eff;
  position: absolute;
  left: -94px;
  top: 1px;}

.year {
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #20354a;
}
.day {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #596878;
  text-align: center;
  margin-top: 10px;
}

</style>