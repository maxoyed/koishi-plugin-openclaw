import { Context, Schema } from 'koishi'

export const name = 'openclaw'

export interface Config {
  endpoint: string
  token?: string
  model: string
}

export const Config: Schema<Config> = Schema.object({
  endpoint: Schema.string().default('http://127.0.0.1:18789/v1/chat/completions').description('OpenClaw OpenAI-compatible Endpoint'),
  token: Schema.string().role('secret').description('API Token'),
  model: Schema.string().default('agent:defaults').description('Model or Agent ID'),
})

export function apply(ctx: Context, config: Config) {
  const logger = ctx.logger('openclaw')

  ctx.command('claw <text:text>', 'Chat with OpenClaw Agent')
    .action(async ({ session }, text) => {
      if (!text) {
        return session.execute('help claw')
      }

      try {
        const payload = {
          model: config.model,
          messages: [
            { role: 'user', content: text }
          ],
          stream: false
        }

        logger.debug('Request payload: %o', payload)

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        }
        if (config.token) {
          headers['Authorization'] = `Bearer ${config.token}`
        }

        const res = await ctx.http.post(config.endpoint, payload, { headers })

        logger.debug('Response: %o', res)

        const content = res.choices?.[0]?.message?.content
        if (!content) {
          logger.warn('Empty content received: %o', res)
          return 'Received empty response from OpenClaw.'
        }
        return content
      } catch (err) {
        logger.error('Error querying OpenClaw:', err)
        if (err instanceof Error) {
          return `Error: ${err.message}`
        }
        return 'Failed to communicate with OpenClaw agent.'
      }
    })
}
