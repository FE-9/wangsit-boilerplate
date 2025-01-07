<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Image } from 'wangsvue';
import Asset from './helper/Asset';
import response from './data/response.json';

const item = ref<Asset | null>(null);
const route = useRoute();
// TODO: `id` sama `data` dikasih type
const { id } = route.params;

const { data } = response.data;

onMounted(() => {
  item.value = data.find((obj) => obj._id === id) || null;
});
</script>

<template>
  <div v-if="item">
    <h1 class="py-2">{{ item.name.nameWithSequence }}</h1>
    <Image :thumbnail="item.imageUrl" />
    <p><strong>Category:</strong> {{ item.category.name }}</p>
    <p><strong>Group:</strong> {{ item.group.name }}</p>
    <p><strong>Brand:</strong> {{ item.brand.name }}</p>
    <p><strong>Model:</strong> {{ item.model.name }}</p>
    <p><strong>Status:</strong> {{ item.status }}</p>
    <p><strong>Policy:</strong> {{ item.policy }}</p>
    <p><strong>Sequence:</strong> {{ item.sequence }}</p>
  </div>
  <div v-else>
    <p>Item not found.</p>
  </div>
</template>
