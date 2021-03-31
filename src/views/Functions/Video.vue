<template>
  <div>
    <label>
      视频类型
    </label>
    <input v-model="data.type" />
    <label>
      视频地址
    </label>
    <input v-model="data.url" />
    <button @click="open">开启</button>
    <flv ref="video" v-if="isopen" :data="data" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Flv from '@/components/Flv.vue';

@Component({
  components: {
    Flv
  }
})
export default class extends Vue {
  private data: { type: string; url: string };
  private isopen: boolean;

  constructor() {
    super();
    this.data = { type: 'flv', url: '' };
    this.isopen = false;
  }

  private open() {
    this.isopen = false;
    this.$nextTick(() => {
      this.isopen = true;
    });
  }
}
</script>
