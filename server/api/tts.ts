export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { text } = body

  try {
    const response = await fetch('http://your-tts-api-url/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error('TTS API request failed')
    }

    const audioData = await response.arrayBuffer()

    setResponseHeader(event, 'Content-Type', 'audio/wav')
    return audioData
  } catch (error) {
    console.error('TTS API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'TTS generation failed',
    })
  }
})

