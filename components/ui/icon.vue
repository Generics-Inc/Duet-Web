<script setup lang="ts">
import icons, {type IconsType} from "@/app/icones";

interface Props {
  icon: IconsType;
  size?: string;
  strokeWidth?: string;
}

const props = defineProps<Props>();
</script>

<template>
  <define-icon
      :icons="icons"
      v-bind="props"
  />
</template>
