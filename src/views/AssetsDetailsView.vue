<script setup lang="ts">
import { onMounted } from 'vue';
import { useBreadcrumbStore } from '@/store';
import AssetsDetail from '@/components/modules/Assets/AssetsDetail.vue';
onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();
const menus = [
  {
    name: 'Asset Detail',
  },
];
</script>
<template>
  <AssetsDetail />
</template>
