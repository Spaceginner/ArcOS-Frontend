import { get, writable, Writable } from "svelte/store";
import { Log, LogLevel } from "../console";
import type { App, Process } from "./interface";

export const AppStore: Writable<{[id:string]: App}> = writable<{[id:string]: App}>({});
export const ProcessStore: Writable<{[pid:number]: Process}> = writable<{[pid:number]: Process}>({});
export const isFullscreenWindow: Writable<boolean> = writable<boolean>(false);
export const maxZIndex = writable<number>(1e9);
export const focusedProcessPid: Writable<number> = writable<number>(null);

export function getApp(id: string): App {
  return get(AppStore)[id];
}

ProcessStore.subscribe((processStore) => {
  Log({
    msg: "Updating isFullscreenWindow",
    source: "store.ts: ProcessStore Subscriber",
    level: LogLevel.info
  });

  isFullscreenWindow.set(false);

  for (const strI in processStore) {
    const i = parseInt(strI);
    const windowState = processStore[i].windowState;
  
    if (windowState.fullscreen && !windowState.minimized) isFullscreenWindow.set(true);
  }
});

// DUMMY FUNCTION
export function getWindow(appId: string) {

}

// DUMMY FUNCTION
export function updateStores() {

}

// DUMMY FUNCTION
export function getOpenedStore() {
  
}
