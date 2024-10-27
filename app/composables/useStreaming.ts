import { ref } from "vue"

interface ChatMessage {
  role: string;
  content: string;
}

export function useStreaming(){
	const content = ref("")
	const isStreaming = ref(false)
	const history: Ref<ChatMessage[]> = ref([
    {
      role: "system",
      content: "You are a specialist on a Japan related matter, including tourism spots, history, language, food, and more. Explain the user requests concisely and succintly, unless the user has requested for elaboration."
    },
    {
      role: "assistant",
      content: "Hello, how may I help you today?"
    }
  ])

	async function startStreaming(message: string){
		isStreaming.value = true
		content.value = ""

		history.value.push({
			role: "user",
			content: message
		})

		try {
			const response = await fetch("/api/stream", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ message, history: history.value })
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
			
			history.value.push({
				role: "assistant",
				content: content.value
			})
		} catch (error) {
			console.error("Streaming error: ", error)
		} finally {
			isStreaming.value = false
		}
	}

	return {
		content,
		isStreaming,
		startStreaming,
		history
	}
}
