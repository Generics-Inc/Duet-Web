<script lang="ts" setup>
export interface ResizeObserverNotify {
  width: number;
  height: number;
}

interface Props {
  intervalEmits?: number;
  emitOnMount?: boolean;
  ignoreWidth?: boolean;
  ignoreHeight?: boolean;
}
interface Emits {
  (e: 'notify', v: ResizeObserverNotify): void;
}

const { intervalEmits, emitOnMount, ignoreWidth, ignoreHeight } = withDefaults(defineProps<Props>(), {
  intervalEmits: 0,
  emitOnMount: false,
  ignoreWidth: false,
  ignoreHeight: false
});
const emit = defineEmits<Emits>();

const refEl = ref<HTMLDivElement>();
let emitIntervalId: NodeJS.Timer | null;
let emitIntervalTimestamp: number | null;
let resizeObject: HTMLObjectElement | null;
let w: number;
let h: number;

function compareAndNotify () {
  const el = refEl.value!;

  if ((!ignoreWidth && w !== el.offsetWidth) || (!ignoreHeight && h !== el.offsetHeight)) {
    w = el.offsetWidth;
    h = el.offsetHeight;
    emitSize();
  }
}
function emitSize () {
  const sendEmit = () => emit('notify', {
    width: w,
    height: h,
  });

  clearInterval(emitIntervalId);
  emitIntervalId = setTimeout(() => {
    sendEmit();
    emitIntervalTimestamp = null;
    emitIntervalTimestamp = Date.now();
  }, emitIntervalTimestamp === null ? 0 : intervalEmits - (Date.now() - emitIntervalTimestamp));
}
function addResizeHandlers () {
  resizeObject?.contentDocument?.defaultView?.addEventListener('resize', compareAndNotify);
  compareAndNotify();
}
function removeResizeHandlers () {
  if (resizeObject && resizeObject.onload) {
    if (resizeObject.contentDocument)
      resizeObject.contentDocument.defaultView?.removeEventListener('resize', compareAndNotify);
    refEl.value!.removeChild(resizeObject);
    resizeObject.onload = null;
    resizeObject = null;
  }
}

onBeforeUnmount(() => removeResizeHandlers());
onMounted(() => {
  const el = refEl.value!;

  nextTick(() => {
    w = el.offsetWidth
    h = el.offsetHeight
    if (emitOnMount) emitSize();
  });

  resizeObject = document.createElement('object');
  resizeObject.setAttribute('aria-hidden', 'true');
  resizeObject.setAttribute('tabindex', '-1');
  resizeObject.onload = addResizeHandlers;
  resizeObject.type = 'text/html';
  resizeObject.data = 'about:blank';
  el.appendChild(resizeObject);
});
</script>

<template>
  <div
      class="resize-observer"
      tabindex="-1"
      ref="refEl"
  />
</template>

<style lang="scss">
.resize-observer {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  pointer-events: none;
  display: block;
  overflow: hidden;
  opacity: 0;

  & > object {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    pointer-events: none;
    z-index: -1;
  }
}
</style>
