<script lang="ts">
  import logo from "../../../../../assets/systemIcon.svg";
  import { isOpened } from "../../../../../ts/applogic/checks";
  import { closeWindow, openWindow } from "../../../../../ts/applogic/events";
  import type { App } from "../../../../../ts/applogic/interface";
  import {
    AppStore,
    getOpenedStore,
    maxZIndex,
  } from "../../../../../ts/applogic/store";
  import { showArcFind } from "../../../../../ts/search/main";
  import { UserData } from "../../../../../ts/userlogic/interfaces";
  import AppButton from "./Bar/AppButton.svelte";
  import Trigger from "./Bar/Trigger.svelte";

  let oa: App[] = [];
  let visible = false;
  let dockfocused = false;
  let interval: NodeJS.Timeout;

  AppStore.subscribe(() => {
    oa = getOpenedStore();
  });

  function mouseenter() {
    dockfocused = true;
    clearTimeout(interval);
  }

  function mouseleave() {
    dockfocused = false;
    interval = setTimeout(() => {
      visible = false;
    }, 1000);
  }

  function toggleLauncher() {
    $showArcFind = !$showArcFind;
  }
</script>

<div
  class="launcher-bar"
  class:colored={$UserData.sh.taskbar.colored}
  class:visible
  style="z-index: {$maxZIndex + 31}"
  on:mouseenter={mouseenter}
  on:mouseleave={mouseleave}
>
  <button class="apps" on:click={toggleLauncher}>
    <img src={logo} alt="ArcOS" />
  </button>
  <div class="opened-apps">
    {#each oa as app}
      {#if !app.info.hidden}
        <AppButton {app} />
      {/if}
    {/each}
  </div>
</div>
<Trigger bind:visible {dockfocused} bind:interval />
