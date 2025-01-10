<script setup lang="ts">
import {
  Dropdown,
  InputText,
  ImageCompressor,
  DialogForm,
  useToast,
} from 'wangsvue';

import { DropdownProps } from 'wangsvue/components/dropdown/Dropdown.vue';
import { FormValue } from 'wangsvue/components/form/Form.vue.d';
import { Asset } from '../../../types/asset.type';

const visible = defineModel<boolean>('visible', { default: false });

const editProps = defineProps<{
  asset: Asset | undefined;
}>();

const toast = useToast();

const DropdownReusableProps: DropdownProps = {
  optionLabel: 'label',
  optionValue: 'value',
  useValidator: true,
};

/*
 * TODO: Semua constant di bawah ini ditambah type
 * DropdownOptions (import dari wangsvue)
 */
const OptionsGroup = [
  { label: 'Room 402', value: 'Room 402' },
  { label: 'Warehouse', value: 'Warehouse' },
  { label: 'Garage', value: 'Garage' },
];

const OptionsCategory = [
  { label: 'Elektronik', value: 'Elektronik' },
  { label: 'Transportasi', value: 'Transportasi' },
  { label: 'Sanitasi', value: 'Sanitasi' },
];

const OptionsBrand = [
  { label: 'Samsung', value: 'Samsung' },
  { label: 'Hyundai', value: 'Hyundai' },
  { label: 'Apple', value: 'Apple' },
];

const OptionsModelType = [
  { label: 'MacBook Pro', value: 'MacBook Pro' },
  { label: 'Asus', value: 'Asus' },
  { label: 'Ultra 24', value: 'Ultra 24' },
];

const OptionsName = [
  { label: 'Ac Portable Indoor', value: 'Ac Portable Indoor' },
  { label: 'Kompor', value: 'Kompor' },
  { label: 'Wastafel', value: 'Wastafel' },
];

const openToast = (message: string, isError?: boolean): void => {
  toast.add({ message, error: isError, customMessage: false });
};

const apply = (e: {
  formValues: FormValue;
  stayAfterSubmit: boolean;
}): void => {
  if (editProps.asset) {
    try {
      openToast('Success, asset has been edited', false);
      console.log('Editing asset:', e.formValues);
    } catch (error) {
      openToast('Failed to edit asset', true);
      console.error('Failed to edit asset:', error);
    }
  } else {
    try {
      openToast('Success, asset has been registered', false);
      console.log('Registering new asset:', e.formValues);
    } catch (error) {
      openToast('Failed to register asset', true);
      console.error('Failed to register asset:', error);
    }
  }
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
    :buttons-template="['submit', 'cancel', 'clear']"
    :closable="false"
    :header="asset ? 'Edit Asset' : 'Register Asset'"
    :show-stay-checkbox="asset ? false : true"
    @submit="apply"
    cancel-btn-label="Cancel"
    clear-btn-label="Clear Field"
    severity="success"
    stay-checkbox-label="Stay on this form after submitting"
    submit-btn-label="Create"
    width="large"
  >
    <template #fields>
      <div class="grid grid-cols-2 gap-4">
        <Dropdown
          v-bind="DropdownReusableProps"
          :initial-value="asset?.group"
          :options="OptionsGroup"
          field-name="group"
          label="Group"
          mandatory
          placeholder="Select group"
          validator-message="You must pick a group"
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :initial-value="asset?.category"
          :options="OptionsCategory"
          field-name="category"
          label="Category"
          mandatory
          placeholder="Select category"
          validator-message="You must pick a category"
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :initial-value="asset?.name"
          :options="OptionsName"
          field-name="name"
          label="Name"
          mandatory
          placeholder="Select name"
          validator-message="You must pick a name"
        />
        <InputText
          :validator-message="{
            exceed: 'Max. 30 characters',
          }"
          :value="asset?.aliasName"
          field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
          field-name="aliasName"
          label="Alias Name"
          placeholder="Enter alias name"
          use-validator
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :initial-value="asset?.brand"
          :options="OptionsBrand"
          field-name="brand"
          label="Brand"
          mandatory
          placeholder="Select brand"
          validator-message="You must pick a brand"
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :initial-value="asset?.model"
          :options="OptionsModelType"
          field-name="model"
          label="Model/Type"
          mandatory
          placeholder="Select model/type"
          validator-message="You must pick a model/type"
        />
        <div class="flex flex-col">
          <span>Photo</span>
          <ImageCompressor
            :image-preview-url="asset?.imageUrl"
            field-name="imageUrl"
            use-validator
            validator-message="File size too big! Max. 1 MB"
          />
        </div>
      </div>
    </template>
  </DialogForm>
</template>
