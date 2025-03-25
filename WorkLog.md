### Decisions
- Major:
  -  Track user's changes. Save all at once. (Alternative:
  commit all changes immediately)
- Moderate:
  - Add undo-redo functionality
  - Allow both backend and frontend sorting and filtering
- Minor:
  - Fixed categories set VS users able to add new categories
  
- Technical
  - Use or extend `DjangoModelPermissions` instead of redifining 
    custom `TaskPermissions`
  - Add Object-level permissions class `IsOwner`
  - Switch from `write-only` field in `TaskSerializer` to a `HiddenField`
  - Use separate model for `Comments` on tasks

### Highlights
- Memoizing table rows
- Custom [useSubmission](frontend/frontend/src/hooks/useSubmission.ts) hook for request success/error messages
- 'Are you sure?' browser alert if user tries to exit without saving their changes
- Disable buttons on request submission and show spinner on route navigation loading