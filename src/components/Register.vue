<template>
  <form @submit.prevent="handleSubmit" class="log reg">
    <div class="form-group">
      <label>First Name</label>
      <input type="text" class="form-control" v-model="first_name" placeholder="First Name" />
    </div>

    <div class="form-group">
      <label>Last Name</label>
      <input type="text" class="form-control" v-model="last_name" placeholder="Last Name" />
    </div>

    <div class="form-group">
      <label>Email</label>
      <input type="email" class="form-control" v-model="email" placeholder="Email" />
       <p v-if="superEmail" style="color: red; margin-bottom: 0px" >The email is already in use</p>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password" />
    </div>

    <div class="form-group">
      <label>Confirm Password</label>
      <input type="password" class="form-control" v-model="password_confirm" placeholder="Confirm Password" />
    </div>

    <button @click="handleSubmit" class="btn btn-primary btn-block sign-up">Sign Up</button>
  </form>
</template>
<script>

export default {
  name: "Register",
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirm: '',
      superEmail: false
    }
  },
  methods: {
    handleSubmit() {
      const user = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.password_confirm
      };

      let users = JSON.parse(window.localStorage.getItem('value')) || [];
      let isUser
      if (users === null) {
        isUser = false
      } else {
        isUser = users.filter(item => {
          if (item === null) {
            isUser = false
          } else {
            return item.email === this.email
          }
        });
      }
      if (isUser.length > 0) {
        this.superEmail = true
      }
      else if (user) {
        this.$router.push('/login');
      }
      window.localStorage.setItem('value', JSON.stringify([...users, user]));

    }
  }
}

</script>

<style scoped>
form {
  margin: 100px auto;
}
.reg {
  width: 450px;
  height: 550px;
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: left;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
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