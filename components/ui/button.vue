<script setup lang="ts">
interface Props {
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
}
interface Emits {
  (e: 'click', v: void): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'button'
});
const emit = defineEmits<Emits>();
</script>

<template>
  <button
      class="button"
      :class="{
        'button--disabled': disabled
      }"
      :type="props.type"
      @click="() => emit('click')"
  >
    <slot/>
  </button>
</template>

<style lang="scss">
@import "@colors";

.button {
  & * {
    color: var($textColor1);
  }
}
</style>
<style scoped lang="scss">
@import "@colors";

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  padding: 14px 20px;
  background-color: transparent;
  color: var($textColor1);
  border: 0;
  border-radius: 10px ;
  box-shadow: var($boxShadow);
  cursor: pointer;
  user-select: none;
  transition: box-shadow .15s;

  &--disabled {
    pointer-events: none;
  }
}
</style>
