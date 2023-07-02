<script lang="ts">
  import type { App } from "../../../ts/applogic/interface";
  import { ErrorProcesses } from "../../../ts/errorlogic/app";
  import Branch from "./Branch.svelte";

  let es: App[] = [];

  ErrorProcesses.subscribe((v) => {
    es = v;
  });
</script>

<div class="apps">
  {#each $WindowStore as window}
    {#if !window.parentId}
      <Branch {window} top />
    {/if}
  {/each}
  {#each es as error}
    <Branch window={error} top error />
  {/each}
</div>
