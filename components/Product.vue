<script setup lang="ts">
defineProps<{
  name: string;
}>();
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
