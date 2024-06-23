<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside width="200px" class="sidebar">
      <div class="sidebar-profile">
        <el-avatar size="large" :src="form.avatarUrl" class="large-avatar"></el-avatar>
        <div class="profile-name">{{ form.nickname }}</div>
        <div class="profile-divider"></div>
      </div>

      <el-menu :default-active="activeMenu" @select="handleSelect" class="el-menu-vertical-demo">
        <el-menu-item index="info">个人信息</el-menu-item>
        <el-menu-item index="security">账号安全</el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主内容区 -->
    <el-main class="main-content">
      <div class="content-box" v-if="activeMenu === 'info'">
        <div class="avatar-upload" @click="handleAvatarClick">
          <el-avatar :size="100" :src="form.avatarUrl" class="large-avatar" ></el-avatar>
          <input type="file" ref="avatarInput" style="display: none;" @change="handleAvatarChange" />
        </div>
        <h2>基本信息</h2>
        <el-form :model="form" label-width="80px" :disabled="!isEditing">
          <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
          </el-form-item>
          <el-form-item label="账号">
            <span>{{ form.account }}</span>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker v-model="form.birthday"></el-date-picker>
          </el-form-item>
          <el-form-item label="邮箱">
            <span>{{ form.email }}</span>
          </el-form-item>
          <el-form-item label="性别" style="max-width: 300px;">
            <el-select v-model="form.gender" placeholder="选择性别" style="width: 100%;">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否封禁">
            <el-switch v-model="form.banned"></el-switch>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input v-model="form.signature"></el-input>
          </el-form-item>
        </el-form>
        <div v-if="isEditing" class="button-group">
          <el-button type="primary" @click="saveChanges" class="aligned-button">保存</el-button>
          <el-button @click="cancelEditing" class="aligned-button" style="margin-left: 15px">取消</el-button>
        </div>
        <el-button v-else type="primary" @click="toggleEditing" class="edit-button">编辑</el-button>
      </div>

      <div class="content-box" v-if="activeMenu === 'security'">
        <h2>基本信息</h2>
        <el-form :model="form" label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="form.phone" disabled></el-input>
            <el-button type="text" @click="openPhoneDialog">更换</el-button>
          </el-form-item>
          <el-form-item label="邮箱号">
            <el-input v-model="form.email" disabled></el-input>
            <el-button type="text" @click="openEmailDialog">更换</el-button>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input type="password" v-model="form.password" disabled></el-input>
            <el-button type="text" @click="openPasswordDialog">修改</el-button>
          </el-form-item>
        </el-form>
        <div class="section-divider"></div>
        <h2>注销账号</h2>
        <el-button type="danger" class="delete-button">注销账号</el-button>
      </div>
    </el-main>

    <!-- 修改密码对话框 -->
    <el-dialog :visible.sync="passwordDialogVisible" width="350px">
      <div class="dialog-title"><b>修改密码</b></div>
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordForm" label-width="0px">
        <el-form-item prop="currentPassword">
          <el-input type="password" v-model="passwordForm.currentPassword" placeholder="原始密码" class="password-input"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input type="password" v-model="passwordForm.newPassword" placeholder="新密码" class="password-input"></el-input>
        </el-form-item>
        <el-form-item prop="confirmNewPassword">
          <el-input type="password" v-model="passwordForm.confirmNewPassword" placeholder="确认新密码" class="password-input"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="changePassword" class="confirm-button">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 更换手机号对话框 -->
    <el-dialog :visible.sync="phoneDialogVisible" width="350px">
      <div class="dialog-title"><b>更换手机号</b></div>
      <el-form :model="phoneForm" label-width="0px">
        <el-form-item>
          <el-input type="password" v-model="phoneForm.password" placeholder="登录密码" class="phone-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="phoneForm.newPhone" placeholder="新的手机号" class="phone-input"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="changePhone" class="confirm-button">确认</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!-- 更换邮箱对话框 -->
    <el-dialog :visible.sync="emailDialogVisible" width="350px">
      <div class="dialog-title"><b>更换邮箱号</b></div>
      <el-form :model="emailForm" label-width="0px">
        <el-form-item>
          <el-input type="password" v-model="emailForm.password" placeholder="登录密码" class="email-input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="emailForm.newEmail" placeholder="新的邮箱号" class="email-input"></el-input>
        </el-form-item>
        <div class="dialog-footer">
          <el-button type="primary" @click="changeEmail" class="confirm-button">确认</el-button>
        </div>
      </el-form>
    </el-dialog>
  </el-container>
</template>

<script>
import { getUserInf ,updateUser ,updatePassword} from '@/api';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      activeMenu: 'info',
      isEditing: false,
      passwordDialogVisible: false,
      phoneDialogVisible: false,
      emailDialogVisible: false,
      form: {
        nickname: '',
        account: '',
        address: '',
        birthday: '',
        email: '',
        gender: '',
        banned: '',
        signature: '',
        phone: '13800138000',
        userid: '',
        password: '********',
        // avatarUrl: require('@/views/user/avatar/uavatar.png')
      },
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      phoneForm: {
        password: '',
        newPhone: ''
      },
      emailForm: {
        password: '',
        newEmail: ''
      },
      originalForm: {},
      passwordRules: {
        currentPassword: [
          { required: true, message: '请输入原始密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== this.passwordForm.newPassword) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur'
          }
        ]
      }
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    async fetchUserInfo() {
      try {
        // 从 Cookies 中获取用户信息
        const userCookie = Cookies.get('user');
        if (!userCookie) {
          console.error('User not logged in');
          return;
        }
        // 解析用户信息并获取用户ID
        const user = JSON.parse(userCookie);
        const userId = user.userid;
        // 通过用户ID获取用户详细信息
        const response = await getUserInf({ userid: userId });
        const userData = response.data; // 根据实际的返回数据结构获取用户信息
        this.form = {
          account: userData.account,
          address: userData.address,
          birthday: userData.birthday,
          email: userData.email,
          banned: userData.ifbanned,
          nickname: userData.nickname,
          gender: userData.sex,
          signature: userData.signal,
          userid: userData.userid,
        };
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    handleSelect(key, keyPath) {
      this.activeMenu = key;
      this.isEditing = false; // 切换菜单时禁用编辑模式
    },
    toggleEditing() {
      this.isEditing = true;
      this.originalForm = { ...this.form }; // 保存当前表单数据
    },
    async saveChanges() {
      try {
        const response = await updateUser(this.form);
        if (response.data.success) {
          this.$message.success('信息更新成功');
        } else {
          this.$message.error('信息更新失败');
        }
        this.isEditing = false;
      } catch (error) {
        console.error('Error updating user info:', error);
        this.$message.error('信息更新失败');
      }
    },
    cancelEditing() {
      this.form = { ...this.originalForm }; // 还原表单数据
      this.isEditing = false;
    },
    handleAvatarClick() {
      if (this.isEditing) {
        this.$refs.avatarInput.click();
      }
    },
    handleAvatarChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.form.avatarUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    openPhoneDialog() {
      this.phoneDialogVisible = true; // 打开更换手机号对话框
    },
    openEmailDialog() {
      this.emailDialogVisible = true; // 打开更换邮箱对话框
    },
    openPasswordDialog() {
      this.passwordDialogVisible = true; // 打开密码对话框
    },
    async changePassword() {
      this.$refs.passwordForm.validate(async (valid) => {
        if (valid) {
          try {
            const response = await updatePassword({
              newPassword: this.passwordForm.newPassword,
              oldPassword: this.passwordForm.currentPassword,
              userId: this.form.userid,
            });
            if (response.data.success) {
              this.$message.success('密码修改成功');
              this.passwordDialogVisible = false;
            } else {
              this.$message.error('密码修改失败');
            }
          } catch (error) {
            console.error('Error changing password:', error);
            this.$message.error('密码修改失败');
          }
        } else {
          console.log('表单验证失败');
        }
      });
    },
    changePhone() {
      // 处理更换手机号的逻辑
      console.log('更换手机号');
      this.phoneDialogVisible = false; // 关闭对话框
    },
    changeEmail() {
      // 处理更换邮箱的逻辑
      console.log('更换邮箱');
      this.emailDialogVisible = false; // 关闭对话框
    }
  },
};
</script>

<style scoped>
.sidebar {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  text-align: center;
  height: 300px;
  overflow: hidden; /* 如果内容溢出，则隐藏 */
  margin-left: 30px;
  margin-right: 10px;
}

.sidebar-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  box-shadow: none; /* 去掉阴影 */
}

.large-avatar {
  width: 70px;
  height: 70px;
  margin-top: -20px;
  cursor: pointer;
}

.profile-name {
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
}

.profile-divider {
  width: 80%;
  height: 1px;
  background-color: #dcdcdc;
  margin-top: 20px;
  margin-bottom: 10px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
  margin-top: -10px;
  min-height: auto; /* 使菜单高度适应内容 */
}

.avatar-upload {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}


h2 {
  font-size: 18px;
  margin-bottom: 25px;
  margin-top: 40px;
}

.section-divider {
  width: 100%;
  height: 1px;
  background-color: #dcdcdc;
  margin: 20px 0;
}

.el-button {
  margin-top: 20px;
}

.main-content {
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  padding: 20px;
  margin-left: 20px; /* 添加外边距，使其与侧边栏分开 */
  margin-right: 150px;
}

.content-box {
  padding: 20px;
}

.el-form-item {
  max-width: 300px;
}

.button-group {
  display: flex;
  gap: 5px;
}

.edit-button,
.aligned-button {
  margin-top: 0px;
  margin-left: 80px;
  font-size: 14px;
  height: 32px;
  width: 60px;
}

.delete-button {
  font-size: 16px; /* 增加字体大小 */
  height: 45px; /* 增加按钮高度 */
  width: 100px; /* 增加按钮宽度 */
}

.dialog-footer {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.password-input,
.phone-input,
.email-input {
  width: 310px;
}

.confirm-button {
  width: 100%;
  height: 35px;
  margin-top: 10px;
}

.dialog-title {
  font-weight: bold;
  font-size: 16px;
  margin-top: -40px;
  margin-bottom: 40px;
}
</style>
