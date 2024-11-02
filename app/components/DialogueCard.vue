<template>
	<div class="flex" :class="{'self-end': end}">
		<div v-if="!end" class="flex flex-col gap-2">
			<div class="flex gap-3 text-sm items-center">
				<div>
					<NuxtImg
						class="rounded-full"
						:src="img"
						width="24px"
						height="24px"
						format="webp"
						alt="User pfp"
					/>
				</div>
				<h1>{{ name }}</h1>
				<button class="flex items-center" :onClick="playText" >
					<Icon name="solar:play-bold" class="bg-blue-400 text-center" size="0.8em" />
				</button>
			</div>
			<div class="p-4 rounded-xl bg-[#26272b]">
				<div v-html="parsedContent"></div>
			</div>
		</div>

		<div v-else class="flex flex-col gap-2 items-end">
			<div class="flex gap-3 text-sm items-center">
				<h1>{{ name }}</h1>
				<div>
					<NuxtImg
						class="rounded-full"
						:src="img"
						width="24px"
						height="24px"
						format="webp"
						alt="User pfp"
					/>
				</div>
			</div>
			<div class="p-4 rounded-xl bg-[#26272b]">
				<div v-html="parsedContent"></div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps(["name", "img", "content", "end"])
import { marked } from "marked"

marked.use({
	gfm: true
})

const parsedContent = computed(() => marked.parseInline(props.content))

const audio = ref(null)

const { isPlaying, playTTS } = useTTS()
const playText = () => {
	playTTS("I am harry potter")
}
</script>

