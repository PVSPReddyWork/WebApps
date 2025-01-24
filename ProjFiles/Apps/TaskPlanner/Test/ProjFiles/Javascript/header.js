export function loadHeader(container) {
    const header = document.createElement('header');
    header.style.cssText = 'background: #333; color: #fff; padding: 10px; text-align: center;';
    header.innerHTML = `<h1>My Dynamic App</h1>`;
    container.appendChild(header);
  }
  