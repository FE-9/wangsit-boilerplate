<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue';
import { TabMenu } from 'wangsvue';
import { MenuItem } from 'wangsvue/components/menuitem';

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

const menus: BreadcrumbMenu[] = [
  {
    name: 'Wangs',
  },
  {
    name: 'Another Page',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>
<template>
  <TabMenu :menu="tabMenus" />
  <h1>Hello from Another Tab</h1>
</template>
