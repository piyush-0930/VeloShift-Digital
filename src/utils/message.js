// Simple message API using CustomEvent + the Toast component
export function showMessage(type, text, title, duration) {
  const ev = new CustomEvent("vs_message", { detail: { type, text, title, duration } });
  window.dispatchEvent(ev);
}

export function showSuccess(text, title = "Success", duration = 3000) {
  showMessage('success', text, title, duration);
}

export function showError(text, title = 'Error', duration = 5000) {
  showMessage('error', text, title, duration);
}

export function showInfo(text, title = 'Info', duration = 3000) {
  showMessage('info', text, title, duration);
}
