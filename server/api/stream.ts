import { OpenAI } from "openai"

const client = new OpenAI({
  baseURL: "http://0.0.0.0:8000/v1",
  apiKey: "stoopid"
})

export default defineEventHandler(async (event) => {
	const { message, history } = await readBody(event)

  setResponseHeader(event, 'Content-Type', 'text/event-stream')
  setResponseHeader(event, 'Cache-Control', 'no-cache')
  setResponseHeader(event, 'Connection', 'keep-alive')

	const stream = await client.chat.completions.create({
		model: "meta-llama/Meta-Llama-3-8B-Instruct",
		messages: history,
		max_tokens: 300,
		stream: true
	})

	const sendEvent = (data: string) => {
		event.node.res.write(`${data}\n\n`)
	}

	for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || ''
    if (content) {
      sendEvent(content)
    }
  }

	event.node.res.end()
})
