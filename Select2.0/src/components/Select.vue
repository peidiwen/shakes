<template>
  <div class="container">
    <div class="show" v-if="!control">
      <video style="width:100vw;height:100vh" src="../video/单抽出金.mp4" @click="close"></video>
    </div>
    <n-space vertical>
      <n-gradient-text :size="64" :gradient="linear" :class="{ 'member-active': videoEnd }" class="member">{{ member }}
      </n-gradient-text>
      <n-button v-if="control" size="large" @click="play">play</n-button>
    </n-space>
  </div>

</template>
<script lang="ts" setup>
import { ref } from "@vue/reactivity"
import { data } from '../data'
import { max } from '../data'
let i: number = 0;
let inte: NodeJS.Timeout | undefined;
let control = ref(true);
const linear: string = "linear-gradient(to right, #845ec2, #a55dbd, #c15db5, #d95fab, #ec64a0, #f66b93, #fc7587, #ff807d, #ff8f72, #ffa168, #ffb461, #ffc75f)";
const member = ref<string | null>("default");
const videoEnd = ref<boolean>(false);
function start(): void {

  inte = setInterval(() => {

    if (i === max - 1) {
      i = -1
    }
    i++;
  }, 50)

}
function stop() {
  clearInterval(inte);
  member.value = data[i].name;

};
function close() {
  const v = document.getElementsByTagName("video")[0];
  v.pause();
  control.value = !control.value
  stop();
  member.value = data[i].name;
  setTimeout(() => {
    videoEnd.value = true;
  }, 100);

}
function play() {
  start();
  member.value = null;
  videoEnd.value = false;
  control.value = !control.value
  setTimeout(() => {
    const v = document.getElementsByTagName("video")[0];
    v.play();

    v.addEventListener('ended', function () { //结束
      control.value = !control.value
      stop();
      member.value = data[i].name;
      setTimeout(() => {
        videoEnd.value = true;
      }, 100);
    }, false);
  }, 1);

}


</script>
<style scoped>
body {
  overflow: hidden;
}

video {
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  object-fit: fill;
  /*这里是关键*/
  width: auto;
  height: auto;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-size: cover;
}

.member {
  pointer-events: none;
  transform: translateY(-55vh);
  transition: display 0.1s ease-in-out;
}

.member-active {
  transform: translateY(0) !important;
  transition: transform 0.5s ease-in-out;
}
</style>