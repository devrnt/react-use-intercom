# Contributing to react-use-intercom

## Preparing

1. Install pnpm:

```sh
npm install -g pnpm@10.2
```

2. Fork and clone the repository
3. Install dependencies:

```sh
pnpm install
```

4. The project uses a monorepo structure with pnpm workspaces:

- `/packages/react-use-intercom`: Main library package
- `/apps/playground`: Development playground
- `/apps/examples`: Example applications

## Development Workflow

1. Create a new branch for your feature/fix:

```sh
git checkout -b your-feature-name
```

2. Make your changes in the appropriate package

3. To test your changes:

   - Start the playground: `pnpm dev`
   - Run the test suite: `pnpm test`
   - Run E2E tests: `pnpm test:e2e`

4. Create a changeset to document your changes:

```sh
pnpm changeset
```

Follow the prompts to describe your changes. This step is required for any user-facing changes.

5. Before submitting your PR:
   - Ensure all tests pass
   - Add or update tests as needed
   - Follow the existing code style
   - Update documentation if necessary
   - Verify your changeset accurately describes the changes

## Pull Request

1. Update the README.md with details of changes if applicable
2. Ensure your PR includes a changeset if it includes user-facing changes

## Testing

- Write unit tests for new features
- Update existing tests when modifying features
- Ensure all tests pass before submitting a PR
- Add E2E tests for new user-facing features

## Documentation

- Update the README.md if you add or modify features
- Include JSDoc comments for public APIs
- Keep documentation clear and concise
