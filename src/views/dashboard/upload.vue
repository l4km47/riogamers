<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="image">Select Image:</label>
        <input type="file" id="image" ref="imageInput" @change="setImage" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>
  
  <script>
import axios from "../../axios";

export default {
  data() {
    return {
      form: {
        title: "",
        description: "",
        pricepool: 0,
        participants: 0,
        time: "",
        image: null,
      },
    };
  },
  methods: {
    setImage(event) {
      this.form.image = event.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.form.image);
      try {
        const response = await axios.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        // handle success
      } catch (error) {
        console.log(error.response.data);
        // handle error
      }
    },
  },
};
</script>
  