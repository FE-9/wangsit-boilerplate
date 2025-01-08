<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { Image } from 'wangsvue';
import { AssetList, Asset } from './helper/Asset';
import response from './data/response.json';

const item = ref<Asset | null>(null);
const route = useRoute();
const id = route.params.id as string;

const { data }: AssetList = response.data;

onMounted(() => {
  item.value = data.find((obj) => obj._id === id) || null;
});
</script>

<template>
  <div v-if="item">
    <div class="flex justify-between items-start mb-4">
      <h1 class="text-xl font-medium">{{ item.name.nameWithSequence }}</h1>
      <div class="text-sm text-gray-500">
        {{ item.lastModifier.updatedAt }}
        <span class="ml-2">by {{ item.lastModifier.fullName }}</span>
      </div>
    </div>

    <div class="grid grid-cols-[120px,1fr] gap-4">
      <div class="w-[120px] h-[90px] overflow-hidden rounded-lg">
        <Image :thumbnail="item.imageUrl" />
      </div>

      <div class="space-y-1">
        <h2 class="font-medium mb-2">General Information</h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
          <div class="flex flex-col">
            <span class="text-gray-600">Brand</span>
            <span class="ml-1">{{ item.brand }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-600">Model/Type</span>
            <span class="ml-1">{{ item.model }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-600">Category</span>
            <span class="ml-1">{{ item.category }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-gray-600">Group</span>
            <span class="ml-1">{{ item.group }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-4 text-gray-500">
    <p>Item not found.</p>
  </div>
</template>
