<script setup lang="ts">
/*
 * TODO: Ubah nama file ini jadi AssetsView.vue, file view harus diakhiri View
 * Ingatin juga aku untuk jelasin formatter
 */
import { onMounted, shallowRef } from 'vue';
import { useBreadcrumbStore } from '@/store';
import Assets from '@/components/modules/Assets/Assets.vue';
import AssetsHeader from '@/components/modules/Assets/AssetsHeader.vue';

const { setBreadcrumbs } = useBreadcrumbStore();

// TODO: Ubah jadi constant
const menus = shallowRef([
  {
    name: 'Wangs',
  },
  {
    name: 'Assets',
  },
]);

/*
 * TODO: onMounted harusnya di atas shallowRef
 * Referensi: Coding Style Guide bagian 5.1.2
 */
onMounted(() => {
  setBreadcrumbs(menus.value);
});
</script>
<template>
  <AssetsHeader />
  <Assets />
</template>
