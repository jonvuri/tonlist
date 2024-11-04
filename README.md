# Getting Started

[Install pnpm](https://pnpm.io/installation) if you haven't already.

Use pnpm to install dependencies:

```bash
pnpm install
```

Then run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Signaling server

If you want cross-tab state syncing to work, you need to set up the signaling server.

The signaling server is a submodule of this project. Change to its dir, then install
its dependencies separately:

```bash
cd signaling-server
pnpm install
```

Then, run the signaling server (port 4444 by default, use PORT= env var to change):

```bash
node bin/server.js
# or
PORT=5555 node bin/server.js
```
