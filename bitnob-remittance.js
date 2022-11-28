var checkoutData = null;

function createCheckout(data, environment) {
  createLoaderIframe();
  setIframe(data, environment);
}

function initializePayment(data, environment) {
  createCheckout(data, environment);
}

function removeIframe(id) {
  var iframe = document.getElementById(id);
  if (iframe) {
    document.body.removeChild(iframe);
  }
}

function createLoaderIframe() {
  iframe = document.createElement("iframe");
  iframe.setAttribute("allowtransparency", "true"),
    iframe.setAttribute("id", "loader");
  iframe.src =
    "data:text/html;charset=utf-8, <body style='background-color:rgba(0, 0, 0, 0.8);'>" +
    "<div style='position: absolute;display: flex;flex-direction: column;align-items: center;justify-content: center;height: 100%;width: 100%;z-index: 1000; text-align:center'>" +
    "<img src='https://res.cloudinary.com/gabbyprecious/image/upload/v1651003230/haxqforaozaqsl0ksber.gif'width='100px' alt='Logo'/>" +
    "</div></body>";
  iframe.style.cssText =
    "z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;";
  document.body.appendChild(iframe);
}

function setIframe(data, environment) {
  iframe = document.createElement("iframe");
  if (environment === "sandbox") {
    url = `https://remit-sandbox.sundownn.top/?senderName=${data.senderName}&pk=${data.pk}&callbackUrl=${data.callbackUrl}`;
  }

  if (environment === "production") {
    url = `https://remit.bitnob.co/?senderName=${data.senderName}&pk=${data.pk}&callbackUrl=${data.callbackUrl}`;
  }
  if (environment === "dev") {
    url =
      "http://localhost:4200/?senderName=Jane%20Doe&pk=sk.b39706f.7be28e7da203890476&callbackUrl=https:%2F%2Fwebhook.site%2F94dac609-0d1d-402d-8b82-1bc619b13750";
  }
  iframe.src = url;

  iframe.setAttribute("allowtransparency", "true"),
    iframe.setAttribute("id", "bitnob_embed"),
    (iframe.style.cssText =
      "z-index: 999999999999999;background: transparent;border: 0px none transparent;overflow-x: hidden;overflow-y: hidden;margin: 0;padding: 0;-webkit-tap-highlight-color: transparent;-webkit-touch-callout: none;position: fixed;left: 0;top: 0;width: 100%;height: 100%;");
  document.body.appendChild(iframe);
}

window.addEventListener(
  "message",
  function (event) {
    if (typeof event.data === "string") {
      if (event.data === "modal_closed") {
        removeIframe("bitnob_embed");
        return;
      }

      if (event.data === "modal_opened") {
        removeIframe("loader");
        return;
      }

      if (event.data) {
        parseString(event.data);
        return event.data;
      }
    }
  },
  false
);

function parseString(paymentData) {
  var event = new CustomEvent("GetPaymentDetails", {
    detail: { ...JSON.parse(paymentData) },
  });

  window.dispatchEvent(event);
}
