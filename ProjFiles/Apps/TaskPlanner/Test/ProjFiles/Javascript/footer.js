export function loadFooter(container) {
    const footer = document.createElement('footer');
    footer.style.cssText = 'background: #eee; color: #333; padding: 10px; text-align: center;';
    footer.innerHTML = `<p>&copy; 2025 My App</p>`;
    container.appendChild(footer);
  }
  