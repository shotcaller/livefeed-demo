export const LOGIN_QUERY = `
  mutation Login($loginPayload: LoginPayload!) {
    login(loginPayload: $loginPayload) {
      success,
      token,
      user {
        id,
        name,
        userid
      }
    }
  }
`

export const REGISTER_QUERY = `
  mutation Register($registerPayload: RegisterPayload!) {
    register(registerPayload: $registerPayload) {
      success,
      user {
        userid,
        name
      }
    }
  }
`
export const LOGGED_IN_USER_QUERY = `
  query LoggedInUser {
    loggedInUser {
      userid,
      name,
      id
    }
  }
`