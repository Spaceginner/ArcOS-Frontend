<script lang="ts">
  import type {
    ErrorButton,
    ErrorMessage,
  } from "../../../../../ts/errorlogic/app";
  import { closeErrorProcess } from "../../../../../ts/errorlogic/main";

  export let button: ErrorButton;
  export let msg: ErrorMessage;

  function act() {
    button.action();

    close();
  }

  function close() {
    closeErrorProcess(msg.id);
  }
</script>

<button on:click={act}>
  {button.caption}
</button>
