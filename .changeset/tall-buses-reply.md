---
'react-use-intercom': major
---

Allow calling "boot" multiple times. Previously it was not possible to invoke "boot" more than once, because of a "isBooted" guard. This behaviour was not in line with the IntercomJS docs, so it has been removed
