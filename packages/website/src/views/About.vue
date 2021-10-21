<!--
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
-->
<template>
  <div v-html="mdText"></div>
</template>

<script>
import { ref } from "vue";
import marked from "marked";
import testMd from "../docs/plugin-use/marked.md";

export default {
  setup() {
    const mdText = ref(marked(testMd));
    return { mdText };
  },
};
</script>
