<template>
  <div class="container" style="max-width:100%">
    <div class="col-4">
      <h4>
        Графiк вiдвiдувань
      </h4>
      <button v-if="$root.user=='admin' && visits.data[0]" @click="deleteGraphic('visits/', 'visits')" class="btn btn-primary">Видалити
        графiк вiдвiдувань</button>
      <file-upload class="graphics-upload" v-if="$root.user=='admin' && !visits.data[0]" :folder="'/graphics/visits'" />
    </div>

    <div class="col" id="visits" v-html="visits.data[0]"></div>
    <div class="col-4">
      <h4>
        Графiк вiдкритих занять
      </h4>
      <button v-if="$root.user=='admin' && open.data[0]" @click="deleteGraphic('open/', 'open')" class="btn btn-primary">Видалити
        графiк вiдкритих занять</button>
      <file-upload class="graphics-upload" v-if="$root.user=='admin' && !open.data[0]" :folder="'/graphics/open'" />
    </div>
    <div class="col" id="open" v-html="open.data[0]"></div>
    <div class="col-4">
      <h4>
        Графiк консультацiй

      </h4>
      <button v-if="$root.user=='admin' && consults.data[0]" @click="deleteGraphic('consults/', 'consults')" class="btn btn-primary">Видалити
        графiк консультацiй</button>
      <file-upload class="graphics-upload" v-if="$root.user=='admin' && !consults.data[0]" :folder="'/graphics/consults'" />
    </div>

    <div class="col" id="consults" v-html="consults.data[0]"></div>
  </div>
</template>

<script>
  import FileUpload from './upload.vue';
  import graphics from "../graphicsService";
  import $ from 'jquery'; // ... jquery
  export default {
    name: "Graphics",
    components: {
      FileUpload
    },
    data() {
      return {
        visits: "",
        open: "",
        consults: ""
      };
    },
    async created() {
      this.visits = await graphics.getGraphics("visits");
      this.open = await graphics.getGraphics("open");
      this.consults = await graphics.getGraphics("consults");
    },
    updated() {
      $('table').addClass('table-bordered table-hover table-condensed table-responsive table-striped');
      $('form').addClass('form-inline');
      $('input').addClass('form-control');
      $('select').addClass('form-control');
    },
    methods: {
      deleteGraphic: async function (folder, id) {
        if (confirm('Ви впевненi?')) {
          console.log(id)
          switch (id) {
            case 'visits':

              this.visits.data = ''
              break;
            case 'open':
              this.open.data = ''
              break;
            case 'consults':
              this.consults.data = ''
              break;
          }
          $('#' + id).hide();
          return await graphics.DeleteGraphics(folder);
        }

      },
    }
  };
</script>
<style>
  .graphics-upload .upload-form {
    display: flex;
    width: 100%;
    justify-content: space-between
  }

  .graphics-upload .upload-form button.btn-primary {
    margin-bottom: 1rem
  }

  .graphics-upload .upload-form .form-group {
    min-height: 40px
  }

  .graphics-upload .upload-form .form-group input {
    height: auto
  }
</style>