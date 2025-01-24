export function loadContent(container) {
    const content = document.createElement('div');
    content.style.cssText = 'padding: 20px;';
    content.innerHTML = `
      <p>Welcome to my dynamic app. The UI is dynamically loaded from different JS files!</p>
      <button id="alertBtn">Click Me</button>
    `;
  
    // Add a click event listener to the button
    content.querySelector('#alertBtn').addEventListener('click', () => {
      alert('Button clicked!');
    });
  
    container.appendChild(content);
  }
  