<script setup lang="ts">
const { $themes } = useNuxtApp();

const selectedTheme = computed(() => $themes?.selectedTheme.value);
</script>

<template>
  <div
      class="theme-picker"
      @click="$themes.selectTheme(selectedTheme === 'light' ? 'dark' : 'light')"
  >
    <transition name="fade">
      <ui-icon
          v-if="selectedTheme === 'light'"
          icon="Sun"
      />
      <ui-icon
          v-else
          icon="Moon"
      />
    </transition>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.theme-picker {
  position: relative;
  aspect-ratio: 1;
  cursor: pointer;

  & .icon {
    position: absolute;
    top: 0;
    right: 0;
    width: min(50px, 10vw);
    height: min(50px, 10vw);
    z-index: 2;
    color: var($textColor1);
  }
}
</style>
