<template>
  <div>
    <router-view :key="$router.path"></router-view>
  </div>
</template>

<script>

export default {
  name: 'home',

  data: () => ({
    //
  })
}
</script>
