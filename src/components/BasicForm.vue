<template>
  <form action="" class="form">
    <div>
      <h2>Calculează plata lunară şi costul creditului</h2>
    </div>

    <div class="tip-credit padding">
      <span> Tipul creditului:</span>
      <select class="width-input" v-model="data.selectCredit">
        <option v-for="(item, index) in list" :value="item.value"> {{ item.value }}</option>
      </select>
    </div>

    <div class="date padding">
      <span>Data primirii creditului</span>
      <Datepicker v-model="data.date" class="date-picker width-input"></Datepicker>
    </div>

    <div class="padding">
      <span> Suma, lei:</span>
      <input
          v-model="data.sumaLei"
          type="text"
          class="width-input"
      />
    </div>
    <div class="padding">
      <span> Perioada, luni:</span>
      <select class="width-input"></select>
    </div>
    <div class="padding">
      <span> Ziua plății:</span>
      <select class="width-input"></select>
    </div>
    <div class="padding">
      <span> Rata anuală a dobânzii, % </span>
    </div>
    <div class="btn-div">
      <button class="btn">Calculează</button>
    </div>
  </form>
  <div class="line"></div>
</template>

<script lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: {
    Datepicker
  },
  data: function () {
    return {
      // selectCredit: 0,
      // date: null,
      list: [
        {value: "-"},
        {
          value: "Credit Acum",
          rate_p: 29.0,
          currency: "MDL",
          commission_exam: 0,
          commission_accord_p: 0,
          commission_accord_min: 0,
          commission_usage_p: 0,
          commission_administration_m_p: 0,
          interval_free: 0,
          interval_passive: 0,
          month_free_mandatory_p: "",
          duration_min_m: 1,
          duration_max_m: 24,
          duration_list: 0,
          sum_max: 20000,
          sum_min: 5000,
          sum_step: 1000,
          pay_day_min: 2,
          pay_day_max: 27,
        },
        {value: "Credit Prima Casă"},
        {value: "Credit de nevoi personale fără gaj"},
        {value: "Credit de nevoi personale fără gaj (preferențial)"},
        {value: "Credit de nevoi personale cu gaj"},
        {value: "Credit de nevoi personale cu gaj (preferențial)"},
        {value: "Credit IMOBILIAR de achiziție"},
        {value: "Credit IMOBILIAR de achiziție (preferențial)"},
        {value: "Overdraft pe card salarial Basic"},
        {value: "Overdraft pe card salarial Silver"},
        {value: "Overdraft pe card salarial GOLD"},
        {value: "Card de credit Basic"},
        {value: "Card de credit Silver"},
        {value: "Card de credit GOLD"},
        {value: "Card de credit Basic (preferențial)"},
        {value: "Card de credit Silver (preferențial)"},
        {value: "Card de credit GOLD (preferențial)"},
        {value: "SmartCredit Basic"},
        {value: "SmartCredit GOLD"},
      ],
      data: {
        selectCredit: "-",
        date: null,
        sumaLei: null,
        luni: null,
      },
    };
  },
  watch: {
    data: {
      handler(newValue: any) {
        console.log(123, JSON.parse(JSON.stringify(newValue)));
        console.log('zashel brat', newValue.selectCredit);
      },
      deep: true
    },
  },
}
</script>

<style scoped>
h2 {
  display: flex;
  justify-content: center;
  font-size: 14px;
  padding-bottom: 35px;
}

.form {
  color: #244f8e;
  border: 1px solid #abaaaa;
  width: 37rem;
  height: auto;
  font-size: 12px;
  font-weight: 700;
  padding-top: 15px;
}

.padding {
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
}

.date {
  display: flex;
  align-items: center;
}

.width-input {
  width: 17rem;
}

.btn-div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px;
}

.btn {
  border: 1px solid #aaaaaa;
  cursor: pointer;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#fff), to(#ccc));
  border-radius: 3px;
  padding: 6px 0;
  width: 163px;
}
.line {
  width: 800px;
  height: 1px;
  background-color: #abaaaa;
  margin-top: 50px;
}
</style>
