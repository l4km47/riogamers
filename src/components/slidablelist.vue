<template>
  <div class="slidable-list">
    <h2>{{ listHeader }}</h2>
    <div class="image-list image-container" ref="imageList">
      <div class="slider">
        <div class="image-card" v-for="image in images" :key="image.src">
          <img :src="image.src" :alt="image.title" :title="image.title" />
          <span class="image-title">{{ image.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

  
  
  <script>
export default {
  name: "SlidableImageList",
  props: {
    listHeader: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    //this.setupSlider();
  },
  methods: {
    setupSlider() {
      const slider = this.$refs.imageList.querySelector(".slider");
      let isDragging = false,
        startPos = 0,
        currentTranslate = 0,
        prevTranslate = 0,
        animationID = 0,
        currentIndex = 0;

      this.images.forEach((_, index) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `
            <img src="${this.images[index].src}" alt="${this.images[index].title}" title="${this.images[index].title}" />
            <span class="image-title">${this.images[index].title}</span>
          `;
        slide.addEventListener("click", () => {
          this.$emit("image-clicked", index);
        });
        slider.appendChild(slide);
      });

      const slides = slider.querySelectorAll(".slide");

      slider.addEventListener("mousedown", (e) => {
        isDragging = true;
        startPos = e.clientX;
        slider.classList.add("grabbing");
        animationID = requestAnimationFrame(animation);
      });

      slider.addEventListener("mouseup", () => {
        isDragging = false;
        cancelAnimationFrame(animationID);
        const movedBy = currentTranslate - prevTranslate;
        if (movedBy < -100 && currentIndex < slides.length - 1) {
          currentIndex += 1;
        }
        if (movedBy > 100 && currentIndex > 0) {
          currentIndex -= 1;
        }
        setPositionByIndex();
        slider.classList.remove("grabbing");
      });

      slider.addEventListener("mouseleave", () => {
        isDragging = false;
        cancelAnimationFrame(animationID);
        slider.classList.remove("grabbing");
      });

      slider.addEventListener("mousemove", (e) => {
        if (isDragging) {
          const currentPos = e.clientX;
          currentTranslate = prevTranslate + currentPos - startPos;
        }
      });

      const setPositionByIndex = () => {
        currentTranslate = currentIndex * -slider.offsetWidth;
        prevTranslate = currentTranslate;
        slider.style.transform = `translateX(${currentTranslate}px)`;
      };

      const animation = () => {
        setPositionByIndex();
        animationID = requestAnimationFrame(animation);
      };

      setPositionByIndex();
    },
  },
};
</script>
  
<style lang="scss">
.slidable-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  h2 {
    margin-bottom: 10px;
  }
  .image-list {
    width: 100%;
    overflow: hidden;
    .slider {
      display: flex;
      flex-wrap: nowrap;
      transition: transform 0.3s ease-in-out;
      .slide {
        display: flex;

        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 168px;
        height: 230px;
        margin-right: 10px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .image-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.7);
          color: #fff;
          text-align: center;
          font-size: 14px;
          line-height: 1.2;
        }
      }
    }
  }
}

.image-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 246px; // 16:23 aspect ratio
  margin-right: 10px;
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .image-title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    text-align: center;
    font-size: 14px;
    line-height: 1.2;
  }
}

.image-container {
  max-height: 500px;
  overflow-y: auto;
}
</style>  