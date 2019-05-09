<template>
  <div>
    <label for="nameDisc">Назва дiсциплiни та курс:</label><input v-model="nameDisc" id="nameDisc" type="text">
    <button @click.prevent="createDisc()">Додати</button>
  </div>
</template>

<script>
import marks from "../marksService";
export default {
  name: "Marks",
  data() {
    return {
      nameDisc: '',
      listDisc: ''
    };
  },
  async created() {
    this.listDisc = await marks.getDisc(this.$root.user)
  },
  methods: {
    async createDisc() {
      await marks.insertDisc(this.$root.user+'Disc', this.nameDisc);
      this.list = await marks.getDisc(this.$root.user);
    },
  },
};
</script>
