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
      const users = JSON.parse(window.localStorage.getItem('value'));
      console.log(users[0])
     const isUser = users.filter(item => {
       return item.email === this.email && item.password === this.password
     })
      console.log(isUser.length > 0)
      if (isUser.length > 0) {
        this.$router.push('/basic');
        console.log('succes')
        // redirect la register
      } else {
        this.$router.push('/register');
      }
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