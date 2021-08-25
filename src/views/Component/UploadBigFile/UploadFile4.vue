<!--
 * @Author: Lvhz
 * @Date: 2021-08-20 09:56:10
 * @Description: 切片上传，这里直接使用抽样hash（因为快）
-->
<template>
  <div>
    <input ref="fileInput" type="file" name="file" @change="handlerFileChange">
    <div>
      <p>计算hash的进度</p>
      <el-progress style="margin-top: 20px; width: 500px;" :stroke-width="20" :text-inside="true" :percentage="hashProgress" />
    </div>
    <div>
      <!-- 如果progress < 0，就报错，显示红色；100成功 -->
      <div class="cube-container" :style="{width: cubeWidth+'px'}">
        <div v-for="chunk in chunkList" :key="chunk.name" class="cube">
          <div :style="{height: chunk.progress+'%'}" :class="{'uploading': chunk.progress > 0 && chunk.progress < 100, 'success': chunk.progress === 100, 'error': chunk.progress < 0}" />
          <i v-if="chunk.progress > 0 && chunk.progress < 100" class="el-icon-loading" style="color: #f56c6c" />
        </div>
      </div>
    </div>

    <el-button type="primary" style="margin-top: 20px;" @click="handlerSubmit">点击上传</el-button>
  </div>
</template>

<script setup>
import { createFileChunk, calculateHashSample } from '@/utils/file'
// import { file2Base64, createFileChunk, calculateHashWorker, calculateHashIdle, calculateHashSample, calculateHashDouble } from '@/utils/file'
import { CommonApi } from '@api'
// import { ElMessage } from 'element-plus'
import { ref, computed } from 'vue'

const CHUNK_SIZE = 1 * 1024 * 1024 // 初始化切片大小为 1M

const fileInput = ref(null)
const fileRef = ref(null)
const chunkList = ref([])
const hashProgress = ref(0)

const cubeWidth = computed(() => Math.ceil(Math.sqrt(chunkList.value.length)) * 16) 

const handlerFileChange = async (e) => {
  const [file] = e.target.files
  if (!file) return null
  fileRef.value = file
}

// 上传按钮点击
const handlerSubmit = async () => {
  if(!fileRef.value) return
  let chunks = createFileChunk(fileRef.value, CHUNK_SIZE)
  const hash = await calculateHashSample(fileRef.value)
  chunks = chunks.map((chunk, index) => {
    // 切片的名字，hash + index
    const name = hash + '-' + index
    return {
      hash,
      name,
      index,
      chunk: chunk.file,
      progress: 0
    }
  })
  // 上传切片
  await uploadChunks(chunks)
  // 切片传送完毕，发送合并切片请求
  await mergeRequest(fileRef.value, CHUNK_SIZE, hash)
}
// 上传切片
const uploadChunks = async chunks => {
  const requests = chunks.map((chunk) => {
    return {
      chunk: chunk.chunk,
      hash: chunk.hash,
      name: chunk.name
    }
  }).map((params, index) => CommonApi.uploadfileChunk(params, {
    onUploadProgress: (progress) => {
      // 不是整体的进度条了，而是每个区块有自己的进度条，整体的进度条需要计算
      chunkList.value[index].progress = Number(((progress.loaded / progress.total) * 100).toFixed(2))
    }
  }))
  await Promise.all(requests)
}
const mergeRequest = async (file, size, hash) => {
  const params = {
    ext: file.name.split('.').pop(),
    size: size,
    hash: hash
  }
  await CommonApi.mergefile(params)
}

</script>

<style lang="scss" scoped>
.cube-container{
  .cube{
    width: 14px;
    height: 14px;
    line-height: 12px;
    border: 1px solid black;
    background-color: #eee;
    float: left;
    >.success{
      background-color: green;
    }
    >.uploading{
      background-color: blue;
    }
    >.error{
      background-color: red;
    }
  }
}
</style>
