import type {Ref} from "vue";

export type ThemesClient = 'light' | 'dark';
export type ThemesReturn = {
    selectedTheme: Readonly<Ref<ThemesClient>>;
    selectTheme: (newTheme: ThemesClient) => void;
};

const storeKey = 'duet:theme';
const themes: ThemesClient[] = ['light', 'dark'];

const getTheme = (): ThemesClient | null => localStorage.getItem(storeKey) as ThemesClient;
const saveTheme = (newTheme: ThemesClient): void => localStorage.setItem(storeKey, newTheme);

export default defineNuxtPlugin(() => {
    const state = ref<ThemesClient>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const storedTheme = getTheme();
    if (!storedTheme) saveTheme(state.value);
    else if (themes.includes(storedTheme)) state.value = storedTheme;

    watch(state, value => {
        const page = document.getElementsByTagName('html')[0];
        page.setAttribute('class', value);

        saveTheme(value);
    }, { immediate: true });

    const payload: ThemesReturn = {
        selectedTheme: state,
        selectTheme: (newTheme: ThemesClient) => state.value = newTheme
    };

    return {
        provide: {
            themes: payload
        }
    };
});
