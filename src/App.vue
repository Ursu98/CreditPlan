<template>
  <div id="app">
    <Nav />
<!--    <div class="auth-wrapper">-->
<!--      <div class="auth-inner">-->
<!--        <router-view />-->
<!--      </div>-->
<!--    </div>-->
  </div>
  <div>

    <router-view />
  </div>
</template>

<script lang="ts">
// import basicForm from "@/components/BasicForm.vue";
import Nav from './components/Nav.vue';
// import login from './components/Login.vue';
// import register from './components/Register.vue';

export default {
  components: {
    // basicForm,
    Nav,
    // login,
    // register
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

body, html, #app, #root, .auth-wrapper {
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;
}

.navbar-light {
  background-color: #a0b5ff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

/*.auth-wrapper {*/
/*  display: flex;*/
/*  justify-content: center;*/
/*  align-items: center;*/
/*  flex-direction: column;*/
/*  text-align: left;*/
/*}*/

/*.auth-inner {*/
/*  width: 450px;*/
/*  background: #ffffff;*/
/*  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);*/
/*  padding: 40px 55px 45px 55px;*/
/*  border-radius: 15px;*/
/*  transition: all .3s;*/
/*}*/

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