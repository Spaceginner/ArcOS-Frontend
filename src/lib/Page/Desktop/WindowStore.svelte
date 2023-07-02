<script lang="ts">
  import app from "../../../main";
  import type { App } from "../../../ts/applogic/interface";

  import {
    ProcessStore,
    focusedProcessPid,
    isFullscreenWindow,
    maxZIndex
  } from "../../../ts/applogic/store";
  import { getWindowElement } from "../../../ts/window/main";
  import Window from "./WindowStore/Window.svelte";

  let oa: App[] = [];

  WindowStore.subscribe((v) => {
    oa = [];

    if (v) oa = v;

    const openedStore = get(ProcessStore);

    for (let i = 0; i < openedStore.length; i++) {
      if (openedStore[i].state.windowState.fll)
        return isFullscreenWindow.set(true);
    }

    isFullscreenWindow.set(false);
  });

  focusedProcessPid.subscribe((v) => {
    if (getWindow(v)?.info.custom) return;

    $maxZIndex++;

    if (!v || v.startsWith("error_")) {
      if (!v) return;

      const el = document.querySelector(`#${v}`) as HTMLDivElement;

      if (!el) return;

      el.style.zIndex = `${$maxZIndex}`;

      return;
    }

    const appData = getWindow(v);

    if (!appData) return;

    const element = getWindowElement(appData);

    if (!element) return;

    element.style.zIndex = `${$maxZIndex}`;
  });
</script>

<div class="winstore">
  {#each oa as app}
    {#if app && !app.disabled}
      <Window {app} />
    {/if}
  {/each}
</div>
