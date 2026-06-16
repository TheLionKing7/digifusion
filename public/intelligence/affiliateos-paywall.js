/**
 * DigiFusion Paystack checkout for the AffiliateOS interactive case study.
 * Expects window.__AFFOS_CONFIG from the case study route handler.
 */
(function () {
  const STORAGE_KEY = 'affos_access_granted';
  const cfg = window.__AFFOS_CONFIG || {};

  function grantAccess() {
    if (typeof window.grantAccess === 'function') {
      window.grantAccess();
      return;
    }
    localStorage.setItem(STORAGE_KEY, 'true');
    document.getElementById('paywall-gate')?.classList.add('hidden');
    document.getElementById('locked-content')?.classList.remove('locked');
  }

  async function verifyOrder(orderId) {
    if (!orderId || !cfg.slug) return false;
    const res = await fetch(
      '/api/intelligence/access?order=' +
        encodeURIComponent(orderId) +
        '&slug=' +
        encodeURIComponent(cfg.slug),
    );
    if (!res.ok) return false;
    const data = await res.json();
    return !!data.granted;
  }

  async function pollUnlock(orderId) {
    for (let i = 0; i < 15; i++) {
      if (await verifyOrder(orderId)) {
        grantAccess();
        return true;
      }
      await new Promise((r) => setTimeout(r, 2000));
    }
    return false;
  }

  async function startCheckout() {
    const emailEl = document.getElementById('checkout-email');
    const btn = document.getElementById('paystack-btn');
    const email = (emailEl && emailEl.value ? emailEl.value : '').trim();

    if (!email || !/.+@.+\..+/.test(email)) {
      alert('Enter a valid email — we send your receipt and unlock access here.');
      if (emailEl) emailEl.focus();
      return;
    }

    if (!cfg.productId) {
      alert('Checkout is not configured yet. Please contact enquiries@digitafusion.com.');
      return;
    }

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Redirecting to Paystack…';
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gateway: 'paystack',
          customer_email: email,
          currency: 'USD',
          items: [{ product_id: cfg.productId, qty: 1 }],
          return_path: cfg.returnPath || window.location.pathname,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Checkout failed');

      if (data.redirect_url) {
        window.location.href = data.redirect_url;
        return;
      }
      throw new Error('No payment URL returned');
    } catch (err) {
      alert(err.message || 'Could not start checkout');
      if (btn) {
        btn.disabled = false;
        btn.textContent = '✦  Purchase Full Access — ' + (cfg.priceLabel || '$84.99');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', async function () {
    const btn = document.getElementById('paystack-btn');
    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        startCheckout();
      });
    }

    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('o');
    if (orderId) {
      const unlocked = await pollUnlock(orderId);
      if (!unlocked) {
        const note = document.getElementById('access-note');
        if (note) {
          note.textContent =
            'Payment is still processing. Refresh in a moment or check your email for the order link.';
        }
      }
      return;
    }

    if (localStorage.getItem(STORAGE_KEY) === 'true') {
      grantAccess();
    }
  });
})();
