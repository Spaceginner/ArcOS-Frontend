<script lang="ts">
  import { appManSelected } from "../../../ts/applogic/apps/AppManager/store";
  import {
    getWindow
  } from "../../../ts/applogic/store";
  import { ErrorProcesses } from "../../../ts/errorlogic/app";
</script>

<div class="bottombar">
  <div class="right">
    {#if $appManSelected && !$appManSelected.startsWith("error_")}
      <div class="section">
        Snapped: {getWindow($appManSelected).snapped ? "yes" : "no"}
      </div>
    {/if}
    <div class="section">
      Running: {$OpenedStore.length}
    </div>
    <div class="section">
      Loaded: {$WindowStore.length}
    </div>
    <div class="section">
      Dialogs: {$ErrorProcesses.length}
    </div>
  </div>
</div>
