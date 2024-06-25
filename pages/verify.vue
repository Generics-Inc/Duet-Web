<script lang="ts" setup>
const query = useRoute();

const email = query.query.email as string;
const code = query.query.code as string;
const mode = query.query.mode as string;

const isRightConfigure = !!email?.length && !!code?.length && !!mode?.length;
const isError = ref(false);
const isSuccess = ref(false);
const isLoading = computed(() => !isError.value && !isSuccess.value);

function fetchRequest() {
  useAPIFetch('POST', mode === '1' ? 'mails/subscribe-verify' : 'mails/unsubscribe', {
    body: {
      email,
      code: parseInt(code)
    }
  }).then(r => {
    if (r.status === 'success') isSuccess.value = true;
    else isError.value = true;
  }).catch(() => {
    isError.value = true;
  });
}

if (isRightConfigure) fetchRequest();
</script>

<template>
  <div class="page-verify">
    <div class="page-verify__info">
      <template v-if="!isRightConfigure">
        <ui-icon
            size="80"
            icon="BrokenHeart"
        />
        <span>Ошибка конфигурации запроса</span>
      </template>
      <template v-else-if="isLoading">
        <ui-icon
            size="80"
            icon="Loading"
        />
      </template>
      <template v-else-if="isSuccess">
        <ui-icon
            size="80"
            icon="Send"
        />
        <span v-if="mode === '1'">Вы успешно подписались на обновления!<br>Спасибо!</span>
        <span v-else>Вы успешно отписались от обновлений!<br>Жаль прощаться с вами 😞</span>
      </template>
      <template v-else>
        <ui-icon
            size="80"
            icon="BrokenHeart"
        />
        <span v-if="mode === '1'">Ошибка подтверждения почты.<br>Попробуй чуть позже</span>
        <span v-else>Ошибка отключения уведомлений.<br>Попробуй чуть позже</span>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@colors";

.page-verify {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    & span {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .5px;
      text-align: center;
      color: var($textColor1);
    }
    & .icon {
      color: var($textColor1);
    }
  }
}
</style>
