<!--
 * @Author: Lvhz
 * @Date: 2021-08-26 17:12:45
 * @Description: 登录页
-->
<template>
  <div class="login-container">
    <el-form ref="form" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" maxlength="15" placeholder="用户名" name="username" type="text" tabindex="1" autocomplete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="passowrdInput"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          tabindex="2"
          autocomplete="on"
          @keyup.enter="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { USER_STATE, USER_GETTER, USER_MUTATION } from '@/store/modules/user';
import { reactive, ref, nextTick, inject } from 'vue'

const user = inject(USER_STATE);
const userGetter = inject(USER_GETTER);
const userMutation = inject(USER_MUTATION);
console.log(user);
userGetter()
console.log(user);
userMutation({ name: 'dylan', age: 27, address: '广州', phone: '13037111111' })
console.log(user);

// loginForm表单
const loginForm = reactive({
  username: '',
  password: ''
})
const validatePassword = (rule, value, callback) => {
  if (value.length < 6) {
    callback(new Error('请输入至少6位密码'))
  } else {
    callback()
  }
}
const loginRules = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}
// 单个状态
const form = ref(null)
const passowrdInput = ref(null)
const passwordType = ref('password')
const loading = ref(false)

// 眼睛：密码icon点击事件
const showPwd = () => {
  if(passwordType.value === 'password'){
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
  nextTick(() => {
    passowrdInput.value.focus()
  })
}
const handleLogin = () => {
  form.value.validate(valid => {
    console.log(valid);
    if(valid) {
      console.log(valid);
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
$bg:#2d3a4b;
$inputbg:#283443;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}

/* reset element-ui css */
.login-container {
  /deep/ .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #fff;
      height: 47px;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $inputbg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }

  /deep/ .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>
