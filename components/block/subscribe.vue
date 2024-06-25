<script setup lang="ts">
const email = ref('');
const isEmailValid = ref(true);
const isErrorFetch = ref(false);
const isErrorSubscribe = ref(false);
const isSuccess = ref(false);
const loader = useSwitch({ minSwitchStatusDelay: 1000 });

function subscribe() {
  isErrorFetch.value = false;
  isErrorSubscribe.value = false;

  if (validateEmail()) {
    useAPIFetch('POST', 'mails/subscribe', {
      body: {
        email: email.value
      }
    }, { loader }).then(r => {
      if (r.status === 'success') isSuccess.value = true;
      else isErrorSubscribe.value = true;
    }).catch(() => {
      isErrorFetch.value = true;
    });
  }
}

function openGitHub() {
  window.open('https://github.com/Generics-Inc', '_blank');
}

function validateEmail() {
  isEmailValid.value = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
  return isEmailValid.value;
}
</script>

<template>
  <div class="block-subscribe w-fix">
    <form
        class="block-subscribe__form"
        @submit.prevent="subscribe"
        novalidate
    >
      <icon-duet/>
      <span class="block-subscribe__form__text">Приложение находится в разработке</span>
      <div class="block-subscribe__form__text">
        <span>Подпишись на рассылку, и получи уведомление, когда наше приложение выйдет</span>
        <ui-icon icon="Star"/>
      </div>
      <ui-input
          type="email"
          placeholder="Email"
          :is-error="!isEmailValid"
          v-model="email"
          @input="isEmailValid = true; isErrorFetch = false; isErrorSubscribe = false"
      />
      <div
          class="block-subscribe__form__error"
          v-if="!loader.status.value && !isSuccess"
      >
        <div
            class="block-subscribe__form__error__fetch"
            v-if="isErrorSubscribe"
        >
          Адрес электронной почты уже подписан
        </div>
        <div
            class="block-subscribe__form__error__fetch"
            v-else-if="isErrorFetch"
        >
          Ошибка подписки на обновления. Повтори попытку позже
        </div>
        <div
            class="block-subscribe__form__error__email"
            v-else-if="!isEmailValid"
        >
          Неверный формат почты
        </div>
      </div>
      <div class="block-subscribe__form__success">
        <div
            class="block-subscribe__form__success__fetch"
            v-if="isSuccess"
        >
          Подтверди пожалуйста подписку через письмо, отправленное на почту
        </div>
      </div>
      <ui-button
          type="submit"
          :disabled="isSuccess || loader.status.value"
      >
        <template v-if="loader.status.value">
          <ui-icon
              size="25"
              icon="Loading"
          />
        </template>
        <template v-else-if="isSuccess">
          <ui-icon
              size="25"
              icon="Check"
          />
          Успешно
        </template>
        <template v-else>
          <ui-icon
              size="25"
              icon="Email"
          />
          Подписаться
        </template>
      </ui-button>
    </form>
    <div
        class="block-subscribe__copyright"
        @click="openGitHub"
    >
      <span>© {{(new Date()).getFullYear()}} · Generics Inc.</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@colors";

.block-subscribe {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  user-select: none;

  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;

    & .icon-duet {
      width: min(220px, 60vw);
    }

    &__text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      font-size: 16px;
      width: 90vw;
      text-align: center;
      letter-spacing: 0.5px;
      color: var($textColor1);

      & .icon {
        min-width: 14px;
      }
      &:nth-child(2) {
        font-weight: bolder;
        padding-top: 5px;
      }
      &:nth-child(3) {
        font-size: 14px;
        padding-top: 15px;
      }
    }
    &__error {
      font-size: 14px;
      width: 90wv;
      text-align: center;
      margin-top: 5px;
      color: var($error);
    }
    &__success {
      font-size: 14px;
      width: 90wv;
      text-align: center;
      margin-top: 5px;
      color: var($success);
    }
    & .input {
      width: min(90vw, 650px);
      margin-top: 5px;
    }
    & .button {
      width: min(90vw, 250px);
      margin-top: 30px;
    }
  }
  &__copyright {
    position: absolute;
    bottom: 10px;
    cursor: pointer;
    color: var($textColor1);

    & span {
      font-weight: bolder;
    }
  }
}
</style>
