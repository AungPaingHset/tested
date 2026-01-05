// Smart Waste Management JavaScript
// This file handles all interactive functionality for the website

// Bin data structure to track fill levels
const binData = {
  plastic: 75,
  paper: 45,
  organic: 90
};

// Function to empty a bin and reset its level to 0%
function emptyBin(binType) {
  binData[binType] = 0;
  updateBinDisplay(binType);

  // Show success feedback
  showNotification(`${capitalize(binType)} bin has been emptied!`);
}

// Function to update the visual display of a bin's fill level
function updateBinDisplay(binType) {
  const levelElement = document.getElementById(`${binType}-level`);
  const progressElement = document.getElementById(`${binType}-progress`);

  if (levelElement && progressElement) {
    levelElement.textContent = `${binData[binType]}%`;
    progressElement.style.width = `${binData[binType]}%`;

    // Add animation class for smooth transition
    progressElement.classList.add('slide-up');
    setTimeout(() => {
      progressElement.classList.remove('slide-up');
    }, 500);
  }
}

// Function to simulate real-time bin filling (for demonstration)
function simulateBinFilling() {
  setInterval(() => {
    Object.keys(binData).forEach(binType => {
      // Only fill if not already full
      if (binData[binType] < 100) {
        // Random increment between 1-5%
        const increment = Math.floor(Math.random() * 5) + 1;
        binData[binType] = Math.min(binData[binType] + increment, 100);
        updateBinDisplay(binType);

        // Show warning if bin is getting full
        if (binData[binType] >= 90) {
          showWarning(binType);
        }
      }
    });
  }, 10000); // Update every 10 seconds
}

// Function to show warning when bin is nearly full
function showWarning(binType) {
  const binCard = document.getElementById(`${binType}-progress`)?.closest('.bin-card');
  if (binCard && !binCard.classList.contains('warning-shown')) {
    binCard.style.borderColor = '#ff9800';
    binCard.classList.add('warning-shown');

    setTimeout(() => {
      binCard.style.borderColor = '';
      binCard.classList.remove('warning-shown');
    }, 3000);
  }
}

// Function to show notification messages
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #2d7a4f;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 2000;
    animation: slideIn 0.3s ease-out;
  `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Utility function to capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Handle contact form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Validation
  if (!name || !email || !message) {
    alert('Please fill in all fields!');
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }

  // Success message
  alert(`Thank you, ${name}! Your message has been received. We'll get back to you at ${email} soon.`);

  // Reset form
  document.getElementById('contactForm').reset();
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Add scroll animations to sections
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, observerOptions);

  // Observe all cards
  document.querySelectorAll('.feature-card, .bin-card, .tip-card').forEach(card => {
    observer.observe(card);
  });
}

// Add CSS for notification animations
function addNotificationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOut {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Add notification styles
  addNotificationStyles();

  // Initialize smooth scrolling
  initSmoothScroll();

  // Initialize scroll animations
  initScrollAnimations();

  // Set up contact form handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Start simulating bin filling (optional - can be disabled)
  simulateBinFilling();

  // Make emptyBin function globally accessible for inline onclick handlers
  window.emptyBin = emptyBin;

  console.log('Smart Waste Management System Initialized');
});
