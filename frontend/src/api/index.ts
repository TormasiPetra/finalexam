import { safeFetch } from "../http/safefetch";
import { z } from "zod";
import { HotelsSchema } from "../model";

export const getHotels = () =>
  safeFetch({
    method: "GET",
    url: "/api/mount",
    schema: HotelsSchema.array(),
  });

/*   export const getSearchedHotelsMinMax = (
  min: number | null,
  max: number | null
) =>
  safeFetch({
    method: "GET",
    url: `/api/hotels?min=${min}&max=${max}`,
    schema: HotelsSchema.array(),

  }); */ 

export const getSearchedHotelsName = (min: number | null, max: number | null, hotelSearch: string | null) =>
  safeFetch({
    method: "GET",
    url: hotelSearch? `/api/hotels?includes=${hotelSearch}` : `/api/hotels?min=${min}&max=${max}`,
    schema: HotelsSchema.array(),
  });
