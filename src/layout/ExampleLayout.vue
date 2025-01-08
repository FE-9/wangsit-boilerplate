<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card } from 'wangsvue';

const { breadcrumbs } = useBreadcrumbStore();
</script>

<template>
  <Breadcrumb :menus="breadcrumbs" />
  <Card>
    <template #content>
      <router-view />
    </template>
  </Card>
</template>
