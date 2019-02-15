module.exports = {
  GET_ALL_POSTS_FAILURE: {
    title: "Post GET (all): failure",
    description:
      "Could not retrieve post database information due to an internal server error."
  },

  GET_INDIVIDUAL_POST_NOT_FOUND: {
    title: "Post GET (individual): not found",
    description: "No post with the supplied ID exists.",
    recoveryInstructions: "Please ensure that the correct post ID is supplied."
  },

  GET_INDIVIDUAL_POST_FAILURE: {
    title: "Post GET (individual): failure",
    description:
      "Could not retrieve information on the specified post due to an internal server error."
  }
};