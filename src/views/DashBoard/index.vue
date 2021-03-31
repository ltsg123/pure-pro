<template>
  <div>
    index
    <router-link to="/video">视频播放</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {}
</script>
