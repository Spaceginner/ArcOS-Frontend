<script lang="ts">
  import "../../css/desktop/apps/imageviewer.css";
  import type { App } from "../../ts/applogic/interface";
  import { AppStore } from "../../ts/applogic/store";

  export let app: App;

  let url = "";

  AppStore.subscribe(() => {
    if (!app.openedFile) return (url = "");

    const blob = new Blob([new Uint8Array(app.openedFile.data)], {
      type: app.openedFile.mime,
    });

    url = URL.createObjectURL(blob);
  });
</script>

{#if app.openedFile && url}
  <img
    src={url}
    alt={app.openedFile.name}
    data-caller="output"
    data-path={app.openedFile.path}
  />
{/if}
