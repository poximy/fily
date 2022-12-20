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
  class="flex w-full flex-col gap-y-2 gap-x-4 px-4 font-sans sm:flex-row sm:items-center"
>
  <div
    class="relative h-10 flex-auto before:absolute before:top-1 before:left-1
	  before:h-full before:w-full before:bg-black"
  >
    <input
      type="text"
      spellcheck="false"
      placeholder="Buscar marca, color, etc."
      class="absolute h-full w-full rounded-none border-2 border-black p-2 focus:outline-none"
      bind:this={searchBar}
    />
  </div>
  <ul class="flex justify-center gap-4 text-lg">
    <li>
      <a href="/" class="hover:underline">Tendencias</a>
    </li>
    <li>
      <a href="/" class="hover:underline">Vender</a>
    </li>
  </ul>
</nav>

<slot />
