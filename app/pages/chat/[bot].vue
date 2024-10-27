<template>
	<div class="flex w-screen h-screen overflow-hidden">
		<Sidebar />
		<div class="flex justify-center flex-grow px-5 py-6">
			<div class="w-full max-w-7xl flex flex-col gap-16">
				<div class="mt-[-12px] flex justify-between pr-10 items-center">
					<div class="flex gap-3 items-center">
						<div>
							<NuxtImg
								src="/botimg.png"
								width="34px"
								height="34px"
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

				<main class="flex flex-col h-full">
					<div class="flex flex-col gap-10 items-center overflow-y-auto pb-[3rem]">
						<div class="flex flex-col items-center">
							<div>
								<NuxtImg
									src="/botimg.png"
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
						<div class="max-w-3xl w-full flex flex-col gap-4">
							<DialogueCard name="Character Assistant" img="/botimg.png" content="Hello! I am a specialist on Japan related matter, including tourism spots, history, langauge, food, and more. What would you like to know?" :end="false" />
							<DialogueCard name="User" img="/botimg.png" content="Can you give me some examples of Japanese omatsuri?" :end="true" />
							<DialogueCard name="Character Assistant" img="/botimg.png" content="
												1. **Gion Matsuri** (July 17th, Kyoto): A colorful festival to honor the gods and ward off evil spirits. It features traditional music, dances, and parades.
                        2. **Sanja Matsuri** (May 15th, Tokyo): A lively festival at the Asakusa Shrine, where priests carry portable shrines and perform traditional dances.
                        3. **Star Festival (Tanabata Matsuri)** (July 7th, Sendai): A beautiful festival inspired by the Chinese legend of two star-crossed lovers. It features lanterns, poems, and traditional sweets.
                        4. **Miyajima Matsuri** (August 25th, Hiroshima): A festival on Miyajima Island, where people carry shrines and perform rituals to honor the god of the sea.
                        These are just a few examples of the many omatsuri celebrations held throughout Japan. Each festival has its unique characteristics, traditions, and cultural significance, making them an integral part of Japanese culture and society.%
							" :end="false" />
							<DialogueCard name="User" img="/botimg.png" content="
												1. **Gion Matsuri** (July 17th, Kyoto): A colorful festival to honor the gods and ward off evil spirits. It features traditional music, dances, and parades.
                        2. **Sanja Matsuri** (May 15th, Tokyo): A lively festival at the Asakusa Shrine, where priests carry portable shrines and perform traditional dances.
                        3. **Star Festival (Tanabata Matsuri)** (July 7th, Sendai): A beautiful festival inspired by the Chinese legend of two star-crossed lovers. It features lanterns, poems, and traditional sweets.
                        4. **Miyajima Matsuri** (August 25th, Hiroshima): A festival on Miyajima Island, where people carry shrines and perform rituals to honor the god of the sea.
                        These are just a few examples of the many omatsuri celebrations held throughout Japan. Each festival has its unique characteristics, traditions, and cultural significance, making them an integral part of Japanese culture and society.%
							" :end="true" />
							<DialogueCard name="Character Assistant" img="/botimg.png" content="
												1. **Gion Matsuri** (July 17th, Kyoto): A colorful festival to honor the gods and ward off evil spirits. It features traditional music, dances, and parades.
                        2. **Sanja Matsuri** (May 15th, Tokyo): A lively festival at the Asakusa Shrine, where priests carry portable shrines and perform traditional dances.
                        3. **Star Festival (Tanabata Matsuri)** (July 7th, Sendai): A beautiful festival inspired by the Chinese legend of two star-crossed lovers. It features lanterns, poems, and traditional sweets.
                        4. **Miyajima Matsuri** (August 25th, Hiroshima): A festival on Miyajima Island, where people carry shrines and perform rituals to honor the god of the sea.
                        These are just a few examples of the many omatsuri celebrations held throughout Japan. Each festival has its unique characteristics, traditions, and cultural significance, making them an integral part of Japanese culture and society.%
							" :end="false" />

							<DialogueCard 
								v-if="content"
								name="Character Assistant" 
								img="/botimg.png" 
								:content="content" 
								:end="false" 
							/>
						</div>
					</div>
					
					<div class="flex flex-col pb-[3.8rem] gap-5 max-w-3xl self-center w-full">
						<div class="bg-[#202024] w-full px-3 rounded-full flex items-center gap-2 py-2">
							<div class="flex items-center w-full px-4">
								<textarea 
									v-model="message"
									placeholder="Message Character Assistant..." class="bg-transparent rounded-s flex-grow focus:outline-none resize-none overflow-hidden"
									rows="1"
									@input="autoGrow"
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
				</main>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	const { bot } = useRoute().params
	const { content, isStreaming, startStreaming } = useStreaming()
	const message = ref("")

	async function sendMessage(){
		console.log(`Sending ${message.value}`)
		if (message.value.trim() && !isStreaming.value){
			await startStreaming(message.value)
			message.value = ""
		}
	}

	function autoGrow(event: Event) {
		const textarea = event.target as HTMLTextAreaElement
		textarea.style.height = "auto"
		textarea.style.height = `${textarea.scrollHeight}px`
	}
</script>
