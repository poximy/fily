<script lang="ts">
  import type { Product, Header } from '$components/products/types';

  export let products: Product[];
  export let header: Header | null = null;
</script>

<div class="mx-4 flex justify-center">
  <div class="flex w-fit max-w-full flex-col items-center gap-1">
    {#if header !== null}
      <div class="flex w-full items-center justify-between">
        <h2 class="font-sans text-lg">{header.title}</h2>
        <a
          href={header.link}
          class="flex items-center gap-1 p-1 text-sky-400 transition ease-in
          hover:bg-neutral-200"
        >
          <p>Ver Mas</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5
              5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    {/if}
    <ul
      id="scroll"
      class="flex max-w-full snap-x snap-mandatory flex-row gap-4 overflow-x-scroll
      scroll-smooth font-sans"
    >
      {#each products as product}
        <li
          class="flex aspect-[4/5] w-[158px] snap-center snap-always flex-col
          justify-between border border-black p-2"
        >
          <img
            src={product.image}
            class="min-w-[140px] max-w-min"
            alt="placeholder"
          />
          <p class="truncate">{product.title}</p>
          <p class="text-xs text-neutral-600">Puja Minima</p>
          <p class="font-mono text-lg font-bold">${product.price}</p>
          <p class="w-fit bg-neutral-200 p-1 text-xs">
            {#if product.sold == 1}
              {product.sold} vendida
            {:else}
              {product.sold} vendidas
            {/if}
          </p>
        </li>
      {/each}
    </ul>
  </div>
</div>
