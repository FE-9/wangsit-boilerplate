<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { Badge, DataTable } from 'wangsvue';
import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from 'wangsvue/components/datatable/DataTable.vue.d';

import { MenuItem } from 'wangsvue/components/menuitem';
import { Asset } from './helper/Asset';

import router from '@/router';
import AssetsForm from './AssetsForm.vue';
import AssetsHeader from './AssetsHeader.vue';
import response from './data/response.json';

const tableColumns: TableColumn[] = [
  {
    field: 'name',
    header: 'Asset',
    sortable: true,
    reorderable: false,
    fixed: true,
  },
  {
    field: 'group',
    header: 'Group',
    sortable: true,
    fixed: true,
    bodyClass: 'text-primary',
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          label: data.group,
        },
      };
    },
  },
  {
    field: 'category',
    header: 'Category',
    sortable: true,
    fixed: true,
    bodyClass: 'text-primary',
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          label: data.category,
        },
      };
    },
  },
  {
    field: 'brand',
    header: 'Brand',
    sortable: true,
    fixed: true,
    bodyClass: 'text-primary',
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          severity: 'dark',
          label: data.brand,
        },
      };
    },
  },
  {
    field: 'model',
    header: 'Model/Type',
    sortable: true,
    fixed: true,
    bodyClass: 'text-primary',
    bodyComponent: (data: Asset): TableCellComponent => {
      return {
        component: Badge,
        props: {
          severity: 'dark',
          label: data.model,
        },
      };
    },
  },
  {
    field: 'aliasName',
    header: 'Alias Name',
    sortable: true,
    fixed: true,
  },
];

const showForm = shallowRef<boolean>(false);
const selectedAsset = shallowRef<Asset | undefined>();

const singleAction = computed<MenuItem[]>(() => {
  return [
    {
      label: 'Detail Asset',
      icon: 'file-copy-2-line',
      command: (): void => {
        router.push(`/${selectedAsset.value?._id}/details-asset`);
      },
    },
    {
      label: 'Edit',
      icon: 'edit',
      command: (): void => {
        showForm.value = true;
      },
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

const handleShowFormRegister = (): void => {
  selectedAsset.value = undefined;
  showForm.value = true;
};
</script>

<template>
  <AssetsHeader @show-form-register="handleShowFormRegister" />
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
  <AssetsForm v-model:visible="showForm" :asset="selectedAsset" />
</template>
