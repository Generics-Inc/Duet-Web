import defineIcons from "@/composables/defineIcons";

const icons = defineIcons({
    Sun: 'tabler:sun-filled',
    Moon: 'heroicons:moon-16-solid',
    Down: 'ci:chevron-down',
    Star: 'ph:star-fill',
    Email: 'ic:round-email',
    Check: 'fa6-solid:check',
    Loading: 'line-md:loading-loop',
    BrokenHeart: 'icon-park-outline:dislike',
    Send: 'mdi:email-send-outline'
});

export type IconsType = keyof typeof icons;
export default icons;
