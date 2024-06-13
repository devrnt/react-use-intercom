# react-use-intercom

## 5.4.1

### Patch Changes

- a6d7757: Re-attach callbacks in boot method

## 5.4.0

### Minor Changes

- 8d5d130: Exposes showTicket and showConversation methods in useIntercom hook

## 5.3.0

### Minor Changes

- 4aac5a9: Expose startChecklist method in useIntercom hook

## 5.2.0

### Minor Changes

- 8eebbed: Add "showNews" method

## 5.1.4

### Patch Changes

- d86105a: Fix incompatible node engine version

## 5.1.3

### Patch Changes

- e89a073: Do not publish src folder to registry

## 5.1.2

### Patch Changes

- 5f4b6eb: Do not publish src folder to registry

## 5.1.1

### Patch Changes

- 5e7dd7e: Do not publish src folder to registry

## 5.1.0

### Minor Changes

- e30828d: Add "showSpace" method

## 5.0.0

### Major Changes

- 8f7ff67: Allow calling "boot" multiple times. Previously it was not possible to invoke "boot" more than once, because of a "isBooted" guard. This behaviour was not in line with the IntercomJS docs, so it has been removed

## 4.1.0

### Minor Changes

- 791c6ac: Extend API with `onUserEmailSupplied` event and `startSurvey` method

## 4.0.0

### Major Changes

- c8b050d: Update built target to es2017
