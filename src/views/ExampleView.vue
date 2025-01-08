<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useBreadcrumbStore } from '@/store';
import { BreadcrumbMenu } from 'wangsvue/components/breadcrumb/Breadcrumb.vue.d';
import ExampleModule from '@/components/modules/ExampleModule/ExampleModule.vue';
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
    name: 'Home',
  },
];

onMounted(() => {
  setBreadcrumbs(menus);
});
</script>
<template>
  <TabMenu :menu="tabMenus" />
  <ExampleModule />
</template>
