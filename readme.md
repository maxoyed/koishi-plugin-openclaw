# koishi-plugin-openclaw

[![npm](https://img.shields.io/npm/v/koishi-plugin-openclaw?style=flat-square)](https://www.npmjs.com/package/koishi-plugin-openclaw)

Koishi plugin for connecting to [OpenClaw](https://openclaw.ai) agents.

## Usage

1. **Install** the plugin in your Koishi instance.
2. **Configure** the plugin in the Koishi console:
   - `endpoint`: The OpenClaw Gateway OpenAI-compatible endpoint (e.g., `http://127.0.0.1:18789/v1/chat/completions`).
   - `token`: Your OpenClaw API Key (if authentication is enabled).
   - `model`: The agent or model ID to target (default: `agent:defaults`).
3. **Chat** using the `claw` command:
   ```
   claw Hello, how are you?
   ```

## Configuration

| Option | Type | Default | Description |
|---|---|---|---|
| `endpoint` | string | `http://127.0.0.1:18789/v1/chat/completions` | OpenClaw Gateway API endpoint. |
| `token` | string | - | Bearer token for authentication. |
| `model` | string | `agent:defaults` | The model/agent ID to route the request to. |
