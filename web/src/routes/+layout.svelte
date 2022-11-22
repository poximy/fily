<script lang="ts">
  import '../app.css';

  let searchBar: HTMLInputElement;

  function handleKeydown(
    e: KeyboardEvent & { currentTarget: EventTarget & Window },
  ) {
    if (e.key === '/') {
      searchBar.focus();
      e.preventDefault();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<nav
  class="flex w-full flex-col gap-y-2 gap-x-4 font-sans sm:flex-row sm:items-center sm:px-4"
>
  <div
    class="relative z-10 m-4 mb-0 h-10 flex-auto before:absolute before:top-1
    before:left-1 before:h-full before:w-full before:bg-sky-400 sm:m-0"
  >
    <input
      type="text"
      spellcheck="false"
      placeholder="Buscar marca, color, etc."
      class="absolute z-10 h-full w-full rounded-none border border-black p-2 focus:outline-none"
      bind:this={searchBar}
    />
  </div>
  <ul
    class="flex h-10 items-center justify-center gap-4 bg-neutral-200 sm:h-auto sm:bg-inherit"
  >
    <li>
      <a href="/" class="hover:underline">Tendencias</a>
    </li>
    <li>
      <a href="/" class="hover:underline">Vender</a>
    </li>
  </ul>
</nav>

<slot />
