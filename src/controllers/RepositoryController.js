const { v4, validate } = require("uuid");

const repositories = [];

module.exports = {
  index(req, res) {
    return res.json(repositories);
  },

  store(req, res) {
    const { title, url, techs } = req.body;

    const repository = {
      id: v4(),
      title,
      url,
      techs,
      likes: 0,
    };

    repositories.push(repository);

    return res.json(repository);
  },

  update(req, res) {
    const { id } = req.params;
    const { title, url, techs } = req.body;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return res.status(400).json({
        error: "Repository not found",
      });
    }

    const repository = repositories[repositoryIndex];

    repositories[repositoryIndex] = {
      id: repository.id,
      title,
      url,
      techs,
      likes: repository.likes,
    };

    return res.json(repositories[repositoryIndex]);
  },

  delete(req, res) {
    const { id } = req.params;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return res.status(400).json({
        error: "Repository not found",
      });
    }

    repositories.splice(repositoryIndex, 1);

    return res.status(204).json();
  },

  storeLike(req, res) {
    const { id } = req.params;

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return res.status(400).json({
        error: "Repository not found",
      });
    }

    repositories[repositoryIndex].likes += 1;

    return res.json(repositories[repositoryIndex]);
  },

  /*
   * Middlewares
   */
  validateRepositoryId(req, res, next) {
    const { id } = req.params;

    if (!validate(id)) {
      return res.status(400).json({
        error: "Invalid repository ID",
      });
    }

    return next();
  },
};
