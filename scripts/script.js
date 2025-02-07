new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Tu Hain Toh Main Hoon",
          artist: "Sky Force",
          cover: "img/img-1.jpeg",
          source: "mp3/music-1.mp3",
          url: "https://youtu.be/CKJA9blyMUg?si=I6vtAbh6xDzxl131",
          favorited: false
        },
        {
          name: "Tu Har Lamha ",
          artist: "Tu Har Lamha",
          cover: "img/img-2.jpeg",
          source: "mp3/music-2.mp3",
          url: "https://youtu.be/SdGL0qxgZGM?si=2766uLfKJZXv9asr",
          favorited: true
        },

        {
          name: "Chaahat",
          artist: "Blood Money",
          cover: "img/img-3.jpeg",
          source: "mp3/music-3.mp3",
          url: "https://youtu.be/10azSRvOv_E?si=5F_cEqE8xV-5gK5s",
          favorited: false
        },

        {
          name: "Raanjhan",
          artist: "Do Patti",
          cover: "img/img-4.jpeg",
          source: "mp3/music-4.mp3",
          url: "https://youtu.be/lBvbNxiVmZA?si=izF_2-EM749OqstT",
          favorited: false
        },
        {
          name: "Teri Deewani",
          artist: "Kailash Kher",
          cover: "img/img-5.jpeg",
          source: "mp3/music-5.mp3",
          url: "https://youtu.be/zZasH6qkn8M?si=-0Cwnzic7VjRrQg7",
          favorited: true
        },
        {
          name: "Mere liye",
          artist: "Broken",
          cover: "img/img-6.jpeg",
          source: "mp3/music-6.mp3",
          url: "https://youtu.be/rhP7QSWYY8c?si=e16s6g2z2XS-XCPH",
          favorited: false
        },
        {
          name: "Sahiba",
          artist: "Aditya Rikhari",
          cover: "img/img-7.jpeg",
          source: "mp3/music-7.mp3",
          url: "https://youtu.be/n2dVFdqMYGA?si=OeKujMxw2-tJUIId",
          favorited: true
        },
        {
          name: "Angaaroon",
          artist: "pushpa-2",
          cover: "img/img-8.jpeg",
          source: "mp3/music-8.mp3",
          url: "https://youtu.be/0DVAM48BhQU?si=918NobaA07FJG7oZ",
          favorited: false
        },
        {
          name: "Ishq Hai",
          artist: "Anurag Saikia",
          cover: "img/img-9.jpeg",
          source: "mp3/music-9.mp3",
          url: "https://youtu.be/BcSejVIxB0E?si=PS2CqzVXjuPbE5H7",
          favorited: false
        },
        {
          name: "Shiddat - TitleTrack",
          artist: "Shiddat",
          cover: "img/img-10.jpeg",
          source: "mp3/music-10.mp3",
          url: "https://youtu.be/iSo9l950QLo?si=KCXB25I_ZhL6cKj3",
          favorited: false
        }
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
