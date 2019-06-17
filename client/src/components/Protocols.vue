<template>
<div style="max-width: 90%" class="container">
  <h3 class="col-4 px-0 mb-3">Програма розвитку кафедри</h3>
  <file-upload v-if="$root.user == 'admin'" :folder="'/plans/program'"/>
  <div >
    <div class="row ml-0 mb-5">
      <ul class="col-4 list-group">
        <div class="list-group-item" v-for="(program, index) in program.data" :item="program" :key="index">
          <a :href="'docs/plans/program/'+program">{{program}}</a> <img v-if="$root.user=='admin'" @click="deleteFile('program/'+program)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
  <h3 class="col-4 px-0 mb-3">План з питань науки</h3>
  <file-upload v-if="$root.user == 'admin'" :folder="'/plans/science'"/>
  <div >
    <div class="row ml-0 mb-5">
      <ul class="col-4 list-group">
        <div class="list-group-item" v-for="(science, index) in science.data" :item="science" :key="index">
          <a :href="'docs/plans/science'+science">{{science}}</a> <img v-if="$root.user=='admin'" @click="deleteFile('science/'+science)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
  <h3 class="col-4 px-0 mb-3">Щорiчнi плани кафедри</h3>
  <file-upload v-if="$root.user == 'admin'" :folder="'/plans/yearly'"/>
  <div >
    <div class="row ml-0 mb-5">
      <ul class="col-4 list-group">
        <div class="list-group-item" v-for="(yearly, index) in yearly.data" :item="yearly" :key="index">
          <a :href="'docs/plans/yearly/'+yearly">{{yearly}}</a> <img v-if="$root.user=='admin'" @click="deleteFile('yearly/'+yearly)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
  <h3 class="col-4 px-0 mb-3">Протоколи засiдань кафедри</h3>
  <file-upload v-if="$root.user == 'admin'" :folder="'/plans/protocols'"/>
  <div >
    <div class="row ml-0 mb-5">
      <ul class="col-4 list-group">
        <div class="list-group-item" v-for="(protocol, index) in protocols.data" :item="protocol" :key="index">
          <a :href="'docs/plans/protocols/'+protocol">{{protocol}}</a> <img v-if="$root.user=='admin'" @click="deleteFile('protocols/'+protocol)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
  <h3 class="col-4 px-0 mb-3">Витяги з протоколiв кафедри</h3>
  <file-upload v-if="$root.user == 'admin'" :folder="'/plans/protocolsPart'"/>
  <div >
    <div class="row ml-0 mb-5">
      <ul class="col-4 list-group">
        <div class="list-group-item" v-for="(protocolsPart, index) in protocolsPart.data" :item="protocolsPart" :key="index">
          <a :href="'docs/plans/protocolsPart/'+protocolsPart">{{protocolsPart}}</a> <img v-if="$root.user=='admin'" @click="deleteFile('protocolsPart/'+protocolsPart)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
  <iframe style="position: absolute; right: 0; width: 60%; height: 87%; top:9%; margin-right: 20px; border: 1px solid black" id="frm" src="https://docs.google.com/document/d/15G16T5QGEXwr2cpMQ6Mv8nfIK0HoCwdRkRZLmRgZBxk/edit?usp=sharing"></iframe>
  </div>
</template>

<script>
import FileUpload from './upload.vue';
import protocols from "../protocolsService";
export default {
  name: "protocols",
  components: {
    FileUpload
  },
  data() {
    return {
      protocols: [],
      protocolsPart: [],
      yearly: [],
      science: [],
      program: [],
    };
  },
  async created() {
    try {
      this.protocols = await protocols.getProtocols('protocols');
    } catch (err) {
      this.error = err.message;
    }
    try {
      this.program = await protocols.getProtocols('program');
    } catch (err) {
      this.error = err.message;
    }
    try {
      this.science = await protocols.getProtocols('science');
    } catch (err) {
      this.error = err.message;
    }
    try {
      this.yearly = await protocols.getProtocols('yearly');
    } catch (err) {
      this.error = err.message;
    }
    try {
      this.protocolsPart = await protocols.getProtocols('protocolsPart');
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
     deleteFile: async function(name){
      if(confirm('Ви впевненi?')){
        setTimeout(this.protocols = await protocols.DeleteProtocol(name), 500)
        this.$router.go()
      }
    },
  }
};
</script>
<style scoped>
  .list-group-item{
    max-height: 50px;
    display: flex;
    justify-content: space-between;
  }
</style>
