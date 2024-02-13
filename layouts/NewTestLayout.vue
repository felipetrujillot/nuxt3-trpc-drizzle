<script setup lang="ts">
import SidebarNav from '../components/form/SidebarNav.vue'

const courses = {
  id_course: 1,
  title: 'Curso Ejemplo',
  sections: [
    {
      id_module: 1,
      title: 'Sección 1: Introducción al Curso',
      content: [
        {
          id_content: 1,
          title: '¿Qué puedes esperar del curso?',
          type: 'VIDEO',
          url_content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          resourses: [],
        },
        {
          id_content: 2,
          title: '¿Qué materiales requieres?',
          type: 'VIDEO',
          url_content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          resourses: [],
        },
      ],
    },
    {
      id_module: 2,
      title: 'Sección 2: Herramientas del Curso',
      content: [
        {
          id_content: 1,
          title: '¿Softwares requeridos?',
          type: 'VIDEO',
          url_content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          resourses: [],
        },
      ],
    },
    {
      id_module: 3,
      title: 'Sección 3: Seguridad de la Información',
      content: [
        {
          id_content: 1,
          title: '¿Qué es la seguridad de la información?',
          type: 'VIDEO',
          url_content: 'https://www.w3schools.com/html/mov_bbb.mp4',
          resourses: [],
        },
      ],
    },
  ],
}
</script>

<template>
  <div class="space-y-6 p-10 pb-16 md:block">
    <div class="space-y-0.5">
      <h2 class="text-2xl font-bold tracking-tight">Settings</h2>
      <p class="text-muted-foreground">
        Manage your account settings and set e-mail preferences.
      </p>
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="hidden sm:block -mx-4 lg:w-1/5">
        <SidebarNav />
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>

      <aside class="hidden sm:block -mx-4 lg:w-1/5">
        <Accordion type="single" collapsible>
          <AccordionItem
            :value="d.id_module.toString()"
            v-for="d in courses.sections"
          >
            <AccordionTrigger class="text-start">
              {{ d.title }}
            </AccordionTrigger>
            <AccordionContent v-for="(c, k) in d.content">
              <Button as="a" href="#" variant="ghost">
                {{ k + 1 }}. {{ c.title }}
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>
    </div>
  </div>
</template>
