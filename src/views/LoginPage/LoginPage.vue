<script setup lang="ts">
import { login } from '@/service/login'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useGlobalStore } from '@/store/global'
import { useSwitchDark } from '@/hooks/useChangeTheme'
const isDark = useSwitchDark()
const waveClassName = computed(() => (isDark.value ? 'darkWaveSvg' : 'waveSvg'))
const linearClassName = computed(() => (isDark.value ? 'darkLinear' : 'linear'))
const globalStore = useGlobalStore()
const router = useRouter()
const ruleFormRef = ref<FormInstance>()
const account = reactive<IAccountType>({
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
  <div :class="{ [linearClassName]: true, login: true, display_center: true }">
    <div class="card display_center frosted-glass">
      <div class="title">vue mini admin</div>
      <DarkThemeSwitch class="switch" />
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
        <button
          data-text="登录"
          class="btn btn-primary btn-ghost btn-border-stroke btn-text-float-up"
          @click="submitForm(ruleFormRef)"
        >
          <div class="btn-borders">
            <div class="border-top"></div>
            <div class="border-right"></div>
            <div class="border-bottom"></div>
            <div class="border-left"></div>
          </div>
          <span class="btn-text">登录</span>
        </button>
      </el-form>
    </div>
    <div :class="{ wave: true, [waveClassName]: true }"></div>
    <ul class="bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
    <div class="sdf"></div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  --hue: 190;
  --ease-in-duration: 0.25s;
  --ease-in-exponential: cubic-bezier(0.95, 0.05, 0.795, 0.035);
  --ease-out-duration: 0.65s;
  --ease-out-delay: var(--ease-in-duration);
  --ease-out-exponential: cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  padding: 12px 70px;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  text-decoration: none;
  background-color: hsl(var(--hue), 100%, 41%);
  border: 1px solid hsl(var(--hue), 100%, 41%);
  outline: transparent;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: 0.25s;
  &:hover {
    background: hsl(var(--hue), 100%, 31%);
  }
  &-primary {
    --hue: 171;
  }
  &-ghost {
    color: hsl(var(--hue), 100%, 41%);
    background-color: transparent;
    border-color: hsl(var(--hue), 100%, 41%);
    &:hover {
      color: white;
    }
  }
  &-border-stroke {
    border-color: hsla(var(--hue), 100%, 41%, 0.35);
    .btn-borders {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      .border-top {
        position: absolute;
        top: 0;
        width: 100%;
        height: 1px;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleX(0);
        transform-origin: left;
      }
      .border-right {
        position: absolute;
        right: 0;
        width: 1px;
        height: 100%;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleY(0);
        transform-origin: bottom;
      }
      .border-bottom {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1px;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleX(0);
        transform-origin: left;
      }
      .border-left {
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background: hsl(var(--hue), 100%, 41%);
        transform: scaleY(0);
        transform-origin: bottom;
      }
      .border-left {
        transition: var(--ease-out-duration) var(--ease-out-delay) var(--ease-out-exponential);
      }
      .border-bottom {
        transition: var(--ease-out-duration) var(--ease-out-delay) var(--ease-out-exponential);
      }

      .border-right {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }
      .border-top {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }
    }
    &:hover {
      color: hsl(var(--hue), 100%, 41%);
      background: transparent;

      .border-top,
      .border-bottom {
        transform: scaleX(1);
      }
      .border-left,
      .border-right {
        transform: scaleY(1);
      }
      .border-left {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }
      .border-bottom {
        transition: var(--ease-in-duration) var(--ease-in-exponential);
      }

      .border-right {
        transition: var(--ease-out-duration) var(--ease-out-delay) var(--ease-out-exponential);
      }
      .border-top {
        transition: var(--ease-out-duration) var(--ease-out-delay) var(--ease-out-exponential);
      }
    }
  }

  &-text-float-up {
    &::after {
      position: absolute;
      content: attr(data-text);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transform: translateY(35%);
      transition: 0.25s ease-out;
    }
    .btn-text {
      display: block;
      transition: 0.75s 0.1s var(--ease-out-exponential);
    }

    &:hover {
      .btn-text {
        opacity: 0;
        transform: translateY(-25%);
        transition: 0.25s ease-out;
      }

      &::after {
        opacity: 1;
        transform: translateY(0);
        transition: 0.75s 0.1s var(--ease-out-exponential);
      }
    }
  }
}
.linear {
  background: linear-gradient(to bottom right, #409eff, #003686);
}
.darkLinear {
  background: linear-gradient(to bottom right, #693280, #070a58);
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
    background-color: #ffffff00;
    :deep(.el-input__wrapper) {
      background-color: transparent;
      box-shadow: 0 0 0 1px #dcdfe6 inset;
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
  transform: translateX(-50%);
  color: #ffffffbf;
  font-size: 32px;
  font-weight: 600;
}
</style>
