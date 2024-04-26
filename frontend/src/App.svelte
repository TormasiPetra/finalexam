<script lang="ts">
  import { z } from "zod";
  import { getHotels, getSearchedHotelsName } from "./api";
  import type { HotelsSchema } from "./model";
  import { onMount } from "svelte";

  type Hotels = z.infer<typeof HotelsSchema>;

  let hotels: Hotels[] | null = null;

  let baseSrc = "../images/";
  let ensOfSrc = ".png";

  let min: number | null = null;
  let max: number | null = null;

  let hotelSearch: string | null = null;
  let getHotelSuccess: boolean | null = null;

  let searchedHotels: Hotels[] | null = null;
  let searchSuccess: boolean | null = null;

  const getAllHotels = async () => {
    const response = await getHotels();
    if (!response.success) return;
    getHotelSuccess = true;
    hotels = response.data;
  };
  getAllHotels();

  const search = async (
    min: number | null,
    max: number | null,
    hotelSearch: string | null
  ) => {
    const response = await getSearchedHotelsName(min, max, hotelSearch);
    if (!response.success) {
      searchSuccess = false;
      return;
    }
    searchSuccess = true;
    searchedHotels = response.data;
    console.log(searchedHotels);
    min = null;
    max = null;
    hotelSearch = null;
  };

  /*   const searchByPrice = async (min: number | null, max: number | null) => {
    const response = await getSearchedHotelsMinMax(min, max);
    if (!response.success) {
      searchSuccess = false;
      return;
    }
    searchSuccess = true;
    searchedHotels = response.data;
    console.log(searchedHotels);
  }; */
</script>

<section class="flex flex-col justify-center items-center w-screen">
  <main
    class="bg-white m-16 max-w-[1400px] rounded-[20px] flex  flex-wrap"
  >
    <div class="m-6 flex flex-col min-w-[350px]">
      <h1 class="text-lg font-bold">Filters</h1>
      <h2 class="text-sm">Search by hotel name or price</h2>
      <div>
        <div class="mb-2 mt-6 w-full">
          <h1 class="font-bold text-sm">Hotel name</h1>

          <input
            bind:value={hotelSearch}
            class="input mt-2 rounded-xl w-full"
            type="text"
            placeholder="Search by hotels"
          />
        </div>

        <div class="mt-4 flex flex-col gap-2">
          <h1 class="font-bold text-sm">Price</h1>

          <input
            bind:value={min}
            class="input rounded-xl"
            type="number"
            placeholder="min"
          />
          <input
            bind:value={max}
            class="input rounded-xl"
            type="number"
            placeholder="max"
          />
          <button
            class="btn mt-4 bg-button rounded-3xl text-white"
            on:click={() => search(min, max, hotelSearch)}>Search</button
          >
        </div>
      </div>
    </div>
    <div class="m-6 flex max-w-[650px] flex-col">
      {#if getHotelSuccess && !searchSuccess}
        {#if hotels}
        <h1 class="text-lg font-bold mb-4">Available hotels</h1>
          <div class=" flex flex-wrap gap-2 justify-between">
            
            {#each hotels as hotel}
              <div class="card card-body max-w-[200px] p-0">
                <img class=" max-w-[200px] rounded-[18px] overflow-hidden" src={baseSrc + hotel.name + ensOfSrc} alt="hotel" />
                <div class="flex flex-col gap-1 my-2">
                <h1 class="text-lg font-bold">{hotel.name}</h1>
                <h2>{hotel.pricePerNightInUSD}/<span>night</span></h2></div>
              </div>
            {/each}
          </div>
        {/if}
      {/if}

      {#if searchSuccess && searchedHotels !== null}
      <h1 class="text-lg font-bold mb-4">{searchedHotels.length} results</h1>
        <div class=" flex flex-wrap gap-4">
          {#each searchedHotels as hotel}
            <div class="card card-body">
              <img class=" max-w-[200px] rounded-[18px] overflow-hidden" src={baseSrc + hotel.name + ensOfSrc} alt="hotel" />
              {hotel.name}
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </main>
</section>
