import { ref } from "vue"

export function useStreaming(){
	const content = ref("")
	const isStreaming = ref(false)

	async function startStreaming(message: string){
		isStreaming.value = true
		content.value = ""

		try {
			const response = await fetch("/api/stream", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message })
			})
			
			const reader = response.body?.getReader()
			if (!reader){
				throw new Error("No reader available")
			}

			while (true) {
				const {done, value} = await reader.read()
				if (done){
					break
				}
				const text = new TextDecoder().decode(value)
				content.value += text
			}
		} catch (error) {
			console.error("Streaming error: ", error)
		} finally {
			isStreaming.value = false
		}
	}

	return {
		content,
		isStreaming,
		startStreaming
	}
}
