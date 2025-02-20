import { Router } from "express";
import {
  deletePublisher,
  getPublisherById,
  getPublishers,
  postPublisher,
  putPublisher,
} from "../controllers/publisher.controller.js";

export const BASE_PATH = "/publishers";
export const publisherRouter = Router();
publisherRouter.get(`${BASE_PATH}`, getPublishers);
publisherRouter.get(`${BASE_PATH}/:id`, getPublisherById);
publisherRouter.post(`${BASE_PATH}`, postPublisher);
publisherRouter.delete(`${BASE_PATH}/:id`, deletePublisher);
publisherRouter.put(`${BASE_PATH}/:id`, putPublisher);
