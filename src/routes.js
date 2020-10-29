const { Router } = require("express");

const RepositoryController = require("./controllers/RepositoryController");

const routes = Router();

routes.get("/repositories", RepositoryController.index);
routes.post("/repositories", RepositoryController.store);
routes.put(
  "/repositories/:id",
  RepositoryController.validateRepositoryId,
  RepositoryController.update
);
routes.delete(
  "/repositories/:id",
  RepositoryController.validateRepositoryId,
  RepositoryController.delete
);

routes.post(
  "/repositories/:id/likes",
  RepositoryController.validateRepositoryId,
  RepositoryController.storeLike
);

module.exports = routes;
