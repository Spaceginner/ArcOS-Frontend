<script lang="ts">
  import { isMinimized } from "../../../../../../ts/applogic/checks";
  import { closeWindow } from "../../../../../../ts/applogic/events";
  import { getOriginalIcon } from "../../../../../../ts/applogic/icon";
  import type { App } from "../../../../../../ts/applogic/interface";
  import {
    AppStore,
    focusedProcessPid,
    maxZIndex,
    updateStores,
  } from "../../../../../../ts/applogic/store";
  import { showArcFind } from "../../../../../../ts/search/main";
  import { getWindowElement } from "../../../../../../ts/window/main";

  export let app: App;

  let minimized = false;

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

    showArcFind.set(false);
  }
</script>

<button
  title={app.info.name}
  class:minimized
  on:click={e}
  class:activated={app.id == $focusedProcessPid}
>
  <img src={getOriginalIcon(app.id) || app.info.icon} alt={app.info.name} />
</button>
