<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBreadcrumbStore } from '@/store';
import AssetsTable from '@/components/modules/Assets/AssetsTable.vue';
import { TabMenu } from 'wangsvue';
import { MenuItem } from 'wangsvue/components/menuitem';

onMounted(() => {
  setBreadcrumbs(menus);
});

const { setBreadcrumbs } = useBreadcrumbStore();

const tabMenus = ref<MenuItem[]>([
  {
    label: 'Home',
    route: 'home',
  },
  {
    label: 'Another Page',
    route: 'another-page',
  },
  {
    label: 'Assets',
    route: 'assets',
  },
]);

const menus = [
  {
    name: 'Wangs',
  },
  {
    name: 'Assets',
  },
];
</script>
<template>
  <TabMenu :menu="tabMenus" />
  <AssetsTable />
</template>
