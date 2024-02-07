<script setup lang="ts">
defineProps<{
  name: string;
}>();

console.log("hererere");
</script>

<template>
  <Card>
    <CardContent>
      <p class="text-sm">
        {{ name }}
      </p>
    </CardContent>
  </Card>
</template>
