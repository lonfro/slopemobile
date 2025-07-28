function UnityProgress(unityInstance, progress) {
  if (!unityInstance.Module)
    return;
  if (!unityInstance.logo) {
    unityInstance.logo = document.createElement("div");
    unityInstance.logo.className = "progress " + unityInstance.Module.splashScreenStyle;
    unityInstance.container.appendChild(unityInstance.logo);
  }
  if (!unityInstance.progress) {    
    unityInstance.progress = document.createElement("div");
    unityInstance.progress.className = "progress-bar " + unityInstance.Module.splashScreenStyle;
    unityInstance.progress.empty = document.createElement("div");
    unityInstance.progress.empty.className = "empty";
    unityInstance.progress.appendChild(unityInstance.progress.empty);
    unityInstance.progress.full = document.createElement("div");
    unityInstance.progress.full.className = "full";
    unityInstance.progress.appendChild(unityInstance.progress.full);
    unityInstance.logo.appendChild(unityInstance.progress);
  }
  unityInstance.progress.full.style.width = (100 * progress) + "%";
  unityInstance.progress.empty.style.width = (100 * (1 - progress)) + "%";
  if (progress == 1)
    unityInstance.logo.style.display = unityInstance.progress.style.display = "none";
}

var UnityLoader = {
  instantiate: function(container, url, options) {
    var canvas = document.createElement("canvas");
    canvas.width = 960;
    canvas.height = 600;
    canvas.id = "canvas";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.background = "#231F20";
    document.getElementById(container).appendChild(canvas);

    var config = {
      dataUrl: url.replace(/\.json$/, ".data.unityweb"),
      frameworkUrl: url.replace(/\.json$/, ".framework.js.unityweb"),
      codeUrl: url.replace(/\.json$/, ".wasm.unityweb"),
      streamingAssetsUrl: "StreamingAssets",
      companyName: "RobKayS",
      productName: "Slope",
      productVersion: "1.0",
      showBanner: false,
    };

    var script = document.createElement("script");
    script.src = url.replace(/\.json$/, ".loader.js");
    script.onload = function() {
      createUnityInstance(canvas, config, function(progress) {
        UnityProgress({Module: config, container: document.getElementById(container)}, progress);
      }).then(function(unityInstance) {
        window.unityInstance = unityInstance;
      });
    };
    document.body.appendChild(script);

    return {
      Module: config,
      container: document.getElementById(container),
      SetFullscreen: function(fullscreen) {
        if (fullscreen) {
          if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
          } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
          } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
          } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
          }
        }
      }
    };
  }
};
