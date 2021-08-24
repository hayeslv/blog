<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 09:56:10
 * @Description: 计算md5（大文件上传前提）：使用 spark-md5
 *              1、web-worker计算md5
 *              2、利用空闲时间（idle，react中的原理）计算md5
 *              3、抽样hash
-->
<template>
  <div>
    <input ref="fileInput" type="file" name="file" @change="handlerFileChange">
    <el-progress style="margin-top: 20px; width: 500px;" :stroke-width="20" :text-inside="true" :percentage="workerProgress" />
    <el-progress style="margin-top: 20px; width: 500px;" :stroke-width="20" :text-inside="true" :percentage="idleProgress" />

    <el-button type="primary" style="margin-top: 20px;" @click="handlerWebworker">web-worker</el-button>
    <el-button type="primary" style="margin-top: 20px;" @click="handlerIdle">idle</el-button>
    <el-button type="primary" style="margin-top: 20px;" @click="handlerSample">抽样hash</el-button>
  </div>
</template>

<script setup>
import { file2Base64, createFileChunk, calculateHashWorker, calculateHashIdle, calculateHashSample } from '@/utils/file'
// import { CommonApi } from '@api'
// import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const CHUNK_SIZE = 1 * 1024 * 1024 // 初始化切片大小为 1M

const fileInput = ref(null)
const fileRef = ref(null)
const imgSrc = ref(null)
const workerProgress = ref(0)
const idleProgress = ref(0)

const handlerFileChange = async (e) => {
  const [file] = e.target.files
  if (!file) return null
  fileRef.value = file
  // 图片转base64
  imgSrc.value = await file2Base64(file)
}

// 使用web-worker计算hash
const handlerWebworker = async () => {
  if(!fileRef.value) return
  // 文件切片：计算文件chunks
  const chunks = await createFileChunk(fileRef.value, CHUNK_SIZE)
  console.time('worker')
  const hash = await calculateHashWorker(chunks, (e) => {
    const { progress } = e.data
    workerProgress.value = Number(progress.toFixed(2))
  })
  console.timeEnd('worker')
  console.log(hash);
}

// 使用idle空闲时间计算hash
const handlerIdle = async () => {
  if(!fileRef.value) return
  const chunks = await createFileChunk(fileRef.value, CHUNK_SIZE)
  console.time('idle')
  const hash = await calculateHashIdle(chunks, (data) => {
    const { progress } = data
    idleProgress.value = Number(progress.toFixed(2))
  })
  console.timeEnd('idle')
  console.log(hash);
}

// 抽样hash
const handlerSample = async () => {
  if(!fileRef.value) return
  // const chunks = await createFileChunk(fileRef.value, CHUNK_SIZE)
  console.time('sample')
  const hash = await calculateHashSample(fileRef.value)
  console.timeEnd('sample')
  console.log(hash);
}

</script>

<style lang="scss" scoped>
</style>
