<template>
  <Header v-if="$route.path !== '/login' && $route.path !== '/signup'" />
  <RouterView />
</template>

<script src="./javascript/app.js"></script>

<style scoped></style>
