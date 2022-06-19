<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/service/login'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/service/login/type'
import DarkThemeSwitch from '@/components/DarkThemeSwitch/index.vue'
import { useGlobalStore } from '@/store/global'
const globalStore = useGlobalStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const account = reactive<IAccount>({
  name: 'admin',
  password: '123456'
})
const loading = ref<boolean>(false)
const validateName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入登录账号'))
  } else {
    callback()
  }
}
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const rules = reactive({
  name: [{ validator: validateName, trigger: 'blur' }],
  password: [{ validator: validatePass, trigger: 'blur' }]
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true
      const result = await login(account)
      loading.value = false
      if (result.data.code === '0000') {
        globalStore.updateToken(result.data.data.token)
        ElMessage.success(result.data.msg)
        router.push({ name: 'home' })
      } else {
        ElMessage.error(result.data.msg)
      }
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login display_center">
    <el-card class="card display_center">
      <DarkThemeSwitch class="switch" />
      <el-form ref="ruleFormRef" :model="account" status-icon :rules="rules" label-width="70px" class="demo-ruleForm">
        <el-form-item label="登录账号" prop="name">
          <el-input
            size="large"
            class="input_width"
            v-model="account.name"
            autocomplete="off"
            placeholder="请输入登录账号"
          />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input
            size="large"
            show-password
            class="input_width"
            v-model="account.password"
            type="password"
            autocomplete="off"
            placeholder="请输入登录密码"
          />
        </el-form-item>
        <div class="btn-box display_center">
          <el-button class="form-btn" size="large" type="primary" @click="submitForm(ruleFormRef)" :loading="loading"
            >登录</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.display_center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input_width {
  width: 250px;
}
.login {
  width: 100%;
  height: 100vh;
  background: url('@/assets/svg/login-bg.svg');
  background-repeat: no-repeat;
  background-size: 80%;
  .card {
    position: relative;
    box-sizing: border-box;
    height: 300px;
    width: 400px;
    .switch {
      position: absolute;
      top: 16px;
      right: 38px;
    }
  }
  .btn-box {
    .form-btn {
      margin-top: 20px;
      width: 200px;
    }
  }
  :deep(.el-form-item__label) {
    height: 38px;
    line-height: 38px;
  }
}
</style>
