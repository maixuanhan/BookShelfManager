## Setup and run
This need a goodreads API key and secret to work.
1. Copy the .env file from the template
    ```bash
    cp .env_template .env
    ```
2. Modify its values as your real information
3. Run
    ```bash
    npm i
    npm run android
    ```

## Fix problems
1. Weird compilation error:
    ```bash
    npx react-native start --reset-cache
    ```
