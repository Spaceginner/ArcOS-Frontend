<script lang="ts">
  import "../../../../css/desktop/apps/settings/apps.css";
  import { AppStore } from "../../../../ts/applogic/store";
  import AppButton from "./Apps/AppButton.svelte";
  import HiddenAppButton from "./Apps/HiddenAppButton.svelte";

  let hidden = [];
  let visible = [];

  let showHidden = false;

  AppStore.subscribe((v) => {
    hidden = [];
    visible = [];

    for (let i = 0; i < v.length; i++) {
      if (v[i].info.hidden) hidden.push(v[i]);
      else visible.push(v[i]);
    }
  });
</script>

<h1>Applications</h1>
<div class="apps">
  {#each visible as app}
    <AppButton {app} />
  {/each}
  {#each hidden as app}
    <HiddenAppButton {app} />
  {/each}
</div>
