1. Never push straight to `master` branch.
2. If you want to add new feature or fix bug, create new branch, dev and test in local. After everything is fine, create pull request (PR) to `master` branch.
3. Other members will review your work and will accept/reject/ask for more work (in this case you have to work and test in local, then push to github, <b>no need to create MR becase it still there.</b>
4. After pull request is merged, <b>normally your branch will be deleted.</b>
5. If you found any bug, return to step 2.
6. Type must be one of the following:
    - **feat**: A new feature
    - **fix**: A bug fix
    - **temp**: A new change to template
    - **docs**: Documentation only changes
    - **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    - **refactor**: A code change that neither fixes a bug nor adds a feature
    - **perf**: A code change that improves performance
    - **test**: Adding missing tests or correcting existing tests
    - **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
    - **chore**: Other changes that don't modify `src` or `test` files
