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