<script lang="ts">
  import { ThemeCount, ThemeIndex } from '../../stores/Theme';
  import DrawerToggler from '../Drawer/DrawerToggler.svelte';
  import MdiThemeLightDark from '../Svg/MdiThemeLightDark.svelte';

  export let sideBar = true;
</script>

<!-- Navbar -->
<div class="navbar bg-neutral text-neutral-content">
  <div class="navbar-start">
    {#if sideBar}
      <DrawerToggler />
    {/if}
    <slot name="start"><!-- optional fallback --></slot>
  </div>

  <div class="navbar-end">
    <slot name="end"><!-- optional fallback --></slot>
    <button
      class="btn btn-circle"
      on:click={() => ThemeIndex.update((n) => (n + 1) % $ThemeCount)}
    >
      <MdiThemeLightDark />
    </button>
  </div>
</div>

<slot><!-- optional fallback --></slot>
