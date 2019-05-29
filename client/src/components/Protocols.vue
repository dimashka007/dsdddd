<template>
<div>
  <file-upload :folder="'/protocols'"/>
  <div >
    <div class="ml-5 row">
      <div class="col-4">Протоколи засiдань кафедри</div>
    </div>
    <div class="row ml-5">
      <ul class="col-4 list-group">
        <div :id="splitName('protocols/' + protocol)" class="list-group-item" v-for="(protocol, index) in protocols.data" :item="protocol" :key="index">
          <a :href="'docs/protocols/'+protocol">{{protocol}}</a> <img v-if="$root.user=='admin'" @click="deleteFile(protocol)" src="img/delete.svg" width="15px"  alt="">
        </div>
      </ul>
    </div>
  </div>
  <iframe style="position: absolute; right: 0; width: 60%; height: 87%; top:13%; margin-right: 20px; border: 1px solid black" id="frm" src="https://docs.google.com/document/d/15G16T5QGEXwr2cpMQ6Mv8nfIK0HoCwdRkRZLmRgZBxk/edit?usp=sharing"></iframe>
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
    };
  },
  async created() {
    try {
      this.protocols = await protocols.getProtocols();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
     deleteFile: async function(name){
      
      this.protocols = await protocols.DeleteProtocol(name);
      var splitted = this.splitName(name);
      document.querySelector(`#${splitted}`).style.display="none";
    },
    splitName(name) {
      return (name.split('.')[0]).split('/').join('')
    }
  }
};
</script>
