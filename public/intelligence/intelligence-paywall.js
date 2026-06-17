/**
 * DigiFusion Paystack checkout for interactive Intelligence case studies.
 * Expects window.__INTEL_CONFIG (or legacy __AFFOS_CONFIG) from the route handler.
 */
(function () {
  const cfg = window.__INTEL_CONFIG || window.__AFFOS_CONFIG || {};
  const storageKey = 'intel_access_' + (cfg.slug || 'default');

  function grantAccess() {
    if (typeof window.grantAccess === 'function') {
      window.grantAccess();
      return;
    }
    localStorage.setItem(storageKey, 'true');
    const overlay = document.getElementById('paywall-overlay');
    if (overlay) overlay.style.display = 'none';
    document.getElementById('paywall-gate')?.classList.add('hidden');
    document.getElementById('locked-content')?.classList.remove('locked');
    document.querySelectorAll('.locked-section').forEach(function (el) {
      el.classList.remove('locked-section');
    });
    showPdfBar();
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

  async function fetchDownloadLink(orderId) {
    if (!orderId || !cfg.slug) return null;
    const res = await fetch(
      '/api/intelligence/download-link?order=' +
        encodeURIComponent(orderId) +
        '&slug=' +
        encodeURIComponent(cfg.slug),
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.url || null;
  }

  async function showPdfBar() {
    const bar = document.getElementById('intel-pdf-bar');
    if (!bar) return;
    bar.style.display = 'flex';
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get('o');
    const link = document.getElementById('intel-pdf-link');
    if (link && orderId) {
      const url = await fetchDownloadLink(orderId);
      if (url) {
        link.href = url;
        link.style.display = 'inline-flex';
      }
    }
  }

  async function pollUnlock(orderId) {
    for (let i = 0; i < 15; i++) {
      if (await verifyOrder(orderId)) {
        grantAccess();
        return true;
      }
      await new Promise(function (r) { setTimeout(r, 2000); });
    }
    return false;
  }

  async function startCheckout() {
    const emailEl = document.getElementById('checkout-email');
    const btn = document.getElementById('paystack-btn');
    const email = (emailEl && emailEl.value ? emailEl.value : '').trim();

    if (!email || !/.+@.+\..+/.test(email)) {
      alert('Enter a valid email — we send your receipt and PDF download here.');
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

      const data = await res.json().catch(function () { return {}; });
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
        btn.textContent = '✦  Purchase Full Access — ' + (cfg.priceLabel || '$99.99');
      }
    }
  }

  document.addEventListener('DOMContentLoaded', async function () {
    window.grantAccess = grantAccess;

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
            'Payment is still processing. Refresh in a moment or check your email for the download link.';
        }
      }
      return;
    }

    if (localStorage.getItem(storageKey) === 'true') {
      grantAccess();
    }
  });
})();
