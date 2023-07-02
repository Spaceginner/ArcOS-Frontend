<script lang="ts">
  import { isMinimized } from "../../../../ts/applogic/checks";
  import { getAppIcon, getOriginalIcon } from "../../../../ts/applogic/icon";
  import type { App } from "../../../../ts/applogic/interface";
  import {
    focusedProcessPid,
    maxZIndex,
    updateStores,
    AppStore,
  } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import { getWindowElement } from "../../../../ts/window/main";

  export let app: App;

  let showLabel = false;
  let minimized = false;

  UserData.subscribe((v) => {
    showLabel = v.sh.taskbar.labels;
  });

  AppStore.subscribe(() => {
    minimized = isMinimized(app.id);
  });

  function e() {
    if ($focusedProcessPid == app.id)
      app.state.windowState.min = !app.state.windowState.min;
    else app.state.windowState.min = false;

    updateStores();

    $maxZIndex++;
    $focusedProcessPid = app.id;

    const window = getWindowElement(app);

    window.style.zIndex = $maxZIndex.toString();
  }
</script>

<button
  class="appbutton"
  class:minimized
  on:click={e}
  class:activated={app.id == $focusedProcessPid}
>
  <img
    src={getOriginalIcon(app.id) || getAppIcon(app)}
    alt={app.info.name}
    class="icon"
  />
  {#if showLabel}
    <span>{app.info.name}</span>
  {/if}
</button>
