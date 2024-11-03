export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { text } = body

  try {
    const response = await fetch('http://127.0.0.1:8001/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      throw new Error('TTS API request failed')
    }

    const data = await response.json()
    const audioContent = Buffer.from(data.audio_content, 'base64')

    setResponseHeader(event, 'Content-Type', 'audio/wav')

    return audioContent
  } catch (error) {
    console.error('TTS API error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'TTS generation failed',
    })
  }
})

