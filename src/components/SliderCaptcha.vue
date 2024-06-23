<template>
  <div class="slider-captcha">
    <div class="captcha-container">
      <canvas ref="puzzleCanvas" class="puzzle-canvas"></canvas>
      <canvas ref="blockCanvas" class="block-canvas"></canvas>
    </div>
    <div class="slider-container">
      <div class="slider-track"></div>
      <div
          class="slider-thumb"
          :style="{ left: `${left}px` }"
          @mousedown="onDragStart"
          @touchstart="onDragStart"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: 0,
      puzzlePosition: 0,
      isDragging: false,
      startX: 0,
    };
  },
  mounted() {
    this.initPuzzle();
  },
  methods: {
    initPuzzle() {
      const puzzleCanvas = this.$refs.puzzleCanvas;
      const blockCanvas = this.$refs.blockCanvas;
      const puzzleCtx = puzzleCanvas.getContext("2d");
      const blockCtx = blockCanvas.getContext("2d");

      const img = new Image();
      img.src = "https://via.placeholder.com/300x150"; // 替换为实际图片路径
      img.onload = () => {
        puzzleCanvas.width = img.width;
        puzzleCanvas.height = img.height;
        blockCanvas.width = img.width;
        blockCanvas.height = img.height;

        puzzleCtx.drawImage(img, 0, 0);

        const puzzlePieceWidth = 50;
        const puzzlePieceHeight = 50;
        this.puzzlePosition = Math.random() * (img.width - puzzlePieceWidth);

        blockCtx.drawImage(
            puzzleCanvas,
            this.puzzlePosition,
            0,
            puzzlePieceWidth,
            puzzlePieceHeight,
            0,
            0,
            puzzlePieceWidth,
            puzzlePieceHeight
        );
        puzzleCtx.clearRect(
            this.puzzlePosition,
            0,
            puzzlePieceWidth,
            puzzlePieceHeight
        );
      };
    },
    onDragStart(event) {
      this.isDragging = true;
      this.startX = event.clientX || event.touches[0].clientX;
      document.addEventListener("mousemove", this.onDragMove);
      document.addEventListener("touchmove", this.onDragMove);
      document.addEventListener("mouseup", this.onDragEnd);
      document.addEventListener("touchend", this.onDragEnd);
    },
    onDragMove(event) {
      if (!this.isDragging) return;
      const moveX = event.clientX || event.touches[0].clientX;
      const offset = moveX - this.startX;
      this.left = Math.max(0, Math.min(offset, this.$refs.puzzleCanvas.width - 50));
    },
    onDragEnd() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.onDragMove);
      document.removeEventListener("touchmove", this.onDragMove);
      document.removeEventListener("mouseup", this.onDragEnd);
      document.removeEventListener("touchend", this.onDragEnd);

      // 验证是否成功
      const tolerance = 5;
      if (Math.abs(this.left - this.puzzlePosition) < tolerance) {
        alert("验证成功");
      } else {
        alert("验证失败");
        this.left = 0;
      }
    },
  },
};
</script>

<style scoped>
.slider-captcha {
  width: 300px;
  margin: 0 auto;
}
.captcha-container {
  position: relative;
}
.puzzle-canvas {
  width: 100%;
  display: block;
}
.block-canvas {
  position: absolute;
  top: 0;
  left: 0;
}
.slider-container {
  margin-top: 10px;
  position: relative;
}
.slider-track {
  height: 10px;
  background: #ddd;
}
.slider-thumb {
  width: 50px;
  height: 20px;
  background: #888;
  position: absolute;
  top: -5px;
  cursor: pointer;
}
</style>
