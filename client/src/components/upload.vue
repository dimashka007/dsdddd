<template>
  <div class="file">
    <form class="upload-form" @submit.prevent="sendFile(folder)" enctype="multipart/form-data">
      <div class="form-group mb-3">
        <input class="btn btn-primary py-auto form-control-input" type="file" ref="file" @change="selectFile">
      </div>
        <button class="btn btn-primary">Завантажити</button>
      <p>{{message}}</p>
    </form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "FileUpload",
  props: ["folder"],
  data() {
    return {
      file: "",
      message: ""
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
      this.message = "";
    },
    async sendFile(folder) {
      const formData = new FormData();
      formData.append("file", this.file);
      try {
        await axios.post(
          "api/upload?folder=client/public/docs" +
            folder,
          formData
        );
        this.message = "Файл було завантажено!";
        this.file = "";
      } catch (err) {
        this.message = "Помилка запису, повторiть спробу";
      }
      // this.$router.go()
    }
  }
};
</script>