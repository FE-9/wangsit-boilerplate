<script setup lang="ts">
import { shallowRef, ref } from 'vue';
import {
  Button,
  ButtonFilter,
  ButtonSearch,
  Icon,
  DialogForm,
  Dropdown,
  InputText,
  ImageCompressor,
} from 'wangsvue';

import { FormValue } from 'wangsvue/components/form/Form.vue.d';

const showForm = shallowRef<boolean>(false);
/*
 * TODO: formValues pake shallowRef aja, soalnya properti dalam formValues enggak diubah, cuma formValues itu sendiri yang diubah.
 * Ini penting karena shallowRef bakal bikin performanya lebih bagus.
 * Referensi: Coding Style Guide bagian 6.3.3
 */
const formValues = ref<FormValue>();

const apply = (e: {
  formValues: FormValue;
  stayAfterSubmit: boolean;
}): void => {
  formValues.value = e.formValues;
};
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <!-- TODO: Table name masih user-list, ubah jadi kayak di file Assets.vue -->
    <ButtonSearch table-name="user-list" />
    <ButtonFilter table-name="user-list" />
    <button type="button">
      <Icon
        icon="file-history"
        info="Changelog"
        severity="secondary"
        tooltip-pos="bottom"
      />
    </button>
    <Button @click="showForm = true" label="+ Register" severity="secondary" />
  </div>
  <!-- TODO: DialogForm dipindah ke file baru di folder sama, namanya AssetsForm.vue -->
  <DialogForm
    v-model:visible="showForm"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    @submit="apply"
    cancel-btn-label="Cancel"
    clear-btn-label="Clear Field"
    header="Register Asset"
    severity="success"
    show-stay-checkbox
    stay-checkbox-label="Stay on this form after submitting"
    submit-btn-label="Create"
    width="large"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-4">
        <!-- TODO: Options dropdown jangan taruh di template, buat constant aja.
        Referensi: Coding Style Guide bagian 6.2.4
         
        Dan juga, daripada di tiap dropdown ada properti option-label sama option-value,
        pake `v-bind="DropdownProps"` aja, terus buat constant DropdownProps yang isinya
        properti yang dipake semua Dropdown -->
        <Dropdown
          :options="[
            { label: 'Room 402', value: 'Room 402' },
            { label: 'Warehouse', value: 'Warehouse' },
            { label: 'Garage', value: 'Garage' },
          ]"
          field-name="group"
          label="Group"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select group"
          use-validator
          validator-message="You must pick a group"
        />
        <Dropdown
          :options="[
            {
              label: 'Elektronik',
              value: { text: 'Elektronik', _id: 'id1', key: 1 },
            },
            {
              label: 'Transportasi',
              value: { text: 'Transportasi', _id: 'id2', key: 2 },
            },
            {
              label: 'Sanitasi',
              value: { text: 'Sanitasi', _id: 'id3', key: 3 },
            },
          ]"
          field-name="category"
          label="Category"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select category"
          use-validator
          validator-message="You must pick a category"
        />
        <Dropdown
          :options="[
            { label: 'Ac Portable Indoor', value: 'Ac Portable Indoor' },
            { label: 'Kompor', value: 'Kompor' },
            { label: 'Wastafel', value: 'Wastafel' },
          ]"
          field-name="name"
          label="Name"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select name"
          use-validator
          validator-message="You must pick a name"
        />
        <InputText
          :validator-message="{
            exceed: 'Max. 30 characters',
          }"
          field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
          field-name="aliasName"
          label="Alias Name"
          placeholder="Enter alias name"
          use-validator
        />
        <Dropdown
          :options="[
            {
              label: 'Samsung',
              value: { text: 'Samsung', _id: 'id1', key: 1 },
            },
            {
              label: 'Hyundai',
              value: { text: 'Hyundai', _id: 'id2', key: 2 },
            },
            {
              label: 'Apple',
              value: { text: 'Apple', _id: 'id3', key: 3 },
            },
          ]"
          field-name="brand"
          label="Brand"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select brand"
          use-validator
          validator-message="You must pick a brand"
        />
        <Dropdown
          :options="[
            {
              label: 'MacBook Pro',
              value: { text: 'MacBook Pro', _id: 'id1', key: 1 },
            },
            {
              label: 'Asus',
              value: { text: 'Asus', _id: 'id2', key: 2 },
            },
            {
              label: 'Ultra 24',
              value: { text: 'Ultra 24', _id: 'id3', key: 3 },
            },
          ]"
          field-name="modelType"
          label="Model/Type"
          mandatory
          option-label="label"
          option-value="value"
          placeholder="Select model/type"
          use-validator
          validator-message="You must pick a model/type"
        />
        <ImageCompressor
          field-name="image"
          use-validator
          validator-message="File size too big! Max. 1 MB"
        />
      </div>
    </template>
  </DialogForm>
</template>
