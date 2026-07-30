---
"react-use-intercom": minor
---

Add support for auth_tokens in boot and update methods, plus a setAuthTokens method

Users can now pass authentication tokens to Intercom for secure data operations. The `authTokens` property accepts an object with any string key-value pairs, and the `setAuthTokens` method refreshes them at runtime without a full update.

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