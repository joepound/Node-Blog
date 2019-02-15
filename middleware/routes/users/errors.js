module.exports = {
  GET_ALL_USERS_FAILURE: {
    title: "User GET (all): failure",
    description:
      "Could not retrieve user database information due to an internal server error."
  },

  GET_INDIVIDUAL_USER_NOT_FOUND: {
    title: "User GET (individual): not found",
    description: "No user with the supplied ID exists.",
    recoveryInstructions: "Please ensure that the correct user ID is supplied."
  },

  GET_INDIVIDUAL_USER_FAILURE: {
    title: "User GET (individual): failure",
    description:
      "Could not retrieve information on the specified user due to an internal server error."
  },

  GET_USER_POSTS_FAILURE: {
    title: "User posts GET: failure",
    description:
      "Could not retrieve posts by the specified user due to an internal server error."
  },

  POST_USER_NO_NAME: {
    title: "User POST: missing name",
    description: "No name was supplied for the new user.",
    recoveryInstructions: "Please supply a name and try again."
  },

  POST_USER_NAME_IN_USE: {
    title: "User POST: name in use",
    description: "The name supplied for the new user is already in use.",
    recoveryInstructions: "Please supply a different name and try again."
  },

  POST_USER_DUPLICATE_NAMES_CHECK_FAILURE: {
    title: "User POST: cannot check names in use",
    description:
      "Could not create user - operation aborted because the user database could not be scanned for names in use."
  },

  POST_USER_FAILURE: {
    title: "User POST: failure",
    description: "Could not create user due to an internal server error."
  },

  DELETE_USER_NOT_FOUND: {
    title: "User DELETE: user not found",
    description: "No user with the supplied ID exists",
    recoveryInstructions: "Please ensure that the correct user ID is supplied."
  },

  DELETE_USER_EXISTENCE_CHECK_FAILURE: {
    title: "User DELETE: could not check user information",
    description:
      "Could not check the user database due to an internal server error."
  },

  DELETE_USER_POSTS_RETRIEVAL_FAILURE: {
    title: "User DELETE: could not retrieve posts information",
    description:
      "The delete operation could not be completed because the posts database could not be read for deleting the user's posts due to an internal server error."
  },

  DELETE_USER_POSTS_ASSOCIATION_FAILURE: {
    title: "User DELETE: could not identify user's posts",
    description:
      "The delete operation could not be completed because the user's posts could not be identified for deletion due to an internal server error."
  },

  DELETE_USER_UNEXPECTED_POST_DELETION: {
    title: "User DELETE: post(s) from another user unexpectedly deleted",
    description:
      "The delete operation was stopped because another user's posts may have been deleted due to an internal server error."
  },

  DELETE_USER_POST_DELETION_FAILURE: {
    title: "User DELETE: error in deleting user's posts",
    description:
      "The delete operation was stopped because some of the user's post(s) could not be deleted."
  },

  DELETE_USER_NO_DELETED_ENTRIES: {
    title: "User DELETE: no user entries deleted",
    description:
      "The specified user was found in the user database but could not be deleted due to an internal server error."
  },

  DELETE_USER_MULTIPLE_DELETED_ENTRIES: {
    title: "User DELETE: multiple user entries deleted",
    description:
      "Multiple user entries were deleted due to an internal server error. We are sorry for the inconvenience."
  },

  DELETE_USER_FAILURE: {
    title: "User DELETE: failure",
    description: "Could not delete user due to an internal server error."
  },

  PUT_USER_NO_NAME: {
    title: "User PUT: missing name",
    description:
      "No name was supplied for updating the specified user's information.",
    recoveryInstructions: "Please supply a name and try again."
  },

  PUT_USER_NOT_FOUND: {
    title: "User PUT: user not found",
    description: "No user with the supplied ID exists",
    recoveryInstructions: "Please ensure that the correct user ID is supplied."
  },

  PUT_USER_EXISTENCE_CHECK_FAILURE: {
    title: "User PUT: could not check user information",
    description:
      "Could not check the user database due to an internal server error."
  },

  PUT_USER_NAME_IN_USE: {
    title: "User PUT: name in use",
    description:
      "The new name supplied for the specified user is already in use.",
    recoveryInstructions: "Please supply a different name and try again."
  },

  PUT_USER_DUPLICATE_NAMES_CHECK_FAILURE: {
    title: "User PUT: cannot check names in use",
    description:
      "Could not update the specified user - operation aborted because the user database could not be scanned for names in use."
  },

  PUT_USER_NO_UPDATED_ENTRIES: {
    title: "User PUT: no user entries updated",
    description:
      "The specified user was found in the user database but could not be updated due to an internal server error."
  },

  PUT_USER_MULTIPLE_UPDATED_ENTRIES: {
    title: "User PUT: multiple user entries updated",
    description:
      "Multiple user entries were updated due to an internal server error. We are sorry for the inconvenience."
  },

  PUT_USER_FAILURE: {
    title: "User PUT: failure",
    description: "Could not update user due to an internal server error."
  }
};
