<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
</script>

<template>
  <h1 class="text-3xl font-bold underline">Hello world!</h1>

  <Button>Click me</Button>
  <Button>Click me</Button>
  <Button>Click me</Button>

  <Button
    @click="
      () => {
        toast({
          title: 'Scheduled: Catch up',
          description: 'Friday, February 10, 2023 at 5:57 PM',
        });
      }
    "
  >
    Add to calander
  </Button>

  <Toaster />
</template>
