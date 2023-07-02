<script lang="ts">
  import { isPopulatable } from "../../../../ts/applogic/checks";
  import { AppStore } from "../../../../ts/applogic/store";
  import AppListItem from "./AppListItem.svelte";
</script>

<div class="left">
  {#each $AppStore as app}
    {#if isPopulatable(app)}
      <AppListItem {app} />
    {/if}
  {/each}
</div>
