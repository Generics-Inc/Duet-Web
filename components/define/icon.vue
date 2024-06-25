<script setup lang="ts" generic="T extends IconsInnerType">
import type {IconsInnerType} from "@/composables/defineIcons";
import {Icon} from "@iconify/vue";

interface Props {
  icons: T;
  icon: keyof T;
  size?: string;
  strokeWidth?: string;
}

const props = defineProps<Props>();

const iconValue = computed(() => props.icons[props.icon]);
const iconSize = computed(() => {
  const size = props.size ?? '1em';
  if (String(Number(size)) === size) return `${size}px`;
  else return size;
});
</script>

<template>
  <icon
      class="icon"
      :class="{
        'icon--stroke-width': strokeWidth
      }"
      :style="{
        '--sw': strokeWidth
      }"
      :icon="iconValue"
      :width="iconSize"
      :height="iconSize"
  />
</template>

<style lang="scss" scoped>
.icon {
  --sw: '';
  display: inline-block;
  vertical-align: middle;

  &--stroke-width * {
    stroke-width: var(--sw);
  }
}
</style>
