<script lang="ts">
  import { onMount } from "svelte";
  import { generateCSS } from "../../../../ts/applogic/css";
  import { dragWindow } from "../../../../ts/applogic/drag";
  import {
    maxSizeExceedsLiteral,
    minSizeExceedsLiteral,
  } from "../../../../ts/applogic/error";
  import type { App } from "../../../../ts/applogic/interface";
  import {
    draggingPid,
    leftZoneTriggered,
    rightZoneTriggered,
  } from "../../../../ts/applogic/snapzones/store";
  import { focusedProcessPid, AppStore } from "../../../../ts/applogic/store";
  import { UserData } from "../../../../ts/userlogic/interfaces";
  import OverlayableErrorWindow from "./OverlayableErrorWindow.svelte";
  import OverlayableWindow from "./OverlayableWindow.svelte";
  import Content from "./Window/Content.svelte";
  import Titlebar from "./Window/Titlebar.svelte";
  import type { AppRuntime } from "../../../../ts/applogic/runtime/main";

  export let app: App = null;

  export let visible = false;
  export let max = false;
  export let isBoot = false;

  let cssString = "";
  let window: HTMLDivElement;
  let posUsed = false;
  let titlebar: HTMLDivElement;
  let runtime: AppRuntime;

  export let exttransition = false;

  onMount(() => {
    focusedProcessPid.set(app.id);

    update();
  });

  function update() {
    if (app.minSize.w > app.initialSize.w || app.minSize.h > app.initialSize.h)
      return minSizeExceedsLiteral(app);

    if (app.maxSize.w < app.minSize.w || app.maxSize.h < app.minSize.h)
      return maxSizeExceedsLiteral(app);

    cssString = generateCSS(app, !posUsed);

    if (!posUsed) posUsed = true;

    if (!app.info.custom) dragWindow(app, window, titlebar);
  }

  AppStore.subscribe(() => {
    if (app.opened && !app.info.custom) dragWindow(app, window, titlebar);

    update();
  });

  function handleMouse() {
    $focusedProcessPid = app.id;
  }

  focusedProcessPid.subscribe((v) => {
    if (!app || !app.events) return;

    if (v == app.id && app.events.focus) app.events.focus(app);
    if (v != app.id && app.events.blur) app.events.blur(app);
  });

  onMount(() => {
    if (app.runtime) runtime = new app.runtime(app, app.events);
  });
</script>

<window
  class:window={!app.info.custom}
  class:focused={app.id == $focusedProcessPid}
  class:headless={app.state.headless || app.state.windowState.fll}
  class:resizable={app.state.resizable}
  class:min={app.state.windowState.min}
  class:max={app.state.windowState.max || max}
  class:visible={app.opened || visible}
  class:exttransition
  class:fullscreen={app.state.windowState.fll || app.info.custom}
  class:glass={app.glass}
  class:lefttb={$UserData.sh.window.lefttb}
  class:custom={app.info.custom}
  class:child={!!app.parentId}
  class:snapped={app.snapped}
  class:snapping={app.id == $draggingPid &&
    ($leftZoneTriggered || $rightZoneTriggered)}
  style={cssString}
  id={app.id}
  bind:this={window}
  on:mousedown={handleMouse}
>
  <Titlebar {app} bind:exttransition bind:titlebar {isBoot} />
  <Content {app}>
    <slot />
  </Content>
  {#if app && app.overlays}
    {#each Object.entries(app.overlays) as overlay}
      <OverlayableWindow {app} overlay={overlay[1]} id={overlay[0]} />
    {/each}
  {/if}

  {#if app && app.errorOverlays}
    {#each app.errorOverlays as error}
      <OverlayableErrorWindow {error} {app} />
    {/each}
  {/if}
</window>
