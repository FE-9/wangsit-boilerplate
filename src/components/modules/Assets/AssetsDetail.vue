<script setup lang="ts">
import { shallowRef, onMounted, computed } from 'vue';
import { RouteParamsGeneric, useRoute } from 'vue-router';
import { Image } from 'wangsvue';
import { AssetList, Asset } from '../../../types/asset.type';
import response from './data/response.json';

onMounted(() => {
  item.value = data.find((obj) => obj._id === id);
});

const route = useRoute();

const { id }: RouteParamsGeneric = route.params;
const { data }: AssetList = response.data;

const fields = [
  { label: 'Brand', key: 'brand' },
  { label: 'Category', key: 'category' },
  { label: 'Model/Type', key: 'model' },
  { label: 'Group', key: 'group' },
];

const item = shallowRef<Asset | undefined>();

const formattedDate = computed(() => {
  return item.value ? formatISODate(item.value.lastModifier.updatedAt) : '';
});

const formatISODate = (date: string | Date): string =>
  new Date(date).toLocaleString('sv');
</script>

<template>
  <div v-if="item">
    <div class="flex justify-between items-start mb-4">
      <span id="name" class="text-base font-bold">{{ item.name }}</span>
      <div class="flex flex-col items-end text-xs">
        <span class="text-gray-500 text-[9px]">Last Modified</span>
        <div id="lastModifier" class="font-medium text-xs">
          {{ formattedDate }} by {{ item.lastModifier.fullName }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-[125px,1fr] gap-6">
      <div class="w-[125px] h-[125px] rounded-lg">
        <Image
          id="image"
          :thumbnail="item.imageUrl"
          class="w-full h-full object-cover"
        />
      </div>

      <div>
        <span class="font-bold text-xs">General Information</span>
        <div class="grid grid-cols-2 auto-cols-auto w-max">
          <div
            :key="field.key"
            v-for="(field, index) in fields"
            :class="{ 'mr-28': index === 0 }"
            class="flex flex-col"
          >
            <span class="text-gray-500 text-[9px]">{{ field.label }}</span>
            <span class="font-medium text-xs">{{ item[field.key] }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="p-4 text-gray-500">
    <p>Item not found.</p>
  </div>
</template>
