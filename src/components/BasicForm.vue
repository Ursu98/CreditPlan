<template>
  <form action="" class="form">
    <div class="form-align">
      <h2>Calculează plata lunară şi costul creditului</h2>
    </div>
    <div class="tip-credit padding">
      <span> Tipul creditului:</span>
      <select class="width-input" v-model="data.selectCredit" @change="tipulCreditului">
        <option v-for="(item) in list" :value="item.value"> {{ item.value }}
        </option>
      </select>
    </div>
    <div class="date padding">
      <span>Data primirii creditului</span>
      <input type="date" class=" width-input" @change="getDate" v-model="data.dataPrimirii">
    </div>
    <div class="padding">
      <span> Suma, lei:</span>
      <div class="column">
        {{ list[data.selectedCardIndex].sum_min }} -
        {{ list[data.selectedCardIndex].sum_max }}
        {{ list[data.selectedCardIndex].currency }}
        <input
            type="text"
            class="width-input"
            v-model.number="data.sumaLei"
            :max="this.data.sum_max"
            :min="this.data.sum_min"
        />
      </div>
    </div>
    <div class="padding">
      <span> Perioada, luni:</span>
      <select class="width-input" v-model="data.perioadaLuni">
        <option v-for="item in list[data.selectedCardIndex]['duration_max_m']">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="padding">
      <span> Ziua plății:</span>
      <select class="width-input" v-model="data.ziuaPlatii">
        <option v-for="item in list[data.selectedCardIndex]['pay_day_max']">
          {{ item }}
        </option>
      </select>
    </div>
    <div class="padding">
      <span> Rata anuală a dobânzii, % </span>
      <span class="procentaj">
        {{ data.rataAnuala }}
      </span>
    </div>
    <div class="btn-div">
      <button class="btn" type="button" @click="getData()">Calculează</button>
    </div>
  </form>
  <div class="line"></div>
  <!--  ----------------------------------------------------------------------------------->
  <h3 v-if="users">Import Excel</h3>
  <input v-if="users" type="file" @change="subirExcel"/>
  <div v-if="!!items.length"  class="excel">
    <div class="alignCenterRow">
      <template v-for="item in head">
        <div class="box">{{ item }}</div>
      </template>
    </div>
    <div class="alignCenterColumn">
      <template v-for="item in items">
        <div class="alignCenterRow">
          <div class="box" v-for="el in item">{{ el }}</div>
        </div>
      </template>
    </div>
  </div>
  <button @click="onBtnExport" v-if="!!items.length && users " type="button">Export Excel</button>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import readXlsxFile from "read-excel-file";
import moment from 'moment';


export default defineComponent({
  name: "basic",
  data() {
    return {
      hidden : false,
      file: null,
      items: [],
      users: JSON.parse(window.localStorage.getItem('value')),
      head: [
        "Luna",
        "Data",
        "Sold Credit",
        "Suma creditului acordat",
        "Rata lunară ",
        "Credit rămas",
        "Comision examinare",
        "Comision acordare",
        "Comision administrare",
        "Dobânda",
        "Plata lunară",
      ],
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
        sumMax: 0,
        sumMin: 0,
        plataLunara: 0,
        rataAnuala: 0,
        dataPrimirii: 0,
      },
    };
  },
  methods: {
    getDate(e: any): void {
      console.log('getDate', e.target.value, this.data);
    },

    newMonth (value: number) {
      const startDate = this.data.dataPrimirii;
      let newDate = moment(startDate, "YYYY-MM-DD").add(value, 'month');
      console.log(moment(newDate).format("YYYY-MM-DD"))
      return moment(newDate).format("YYYY-MM-DD")
    },

    formValid(): boolean {
      const {sumaLei, perioadaLuni} = this.data;
      return (
          +sumaLei >= 0 &&
          +sumaLei >= this.data.sumaMin &&
          +sumaLei <= this.data.sumaMax &&
          +perioadaLuni > 0

      );
    },
    getData(): void {
      this.items = [];
      const a = new Array(5);
      a.forEach((el) => {
        console.log("555", {el});
      })
      this.formValid()
      console.log("123am intrat", this.formValid())
      if (!this.formValid()) return;
      let {sumaLei, rataLunara, perioadaLuni, dobanda, plataLunara, rataAnuala, ziuaPlatii, dataPrimirii} =
          this.data;
      console.log(sumaLei, rataLunara, perioadaLuni, dobanda, plataLunara, ziuaPlatii, dataPrimirii);
      rataLunara = (rataAnuala * 100) / (perioadaLuni * sumaLei);
      this.data.plataLunara = (sumaLei * (1 + rataLunara / 100)) / perioadaLuni;
      const monthlyPayment = this.data.plataLunara.toFixed(2);
      const monthlyRate = rataLunara.toFixed(2);
      const monPay = (sumaLei * (1 + monthlyRate / 100)) / perioadaLuni;
      const interestRate = (1 + rataAnuala / perioadaLuni) ^ rataAnuala -1;
      const Luna = this.data.perioadaLuni;
      for(let i = 0; i < +Luna; i++) {
        this.creareRand(i, monthlyPayment, monthlyRate);
      }
      this.hidden = !this.hidden;
    },
    creareRand(index: number, monthlyPayment: any, monthlyRate: any): void {
      let day, sum, sold, rate, credit, ce, ca, cad, inRate, pLunar, monPay, Luna;
      if (!index) {
        sold = this.data.sumaLei;
        day = this.data.dataPrimirii;

      } else {
        const a = this.items[index - 1];
        sold = (a[2] - a[4]).toFixed(2);
        day = this.newMonth(index);
      }
      sum  = this.data.sumaLei;
      rate = (monthlyRate * sold).toFixed(2);
      credit = (sold - rate).toFixed(2);
      ce = 0.00
      ca = 0.00;
      cad = 0.00
      inRate= ((sold * (1 + monthlyRate / 100)) / this.data.perioadaLuni).toFixed(2);
      pLunar = (+rate + +inRate).toFixed(2)
      const rand = [index + 1, day, sold, sum, rate, credit, ce, ca, cad, inRate, pLunar]
      this.items.push(rand)
    },
    tipulCreditului() {
      this.data.selectedCardIndex = this.list.findIndex((item: any) => item.value === this.data.selectCredit);
      this.data.rataAnuala = this.list[this.data.selectedCardIndex].rate_p;
      this.data.sumaMax = this.list[this.data.selectedCardIndex].sum_max;
      this.data.sumaMin = this.list[this.data.selectedCardIndex].sum_min;
      console.log(444, this.data)

    },
    subirExcel(event: any) {

      readXlsxFile(event.target.files[0]).then((rows) => {
        this.items = JSON.parse(JSON.stringify(rows));
        console.log(this.file)
        console.log(333, rows);

      });
    },
   async onBtnExport() {
      let myTarget = JSON.parse(JSON.stringify(this.items))
      // myTarget.unshift(this.head)

      const XLSX = await import("https://cdn.sheetjs.com/xlsx-0.19.1/package/xlsx.mjs");

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(myTarget);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, "CreditPlan.xlsx");

    },

}});
</script>
<style scoped>
.alignCenterRow {
  display: flex;
  flex-direction: row;
  text-align: center;
}

.alignCenterColumn {
  display: flex;
  flex-direction: column;
}

.excel {
  margin-top: 10px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
}

.box {
  width: 100px;
  border: 1px solid black;
}
h2 {
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  padding-bottom: 35px;
}
.line {
  display: flex;
  justify-content: center;
  margin: auto;
}
.form {
  color: #244f8e;
  border: 1px solid #d3cdcd;
  border-radius: 3px;
  width: 37rem;
  height: auto;
  font-size: 12px;
  font-weight: 700;
  padding-top: 15px;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 100px auto;
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
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#5c76d9), to(#9cb6f1));
  border-radius: 3px;
  color: white;
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

table {
  color: #333;
  font-size: 12px;
  width: 800px;
  border-spacing: 0;
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
</style>
