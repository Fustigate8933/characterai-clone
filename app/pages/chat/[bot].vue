<template>
	<div class="flex w-screen h-screen overflow-hidden">
		<Sidebar />
		<div class="flex justify-center flex-grow px-5 py-6">
			<div class="w-full max-w-7xl flex flex-col gap-10 h-full">
				<div class="mt-[-12px] flex justify-between pr-10 items-center">
					<div class="flex gap-3 items-center">
						<div>
							<NuxtImg
								class="rounded-full"
								src="/frieren.png"
								width="40px"
								height="40px"
								format="webp"
								alt="Character.ai Logo"
							/>
						</div>
						<div class="flex flex-col">
							<h1>Character Assistant</h1>
							<h1 class="text-gray-400 text-sm">By @landon</h1>
						</div>
					</div>
					<div class="flex gap-3 items-center">
						<button class="cursor-pointer rounded-full">
							<Icon name="fluent:sound-wave-circle-16-filled" size="28px" />
						</button>
						<button class="cursor-pointer rounded-full">
							<Icon name="fluent:more-16-regular" size="28px" />
						</button>
					</div>
				</div>

				<div class="flex flex-col gap-10 items-center overflow-y-auto">
					<div class="flex flex-col items-center">
						<div>
							<NuxtImg
								class="rounded-full"
								src="/frieren.png"
								width="60px"
								height="60px"
								format="webp"
								alt="Character.ai Logo"
							/>
						</div>
						<h1>Character Assistant</h1>
						<p class="text-sm text-gray-400">Your AI work/study buddy</p>
						<p class="text-[0.75rem] text-gray-400">By @landon</p>
					</div>
					<div class="max-w-4xl w-full flex flex-col gap-4">
						<!-- we are using slice(1) below since we want to ignore the system prompt and dummy user message -->
						<DialogueCard 
							v-for="(message, i) in history.slice(1)"
							:key="i"
							:name="message.role === 'user' ? 'User' : 'Frieren'"
							:img="message.role === 'user' ? '/frieren.png' : '/frieren.png'"
							:content="message.content"
							:end="message.role === 'user' ? true : false"
						/>
						<DialogueCard 
							v-if="isStreaming"
							name="Frieren" 
							img="/frieren.png" 
							:content="content" 
							:end="false" 
						/>
					</div>
				</div>

				<div class="flex flex-col gap-5 max-w-4xl mt-auto self-center w-full">
					<div class="bg-[#202024] w-full px-3 rounded-full flex items-center gap-2 py-2">
						<div class="flex items-center w-full px-4">
							<textarea
								ref="textareaRef"
								v-model="message"
								placeholder="Message Character Assistant..." 
								class="bg-transparent rounded-s flex-grow focus:outline-none resize-none overflow-hidden"
								rows="1"
								@input="autoGrow"
								@keyup.enter.exact.prevent="sendMessage"
								:disabled="isStreaming"
							/>
						</div>
						<div class="flex">
							<button class="mt-[5px] ml-2 flex items-center justify-center rounded-full p-2">
								<Icon class="bg-white ml-[2px] mr-[-2px]" name="icon-park-solid:phone-telephone" size="1.3em" />
							</button>
							<button class="mt-[5px] ml-2 flex items-center justify-center bg-white rounded-full p-2" @click="sendMessage">
								<Icon class="bg-black ml-[2px] mr-[-2px]" name="fluent:send-20-filled" size="1.3em" />
							</button>
						</div>
					</div>
					<h1 class="text-gray-400 text-xs text-center">Reminder: Everything a Character says is made up!</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const { bot } = useRoute().params
const { content, isStreaming, startStreaming, history } = useStreaming()
const message = ref("")
const textareaRef = ref<HTMLTextAreaElement | null>(null)

async function sendMessage(){
	if (message.value.trim() && !isStreaming.value){
		await startStreaming(message.value)
		message.value = ""
		textareaRef.value.style.height = "auto"
	}
}

function autoGrow(event: Event) {
	const textarea = event.target as HTMLTextAreaElement
	textarea.style.height = "auto"
	textarea.style.height = `${textarea.scrollHeight}px`
}
</script>
