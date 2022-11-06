<script lang="ts">
  import type { Product } from '$components/products/types';

  export let products: Product[];
</script>

<main class="mx-4 flex justify-center">
  <ul
    class="flex snap-x snap-mandatory flex-row gap-4 overflow-x-scroll scroll-smooth font-sans"
  >
    {#each products as product}
      <li
        class="flex aspect-[3/4] snap-center snap-always flex-col justify-between
        border border-black p-2"
      >
        <img
          src={product.image}
          class="min-w-[140px] max-w-min"
          alt="placeholder"
        />
        <p>{product.title}</p>
        <p class="text-sm text-neutral-600">Puja Minima</p>
        <p class="font-mono text-lg">${product.price}</p>
        <p class="w-fit bg-neutral-200 p-1 text-sm">
          {#if product.sold == 1}
            {product.sold} vendida
          {:else}
            {product.sold} vendidas
          {/if}
        </p>
      </li>
    {/each}
  </ul>
</main>
