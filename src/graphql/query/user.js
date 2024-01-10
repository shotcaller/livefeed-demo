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