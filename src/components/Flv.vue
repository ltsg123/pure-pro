<template>
  <div
    class="video-box"
    element-loading-background="rgba(0, 0, 0, 0.1)"
    style="width:100%;height:100%"
  >
    <video
      class="video"
      ref="player"
      controls
      muted
      autoplay
      style="width:100%;height:100%"
    />
    <div class="close-div">
      <img class="close-svg" src="/img/关闭.svg" @click="closeVideo" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import flvjs from 'flv.js';

@Component
export default class extends Vue {
  @Prop() private url!: string;
  private player!: flvjs.Player;

  // AR学校特殊接口
  private async mounted(): Promise<void> {
    if (this.url) {
      let type = this.url.slice(this.url.lastIndexOf('.') + 1);
      if (type !== 'mp4') {
        // 确定视频流格式，flv.js仅支持flv或者mp4的类型
        type = 'flv';
      }
      if (!flvjs.isSupported()) {
        return;
      }
      const video = this.$refs.player as HTMLVideoElement;
      if (video) {
        this.player = flvjs.createPlayer({
          type: type,
          isLive: true,
          url: this.url
        });
        this.player.attachMediaElement(video);
        try {
          this.player.load();
          this.player.play();
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  private beforeDestroy(): void {
    if (this.player) {
      this.player.pause();
      this.player.unload();
      this.player.detachMediaElement();
      this.player.destroy();
    }
    console.log('video destroy');
  }

  private closeVideo() {
    this.$emit('close');
  }
}
</script>

<style lang="scss">
.video-box {
  position: relative;
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
      width: 25px;
    }
  }
}
</style>
