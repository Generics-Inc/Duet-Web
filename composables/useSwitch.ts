import type {ComputedRef, Ref} from "vue";

export interface UseSwitchConfig {
    maxQueue?: number;
    defaultStatus?: boolean;
    minSwitchStatusDelay?: number;
}
export interface UseSwitch {
    show(isAddInQueue?: boolean): void;
    hide(): void;
    status: Ref<boolean>;
    queue: ComputedRef<number>;
    config: Required<UseSwitchConfig>;
}

export default function (config?: UseSwitchConfig): UseSwitch {
    const _config: Required<UseSwitchConfig> = {
        maxQueue: 100,
        defaultStatus: false,
        minSwitchStatusDelay: 500,

        ...config
    };

    const currentStatus = reactive<true[]>(_config.defaultStatus ? [true] : []);
    const computedStatus = ref<boolean>(!!currentStatus.length);
    const minHideDelay = _config.minSwitchStatusDelay;
    let showTimeStamp = 0;
    let hideDelay: NodeJS.Timeout;

    function show(isAddInQueue: boolean = true) {
        if (isAddInQueue && currentStatus.length < _config.maxQueue) currentStatus.push(true);
        showTimeStamp = !showTimeStamp ? Date.now() : showTimeStamp;
        clearTimeout(hideDelay);
        calculateComputedStatus(currentStatus);
    }
    function hide() {
        currentStatus.splice(0, 1);
    }
    function calculateComputedStatus(status: true[]) {
        if (!status.length) {
            hideDelay = setTimeout(() => {
                computedStatus.value = false;
                showTimeStamp = 0;
            }, minHideDelay - (Date.now() - showTimeStamp));
        } else {
            computedStatus.value = true;
        }
    }

    watch(currentStatus, calculateComputedStatus);

    return {
        show,
        hide,
        status: computedStatus,
        queue: computed(() => currentStatus.length),
        config: _config
    };
}
