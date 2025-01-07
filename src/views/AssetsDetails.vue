<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useBreadcrumbStore } from '@/store';
import AssetsDetails from '@/components/modules/Assets/AssetsDetail.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

// TODO: Ubah jadi constant
const menus = shallowRef([
  {
    name: 'Asset Detail',
  },
]);

onMounted(() => {
  setBreadcrumbs(menus.value);
});
</script>
<template>
  <AssetsDetails />
</template>
