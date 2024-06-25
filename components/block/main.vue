<script setup lang="ts">
import ResizeObserver from "~/components/resizeObserver.vue";

const blockRef = ref<HTMLDivElement>();
const clientHeight = computed(() => blockRef.value?.clientHeight);

function goToSecondBlock() {
  const content = document.getElementById('appContent');

  content?.scrollTo({
    behavior: 'smooth',
    top: clientHeight.value
  });
}

function onResize() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
</script>

<template>
  <div
      class="block-main w-fix"
      ref="blockRef"
  >
    <div class="block-main__title">
      <icon-duet/>
      <span>Приложение для парочек. Кинотека, Рецепты, Календарь</span>
    </div>
    <div
        class="block-main__drop-down"
        @click="goToSecondBlock"
    >
      <span>И многое другое</span>
      <div class="block-main__drop-down__icon">
        <ui-icon
            icon="Down"
            size="60"
        />
        <ui-icon
            icon="Down"
            stroke-width="1.5"
            size="80"
        />
      </div>
    </div>

    <resize-observer
        emit-on-mount
        @notify="onResize"
    />
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.block-main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  user-select: none;

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    & .icon-duet {
      width: min(calc(80vw), 520px);
    }
    & span {
      font-size: 16px;
      font-weight: bolder;
      text-align: center;
      width: 80vw;
      color: var($textColor1);
    }
  }
  &__drop-down {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 90px;
    overflow: hidden;
    cursor: pointer;

    & span {
      font-size: 16px;
      font-weight: bolder;
      color: var($textColor1);
    }
    &__icon {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      transition: .3s;

      & .icon {
        color: var($textColor1);

        &:last-child {
          margin-top: -60px;
        }
      }
    }

    &:hover {
      .block-main {
        &__drop-down {
          &__icon {
            margin-top: 5px;
          }
        }
      }
    }
  }
}
</style>
