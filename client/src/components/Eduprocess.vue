<template>
  <div>
    <div>
      <h3>Навчально-методична робота</h3>
      <label for="amountnm">Назва. Кількісна характеристика</label>
      <input v-model="amountnm" id="amountnm" type="text">
      <label for="termnm">Термін виконання</label>
      <input v-model="termnm" id="termnm" type="text">
      <button @click.prevent="create('nm', amountnm, termnm)">Додати</button>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          @dblclick="deletes(item._id)"
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='nm'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div>
      <h3>Науково-дослідна робота</h3>
      <label for="amountnd">Назва. Кількісна характеристика</label>
      <input v-model="amountnd" id="amountnd" type="text">
      <label for="termnd">Термін виконання</label>
      <input v-model="termnd" id="termnd" type="text">
      <button @click.prevent="create('nd', amountnd, termnd)">Додати</button>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          @dblclick="deletes(item._id)"
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='nd'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div>
      <h3>Організаційно-методична робота</h3>
      <label for="amountom">Назва. Кількісна характеристика</label>
      <input v-model="amountom" id="amountom" type="text">
      <label for="termom">Термін виконання</label>
      <input v-model="termom" id="termom" type="text">
      <button @click.prevent="create('om', amountom, termom)">Додати</button>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          @dblclick="deletes(item._id)"
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='om'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div>
      <h3>Громадська робота та iншi види робiт</h3>
      <label for="amounthr">Назва. Кількісна характеристика</label>
      <input v-model="amounthr" id="amounthr" type="text">
      <label for="termhr">Термін виконання</label>
      <input v-model="termhr" id="termhr" type="text">
      <button @click.prevent="create('hr', amounthr, termhr)">Додати</button>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          @dblclick="deletes(item._id)"
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='hr'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
          </template>
        </tr>
      </table>
    </div>
    <div>
      <h3>Виховна робота</h3>
      <label for="amounted">Назва. Кількісна характеристика</label>
      <input v-model="amounted" id="amounted" type="text">
      <label for="termed">Термін виконання</label>
      <input v-model="termed" id="termed" type="text">
      <button @click.prevent="create('ed', amounted, termed)">Додати</button>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          @dblclick="deletes(item._id)"
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='ed'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
          </template>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import eduprocess from "../eduprocessService";
export default {
  name: "Eduprocess",
  data() {
    return {
      amountnm: "",
      termnm: "",
      amountnd: "",
      termnd: "",
      amountom: "",
      termom: "",
      amounthr: "",
      termhr: "",
      amounted: "",
      termed: "",
      list: []
    };
  },
  async created() {
    try {
      this.list = await eduprocess.getProcess(this.$root.user);
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    async create(type, amount, term) {
      await eduprocess.insertProcess(amount, term, type, this.$root.user);
      this.list = await eduprocess.getProcess(this.$root.user);
    },
    async deletes(id) {
      await eduprocess.deleteProcess(id, this.$root.user);
      this.list = await eduprocess.getProcess(this.$root.user);
    }
  }
};
</script>
