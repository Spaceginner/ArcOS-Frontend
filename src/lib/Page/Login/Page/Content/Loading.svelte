<script lang="ts">
  import { onMount } from "svelte";
  import def from "../../../../../assets/pfp/null.png";
  import systemIcon from "../../../../../assets/systemIcon.svg";
  import { getUserPfp } from "../../../../../ts/api/pfp";
  import { loginUsername } from "../../../../../ts/login/main";
  import { UserName } from "../../../../../ts/userlogic/interfaces";
  import ProfilePicture from "../../../../ProfilePicture.svelte";
  import Spinner from "../../../../Spinner.svelte";

  export let caption: string;
  export let username: string = "";

  let name = "";
  let pfp = "";

  onMount(async () => {
    name = $loginUsername || $UserName || username;
    pfp = await getUserPfp(name);

    if (pfp == def) pfp = systemIcon;
  });
</script>

{#if pfp}
  <div class="userlogin show">
    <ProfilePicture src={pfp} height={151} />
    <h1>{name}</h1>
    <h3><Spinner height={23} />&nbsp;<span>{caption}</span></h3>
  </div>
{/if}
