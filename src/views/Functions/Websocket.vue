<template>
  <div>
    <label>
      webSocket地址：
    </label>
    <input v-model="url" />
    <button @click="open">开启</button>
    <button @click="close">关闭WebSocket连接</button>
    <label>
      发送消息：
    </label>
    <input v-model="sendMessage" />
    <button @click="sendMes">发送消息</button>
    <div v-for="(item, index) in messages" :key="index">
      <div>
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class extends Vue {
  private url: string;
  private webSocket: WebSocket | undefined;
  private messages: string[];
  private sendMessage: string;
  // 存在不能实时获取message的问题
  private heartCheck = {
    timeout: 5000, // 5s钟发一次心跳
    timeoutObj: -1,
    serverTimeoutObj: -1,
    reset: () => {
      clearTimeout(this.heartCheck.timeoutObj);
      clearTimeout(this.heartCheck.serverTimeoutObj);

      return this.heartCheck;
    },
    start: (websocket: WebSocket) => {
      this.heartCheck.timeoutObj = setTimeout(() => {
        // 这里发送一个心跳，后端收到后，返回一个心跳消息，
        // onmessage拿到返回的心跳就说明连接正常
        if (websocket) {
          websocket.send('ping');
          const message = '发送消息：ping';
          this.messages.push(message);
          this.heartCheck.serverTimeoutObj = setTimeout(() => {
            // 如果超过一定时间还没重置，说明后端主动断开了
            if (websocket) {
              this.close(); // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
            }
          }, this.heartCheck.timeout);
        }
      }, this.heartCheck.timeout);
    }
  };

  constructor() {
    super();
    this.url = '';
    this.messages = [];
    this.sendMessage = '';
    this.webSocket = undefined;
  }

  public open(): void {
    if (this.webSocket !== undefined) {
      return;
    }
    // ws://192.168.1.4:9121/warningSocket
    this.webSocket = new WebSocket(this.url);
    this.webSocket.onmessage = e => this.onMessage(e);
    this.webSocket.onerror = e => this.onError(e);
    this.webSocket.onclose = e => this.onClose(e);
    this.webSocket.onopen = () => {
      const message = '连接成功：' + this.url;
      this.messages.push(message);
      if (this.webSocket) {
        this.heartCheck.reset().start(this.webSocket);
      }
    };
  }

  public close(): void {
    if (this.webSocket === undefined) {
      return;
    }

    this.webSocket.close();
    this.webSocket = undefined;
  }

  private onMessage(e: MessageEvent): void {
    if (this.webSocket) {
      this.heartCheck.reset().start(this.webSocket);
    } // 拿到任何消息都说明当前连接是正常的
    const message = '获得数据：' + e.data;
    this.messages.push(message);
  }

  private onError(e: Event): void {
    const message = '连接发生错误：' + e;
    this.messages.push(message);
    this.close();
    this.open();
  }

  private onClose(e: CloseEvent): void {
    const message = '关闭成功：' + e;
    this.messages.push(message);
  }

  private sendMes() {
    if (this.webSocket) {
      const message = '发送消息：' + this.sendMessage;
      this.messages.push(message);
      this.webSocket.send(this.sendMessage);
    }
  }
}
</script>
