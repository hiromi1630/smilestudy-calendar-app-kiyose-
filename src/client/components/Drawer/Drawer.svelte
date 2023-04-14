<script lang="ts">
  import { CurrentPage, Pages } from '../../stores/Page';
</script>

<!-- ! id に暗黙で my-drawer を使用している -->
<div class="drawer drawer-mobile">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <slot />
  </div>
  <div class="drawer-side">
    <label for="my-drawer" class="drawer-overlay" />
    <ul class="menu p-4 w-80 bg-base-100">
      {#each $Pages as Page}
        <li>
          <label
            for="my-drawer"
            on:click={() => {
              CurrentPage.set(Page.id);
            }}
          >
            {Page.name}
          </label>
        </li>
      {/each}
    </ul>
  </div>
</div>
