<template>
  <div class="about">
    <div class="camera-button">
      <button type="button" class="button is-rounded" :class="{ 'is-primary' : !isCameraOpen, 'is-danger' : isCameraOpen}" @click="toggleCamera">
        <span v-if="!isCameraOpen">Open Camera</span>
        <span v-else>Close Camera</span>
      </button>
    </div>
    <div v-if="isCameraOpen"><video @play="capture" ref="video" id="video" width="640" height="480" autoplay></video></div>
    <canvas ref="canvas" id="canvas" width="640" height="480"></canvas>
    <table id="comments">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>PostID</th>
          <th>Body</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="comment in comments" :key="comment.id">
          <td>{{comment.id}}</td>
          <td>{{comment.name}}</td>
          <td>{{comment.email}}</td>
          <td>{{comment.postId}}</td>
          <td>{{comment.body}}</td>
        </tr>
      </tbody> 
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Call',
  data() {
    return {
      video: {},
      canvas: {},
      isCameraOpen: true,

    }
  },
  mounted() {
    this.createCameraElement()
    this.$store.dispatch('getComments')
  },
  methods: {
    capture() {
      this.canvas = this.$refs.canvas;
      var context = this.canvas.getContext("2d").drawImage(this.video, 0, 0, 640, 480);
      setTimeout(this.capture, 10)
    },
    toggleCamera() {
      if(this.isCameraOpen) {
        this.isCameraOpen = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },
    createCameraElement() {
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          this.video = this.$refs.video;
          this.video.srcObject = stream;
          this.video.play();
        });
      }
    },
    stopCameraStream() {
      const tracks = this.$refs.video.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    }
  },
  computed: mapState({
    comments: state=> state.comments
  })
}
</script>

<style  lang="scss">
.about {
  text-align: center;
  margin-top: 60px;
  #video {
    display: none;
  }
  .camera-button {
    margin-bottom: 20px;
  }
  #comments {
    margin-top: 20px;
    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
    tr{
      &:nth-child(even){
        background-color: #f2f2f2;
      }
      &:hover{
        background-color: #ddd;
      }
    }
    td,th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #4CAF50;
      color: white;
      text-align: center;
    }
  }
}
</style>
