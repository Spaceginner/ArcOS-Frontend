<script lang="ts">
  import clear from "../../../../../assets/apps/logger/clear.svg";
  import type { App } from "../../../../../ts/applogic/interface";
  import { Log, log, LogItem, LogLevel } from "../../../../../ts/console";
  import {
    ScopedAppData,
    UserData,
  } from "../../../../../ts/userlogic/interfaces";

  export let currentSource: string;
  export let currentFilter: LogLevel;
  export let logItems: LogItem[];
  export let setView: (source: string) => void;
  export let filter: (filter: LogLevel) => void;
  export let appdata: ScopedAppData;
  export let app: App;

  function clearCategory(source: string) {
    for (let i = 0; i < $log.length; i++) {
      if ($log[i].source == source) {
        $log.splice(i, 1);
      }
    }

    currentSource = "";

    logItems = [];

    log.set($log);
  }

  function refresh() {
    Log({
      source: "Logger: refresh",
      msg: "Refreshing current view",
      level: LogLevel.warn,
    });
    setView(currentSource);

    if (!currentFilter) return;

    filter(currentFilter);
  }

  function changeMonospace() {
    appdata.monospace = !appdata.monospace;

    $UserData.appdata[app.id] = appdata;
  }
</script>

<div class="static">
  <button
    class="action"
    on:click={() => clearCategory(currentSource)}
    disabled={!currentSource}
  >
    <img src={clear} alt="Clear" />
    Clear
  </button>
  <div class="sep" />
  <button class="action" on:click={refresh} disabled={!currentSource}>
    <span class="material-icons-round">refresh</span>
    Refresh
  </button>
  <button class="action" on:click={changeMonospace}>
    <span class="material-icons-round">title</span>
    monospace
  </button>
</div>
