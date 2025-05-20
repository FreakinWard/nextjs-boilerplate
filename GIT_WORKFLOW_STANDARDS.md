# Git Workflow Standards

This document outlines the standards for Git branching strategy and pull request workflow for the Hey Margot UI project.

## Git Branches

### Branch Naming Conventions

1. **For Smaller Changes**:
   - Use simple text description naming convention
   - Examples: `add-backend-auth-keys`, `fix-login-bug`, `update-readme`

2. **For Larger Feature Initiatives**:
   - Use feature-based naming convention with `feature/` prefix
   - Examples: `feature/add-backend-architecture`, `feature/user-authentication`

3. **For Branches Cut from Feature Branches**:
   - Smaller changes for features should be cut directly from the feature branch
   - These branches should follow the simple text description naming convention

### Branch Management

- Continuously rebase with the main branch to stay up to date
- Keep branches focused on a specific task or feature
- Delete branches after they have been merged

## Pull Request Workflow

### PR Creation Guidelines

- PRs are encouraged but not mandatory at this stage of development
- PRs can be requested by any team member at any time
- Open a PR when merging changes to provide context to other team members

### PR Description Best Practices

A good PR description should include:

1. **Summary of Changes**:
   - Brief description of what the changes do
   - Mention the problem being solved

2. **Testing Information**:
   - How you tested the changes
   - Any special test cases or considerations

3. **Context**:
   - Additional information that helps reviewers understand the changes
   - Rationale for implementation decisions, if necessary

### Example PR Description

```
Add user authentication form validation

This PR adds client-side validation to the user authentication forms, preventing 
submission of invalid data and providing immediate feedback to users.

Testing:
- Tested with valid and invalid inputs
- Verified error messages display correctly
- Confirmed form only submits when all fields are valid

The validation logic follows the same pattern used in other forms in the project.
```

## Git Workflow Best Practices

1. **Commit Messages**:
   - Write clear, concise commit messages
   - Use present tense (e.g., "Add feature" not "Added feature")
   - Reference issue numbers when applicable

2. **Commit Size**:
   - Make small, focused commits
   - Each commit should represent a logical change

3. **Code Review**:
   - Request code reviews for significant changes
   - Address review comments promptly
   - Use the PR discussion for technical conversations