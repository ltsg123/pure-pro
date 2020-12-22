<template>
  <div class="main-app-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>

<style lang="scss">
.main-app-container {
  height: 100%;
  width: 100%;
}
</style>
