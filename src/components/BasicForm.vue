<template>
  <form action="" class="form">
    <div>
      <h2>Calculează plata lunară şi costul creditului</h2>
    </div>
    <div class="tip-credit padding">
      <span> Tipul creditului:</span>
      <select class="width-input">
        <option v-for="item in list" :value="item"> {{ item }}</option>
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
      list: [
        '',
        'Credit Acum',
        'Credit Prima Casă',
        'Credit de nevoi personale fără gaj',
        'Credit de nevoi personale fără gaj (preferențial)',
        'Credit de nevoi personale cu gaj',
        'Credit de nevoi personale cu gaj (preferențial)',
        'Credit IMOBILIAR de achiziție',
        'Credit IMOBILIAR de achiziție (preferențial)',
        'Overdraft pe card salarial Basic',
        'Overdraft pe card salarial Silver',
        'Overdraft pe card salarial GOLD',
        'Card de credit Basic',
        'Card de credit Silver',
        'Card de credit GOLD',
        'Card de credit Basic (preferențial)',
        'Card de credit Silver (preferențial)',
        'Card de credit GOLD (preferențial)',
        'SmartCredit Basic',
        'SmartCredit GOLD'
      ],
      date: null,
    };
  },
};

</script>

<style scoped>
</style>