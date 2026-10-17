/**
 * Utility to verify or dynamically load the official Razorpay Checkout SDK.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="checkout.razorpay.com"]'
    );

    if (existingScript) {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      existingScript.addEventListener("load", () => resolve(true), { once: true });
      existingScript.addEventListener("error", () => resolve(false), { once: true });
      // In case it was already loaded before listeners attached
      setTimeout(() => {
        resolve(Boolean(typeof window !== "undefined" && window.Razorpay));
      }, 500);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay checkout script (may be blocked by ad-blocker or Brave Shields)");
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

