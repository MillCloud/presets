<template>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" name="el-fade-in" appear>
      <component :is="Component" :key="route.fullPath"></component>
    </transition>
  </router-view>
</template>
