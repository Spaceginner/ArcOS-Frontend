<script lang="ts">
  import { ErrorMessages, ErrorProcesses } from "../../../ts/errorlogic/app";
  import Button from "./ErrorDialogStore/Renderer/Button.svelte";
  import Window from "./WindowStore/Window.svelte";
</script>

<div class="winstore">
  {#each $ErrorProcesses as app}
    <Window {app}>
      {#each $ErrorMessages as msg}
        {#if `error_${msg.id}` == app.id}
          <p>
            {@html msg.message}
          </p>
          <center>
            <br />
            {#each msg.buttons as button}
              <Button {button} {msg} />
            {/each}
            <br />
          </center>
        {/if}
      {/each}
    </Window>
  {/each}
</div>
