<script lang="ts">
  import { applyState } from "../../ts/state/main";

  import { onMount } from "svelte";
  import logo from "../../assets/systemIcon.svg";
  import "../../css/boot.css";
  import { testConnection } from "../../ts/api/test";
  import { LoggerApp } from "../../ts/applogic/apps/Logger";
  import { BugReportData } from "../../ts/bugrep";
  import { Log, LogLevel } from "../../ts/console";
  import { getUsers } from "../../ts/userlogic/main";
  import Window from "./Desktop/WindowStore/Window.svelte";
  import { ArcOSVersion } from "../../ts/env/main";
  import { getServer } from "../../ts/api/server";

  let status = "";
  let bootClass = "";
  let targetState = "login";

  let t1 = null;
  let t2 = null;
  let t3 = null;

  let errored = false;
  let altDown = false;

  onMount(async () => {
    status = "&nbsp;";

    t1 = setTimeout(fadeIn, 500);
    t2 = setTimeout(fadeOut, 4000);
    t3 = setTimeout(redirect, 4750);

    if (!(await checkServer())) status = "Preparing ArcOS";

    document.addEventListener("keydown", altDownCb);
  });

  function altDownCb(e: KeyboardEvent) {
    if (!e.altKey || e.key.toLowerCase() != "a") return;

    altDown = true;
    status = "Loading ArcTerm";
  }

  async function checkServer() {
    const serverHost = getServer();

    let connected = false;

    if (!serverHost) {
      return;
    }

    clearTimeout(t1);
    clearTimeout(t2);
    clearTimeout(t3);

    setTimeout(fadeIn, 120);

    connected = await testConnection(serverHost);

    if (!connected) {
      fadeOut();
      return BugReportData.set([
        true,
        {
          title: "Boot failed",
          icon: "warning",
          message:
            "ArcOS can't connect to the remote server. Please ensure<br>the server is online, or try again at a later date.",
          button: {
            caption: "Retry",
            action: () => location.reload(),
          },
          source: "Boot",
          details: `Can't connect to server ${serverHost}: none of the modes match`,
        },
      ]);
    }

    setTimeout(fadeOut, 2000);
    setTimeout(redirect, 2750);

    return connected;
  }

  function fadeOut() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Fade-out",
    });

    bootClass = "fadeout";
  }

  function fadeIn() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Fade-in",
    });

    bootClass = "fadein";
  }

  async function redirect() {
    Log({
      level: LogLevel.info,
      source: "Boot.svelte",
      msg: "Redirecting",
    });

    removeEventListener("keydown", altDownCb);

    applyState(altDown ? "arcterm" : targetState);
  }
</script>

<div class="{bootClass} boot fullscreen">
  <div class="arcterm-load visible">v{ArcOSVersion}</div>
  <div class="center-absolute">
    <img alt="Logo" class="logo" src={logo} />
    <div class="slider userdefined">
      <div class="line dark" />
      <div class="subline dark inc" />
      <div class="subline dark dec" />
    </div>
    <p class="status">{@html status}</p>
  </div>
</div>
{#if errored}
  <Window
    isBoot
    max
    visible
    app={{ ...LoggerApp, glass: false, id: "LoggerApp" }}
  />
{/if}
