<template>
  <div>

    <div class="container">
      <!--搜索表单-->
      <div style="margin-bottom: 20px">
<!--        <el-input style="width: 200px" placeholder="请输入id" v-model="input.id"></el-input>-->
        <el-input style="width: 200px;margin-left: 10px" placeholder="请输入账号" v-model="input.useraccount"></el-input>
        <el-button style="margin-left: 5px" type="info" plain @click="getDataByid">
          <i class=" el-icon-search"></i>
          <span>搜索</span>
        </el-button>
        <el-button style="margin-left: 5px" type="warning" plain @click="reset">
          <i class=" el-icon-refresh"></i>
          <span>重置</span>
        </el-button>
      </div>


      <el-table
          :data="tableData"
          border
          stripe
          class="table"
          ref="multipleTable"
          header-cell-class-name="table-header"
          :default-sort = "{prop: 'userid', order: 'transactionDate'}"
      >
<!--        <el-table-column type="selection" width="55" align="center"></el-table-column>-->
        <el-table-column prop="userRole" label="用户权限" width="100" align="center">
        <template v-slot="scope">
          <el-select v-model="scope.row.userRole" placeholder="请选择" @change="confirmChange(scope.row)">
            <el-option label="Root" value="Root"></el-option>
            <el-option label="User" value="User"></el-option>
            <el-option label="AlgE" value="AlgE"></el-option>
            <el-option label="StrE" value="StrE"></el-option>
          </el-select>
        </template>
        </el-table-column>
        <el-table-column prop="account" label="账号" align="center"></el-table-column>
<!--        <el-table-column prop="ifbanned" label="是否封禁" align="center"></el-table-column>-->
        <!--        <el-table-column prop="symbol" label="全球唯一标识符" align="center"></el-table-column>-->
        <el-table-column prop="nickname" label="昵称" width="150" align="center"></el-table-column>
        <el-table-column prop="sex" label="性别" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="150" align="center"></el-table-column>
        <el-table-column prop="address" label="地址" align="center"></el-table-column>
        <el-table-column prop="signal" label="简介" align="center"></el-table-column>
        <el-table-column prop="birthday" label="生日" width="150" align="center"></el-table-column>

        <el-table-column label="操作" align="left" header-align="50px">
          <template v-slot="scope">
            <el-button type="danger" plain @click="del(scope.row.userid)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <div class="pagination">
<!--        <el-pagination-->
<!--            background-->
<!--            layout="total, prev, pager, next"-->
<!--            :current-page="query.pageIndex"-->
<!--            :page-size="query.pageSize"-->
<!--            :total="pageTotal"-->
<!--            @current-change="handlePageChange"-->
<!--        ></el-pagination>-->
      </div>
    </div>
  </div>
</template>

<script>
import {deleteUser, getUserList,getUserById,getUserByAccount,getUserRole} from "@/api";

export default {
  name: 'StockList',
  data() {
    return {
      query: {
        pageIndex: 1,
        pageSize: 10,
        pageTotal:1,
      },
      //表格属性
      tableData: [],
      input:{
        useraccount:'',
        id:'',
      },
    };
  },
  created() {
    this.token = localStorage.getItem('token')
    this.getData();
  },

  methods: {
    //------------------------------------------重置------------------------------------------
    reset(){  //重置
      this.input.id=''
      this.input.useraccount=''
      this.getData()
    },
    //------------------------------------------获取用户数据--------------------------------------
    getData() {
      getUserList().then(res => {
            if (res.code === 200) {
              this.tableData = res.response.map(user => {
                let birthday = new Date(user.birthday);
                let year = birthday.getFullYear();
                let month = (birthday.getMonth() + 1).toString().padStart(2, '0');
                let day = birthday.getDate().toString().padStart(2, '0');
                return {
                  ...user,
                  birthday: `${year}-${month}-${day}`,
                  userRole: 'User' // 默认权限等级
                };
              });}
        else {
          this.$message.error(res.msg)
        }
      }).catch(err => {
        this.$message.error(err.data)
      })
    },

    //------------------------------------------根据id获取用户数据--------------------------------------
    getDataByid() {
      if (this.input.id !== '') {
        getUserById({ userId: this.input.id }).then(res => {
          if (res.code === 200) {
            this.tableData = this.formatData([res.response]);
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.data)
        })
      } else if (this.input.useraccount !== '') {
        getUserByAccount({ userAccount: this.input.useraccount }).then(res => {
          if (res.code === 200) {
            this.tableData = this.formatData([res.response]);
          } else {
            this.$message.error(res.msg)
          }
        }).catch(err => {
          this.$message.error(err.data)
        })
      } else {
        this.$message.info("当前查询内容为空")
      }
    },

    //------------------------------------------修改用户权限数据--------------------------------------
    confirmChange(row) {
      this.$confirm('确认更改用户权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.changeRole(row.userId, row.userRole);
      }).catch(() => {
        this.$message.info('已取消更改');
        // 如果用户取消更改，恢复原来的权限等级
        row.userRole = this.originalRole;
      });
    },
    changeRole(userId, role) {
      // 在这里保存原来的权限等级，以便在用户取消更改时恢复
      this.originalRole = role;
      // ...其余的代码
    },

    //-----------------------------------处理日期数据----------------------------------------
    formatData(data) {
      return data.map(item => {
        let birthday = new Date(item.birthday);
        let year = birthday.getFullYear();
        let month = (birthday.getMonth() + 1).toString().padStart(2, '0');
        let day = birthday.getDate().toString().padStart(2, '0');
        return {
          ...item,
          birthday: `${year}-${month}-${day}`
        };
      });
    },

    //------------------------------删除用户数据-------------------------------
    del(id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var userId= id
        deleteUser({ userId }).then(res => {
          if (res.code === 200) {
            this.$message.success("删除成功")
            this.getData();
          }
        }).catch(err => {
          this.$message.error(err.data)
        })
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },

    //--------------------------------分页----------------------------
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 98%;
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
</style>
