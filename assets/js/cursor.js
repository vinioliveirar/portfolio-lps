// Custom Cursor with Light Effect
class CustomCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursorLight = document.createElement('div');
    this.cursorLight.className = 'cursor-light';
    this.cursor.appendChild(this.cursorLight);
    document.body.appendChild(this.cursor);
    
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.1;
    
    this.init();
  }
  
  init() {
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    // Mouse move
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    // Mouse enter/leave
    document.addEventListener('mouseenter', () => {
      this.cursor.classList.add('visible');
    });
    
    document.addEventListener('mouseleave', () => {
      this.cursor.classList.remove('visible');
    });
    
    // Mouse down/up
    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('active');
    });
    
    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('active');
    });
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .filter-btn, .theme-toggle, .scroll-top');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });
    
    // Animation loop
    this.animate();
  }
  
  animate() {
    // Smooth follow
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
    
    // Update cursor position
    this.cursor.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px)`;
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize cursor when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
  });
} else {
  new CustomCursor();
}

