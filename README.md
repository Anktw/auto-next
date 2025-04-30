# Auto-Next

Automatically runs `npm run dev` in your Next.js project and opens the running app in your default browser once it's ready — including dynamic port detection!

## ✨ Features

- 🚀 Runs `npm run dev` when VS Code starts (if a workspace is open)
- 🌐 Waits until your Next.js dev server is ready
- 🔁 Automatically opens the correct URL (e.g., `http://localhost:3000`, `http://localhost:3001`, etc.)
- ⚙️ Cross-platform (Windows, macOS, Linux)


```bash
vsce package
code --install-extension auto-next-0.0.1.vsix
