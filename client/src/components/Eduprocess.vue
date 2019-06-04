<template>
  <div class="container" style="max-width: 80%">
    <div class="mb-5">
      <h3 class="mb-4">Навчально-методична робота</h3>
      <div class="mb-4 form-group d-flex justify-content-between align-items-center">
        <label  class="my-auto" for="amountnm">Назва. Кількісна характеристика:</label>
        <input class="form-control" v-model="amountnm" id="amountnm" type="text">
        <label  class="my-auto" for="termnm">Термін виконання:</label>
        <input class="form-control" v-model="termnm" id="termnm" type="text">
        <button class="btn btn-primary" @click.prevent="create('nm', amountnm, termnm)">Додати</button>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='nm'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
            <td style="cursor: pointer; text-align: center" @click.prevent="deletes(item._id)"><img   src="img/delete.svg" width="15px"  alt=""></td>
          </template>
        </tr>
      </table>
    </div>
    <div class="mb-5">
      <h3 class="mb-4">Науково-дослідна робота</h3>
      <div class="mb-4 form-group d-flex justify-content-between align-items-center">
        <label class="my-auto" for="amountnd">Назва. Кількісна характеристика</label>
        <input class="form-control" v-model="amountnd" id="amountnd" type="text">
        <label class="my-auto" for="termnd">Термін виконання</label>
        <input class="form-control" v-model="termnd" id="termnd" type="text">
        <button class="btn btn-primary" @click.prevent="create('nd', amountnd, termnd)">Додати</button>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='nd'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
            <td style="cursor: pointer; text-align: center" @click.prevent="deletes(item._id)"><img   src="img/delete.svg" width="15px"  alt=""></td>
          </template>
        </tr>
      </table>
    </div>
    <div class="mb-5">
      <h3 class="mb-4">Організаційно-методична робота</h3>
      <div class="mb-4 form-group d-flex justify-content-between align-items-center">
        <label class="my-auto" for="amountom">Назва. Кількісна характеристика</label>
        <input class="form-control" v-model="amountom" id="amountom" type="text">
        <label class="my-auto" for="termom">Термін виконання</label>
        <input class="form-control" v-model="termom" id="termom" type="text">
        <button class="btn btn-primary" @click.prevent="create('om', amountom, termom)">Додати</button>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr

          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='om'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
            <td style="cursor: pointer; text-align: center" @click.prevent="deletes(item._id)"><img   src="img/delete.svg" width="15px"  alt=""></td>
          </template>
        </tr>
      </table>
    </div>
    <div class="mb-5">
      <h3 class="mb-4">Громадська робота та iншi види робiт</h3>
      <div class="mb-4 form-group d-flex justify-content-between align-items-center">
        <label class="my-auto" for="amounthr">Назва. Кількісна характеристика</label>
        <input class="form-control" v-model="amounthr" id="amounthr" type="text">
        <label class="my-auto" for="termhr">Термін виконання</label>
        <input class="form-control" v-model="termhr" id="termhr" type="text">
        <button class="btn btn-primary" @click.prevent="create('hr', amounthr, termhr)">Додати</button>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='hr'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
            <td style="cursor: pointer; text-align: center" @click.prevent="deletes(item._id)"><img   src="img/delete.svg" width="15px"  alt=""></td>
          </template>
        </tr>
      </table>
    </div>
    <div class="mb-5">
      <h3 class="mb-4">Виховна робота</h3>
      <div class="mb-4 form-group d-flex justify-content-between align-items-center">
        <label class="my-auto" for="amounted">Назва. Кількісна характеристика</label>
        <input class="form-control" v-model="amounted" id="amounted" type="text">
        <label  class="my-auto" for="termed">Термін виконання</label>
        <input class="form-control" v-model="termed" id="termed" type="text">
        <button class="btn btn-primary" @click.prevent="create('ed', amounted, termed)">Додати</button>
      </div>
      <table class="table table-bordered">
        <tr>
          <th>Назва. Кількісна характеристика</th>
          <th>Термін виконання</th>
        </tr>
        <tr
          v-for="(item, index) in list"
          :item="item"
          :index="index"
          :key="item._id"
        >
          <template v-if="item.type=='ed'">
            <td>{{item.amount}}</td>
            <td>{{item.term}}</td>
            <td style="cursor: pointer; text-align: center" @click.prevent="deletes(item._id)"><img   src="img/delete.svg" width="15px"  alt=""></td>
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
      if(confirm('Ви впевненнi?')){
        await eduprocess.deleteProcess(id, this.$root.user);
        this.list = await eduprocess.getProcess(this.$root.user);
      }
      
    }
  }
};
</script>
<style scoped>
    .form-control{
      width: 30%
    }
  </style>
