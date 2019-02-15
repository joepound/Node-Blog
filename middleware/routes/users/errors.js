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

  PUT_USER_NO_NAME: {
    title: "User PUT: missing name",
    description: "No name was supplied for updating the specified user's information.",
    recoveryInstructions: "Please supply a name and try again."
  },

  PUT_USER_NOT_FOUND: {
    title: "User PUT: user not found",
    description: "No user with the supplied ID exists",
    recoveryInstructions: "Please ensure that the correct user ID is supplied."
  },

  PUT_USER_EXISTENCE_CHECK_FAILURE: {
    title: "User PUT: could not check user information",
    description: "Could not check the user database due to an internal server error."
  },

  PUT_USER_NAME_IN_USE: {
    title: "User PUT: name in use",
    description: "The new name supplied for the specified user is already in use.",
    recoveryInstructions: "Please supply a different name and try again."
  },

  PUT_USER_DUPLICATE_NAMES_CHECK_FAILURE: {
    title: "User PUT: cannot check names in use",
    description:
      "Could not update the specified user - operation aborted because the user database could not be scanned for names in use."
  },

  PUT_USER_NO_UPDATED_ENTRIES: {
    title: "User PUT: no user entries updated",
    description: "The specified user was found in the user database but could not be updated due to an internal server error."
  },

  PUT_USER_MULTIPLE_UPDATED_ENTRIES: {
    title: "User PUT: multiple user entries updated",
    description: "Multiple user entries were updated due to an internal server error. We are sorry for the inconvenience."
  },

  PUT_USER_FAILURE: {
    title: "User PUT: failure",
    description: "Could not update user due to an internal server error."
  }
};
