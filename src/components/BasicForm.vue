<template>
  <form action="" class="form">
    <div>
      <h2>Calculează plata lunară şi costul creditului</h2>
    </div>
    <div class="tip-credit padding">
      <span> Tipul creditului:</span>
      <select v-model="selected" class="width-input">
        <option></option>
        <option>Credit Acum</option>
        <option>Credit Prima Casa</option>
        <option>Credit de nevoi fara gaj</option>
      </select>
    </div>
    <div class="date padding">
      <span>Data primirei creditului</span>
      <Datepicker v-model="date" class="date-picker width-input"></Datepicker>
    </div>
    <div class="padding">
      <span> Suma, lei:</span>
      <input class="width-input">
    </div>
    <div class="padding">
      <span> Preioada luni:</span>
      <select v-model="selected" class="width-input">
      </select>
    </div>
    <div class="padding">
      <span> Ziua platii:</span>
      <select v-model="selected" class="width-input"
      ></select>
    </div>
    <div class="padding">
        <span>
        Rata anuala a dobanzii, %
      </span>
    </div>
    <div class="btn-div">
      <button class="btn">
        Calculeaza
      </button>
    </div>
  </form>
  <hr>
</template>

<script lang="ts">
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  components: {Datepicker},
  data() {
    return {
      selected: '',
      date: null
    };
  },
};

</script>

<style scoped>

</style>