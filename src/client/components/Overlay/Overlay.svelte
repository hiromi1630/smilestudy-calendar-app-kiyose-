<script>
  import { classNames } from './../../utils/tailwind.util';
  import MdiInfo from './Svg/MdiInfo.svelte';
  import { OverlayState, OverlayText, OverlayType } from '../../stores/Overlay';
  import MdiError from './Svg/MdiError.svelte';
  import MdiWarning from './Svg/MdiWarning.svelte';
  import MdiSuccess from './Svg/MdiSuccess.svelte';

  $: className = classNames(
    'alert',
    'shadow-lg',
    (() => {
      if ($OverlayType === 'Error') {
        return 'alert-error';
      } else if ($OverlayType === 'Success') {
        return 'alert-success';
      } else if ($OverlayType === 'Warning') {
        return 'alert-warning';
      } else if ($OverlayType === 'Info') {
        return 'alert-info';
      }
      return '';
    })(),
  );
</script>

<input
  type="checkbox"
  id="overlay"
  class="modal-toggle"
  bind:checked={$OverlayState}
/>
{#if $OverlayType === 'Loading'}
  <div class="modal" id="overlay">
    <div class="flex justify-center">
      <div
        class="animate-spin h-24 w-24 border-8 border-primary rounded-full border-t-transparent"
      />
    </div>
  </div>
{:else}
  <label for="overlay" class="modal cursor-pointer">
    <label class={`modal-box relative alert ${className} shadow-lg`} for="">
      <div>
        {#if $OverlayType === 'Error'}
          <MdiError />
        {:else if $OverlayType === 'Warning'}
          <MdiWarning />
        {:else if $OverlayType === 'Success'}
          <MdiSuccess />
        {:else}
          <MdiInfo />
        {/if}
        <span>{$OverlayText}</span>
      </div>
    </label>
  </label>
{/if}
