<script setup lang="ts">
import { shallowRef } from 'vue';
import { Dropdown, InputText, ImageCompressor, DialogForm } from 'wangsvue';
import { DropdownProps } from 'wangsvue/components/dropdown/Dropdown.vue';
import { FormValue } from 'wangsvue/components/form/Form.vue.d';

const visible = defineModel<boolean>('visible', { default: false });

const formValues = shallowRef<FormValue>();

const DropdownReusableProps: DropdownProps = {
  optionLabel: 'label',
  optionValue: 'value',
  useValidator: true,
};

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

const apply = (e: {
  formValues: FormValue;
  stayAfterSubmit: boolean;
}): void => {
  formValues.value = e.formValues;
};
</script>

<template>
  <DialogForm
    v-model:visible="visible"
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
        <Dropdown
          v-bind="DropdownReusableProps"
          :options="OptionsGroup"
          field-name="group"
          label="Group"
          mandatory
          placeholder="Select group"
          validator-message="You must pick a group"
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :options="OptionsCategory"
          field-name="category"
          label="Category"
          mandatory
          placeholder="Select category"
          validator-message="You must pick a category"
        />
        <Dropdown
          v-bind="DropdownReusableProps"
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
          field-info="You can input an alias name for convenience in searching for assets and to differentiate them from others."
          field-name="aliasName"
          label="Alias Name"
          placeholder="Enter alias name"
          use-validator
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :options="OptionsBrand"
          field-name="brand"
          label="Brand"
          mandatory
          placeholder="Select brand"
          validator-message="You must pick a brand"
        />
        <Dropdown
          v-bind="DropdownReusableProps"
          :options="OptionsModelType"
          field-name="modelType"
          label="Model/Type"
          mandatory
          placeholder="Select model/type"
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
