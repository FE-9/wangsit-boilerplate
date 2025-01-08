<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { RouteParamsGeneric, useRoute } from 'vue-router';
import { Image } from 'wangsvue';
import { AssetList, Asset } from './helper/Asset';
import response from './data/response.json';

onMounted(() => {
  item.value = data.find((obj) => obj._id === id) || null;
});

const route = useRoute();

const item = ref<Asset | null>(null);

const formattedDate = computed(() => {
  return item.value ? formatISODate(item.value.lastModifier.updatedAt) : '';
});

const { id }: RouteParamsGeneric = route.params;
const { data }: AssetList = response.data;

const formatISODate = (date: string | Date): string =>
  new Date(date).toLocaleString('sv');
</script>

<template>
  <div v-if="item">
    <div class="flex justify-between items-start mb-4">
      <span class="text-base font-bold">{{ item.name }}</span>
      <div class="flex flex-col items-end text-xs">
        <span class="text-gray-500 text-[9px]">Last Modified</span>
        <div class="font-medium text-xs">
          {{ formattedDate }} by {{ item.lastModifier.fullName }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-[125px,1fr] gap-6">
      <div class="w-[125px] h-[125px] rounded-lg">
        <Image :thumbnail="item.imageUrl" class="w-full h-full object-cover" />
      </div>

      <div>
        <span class="font-bold text-xs">General Information</span>
        <div class="grid grid-cols-2 auto-cols-auto w-max">
          <div class="mr-28">
            <div class="flex flex-col">
              <span class="text-gray-500 text-[9px]">Brand</span>
              <span class="font-medium text-xs">{{ item.brand }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[9px]">Category</span>
              <span class="font-medium text-xs">{{ item.category }}</span>
            </div>
          </div>
          <div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[9px]">Model/Type</span>
              <span class="font-medium text-xs">{{ item.model }}</span>
            </div>
            <div class="flex flex-col">
              <span class="text-gray-500 text-[9px]">Group</span>
              <span class="font-medium text-xs">{{ item.group }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-4 text-gray-500">
    <p>Item not found.</p>
  </div>
</template>
