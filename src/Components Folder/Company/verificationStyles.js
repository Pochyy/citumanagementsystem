const CSS = `
.verification-form { --maroon:#7a2331; --maroon-dark:#5f1b26; --gold:#eab308; --gold-soft:#fef3c7; --ink:#14151a; --ink-soft:#6b7280; --ink-faint:#9aa0aa; --border:#e8e9ec; --surface-alt:#fafafb; --red:#b3261e; --red-light:#fbe9e7; --green:#1e7a4c;
  width:100%; height:100%; padding:28px; background:#fff; border:1px solid var(--border); border-radius:16px; font-family:"Inter",sans-serif; color:var(--ink); box-sizing:border-box; overflow-y:auto; }
.verification-form * { box-sizing: border-box; }
.verification-form__title { margin:0 0 6px; font-size:1.3rem; font-weight:700; color:var(--maroon); }
.verification-form__subtitle { margin:0 0 20px; font-size:.9rem; color:var(--ink-soft); }
.verification-form__card { border:1px solid var(--border); border-radius:14px; padding:24px; }
.verification-form__section-title { margin:0 0 14px; font-size:.75rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; color:var(--ink-faint); }
.verification-form__row { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:16px; }
.verification-form__field { display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
.verification-form__label { font-size:.8rem; font-weight:600; }
.verification-form__label span { color:var(--maroon); }
.verification-form__input { padding:10px 12px; border:1px solid var(--border); border-radius:8px; font-size:.9rem; outline:none; }
.verification-form__input:focus { border-color:var(--maroon); box-shadow:0 0 0 3px rgba(122,35,49,.1); }
.verification-form__divider { border:none; border-top:1px solid var(--border); margin:22px 0; }
.verification-form__upload { display:flex; align-items:center; justify-content:space-between; gap:12px; border:1px dashed var(--border); border-radius:10px; padding:14px 16px; background:var(--surface-alt); }
.verification-form__upload-name { font-size:.85rem; font-weight:600; display:block; }
.verification-form__upload-hint { font-size:.75rem; color:var(--ink-faint); }
.verification-form__upload-filename { font-size:.75rem; color:var(--green); font-weight:600; }
.verification-form__upload-btn { padding:8px 14px; border-radius:8px; border:1px solid var(--border); background:#fff; font-size:.8rem; font-weight:600; cursor:pointer; }
.verification-form__error { margin:4px 0 16px; padding:10px 14px; border-radius:8px; background:var(--red-light); color:var(--red); font-size:.85rem; font-weight:600; }
.verification-form__submit { padding:11px 22px; border-radius:9px; border:none; background:var(--maroon); color:#fff; font-weight:700; cursor:pointer; }
.verification-form__submit:disabled { opacity:.6; cursor:not-allowed; }
.verification-form__success { text-align:center; padding:40px 20px; }
.verification-form__success-icon { width:56px; height:56px; margin:0 auto 16px; border-radius:50%; background:var(--gold-soft); display:flex; align-items:center; justify-content:center; color:#8A6B00; }
.verification-form__success-icon svg { width:28px; height:28px; }
`;

export default CSS;
