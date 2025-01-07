<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import { useBreadcrumbStore } from '@/store';
import Assets from '@/components/modules/Assets/Assets.vue';
import AssetsHeader from '@/components/modules/Assets/AssetsHeader.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

const menus = shallowRef([
  {
    name: 'Wangs',
  },
  {
    name: 'Assets',
  },
]);

onMounted(() => {
  setBreadcrumbs(menus.value);
});
</script>
<template>
  <AssetsHeader />
  <Assets />
</template>
