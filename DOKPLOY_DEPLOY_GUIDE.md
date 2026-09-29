# Deploying Forked new-api (k4ran909/new-api) on Dokploy

This guide outlines how to deploy your forked repository **[k4ran909/new-api](https://github.com/k4ran909/new-api)** (forked from `QuantumNous/new-api`) on your **Dokploy** panel so all your custom UI, playground, and router changes are built and deployed.

---

## Deployment Option 1: Docker Compose via Git (Recommended for Your Fork)

Dokploy will pull from your GitHub fork (`https://github.com/k4ran909/new-api`), build your custom Docker image with the Bun/React frontend and Go backend, and run it with PostgreSQL and Redis.

### Step 1: Create a Compose Service in Dokploy
1. Log in to your **Dokploy Panel**.
2. Click **Projects** in the left sidebar and select or create a project (e.g., `AI Gateway`).
3. Click **Create Service** and select **Compose**.
4. Name your service (e.g., `new-api-stack`).

### Step 2: Configure Git Source
1. In the **General** / **Source** tab of your Compose service, choose **Git**.
2. Set:
   - **Repository URL**: `https://github.com/k4ran909/new-api`
   - **Branch**: `main`
   - **Compose Path**: `docker-compose.dokploy.yml` (or copy the contents into Raw mode)
3. Open the **Environment** tab in Dokploy and set your custom values based on [`.env.dokploy.example`](./.env.dokploy.example):
   ```env
   POSTGRES_USER=newapi
   POSTGRES_PASSWORD=your_strong_postgres_password
   POSTGRES_DB=new_api
   REDIS_PASSWORD=your_strong_redis_password
   SESSION_SECRET=a_very_random_long_secret_key_32_characters
   TZ=UTC
   ```

### Step 3: Configure Domain & SSL (Traefik)
1. Go to the **Domains** tab in your Compose service inside Dokploy.
2. Click **Add Domain** / **Create Domain**:
   - **Host**: `newapi.yourdomain.com` (Ensure your DNS `A` or `CNAME` record points to your server's IP).
   - **Service Name**: Select `new-api`.
   - **Container Port**: `3000`.
   - **HTTPS**: Toggle on (Let's Encrypt will automatically issue an SSL certificate).
3. Save the domain settings.

### Step 4: Deploy
1. Click **Deploy** in the top right.
2. Watch the deployment logs. Dokploy will pull the images, run healthchecks, and launch all 3 containers.
3. Once completed, navigate to `https://newapi.yourdomain.com`.

---

## Deployment Option 2: Single Container (Fast SQLite Setup)

If you only want a lightweight personal test instance without setting up PostgreSQL and Redis:

1. In Dokploy, click **Create Service** -> **Application**.
2. Under **Provider**, choose **Docker**.
3. Set **Docker Image**: `calciumion/new-api:latest`.
4. Under **Volumes**, add a persistent volume:
   - **Host/Volume Name**: `new-api-data`
   - **Mount Path**: `/data`
5. Under **Domains**:
   - Host: `newapi.yourdomain.com`
   - Container Port: `3000`
   - Enable HTTPS.
6. Click **Deploy**.

---

## First-Time Login & Post-Deployment Checklist

1. **Default Administrator Credentials**:
   - **Username**: `root`
   - **Password**: `123456`
2. **Change Default Password**:
   - Go directly to **Settings** -> **Personal Settings** and change the `root` password immediately.
3. **Configure System Settings**:
   - Under **System Settings**, set your public **Server Address** to `https://newapi.yourdomain.com`.
   - Optionally disable public registration under **Registration Settings** if you don't want unauthorized users creating accounts.
4. **Add Channels & Models**:
   - Navigate to **Channels** -> **Add Channel**.
   - Select your provider (OpenAI, Anthropic Claude, DeepSeek, Google Gemini, Groq, Azure, etc.).
   - Enter your API Key and test the connection.
5. **Create Tokens (API Keys)**:
   - Go to **Tokens** -> **Add Token**.
   - Create an API key to use in LibreChat, NextChat, OpenWebUI, Cursor, Cline, or your backend applications.
