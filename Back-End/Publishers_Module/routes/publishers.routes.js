import { Router } from "express";
import {
  deletePublishers,
  getPublisherById,
  getPublishers,
  postPublishers,
  putPublishers,
} from "../controllers/publisher.controller.js";

export const BASE_PATH = "/publishers";
export const publisherRouter = Router();
publisherRouter.get(`${BASE_PATH}`, getPublishers);
publisherRouter.get(`${BASE_PATH}/:id`, getPublisherById);
publisherRouter.post(`${BASE_PATH}`, postPublishers);
publisherRouter.delete(`${BASE_PATH}/:id`, deletePublishers);
publisherRouter.put(`${BASE_PATH}/:id`, putPublishers);
