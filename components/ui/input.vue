<script setup lang="ts">
interface Props {
  type: string;
  placeholder?: string;
  isError?: boolean;
  modelValue: string;
}
interface Emits {
  (e: 'update:modelValue', v: string): void;
  (e: 'input', v: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const innerValue = ref('');

watch(() => props.modelValue, v => innerValue.value = v, { immediate: true });
watch(innerValue, v => emit('update:modelValue', v));

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit('input', target.value);
}
</script>

<template>
  <input
      class="input"
      :class="{
        'input--error': isError
      }"
      :type="type"
      :placeholder="placeholder"
      v-model="innerValue"
      @input="onInput"
  >
</template>

<style scoped lang="scss">
@import "@colors";

.input {
  font-size: 16px;
  padding: 13px 20px;
  background: transparent;
  border: 2px solid var($textColor1);
  border-radius: 15px;

  &::placeholder {
    font-weight: 500;
    color: var($textColor1);
    opacity: .8;
  }

  &--error {
    border: 2px solid var($error);
  }
}
</style>
