import mitt from 'mitt';
import type { Handler, WildcardHandler } from 'mitt';
import type { Events } from "~/app/events";

export type EvBusEvents = keyof Events;

const emitter = mitt<Events>();

interface EvBusPluginReturn {
    provide: {
        event<Key extends keyof Events>(type: Key, event: Events[Key]): void;
        event<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
        eventDelay<Key extends keyof Events>(delay: number, type: Key, event: Events[Key]): void;
        eventDelay<Key extends keyof Events>(delay: number, type: undefined extends Events[Key] ? Key : never): void;
        listen<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
        listen(type: '*', handler: WildcardHandler<Events>): void;
        unListen<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
        unListen(type: '*', handler: WildcardHandler<Events>): void;
    }
}

export default defineNuxtPlugin((): EvBusPluginReturn => {
    return {
        provide: {
            event: emitter.emit,
            eventDelay(delay, type, event?) {
                // @ts-ignore
                setTimeout(() => emitter.emit(type, event), delay);
            },
            listen: emitter.on,
            unListen: emitter.off
        }
    };
});
