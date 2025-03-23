import { createEffect, createSignal, on, onCleanup } from "solid-js";

const useDebounceValue = (fn: (value: string) => void, delay = 700) => {
    const [value, setValue] = createSignal("");
    let timeId: ReturnType<typeof setTimeout>;

    createEffect(on(value, (v) => {
        if (timeId) {
            clearTimeout(timeId)
        }
        timeId = setTimeout(() => {
            fn(v)
        }, delay)
    }, { defer: true }))

    onCleanup(() => clearTimeout(timeId))

    return {
        value,
        debounce: (value: string) => {
            setValue(value)
        }
    }

}

export default useDebounceValue