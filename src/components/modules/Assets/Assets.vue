<script setup lang="ts">
/*
 * TODO: Ubah nama file ini jadi AssetsTable.vue
 * Referensi: Coding Style Guide bagian 6.1.1
 */
import { computed, shallowRef, ref } from 'vue';
import { Badge, DataTable } from 'wangsvue';

import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from 'wangsvue/components/datatable/DataTable.vue.d';

import { FormValue } from 'wangsvue/components/form/Form.vue';
import response from './data/response.json';
import router from '@/router';
import { MenuItem } from 'wangsvue/components/menuitem';

import Asset from './helper/Asset';

const selectedAsset = shallowRef<Asset>();

const showForm = shallowRef<boolean>(false);
const formValues = ref<FormValue>();

// TODO: Ubah ini jadi computed (ingatin aku untuk jelasin beda computed sama constant)
const singleAction: MenuItem[] = [
  {
    label: 'Detail Asset',
    icon: 'file-copy-2-line',
    command: (): void => {
      router.push(`/detail-assets/${selectedAsset.value?._id}`);
    },
  },
  {
    label: 'Edit',
    icon: 'edit',
    command: (): void => {
      router.push('/edit');
    },
  },
];

// TODO: Ubah ini jadi constant
const tableColumns = computed<TableColumn[]>(() => {
  return [
    {
      field: 'name.nameWithSequence',
      header: 'Asset',
      sortable: true,
      reorderable: false,
      fixed: true,
    },
    {
      field: 'group.name',
      header: 'Group',
      sortable: true,
      fixed: true,
      bodyClass: 'text-primary',
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.group.name,
          },
        };
      },
    },
    {
      field: 'category.name',
      header: 'Category',
      sortable: true,
      fixed: true,
      bodyClass: 'text-primary',
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            label: data.category.name,
          },
        };
      },
    },
    {
      field: 'brand.name',
      header: 'Brand',
      sortable: true,
      fixed: true,
      bodyClass: 'text-primary',
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            severity: 'dark',
            label: data.brand.name,
          },
        };
      },
    },
    {
      field: 'model.name',
      header: 'Model/Type',
      sortable: true,
      fixed: true,
      bodyClass: 'text-primary',
      bodyComponent: (data: Asset): TableCellComponent => {
        return {
          component: Badge,
          props: {
            severity: 'dark',
            label: data.model.name,
          },
        };
      },
    },
    {
      field: 'name.aliasName',
      header: 'Alias Name',
      sortable: true,
      fixed: true,
    },
  ];
});

const getTableData = async (
  params: QueryParams,
): Promise<FetchResponse | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = ((params.page || 1) - 1) * (params.limit || 10);
      const endIndex = startIndex + (params.limit || 10);

      const data =
        params.page !== null && params.limit !== null
          ? response.data.data.slice(startIndex, endIndex)
          : response.data.data;

      resolve({
        message: '',
        data: {
          data, // Use 'slice' for data limiting
          totalRecords: response.data.totalRecords,
        },
      });
    }, 2); //Simulate delay
  });
};
</script>

<template>
  <DataTable
    :columns="tableColumns"
    :fetch-function="getTableData"
    :options="singleAction"
    @toggle-option="selectedAsset = $event"
    data-key="_id"
    lazy
    selection-type="single"
    table-name="assets-list"
    use-option
    use-paginator
  />
</template>
