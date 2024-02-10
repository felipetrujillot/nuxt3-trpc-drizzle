<script setup lang="ts">
import { cn } from '@/lib/utils'

definePageMeta({
  layout: 'new-test-layout',
})

/**
 *
 */
const data = [
  {
    id_question: 12,
    question: '¿Cuánto es 1+1?',
    id_answer: 1213,
    type: 1,
    answers: [
      {
        id_answer: 1213,
        text: '2',
      },
      {
        id_answer: 1214,
        text: '4',
      },
      {
        id_answer: 1215,
        text: '6',
      },
      {
        id_answer: 1216,
        text: '9',
      },
    ],
  },
  /* {
    id_question: 13,
    question: '¿Cómo me llamo?',
    type: 1,
    id_answer: 1217,
    answers: [
      {
        id_answer: 1216,
        text: 'Felipe',
      },
      {
        id_answer: 1217,
        text: 'Ignacio',
      },
      {
        id_answer: 1218,
        text: 'José',
      },
      {
        id_answer: 1219,
        text: 'Juan',
      },
      {
        id_answer: 1220,
        text: 'Martín',
      },
    ],
  }, */
  {
    id_question: 14,
    question: '¿Dónde queda Santiago?',
    type: 1,
    id_answer: 1217,
    answers: [
      {
        id_answer: 1216,
        text: 'Venezuela',
      },
      {
        id_answer: 1217,
        text: 'Santiago es Chile',
      },
      {
        id_answer: 1218,
        text: 'Tu vieja',
      },
    ],
  },

  {
    id_question: 15,
    question: '¿A qué hora xd?',
    type: 2,
    id_answer: null,
    answers: [
      {
        id_answer: 1299,
        text: 'Mañana',
      },
      {
        id_answer: 1300,
        text: 'Ayer',
      },
      {
        id_answer: 1301,
        text: 'Hoy',
      },
    ],
  },
] as const
/**
 *
 * @param idAnswer
 */
const saveChange = async (idAnswer: number) => {
  console.log(idAnswer)
}

const formatK = (input: number) => {
  if (input === 0) return 'a.'
  if (input === 1) return 'b.'
  if (input === 2) return 'c.'
  if (input === 3) return 'd.'
  if (input === 4) return 'e.'
  if (input === 5) return 'f.'
  if (input === 6) return 'g.'
  if (input === 7) return 'h.'
  if (input === 8) return 'i.'
  if (input === 9) return 'j.'
}

const datad = (e: PointerEvent) => {
  console.log(e.target)
}
</script>

<template>
  <div>
    <h3 class="text-lg font-medium">Account</h3>
    <p class="text-sm text-muted-foreground">
      Update your account settings. Set your preferred language and timezone.
    </p>
  </div>
  <Separator class="my-6" />

  <!-- <RadioGroup class="mb-2">
    <div class="flex items-center space-x-2">
      <Label for="option-one"> fds</Label>
      <RadioGroupItem
        id="option-one"
        value="option-one"
        @click.prevent="datad"
      />
      <Label for="option-one">e</Label>
    </div>
  </RadioGroup> -->

  <div v-for="(d, k) in data" class="mb-6">
    <h3 class="text-lg font-medium mb-3">{{ k + 1 }}. {{ d.question }}</h3>

    <!-- PREGUNTAS ALTERNATIVAS -->
    <template v-if="d.type === 1">
      <RadioGroup class="mb-2" :default-value="d.id_answer.toString()">
        <div class="flex items-center space-x-2" v-for="(i, kk) in d.answers">
          <Label for="option-one">{{ formatK(kk) }}</Label>
          <RadioGroupItem
            :id="i.text"
            :value="i.id_answer.toString()"
            @click.prevent="saveChange(i.id_answer)"
          />
          <Label for="option-one"> {{ i.text }}</Label>
        </div>
      </RadioGroup>
    </template>
    <!-- PREGUNTAS ALTERNATIVAS -->

    <!-- SELECCIÓN MÚLTIPLE -->
    <div v-if="d.type === 2">
      <div
        class="flex items-center space-x-2 mb-2"
        v-for="(i, kk) in d.answers"
      >
        <Label for="option-one">{{ formatK(kk) }}</Label>
        <Checkbox />
        <Label for="option-one"> {{ i.text }}</Label>
      </div>
    </div>

    <!-- SELECCIÓN MÚLTIPLE -->
  </div>

  <div class="text-end">
    <Button>Guardar</Button>
  </div>
</template>
