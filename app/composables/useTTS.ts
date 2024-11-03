import { ref } from "vue"

export function useTTS() {
  const isPlaying = ref(false)
  const audioContext = ref<AudioContext | null>(null)

  async function playTTS(text: string) {
    try {
      isPlaying.value = true

      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        throw new Error('TTS request failed')
      }

      const arrayBuffer = await response.arrayBuffer()

      if (!audioContext.value) {
        audioContext.value = new (window.AudioContext || (window as any).webkitAudioContext)()
      }

      const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer)
      const source = audioContext.value.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioContext.value.destination)
      source.start(0)

      source.onended = () => {
        isPlaying.value = false
      }
    } catch (error) {
      console.error('TTS playback error:', error)
      isPlaying.value = false
    }
  }

  return {
    isPlaying,
    playTTS,
  }
}
