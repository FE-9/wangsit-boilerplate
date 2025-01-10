<script setup lang="ts">
import { useBreadcrumbStore } from '@/store';
import { Breadcrumb, Card } from 'wangsvue';

const { breadcrumbs } = useBreadcrumbStore();
</script>

<template>
  <div class="bg-grayscale-100 h-screen flex flex-col px-6 py-3 gap-2">
    <Breadcrumb :menus="breadcrumbs" />
    <Card>
      <template #content>
        <router-view />
      </template>
    </Card>
  </div>
</template>
