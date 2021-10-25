<!--
 * @Author: Lvhz
 * @Date: 2021-09-23 15:30:15
 * @Description: Description
-->
<template>
  <div v-html="code"></div>
</template>

<script>
import { ref } from "vue";
import marked from "marked";
// import testMd from "../docs/plugin-use/marked.md";
import testMd from "../docs/button.md";

// marked.setOptions({
//   highlight: function (code, lang, callback) {
//     require("pygmentize-bundled")(
//       { lang: lang, format: "html" },
//       code,
//       function (err, result) {
//         callback(err, result.toString());
//       }
//     );
//   },
// });

export default {
  setup() {
    const code = ref(marked(testMd));
    return { code };
  },
};
</script>
