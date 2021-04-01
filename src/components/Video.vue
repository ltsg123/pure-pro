<template>
  <div class="video-box" element-loading-background="rgba(0, 0, 0, 0.1)">
    <video id="my-player" class="video-js video-css" controls muted autoplay>
      <source :src="url" />
    </video>
    <div class="close-div">
      <img class="close-svg" src="/img/关闭.svg" @click="closeVideo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import videojs, { VideoJsPlayer } from 'video.js';
import 'video.js/dist/video-js.css';

@Component
export default class extends Vue {
  @Prop() private url!: string;
  private player!: VideoJsPlayer;

  // AR学校特殊接口
  private async mounted(): Promise<void> {
    if (this.url) {
      this.player = videojs('my-player');
    }
  }

  private beforeDestroy(): void {
    if (this.player) {
      this.player.dispose();
    }
  }

  private closeVideo() {
    this.$emit('close');
  }
}
</script>

<style lang="scss">
.video-box {
  position: relative;
  .video-css {
    width: 100%;
    height: 800px;
  }
  .close-div {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    width: r(35);
    height: r(35);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background: rgba(27, 27, 27, 0.9);
    }
    .close-svg {
      cursor: pointer;
      width: r(20);
    }
  }
}
</style>
