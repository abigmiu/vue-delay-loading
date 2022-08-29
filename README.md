用途： 在 x 秒后显示 loading

比如 x = 300

现在请求一个接口。 用时500ms

就会在 300 - 500 这个时间段显示 loading

如果用时 200ms， 就不会显示 loading

用法：
```vue
<script setup lang="ts">
import { ref } from 'vue'
const loading = ref(true)
setTimeout(() => {
    loading.value = false
}, 5000);
</script>
<template>
  <div>
    <div v-loading:2000="loading"></div>
  </div>
</template>
```

核心： `setTimeOut`
在 loading.ts 里面声明了一个 State 类。用来处理是否显示

在指令 mounted 的时候将 new State() 挂载到 el 上。
当 update 的时候。 在 State 的 toggleStatus 判断是否显示 loading 效果


还有一种延迟显示 loading 的方法就是在请求的时候自己处理是否显示。不过这样每一次请求都需要处理。 所以诞生了这个 demo。

推荐使用 `VueRequest` [https://github.com/AttoJS/vue-request](https://github.com/AttoJS/vue-request)

延迟 loading 效果演示 [https://next.attojs.org/guide/documentation/loadingDelay.html#loadingdelay](https://next.attojs.org/guide/documentation/loadingDelay.html#loadingdelay)
