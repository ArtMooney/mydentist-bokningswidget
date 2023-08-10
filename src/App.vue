<style>
@import "./css/normalize.css";
@import "./css/components.css";
@import "./css/mydentist-bokningswidget.css";
</style>

<template>
  <Widget />

  <div>
    <router-view />
  </div>
</template>

<script>
import Widget from "./Widget.vue";

export default {
  name: "App",
  components: { Widget },
};
</script>
