import { OpenAPIHono } from "@hono/zod-openapi";
import { createAnchor, deleteAnchor } from "../anchors/controller";
import { createAnchorRoute, deleteAnchorRoute, getAnchorsRoute } from "../anchors/openapi";
import { createBoard, deleteBoard, getBoard, getBoardAnchors, getBoardPins, getBoards, updateBoard } from "./controller";
import { createBoardRoute, deleteBoardRoute, getBoardPinsRoute, getBoardRoute, getBoardsRoute, updateBoardRoute } from "./openapi";


export const boards = new OpenAPIHono()

boards.openapi(getBoardsRoute, getBoards)
boards.openapi(getBoardRoute, getBoard)
boards.openapi(getBoardPinsRoute, getBoardPins)

boards.openapi(createBoardRoute, createBoard)
boards.openapi(updateBoardRoute, updateBoard)
boards.openapi(deleteBoardRoute, deleteBoard)

boards.openapi(createAnchorRoute, createAnchor)
boards.openapi(getAnchorsRoute, getBoardAnchors)
boards.openapi(deleteAnchorRoute, deleteAnchor)
