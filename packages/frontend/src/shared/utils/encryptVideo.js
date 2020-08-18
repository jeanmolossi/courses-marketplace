/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const fac = {
  assetUrl: null,
  fetchAB(url, callback) {
    // console.log(`Fetching video ${url}`);

    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      callback(xhr.response);
    };
    xhr.send();
  },
  source() {
    // console.log(`Source state >> ${this.readyState}`);

    if (this.readyState !== 'open') return;

    const mediaSource = this;

    const sourceBuffer = mediaSource.addSourceBuffer(
      'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
    );

    fac.fetchAB(fac.assetUrl, function (buffer) {
      try {
        // console.log(`Fetch started`, buffer);
        sourceBuffer.addEventListener('updateend', function () {
          mediaSource.endOfStream();
        });

        sourceBuffer.appendBuffer(buffer);
      } catch {
        // eslint-disable-next-line no-console
        console.log('buffering...');
      }
    });
  },
  load(videoSource, videoRef) {
    // console.log(`Load Start`);
    const mediaSource = new MediaSource();

    videoRef.current.src = URL.createObjectURL(mediaSource);
    this.assetUrl = videoSource;

    mediaSource.addEventListener('sourceopen', this.source);
    // console.log(`Load End`);
  },
};

export default fac;
