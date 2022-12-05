<template>
  <div id="app">
    <Nav />
  </div>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Nav from './components/Nav.vue';

export default {
  components: {
    Nav,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

body {
  background: #c7c6c6 !important;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  font-weight: 400;
}

h1, h2, h3, h4, h5, h6, label, span {
  font-weight: 500;
}

body, html, #app {
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;
}

.navbar-light {
  background-color: #a0b5ff;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
}

.auth-wrapper .form-control:focus {
  background-color: #d9d4d4;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password,
.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}

.sign-up {
  background-color: #c4c0c0;
  border-color: #28282a;
}

</style>