- [x] Fix refresh token 404 page 
  - (redirect to login I guess) 
  - ((Needed to remove refresh token from local storage, probably because
  - authTokens: {refresh: ["This field is required."]}
of token expiry issues, token not refreshed properly))
- [x] Fix refresh page after token refresh
- [x] Task ID not useful, continues from other user's last, change to index
- [x] Task ID is typed as a string in the frontend (-> number)
- [x] Add `revert` button
- [x] Use `useCallback`
- [x] Use TaskFactory instead of manually with faker
- [x] Record changes onBlur for input instead of onChange (debounce)
- [x] Prompt user to save before unload of webpage
- [x] Add popup that shows saving request success or failure with message
- [ ] Make DRF serialization use camelcase
- [ ] Categories set is hardcoded in frontend and backend, any change would have to be applied separately to both.
    Alternative would be to fetch available categories on frontend on first mount
- [ ] If we define `get_queryset()` shouldn't we set `queryset=MyModel.objects.none()` for security reasons?
- [ ] Cache fetches? Catch db queries?
- [ ] Deleting all entries refreshes with empty page causing 404
- [ ] Add Ctrl + Z functionality
- [ ] Comments from different users supported?
- [ ] Fetch won’t catch HTTP error responses (like 404 or 500) because fetch only rejects on network-level errors. 
- [ ] makeApiRequest should not receive a token, it should receive a boolean 'authorized' or not. The caller should not care about the tokens
- [ ] Use Supsense with fallback for loading (render whatever is available)
- ```
  const handleUndo = () => {
    if (changes.length === 0) return;
    
    const lastChange = changes[changes.length - 1];
    const newChanges = changes.slice(0, -1);
    
    // Move change to redo stack
    setRedoStack(prev => [...prev, lastChange]);
    setChanges(newChanges);
    
    // Apply remaining changes and update isEdited flags
    const newTasks = applyDiffs(initialTasks, newChanges).map(task => ({
      ...task,
      isEdited: hasTaskChanges(task.id, newChanges)
    }));
    
    setTasks(newTasks);
  };
  ```

### File todos
- [UserManager](./backend/authsystem/managers.py)