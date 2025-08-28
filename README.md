# USAGE
DEMO: https://hcann1-imdb-api1.pages.dev/

1. `npm run dev` to run locally
2. Cloudflare pages allows this app to run (unlike GitHub pages).
3. Initial build command is `npm install && npm run build` as we use a package.json. Build folder is `dist`. No need to choose framework as it's detected. React/Vite otherwise
4. Add the .env api key to Environment Variables in Cloudflare pages dash and redeploy under Manage Deployment. We do not want API keys exposed.
5. Add .env and node_modules to .gitignore

### Enjoy!
