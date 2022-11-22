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
      <span>Data primirei creditului</span>
      <input type="date" class=" width-input">
    </div>
    <div class="padding">
      <span> Suma, lei:</span>
      <div class="column">
      {{ list[data.selectedCardIndex].sum_min }} - {{ list[data.selectedCardIndex].sum_max }} {{ list[data.selectedCardIndex].currency }}
      <input
          v-model="list[data.selectedCardIndex]['sum_max']"
          type="text"
          class="width-input"
      >
      </div>
    </div>
    <div class="padding">
      <span> Perioada, luni:</span>
      <select class="width-input">
        <option>
          {{ list[data.selectedCardIndex]['duration_max_m'] }}
        </option>
      </select>
    </div>
    <div class="padding">
      <span> Ziua plății:</span>
      <select class="width-input"
      >
        <option>
          {{ list[data.selectedCardIndex]['pay_day_min'] }}
        </option>
      </select>
    </div>
    <div class="padding">
      <span> Rata anuală a dobânzii, % </span>
      <span class="procentaj">
        {{ list[data.selectedCardIndex]['rate_p'] }} %
      </span>
    </div>
    <div class="btn-div">
      <button class="btn" type="button" @click="calcule">Calculează</button>
    </div>
  </form>
  <div class="line"></div>
  <!--  ----------------------------------------------------------------------------------->
  <table v-if="hidden" class="scheme2">
    <tr>
      <th>Luna</th>
      <th>Data</th>
      <th>Sold credit</th>
      <th>Rata lunară</th>
      <th>Creditul rambursat</th>
      <th>Credit rămas</th>
      <th>Comision de examinare</th>
      <th>Comision de acordare</th>
      <th>Comision de administrare</th>
      <th>Dobânda</th>
      <th>Plata lunară</th>
    </tr>
    <tr class="template">
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>


  <table class="scheme2-full">
    <tbody></tbody>
  </table>


  <div id="note-container">
    <div style="width:300px;">
      <p class="details-text" style="width:600px;"><span>Costul total al creditului, %:</span><span id="dae"></span>
      </p>
    </div>
    <div>
      <p class="note">Calculele prezentate sunt valabile până la următoarea modificare a ratei dobânzii şi sunt
        efectuate din ipoteza că suma totală a creditului este acordată imediat şi în întregime, valoarea totală a
        creditului se consideră a fi achitată în întregime, conform graficului din contract. În cazul achitării
        anticipate calculele se vor modifica.</p>
    </div>
  </div>
</template>

<script lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { defineComponent } from "vue";


export default defineComponent( {
  components: {
    Datepicker
  },
  data() {
    return {
      hidden: false,
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
        {
          value: "Credit Prima Casă",
          "rate_p": 12.72,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 1,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 1,
          "duration_max_m": 120,
          "duration_list": 0,
          "sum_max": 850000,
          "sum_min": 100000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Credit de nevoi personale fără gaj",
          "rate_p": 15.9,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Credit de nevoi personale fără gaj (preferențial)",
          "rate_p": 14.9,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Credit de nevoi personale cu gaj",
          "rate_p": 17.5,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0.20,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 13,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 2500000,
          "sum_min": 51000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Credit de nevoi personale cu gaj (preferențial)",
          "rate_p": 17.0,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0.20,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 13,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 2500000,
          "sum_min": 51000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Credit IMOBILIAR de achiziție",
          "rate_p": 13.5,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 1,
          "duration_max_m": 240,
          "duration_list": 0,
          "sum_max": 2500000,
          "sum_min": 51000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Credit IMOBILIAR de achiziție (preferențial)",
          "rate_p": 13,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 1,
          "duration_max_m": 360,
          "duration_list": 0,
          "sum_max": 2500000,
          "sum_min": 10000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "Overdraft pe card salarial Basic",
          "rate_p": 17.0,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 1,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 20,
          "month_free_mandatory_p": "",
          "duration_min_m": 21,
          "duration_max_m": 30,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 1,
          "sum_step": 1,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Overdraft pe card salarial Silver",
          "rate_p": 16.0,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 1,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 20,
          "month_free_mandatory_p": "",
          "duration_min_m": 21,
          "duration_max_m": 30,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 1,
          "sum_step": 1,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Overdraft pe card salarial GOLD",
          "rate_p": 15.0,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 1,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 20,
          "month_free_mandatory_p": "",
          "duration_min_m": 21,
          "duration_max_m": 30,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 1,
          "sum_step": 1,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Card de credit Basic",
          "rate_p": 16,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 2,
          "commission_administration_m_p": 0,
          "interval_free": 30,
          "interval_passive": 20,
          "month_free_mandatory_p": 5,
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Card de credit Silver",
          "rate_p": 15.5,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 2,
          "commission_administration_m_p": 0,
          "interval_free": 45,
          "interval_passive": 20,
          "month_free_mandatory_p": 5,
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Card de credit GOLD",
          "rate_p": 14.5,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 2,
          "commission_administration_m_p": 0,
          "interval_free": 60,
          "interval_passive": 20,
          "month_free_mandatory_p": 5,
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Card de credit Basic (preferențial)",
          "rate_p": 15.5,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 1.9,
          "commission_administration_m_p": 0,
          "interval_free": 30,
          "interval_passive": 20,
          "month_free_mandatory_p": 5,
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Card de credit Silver (preferențial)",
          "rate_p": 15,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 1.9,
          "commission_administration_m_p": 0,
          "interval_free": 45,
          "interval_passive": 20,
          "month_free_mandatory_p": 5,
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "Card de credit GOLD (preferențial)",
          "rate_p": 14,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 1.9,
          "commission_administration_m_p": 0,
          "interval_free": 60,
          "interval_passive": 20,
          "month_free_mandatory_p": 5,
          "duration_min_m": 1,
          "duration_max_m": 60,
          "duration_list": 0,
          "sum_max": 400000,
          "sum_min": 5000,
          "sum_step": 1000,
          "pay_day_min": 10,
          "pay_day_max": 15
        },
        {
          value: "SmartCredit Basic",
          "rate_p": 0,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 1,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0.65,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 12,
          "duration_max_m": 24,
          "duration_list": "12,24",
          "sum_max": 200000,
          "sum_min": 5000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
        {
          value: "SmartCredit GOLD",
          "rate_p": 0,
          "currency": "MDL",
          "commission_exam": 0,
          "commission_accord_p": 0,
          "commission_accord_min": 0,
          "commission_usage_p": 0,
          "commission_administration_m_p": 0,
          "interval_free": 0,
          "interval_passive": 0,
          "month_free_mandatory_p": "",
          "duration_min_m": 12,
          "duration_max_m": 24,
          "duration_list": "12,24",
          "sum_max": 200000,
          "sum_min": 5000,
          "sum_step": 1,
          "pay_day_min": 2,
          "pay_day_max": 27
        },
      ],
      data: {
        selectCredit: "",
        selectDate: null,
        sumaLei: null,
        perioadaLuni: null,
        ziuaPlatii: null,
        selectedCardIndex: 0,
      },
    };
  },
  methods: {
    calcule() {
      console.log(123)
      this.hidden = !this.hidden;
      // const table = document.querySelector(".scheme2")
      // table.classList.toggle("hiden")
    }
  },
  watch: {
    data: {
      handler(newValue: any) {
        console.log(123, JSON.parse(JSON.stringify(newValue)));
        console.log('zashel brat', newValue.selectCredit);
        this.data.selectedCardIndex = this.list.findIndex((item: any) =>
            item.value === JSON.parse(JSON.stringify(newValue.selectCredit)))
      },
      deep: true
    },
  },
})
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
  align-items: center;
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

.column {
  display: flex;
  flex-direction: column;
}



.hidden {
  display: none;
}

table {
  color: #333;
  font-size: 12px;
  width: 800px;
  border-spacing: 0px;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-left: 10px;
}

tr {
  margin: 0;
  padding: 0;
}

td {
  border-right: 1px solid #ccc;
  padding: 7px;
  border-top: 1px solid #ccc;
  margin: 0;
}

th {
  font-weight: bold;
  border-right: 1px solid #ccc;
  padding: 7px;
  border-top: 1px solid #ccc;
}

.note {
  margin-top: 20px;
  color: #777;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-size-adjust: none;
  font-stretch: normal;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  line-height: normal;
  padding: 1px 1px 1px 2px;
  width: 500px;
}
</style>
