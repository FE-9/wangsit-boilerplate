<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { Badge, DataTable } from 'wangsvue';

import {
  FetchResponse,
  QueryParams,
  TableCellComponent,
  TableColumn,
} from 'wangsvue/components/datatable/DataTable.vue.d';

import response from './data/response.json';
import router from '@/router';
import { MenuItem } from 'wangsvue/components/menuitem';

import { Asset } from './helper/Asset';
import AssetsForm from './AssetsForm.vue';
import AssetsHeader from './AssetsHeader.vue';

const showFormRegister = shallowRef<boolean>(false);

const selectedAsset = shallowRef<Asset>();

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
        router.push('/edit');
      },
    },
  ];
});

const tableColumns: TableColumn[] = [
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
          label: data.group,
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
          label: data.category,
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
          label: data.brand,
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
          label: data.model,
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
  <AssetsHeader @show-form-register="showFormRegister = true" />
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
  <AssetsForm v-model:visible="showFormRegister" />
</template>
