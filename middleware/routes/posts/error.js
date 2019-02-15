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
  },

  POST_POST_NO_TEXT_CONTENT: {
    title: "Post POST: missing text content",
    description: "No text content was supplied for the new post.",
    recoveryInstructions: "Please supply some text content and try again."
  },

  POST_POST_NO_ASSOCIATED_USER: {
    title: "Post POST: missing associated user ID",
    description: "No user ID was supplied for the new post.",
    recoveryInstructions: "Please supply a user ID and try again."
  },

  POST_POST_BAD_USER_ID: {
    title: "Post POST: non-existent user ID",
    description:
      "The given associated user ID for the post does not belong to any user.",
    recoveryInstructions: "Please supply an existing user ID and try again."
  },

  POST_POST_USER_ID_CHECK_FAILURE: {
    title: "Post POST: cannot check if user ID exists",
    description:
      "Could not create post - operation aborted because the user database could not be scanned to check that the given associated user ID for the post exists."
  },

  POST_POST_FAILURE: {
    title: "Post POST: failure",
    description: "Could not create post due to an internal server error."
  }
};
