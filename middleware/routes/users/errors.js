module.exports = {
  GET_ALL_USERS_FAILURE: {
    title: "User GET (all): failure",
    description: "Could not retrieve user database information."
  },

  GET_INDIVIDUAL_USER_NOT_FOUND: {
    title: "User GET (individual): not found",
    description: "No user with the supplied ID exists."
  },

  GET_INDIVIDUAL_USER_FAILURE: {
    title: "User GET (individual): failure",
    description: "Could not retrieve information on the specified user. "
  },

  GET_USER_POSTS_FAILURE: {
    title: "User posts GET: failure",
    description: "Could not retrieve posts by the specified user."
  },

  POST_USER_NO_NAME: {
    title: "User POST: missing name",
    description: "No name was supplied for the new user.",
    recoveryInstructions: "Please supply a name and try again."
  },
  
  POST_USER_FAILURE: {
    title: "User POST: failure",
    description: "Could not create user."
  }


};