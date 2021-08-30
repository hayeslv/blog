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
import { reactive, ref, nextTick, onBeforeMount, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// vuex
const store = useStore()
// const token = computed(() => store.state.user.token)
const setToken = (token) => store.commit('user/m_token', token || null)

const { proxy } = getCurrentInstance()

// loginForm表单
const loginForm = reactive({
  username: 'admin',
  password: '123456'
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
// 路由
const router = useRouter()
let redirect = null
let otherQuery = {}
// 路由监听
onBeforeMount(() => {
  const query = proxy.$route.query
  if (query) {
    redirect = query.redirect
    otherQuery = getOtherQuery(query)
  }
})

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
// 登录点击
const handleLogin = () => {
  form.value.validate(valid => {
    if(valid) {
      loading.value = true
      setToken('my-token')
      router.push({ path: redirect || '/', query: otherQuery })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

// 获取除redirect之外的参数
function getOtherQuery(query) {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
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
