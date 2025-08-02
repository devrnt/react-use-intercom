---
"react-use-intercom": minor
---

Add support for auth_tokens in boot and update methods

Users can now pass authentication tokens to Intercom for secure data operations. The `authTokens` property accepts an object with any string key-value pairs.

Example usage:
```js
boot({
  email: 'john.doe@example.com',
  userId: '9876',
  authTokens: {
    security_token: 'abc...' // JWT
  }
})
```