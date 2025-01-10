<script setup lang="ts">
import { shallowRef } from 'vue';
import { Button, Card, Form, InputEmail, InputPassword } from 'wangsvue';
import { FormValue } from 'wangsvue/components/form/Form.vue.d';

import router from '@/router';

const formValues = shallowRef<FormValue>();

const apply = (e: { formValues: FormValue }): void => {
  formValues.value = e.formValues;
  console.log(formValues.value);
  const placeholderJWT =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
  localStorage.setItem('token', placeholderJWT);

  router.push('/');
};
</script>
<template>
  <Card class="max-h-[591px] w-[420px] max-w-sm p-8">
    <template #header>
      <div class="flex flex-col justify-center items-center">
        <img
          alt="Wangsit Logo"
          className="h-16 w-max"
          src="/src/assets/img/wangsit-logo-total.png"
        />
        <h2 className="text-2xl text-center mt-3 mb-3">Login</h2>
      </div>
    </template>
    <template #content>
      <Form @submit="apply($event)" hide-stay-checkbox>
        <template #fields>
          <InputEmail
            :validator-message="{
              invalidFormat:
                'Invalid email format, please check and try again.',
              empty: 'Please enter your email and try again.',
            }"
            label="Email"
            mandatory
            placeholder="Enter your email"
            use-validator
            validate-on-blur
          />
          <InputPassword
            :validator-message="{
              empty: 'Please enter your password and try again.',
              mismatch: 'Incorrect email or password, please try again.',
            }"
            label="Password"
            mandatory
            placeholder="Enter your password"
            use-validator
            validate-on-blur
          />

          <Button
            class="w-full bg-black text-white mt-2"
            label="Login"
            severity="secondary"
            size="large"
            type="submit"
          />
        </template>
      </Form>

      <p className="text-center text-sm">
        <a href="#">Login dengan OTP</a>
      </p>
    </template>
  </Card>
</template>
