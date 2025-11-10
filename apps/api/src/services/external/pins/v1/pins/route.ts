import { OpenAPIHono } from "@hono/zod-openapi";
import { getAnchor } from "../anchors/controller";
import { getAnchorRoute } from "../anchors/openapi";
import { createPin, deletePin, getPin, getPins, getPinsRecommendations, getSearchPins, getSimilarPins, updatePin, uploadPin } from "./controller";
import { createPinRoute, deletePinRoute, getPinRoute, getPinsRecommendationsRoute, getPinsRoute, getSearchPinsRoute, getSimilarPinsRoute, updatePinRoute, uploadPinRoute } from "./openapi";



export const pins = new OpenAPIHono()

pins.openapi(getPinsRecommendationsRoute, getPinsRecommendations)
pins.openapi(getSearchPinsRoute, getSearchPins)

pins.openapi(getPinsRoute, getPins)
pins.openapi(getPinRoute, getPin)
pins.openapi(getSimilarPinsRoute, getSimilarPins)

pins.openapi(getAnchorRoute, getAnchor)

pins.openapi(uploadPinRoute, uploadPin)

pins.openapi(createPinRoute, createPin)
pins.openapi(updatePinRoute, updatePin)
pins.openapi(deletePinRoute, deletePin)
