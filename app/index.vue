<script lang="ts" setup>
const { $event } = useNuxtApp();

function onContentScroll(e: Event) {
  const target = e.target as HTMLDivElement;
  $event('onScrollContent', target);
}
</script>

<template>
  <div class="app">
    <div class="app__theme">
      <theme-picker/>
    </div>
    <div
        id="appContent"
        class="app__content"
        @scroll="onContentScroll"
    >
      <nuxt-layout>
        <nuxt-page/>
      </nuxt-layout>
    </div>
  </div>
</template>

<style lang="scss">
@import "@colors";

body {
  background-color: var($background);
  transition: .3s;
}
.app {
  overflow: hidden;

  &__content {
    height: 100vh;
    height: calc(var(--vh, 1vh) * 100);
    overflow-y: auto;
  }
  &__theme {
    position: relative;
    width: 100%;

    & .theme-picker {
      position: absolute;
      top: 10px;
      right: 18px;
    }
  }
}
</style>
