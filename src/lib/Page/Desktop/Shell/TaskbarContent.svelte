<script lang="ts">
  import { onMount } from "svelte";
  import type { App } from "../../../../ts/applogic/interface";
  import { getOpenedStore, AppStore } from "../../../../ts/applogic/store";
  import Spinner from "../../../Spinner.svelte";

  import TaskbarButton from "../Taskbar/TaskbarButton.svelte";
  import Tray from "../Taskbar/Tray.svelte";

  let show = false;

  let oa: App[] = [];

  AppStore.subscribe(() => {
    oa = get(ProcessStore);
  });

  onMount(() => {
    show = false;

    setTimeout(() => {
      show = true;
    }, 3000);
  });
</script>

<div class="buttons">
  {#each oa as app}
    {#if !app.disabled}
      <TaskbarButton {app} />
    {/if}
  {/each}
</div>

{#if show}
  <Tray />
{:else}
  <div class="tray">
    <Spinner height={24} />
  </div>
{/if}

<style scoped>
  div.tray {
    padding: 9.5px;
  }
</style>
