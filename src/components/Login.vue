<template>
  <form @submit.prevent="handleSubmit" class="log">
    <h3>Login</h3>
    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" placeholder="Email">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password">
    </div>
    <button @click="handleSubmit" class="btn btn-primary btn-block">Login</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    }
  },
  methods: {
    handleSubmit() {
      const user_log = {
        email: this.email,
        password: this.password,
      }
      let users = window.localStorage.getItem('acc');
      if (!users) {
        this.$router.push('/register');
        console.log('nui user')
        // redirect la register
      } else if (users){
        this.$router.push({path: '/basic'});
        users = JSON.parse(users);
        console.log('este user', user_log)
        // redirect la home
      }
      // console.log('if', users)
      // window.localStorage.setItem(this.email, this.password);
      // if (localStorage.getItem(this.email) === null) {
      //   localStorage.setItem(this.email);
      // }else {
      //   console.log("you have an acc")
      // }

    }
  }
}
</script>

<style scoped>
.log {
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  width: 450px;
  height: 340px;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}
form {
  margin: 100px auto;
}
body {
  background-color: #c2c2c2;

}
.form-group {
  width: 340px;

}
.btn {
  border: 1px solid #aaaaaa;
  cursor: pointer;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#5c76d9), to(#9cb6f1));
  border-radius: 3px;
  padding: 6px 0;
  width: 163px;

}
</style>