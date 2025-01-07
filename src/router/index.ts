import { Component } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: (): Promise<Component> => import('@/layout/ExampleLayout.vue'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Exampleview',
        component: (): Promise<Component> => import('@/views/ExampleView.vue'),
      },
      {
        path: 'another-page',
        name: 'AnotherExampleview',
        component: (): Promise<Component> => import('@/views/ExampleView2.vue'),
      },
      {
        path: 'assets',
        name: 'Assets',
        component: (): Promise<Component> => import('@/views/Assets.vue'),
      },
    ],
  },
  {
    path: '/detail-assets',
    component: (): Promise<Component> =>
      import('@/layout/AssetDetailsLayout.vue'),
    children: [
      {
        path: ':id',
        name: 'DetailAssets',
        component: (): Promise<Component> => import('@/views/AssetsDetails.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory((import.meta.env || process.env).BASE_URL),
  routes,
});

export default router;