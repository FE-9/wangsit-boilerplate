<script setup lang="ts">
import { Button, ButtonFilter, ButtonSearch, Icon } from 'wangsvue';

defineEmits(['showFormRegister']);
</script>

<template>
  <div class="flex justify-end gap-4" data-wv-section="tabletoolbars">
    <ButtonSearch table-name="assets-list" />
    <ButtonFilter table-name="assets-list" />
    <button type="button">
      <Icon
        class="w-6 h-6 text-grayscale-900 shrink-0"
        icon="file-history"
        info="Changelog"
        severity="secondary"
        tooltip-pos="bottom"
      />
    </button>
    <Button
      @click="$emit('showFormRegister')"
      label="+ Register"
      severity="secondary"
    />
  </div>
</template>
