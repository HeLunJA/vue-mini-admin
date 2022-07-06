<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { login } from '@/service/login'
import { ElMessage } from 'element-plus'
import { useSwitchDark } from '@/hooks/useChangeTheme'
import { useGlobalStore } from '@/store/global'

const isDark = useSwitchDark()
const waveClassName = computed(() => (isDark.value ? 'darkWaveSvg' : 'waveSvg'))
const linearClassName = computed(() => (isDark.value ? 'darkLinear' : 'linear'))
const loginCard = ref()

const globalStore = useGlobalStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const loading = ref<boolean>(false)
const account = reactive<IAccountType>({
  name: 'admin',
  password: '123456'
})
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
  <div :class="{ [linearClassName]: true, login: true, display_center: true }">
    <div ref="loginCard" class="card display_center frosted-glass">
      <div class="drop"></div>
      <div class="drop"></div>
      <div class="drop"></div>
      <div class="drop"></div>
      <div class="title">Drop Admin</div>
      <dark-theme-switch class="switch" />
      <el-form ref="ruleFormRef" :model="account" status-icon :rules="rules" class="demo-ruleForm">
        <el-form-item prop="name">
          <el-input
            v-model="account.name"
            size="large"
            class="input_width"
            autocomplete="off"
            prefix-icon="User"
            placeholder="请输入登录账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="account.password"
            size="large"
            show-password
            class="input_width"
            type="password"
            prefix-icon="Key"
            autocomplete="off"
            placeholder="请输入登录密码"
          />
        </el-form-item>
        <button class="btn" @click="submitForm(ruleFormRef)">
          <span class="btn-text">登录</span>
        </button>
      </el-form>
    </div>
    <div :class="{ wave: true, [waveClassName]: true }"></div>
    <ul class="bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.linear {
  background: linear-gradient(to bottom right, #007dff, #4270b3);
}
.darkLinear {
  background: linear-gradient(to bottom right, #0c2068, #2c32bb);
}
.display_center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.input_width {
  width: 250px;
}
.frosted-glass {
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(6px);
  transition: 0.8s ease;
  border-radius: 8px;
  box-shadow: 1.3px 2px 3.7px rgb(0 0 0 / 2%), 3.1px 4.9px 8.9px rgb(0 0 0 / 3%), 2px -4px 3.7px rgb(0 0 0 / 2%),
    3.1px 4.9px 8.9px rgb(0 0 0 / 3%), 1.3px 2px 3.7px rgb(0 0 0 / 2%), 3.1px 4.9px 8.9px rgb(0 0 0 / 3%);
  &:hover {
    box-shadow: 1.2px 1px 1.6px rgb(0 0 0 / 2%), 3px 2.6px 4px rgb(0 0 0 / 3%), 6.2px 5.3px 8.2px rgb(0 0 0 / 5%),
      -4px 3px 16.8px rgb(0 0 0 / 6%), 3px 1px 46px rgb(0 0 0 / 9%);
  }
}
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  .card {
    position: relative;
    z-index: 1000;
    box-sizing: border-box;
    height: 70%;
    width: 70%;
    min-width: 350px;
    background-color: #ffffff00;
    :deep(.el-input__wrapper) {
      background-color: transparent;
      box-shadow: 0 0 10px 1px rgb(255 255 255 / 39%) inset;
      &:hover {
        box-shadow: 5px 4px 11px 0px rgb(47 44 44 / 17%), 2px 3px 10px 1px rgb(255 255 255 / 39%) inset;
      }
    }
    :deep(.el-form) {
      display: flex;
      flex-direction: column;
    }
    :deep(.el-input__inner),
    :deep(.el-input__prefix),
    :deep(.el-input__suffix),
    :deep(.el-input__password) {
      color: hsl(170, 100%, 41%) !important;
    }
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
  .wave {
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: -100px;
  }
  .waveSvg {
    background: url(@/assets/svg/wave.svg);
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 100%;
  }
  .darkWaveSvg {
    background: url(@/assets/svg/darkWave.svg);
    background-repeat: no-repeat;
    background-position: right bottom;
    background-size: 100%;
  }
  .bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    height: 80%;
    overflow: hidden;
    li {
      position: absolute;
      bottom: -200px;
      width: 40px;
      height: 40px;
      list-style: none;
      animation: square 15s infinite;
      transition-timing-function: linear;
      border-radius: 50%;
      background: transparent;
      box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.5);
      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        transform: scale(0.25) translate(-70%, -70%);
        background: radial-gradient(#fbf5f52b, #7e2c2c00);
        border-radius: 50%;
      }
      &::after {
        content: '';
        position: absolute;
        width: 70%;
        height: 70%;
        transform: scale(0.1) translate(100%, 120%);
        background: radial-gradient(#fbf5f52b, #7e2c2c00);
        border-radius: 50%;
      }
      &:nth-child(1) {
        left: 10%;
      }
      &:nth-child(2) {
        left: 20%;
        width: 90px;
        height: 90px;
        animation-delay: 2s;
        animation-duration: 7s;
      }
      &:nth-child(3) {
        left: 25%;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-duration: 8s;
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 32%;
        width: 100px;
        height: 100px;
        animation-delay: 5s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
        animation-duration: 15s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 30px;
        height: 30px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 60px;
        height: 60px;
        animation-delay: 5s;
      }
    }
    @keyframes square {
      0% {
        opacity: 0.5;
        transform: translateY(0px) rotate(45deg);
      }
      25% {
        opacity: 0.75;
        transform: translateY(-400px) rotate(90deg);
      }
      50% {
        opacity: 1;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }
}
.title {
  position: absolute;
  left: 50%;
  top: 150px;
  min-width: 200px;
  transform: translateX(-50%);
  font-size: 32px;
  font-weight: 600;
  color: rgb(245 245 245 / 82%);
  text-shadow: 0 0 6px rgba(182, 211, 207, 1), 0 0 30px rgba(182, 211, 207, 0.4), 0 0 12px rgba(15, 115, 223, 0.6),
    0 0 22px rgba(38, 101, 168, 0.8), 0 0 38px rgba(80, 153, 231, 0.9), 0 0 60px rgb(59, 139, 224);
}

.btn {
  width: 100%;
  height: 40px;
  color: rgb(184 176 176);
  border-radius: 4px;
  background: transparent;
  border: 0px;
  box-shadow: 0 0 10px 1px rgb(255 255 255 / 39%) inset;
  cursor: pointer;
  &:hover {
    box-shadow: 5px 4px 11px 0px rgb(47 44 44 / 17%), 2px 3px 10px 1px rgb(255 255 255 / 39%) inset;
  }
  &:active {
    transform: scale(0.9, 0.9);
  }
}
.drop {
  position: absolute;
  left: 45%;
  z-index: 2000;
  top: 170px;
  width: 50px;
  height: 50px;
  background-color: transparent;
  border-radius: 29% 71% 37% 63%/27% 45% 55% 73%;
  box-shadow: 4px 3px 6px 0px rgb(47 44 44 / 17%), -1px -1px 10px 1px rgb(255 255 255 / 39%) inset;
  animation: move 6s linear infinite;
  &::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 8px;
    height: 8px;
    width: 8px;
    border-radius: 28% 72% 46% 54%/66% 62% 38% 34%;
    background: radial-gradient(rgb(251 245 245 / 40%), rgba(126, 44, 44, 0));
    animation: move 1s linear infinite;
  }
  &::after {
    content: '';
    position: absolute;
    left: 22px;
    top: 11px;
    height: 4px;
    width: 4px;
    border-radius: 28% 72% 38% 62%/43% 47% 53% 57%;
    background: radial-gradient(rgb(251 245 245 / 40%), rgba(126, 44, 44, 0));
    animation: move 1s linear infinite;
  }
  &:nth-child(1) {
    border-radius: 30% 70% 48% 52% / 38% 39% 61% 62%;
    transform: scale(1.3) translate(40px, -32px);
    animation: move 3s linear infinite;
  }
  &:nth-child(2) {
    border-radius: 42% 58% 32% 68% / 29% 36% 64% 71%;
    transform: scale(0.5) translate(-169px, 128px);
    animation: move 2s linear infinite;
  }
  &:nth-child(3) {
    border-radius: 63% 37% 69% 31% / 47% 50% 50% 53%;
    transform: scale(0.7) translate(176px, -20px);
    animation: move 4s linear infinite;
  }
  @keyframes move {
    25% {
      border-radius: 36% 64% 52% 48% / 42% 48% 52% 58%;
    }
    50% {
      border-radius: 37% 63% 50% 50% / 53% 54% 46% 47%;
    }
    75% {
      border-radius: 36% 64% 49% 51% / 42% 47% 53% 58%;
    }
  }
}
</style>
