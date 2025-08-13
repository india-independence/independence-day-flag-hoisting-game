// --- Enhanced Independence Day Experience ---
// Phase 1: Core fixes with single-click smooth animation

class IndependenceDayExperience {
  constructor() {
    this.playerName = '';
    this.isAnimating = false;
    this.currentGif = null;
    
    // Enhanced celebration GIFs with cultural elements
    this.celebrationGifs = [
      {
        type: 'giphy',
        url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWVpNThnNmVmZHExMXE3Z2ttNjExd3RqZHF1am83eXJzdnI5ZjBvMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/oUjv1KgOwiLkY/giphy.gif',
        caption: 'Indian Flag Flying High'
      },
      {
        type: 'giphy',
        url: 'https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTZkNGtkZ3Q0Nmk4a2o3MHRqdGJsbGtlMmwwMDZpcnVsZmJzdTRpdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/046dzvP98tMoXFwWPV/giphy.gif',
        caption: 'Happy Independence Day'
      },
      {
        type: 'giphy',
        url: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHQ0OHBpMmt2eTF4YmJ2cnVqMXBwbjNqN2J1d3RoY3dlcDJqYjJ2cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/fx0fyZlGSSkr8qWtG3/giphy.gif',
        caption: 'Independence Day Celebration'
      },
      {
        type: 'tenor',
        postId: '14363182',
        aspectRatio: '1.17197',
        url: 'https://tenor.com/view/%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%A4%E0%A4%BE-%E0%A4%A6%E0%A4%BF%E0%A4%B5%E0%A4%B8-%E0%A4%95%E0%A5%80-%E0%A4%B6%E0%A5%81%E0%A4%AD%E0%A4%95%E0%A4%BE%E0%A4%AE%E0%A4%A8%E0%A4%BE%E0%A4%8F%E0%A4%82-%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%E0%A5%80%E0%A4%AF-gif-14363182',
        caption: 'स्वतंत्रता दिवस की शुभकामनाएं'
      },
      {
        type: 'tenor',
        postId: '22364711',
        aspectRatio: '1.0356',
        url: 'https://tenor.com/view/happy-indian-independence-day-august15th-15th-august-india-indian-gif-22364711',
        caption: 'Happy Indian Independence Day August 15th GIF'
      }
    ];
    
    // Unified celebration messages
    this.celebrationMessages = [
      "{name}, let us celebrate our nation's freedom, as well as the freedom of infinite possibilities through technology.",
      "{name}, let us celebrate the freedom that lets us dream, code, and create!",
      "{name}, let us celebrate innovation - the truest form of freedom.",
      "{name}, let us honor the freedom that gives us the space to create what's next.",
      "{name}, let us take pride in the freedom that drives innovation.",
      "{name}, let us celebrate the freedom to imagine a better tomorrow.",
      "{name}, let us celebrate the freedom that sparks innovation.",
      "{name}, let us embrace the freedom to build, learn, and grow.",
      "{name}, let us honor the freedom that drives us to empower every person and organization on the planet to achieve more.",
      "{name}, let us cherish the freedom that inspires change and progress.",
      "{name}, let us celebrate the freedom that fuels creativity without limits."
    ];
    
    this.initializeElements();
    this.attachEventListeners();
    this.setupCanvas();
  }
  
  initializeElements() {
    // Screen elements
    this.welcomeScreen = document.getElementById('welcome-screen');
    this.gameScreen = document.getElementById('game-screen');
    this.resultScreen = document.getElementById('result-screen');
    
    // Input and buttons
    this.playerNameInput = document.getElementById('player-name');
    this.startBtn = document.getElementById('start-btn');
    this.hoistBtn = document.getElementById('hoist-btn');
    this.shareBtn = document.getElementById('share-btn');
    this.playAgainBtn = document.getElementById('play-again-btn');
    
    // Display elements
    this.animationStatus = document.getElementById('animation-status');
    this.resultMessage = document.getElementById('result-message');
    this.inspirationalQuote = document.getElementById('inspirational-quote');
    this.celebrationGif = document.getElementById('celebration-gif');
    
    // Canvas
    this.flagCanvas = document.getElementById('flag-canvas');
    this.ctx = this.flagCanvas.getContext('2d');
  }
  
  attachEventListeners() {
    this.startBtn.addEventListener('click', () => this.startExperience());
    this.hoistBtn.addEventListener('click', () => this.hoistFlag());
    this.shareBtn.addEventListener('click', () => this.shareExperience());
    this.playAgainBtn.addEventListener('click', () => this.resetExperience());
    
    // Enter key support
    this.playerNameInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.startExperience();
    });
  }
  
  setupCanvas() {
    this.resizeCanvas();
    this.drawFlag(0, 0); // Initial flag at bottom, fully furled
    
    // Handle window resize
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.drawFlag(0, 0);
    });
  }
  
  resizeCanvas() {
    const container = this.flagCanvas.parentElement;
    const rect = container.getBoundingClientRect();
    
    // Set canvas to fill container properly
    this.flagCanvas.width = rect.width;
    this.flagCanvas.height = rect.height;
    
    // Set canvas style dimensions
    this.flagCanvas.style.width = rect.width + 'px';
    this.flagCanvas.style.height = rect.height + 'px';
  }
  
  startExperience() {
    this.playerName = this.playerNameInput.value.trim() || 'Friend';
    
    // Animate screen transition
    this.welcomeScreen.classList.add('hidden');
    this.gameScreen.classList.remove('hidden');
    
    // Reset canvas
    this.resizeCanvas();
    this.drawFlag(0, 0);
  }
  
  async hoistFlag() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    this.hoistBtn.disabled = true;
    this.animationStatus.classList.remove('hidden');
    
    // Smooth flag animation over 3 seconds
    await this.animateFlagHoisting();
    
    // Show celebration
    setTimeout(() => {
      this.showCelebration();
    }, 500);
  }
  
  animateFlagHoisting() {
    return new Promise((resolve) => {
      const duration = 4000; // 4 seconds total animation
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeProgress = this.easeOutCubic(progress);
        
        // New animation sequence: First hoist furled flag (0-0.6), then unfurl at top (0.6-1.0)
        let hoistProgress = 0;
        let unfurlProgress = 0;
        
        if (progress <= 0.6) {
          // First phase: hoisting the furled flag
          hoistProgress = progress / 0.6;
          unfurlProgress = 0; // Keep flag furled during hoisting
        } else {
          // Second phase: unfurling the flag at the top
          hoistProgress = 1; // Flag is at the top
          unfurlProgress = (progress - 0.6) / 0.4; // Unfurl over remaining 40% of time
        }
        
        this.drawFlag(hoistProgress, unfurlProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Keep unfurled flag at top for 1 seconds before showing celebration
          setTimeout(() => {
            resolve();
          }, 1000);
        }
      };
      
      animate();
    });
  }
  
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  
  drawFlag(hoistProgress, unfurlProgress) {
    const canvas = this.flagCanvas;
    const ctx = this.ctx;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate flag pole position and dimensions (centered)
    const poleX = canvas.width * 0.3; // Centered position
    const poleTop = canvas.height * 0.02;
    const poleBottom = canvas.height * 0.92; // Extended to connect with pedestal
    const poleHeight = poleBottom - poleTop;
    
    // Flag dimensions - Perfect 3:2 aspect ratio (width:height)
    const maxFlagWidth = canvas.width * 0.45;
    const flagWidth = maxFlagWidth;
    const flagHeight = flagWidth / 1.5; // Perfect 3:2 ratio
    
    // Ensure flag doesn't exceed canvas bounds
    const adjustedFlagHeight = Math.min(flagHeight, canvas.height * 0.35);
    const adjustedFlagWidth = adjustedFlagHeight * 1.5; // Maintain 3:2 ratio
    
    // Flag positioning - starts at bottom of pole and rises to top
    const flagStartX = poleX + 4; // Small gap from pole
    
    // For bundled flag, start at the base of the flagpost (just above pedestal)
    const bundledFlagBottomY = poleBottom - 20; // Just above the pedestal
    const unfurledFlagBottomY = poleBottom - adjustedFlagHeight - 15; // Above pedestal area for full flag
    const topY = poleTop + 15; // Near top of pole
    
    // Use different starting positions for bundled vs unfurled flag
    let currentY;
    if (unfurlProgress < 0.1) {
      // When bundled, start from base of flagpost
      currentY = bundledFlagBottomY - (bundledFlagBottomY - topY) * hoistProgress;
    } else {
      // When unfurling, use normal positioning
      currentY = unfurledFlagBottomY - (unfurledFlagBottomY - topY) * hoistProgress;
    }
    
    // Handle furled vs unfurled state
    let currentFlagWidth = adjustedFlagWidth * unfurlProgress;
    let currentFlagHeight = adjustedFlagHeight;
    
    // When furled (unfurlProgress = 0), show as a small bundle
    if (unfurlProgress < 0.1) {
      currentFlagWidth = 24; // Slightly bigger furled bundle width
      currentFlagHeight = 32; // Slightly bigger furled bundle height
    }
    
    // Draw flag only if there's something to show
    if (currentFlagWidth > 0 && currentFlagHeight > 0) {
      ctx.save();
      ctx.translate(flagStartX, currentY);
      
      // If fully furled, draw as a small tricolor bundle
      if (unfurlProgress < 0.1) {
        // Draw furled flag as a small tricolor bundle
        ctx.fillStyle = '#FF9933';
        ctx.fillRect(0, 0, currentFlagWidth, currentFlagHeight / 3);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, currentFlagHeight / 3, currentFlagWidth, currentFlagHeight / 3);
        ctx.fillStyle = '#138808';
        ctx.fillRect(0, (currentFlagHeight * 2) / 3, currentFlagWidth, currentFlagHeight / 3);
        
        // Add binding rope effect for furled flag
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(currentFlagWidth/4, 0);
        ctx.lineTo(currentFlagWidth/4, currentFlagHeight);
        ctx.moveTo(currentFlagWidth*3/4, 0);
        ctx.lineTo(currentFlagWidth*3/4, currentFlagHeight);
        ctx.stroke();
      } else {
        // Draw unfurling/unfurled flag
        
        // Saffron stripe
        ctx.fillStyle = '#FF9933';
        ctx.fillRect(0, 0, currentFlagWidth, currentFlagHeight / 3);
        
        // White stripe  
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, currentFlagHeight / 3, currentFlagWidth, currentFlagHeight / 3);
        
        // Green stripe
        ctx.fillStyle = '#138808';
        ctx.fillRect(0, (currentFlagHeight * 2) / 3, currentFlagWidth, currentFlagHeight / 3);
        
        // Draw Ashok Chakra only when flag is sufficiently unfurled
        if (unfurlProgress > 0.3) {
          const chakraRadius = currentFlagHeight / 10;
          const chakraCenterX = currentFlagWidth / 2;
          const chakraCenterY = currentFlagHeight / 2;
          
          ctx.strokeStyle = '#000080';
          ctx.lineWidth = 1.5;
          
          // Outer circle
          ctx.beginPath();
          ctx.arc(chakraCenterX, chakraCenterY, chakraRadius, 0, 2 * Math.PI);
          ctx.stroke();
          
          // Draw exactly 24 spokes symmetrically with better visibility
          ctx.lineWidth = 1.2;
          const spokeLength = chakraRadius * 0.9;
          
          for (let i = 0; i < 24; i++) {
            const angle = (i * 2 * Math.PI) / 24; // 24 equally spaced spokes (15° apart)
            
            // Draw each spoke as a distinct line
            ctx.beginPath();
            ctx.moveTo(
              chakraCenterX + (chakraRadius * 0.2) * Math.cos(angle),
              chakraCenterY + (chakraRadius * 0.2) * Math.sin(angle)
            );
            ctx.lineTo(
              chakraCenterX + spokeLength * Math.cos(angle),
              chakraCenterY + spokeLength * Math.sin(angle)
            );
            ctx.stroke();
          }
          
          // Inner hub circle for center
          ctx.fillStyle = '#000080';
          ctx.beginPath();
          ctx.arc(chakraCenterX, chakraCenterY, chakraRadius * 0.15, 0, 2 * Math.PI);
          ctx.fill();
          
          // Small decorative rim around outer circle
          ctx.strokeStyle = '#000080';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(chakraCenterX, chakraCenterY, chakraRadius * 1.05, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }
      
      // Add flag border for better definition (only when unfurled)
      if (unfurlProgress > 0.1) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.5;
        ctx.strokeRect(0, 0, currentFlagWidth, currentFlagHeight);
      }
      
      ctx.restore();
    }
  }
  
  showCelebration() {
    this.gameScreen.classList.add('hidden');
    this.resultScreen.classList.remove('hidden');
    
    // Show unified celebration message
    const randomMessage = this.getRandomMessage(this.celebrationMessages);
    this.resultMessage.innerHTML = randomMessage.replace('{name}', this.playerName);
    
    // Clear inspirational quote section (not needed anymore)
    this.inspirationalQuote.textContent = '';
    
    // Set random celebration GIF with enhanced error handling
    this.currentGif = this.getRandomMessage(this.celebrationGifs);
    this.setupGifDisplay(this.currentGif);
    
    // Launch enhanced confetti with Microsoft colors
    this.launchConfetti();
  }
  
  setupGifDisplay(gifData) {
    const gifContainer = this.celebrationGif.parentElement;
    
    // Clear any existing content
    gifContainer.innerHTML = '';
    
    if (gifData.type === 'giphy') {
      // Handle Giphy GIFs with regular img tag
      const img = document.createElement('img');
      img.src = gifData.url;
      img.alt = gifData.caption;
      img.id = 'celebration-gif';
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.borderRadius = '10px';
      
      img.onerror = () => {
        // Fallback to a working Giphy GIF if this one fails
        const fallbackGif = this.celebrationGifs.find(gif => gif.type === 'giphy');
        if (fallbackGif && fallbackGif !== gifData) {
          img.src = fallbackGif.url;
        }
      };
      
      gifContainer.appendChild(img);
      
    } else if (gifData.type === 'tenor') {
      // Handle Tenor GIFs with embed code
      const tenorDiv = document.createElement('div');
      tenorDiv.className = 'tenor-gif-embed';
      tenorDiv.setAttribute('data-postid', gifData.postId);
      tenorDiv.setAttribute('data-share-method', 'host');
      tenorDiv.setAttribute('data-aspect-ratio', gifData.aspectRatio);
      tenorDiv.setAttribute('data-width', '100%');
      tenorDiv.style.maxWidth = '400px';
      tenorDiv.style.margin = '0 auto';
      
      // Create fallback link inside the div
      const link = document.createElement('a');
      link.href = gifData.url;
      link.textContent = gifData.caption;
      link.target = '_blank';
      tenorDiv.appendChild(link);
      
      gifContainer.appendChild(tenorDiv);
      
      // Load Tenor embed script if not already loaded
      this.loadTenorScript();
    }
    
    // Update reference for sharing
    this.celebrationGif = gifContainer.querySelector('img') || gifContainer.querySelector('.tenor-gif-embed');
  }
  
  loadTenorScript() {
    // Check if Tenor script is already loaded
    if (!document.querySelector('script[src*="tenor.com/embed.js"]')) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://tenor.com/embed.js';
      document.head.appendChild(script);
    }
  }
  
  getRandomMessage(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  
  launchConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    // Enhanced tricolor and Microsoft colors
    const colors = ['#FF9933', '#FFFFFF', '#138808', '#0078D4', '#FFD700', '#00BCF2', '#10893E'];
    
    for (let i = 0; i < 100; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDelay = Math.random() * 2 + 's';
      piece.style.animationDuration = (2 + Math.random() * 2) + 's';
      
      confettiContainer.appendChild(piece);
    }
    
    // Clean up confetti after animation
    setTimeout(() => {
      confettiContainer.innerHTML = '';
    }, 5000);
  }
  
  shareExperience() {
    const shareMessagesEnd = "Feel free to invite your friends to celebrate by clicking here https://aka.ms/FlagHoistGame\n\n#IndependenceDay2025 #FreedomtoInnovatewithMicrosoft #VibeCoding";
    // Updated sharing messages for Independence Day celebration
    const shareMessages = [
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to think big. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to innovate without boundaries. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to turn ideas into impact. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to learn, unlearn, and grow. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to question, explore, and improve. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to explore new possibilities. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to design solutions that matter. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to reimagine the future. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to turn challenges into opportunities. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to push beyond comfort zones. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to make a difference through innovation. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to think differently and act boldly. \n\n${shareMessagesEnd}`,
    `✨ Wishing all Indians a very "Happy Independence Day" and personally this year I am celebrating the freedom to grow without limits. \n\n${shareMessagesEnd}`
  ];
    
    const randomShareMessage = this.getRandomMessage(shareMessages);
    const personalizedMessage = randomShareMessage.replace('{name}', this.playerName);
    
    // Get the appropriate URL for sharing based on GIF type
    let shareUrl;
    if (this.currentGif.type === 'giphy') {
      shareUrl = this.currentGif.url;
    } else if (this.currentGif.type === 'tenor') {
      shareUrl = this.currentGif.url;
    } else {
      shareUrl = window.location.href;
    }
    
    // Enhanced LinkedIn sharing with Microsoft branding
    const url = encodeURIComponent(shareUrl);
    const text = encodeURIComponent(personalizedMessage);
    const linkedInUrl = `https://www.linkedin.com/feed/?shareActive=true&shareUrl=${url}&title=${encodeURIComponent('Independence Day 2025 - Freedom to Innovate | Microsoft India')}&text=${text}`;
    
    // Enhanced share dialog with Microsoft narrative
    const confirmShare = confirm(
      `Share your Independence Day celebration on LinkedIn:\n\n"${personalizedMessage}"\n\n\nClick OK to continue to LinkedIn.`
    );
    
    if (confirmShare) {
      window.open(linkedInUrl, '_blank', 'width=600,height=600');
    }
  }
  
  resetExperience() {
    this.resultScreen.classList.add('hidden');
    this.welcomeScreen.classList.remove('hidden');
    
    // Reset state
    this.playerNameInput.value = '';
    this.isAnimating = false;
    this.hoistBtn.disabled = false;
    this.animationStatus.classList.add('hidden');
    
    // Reset canvas
    this.resizeCanvas();
    this.drawFlag(0, 0);
  }
}

// Initialize the experience when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new IndependenceDayExperience();
});

// Add some additional CSS for better mobile experience
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
  /* Touch feedback for mobile */
  @media (hover: none) and (pointer: coarse) {
    .primary-button:active,
    .secondary-button:active,
    .hoist-button:active {
      transform: scale(0.95);
      transition: transform 0.1s ease;
    }
  }
  
  /* Improved focus states for accessibility */
  .primary-button:focus,
  .secondary-button:focus,
  .hoist-button:focus {
    outline: 3px solid rgba(0, 120, 212, 0.5);
    outline-offset: 2px;
  }
  
  input:focus {
    outline: 3px solid rgba(0, 120, 212, 0.5);
    outline-offset: 2px;
  }
`;
document.head.appendChild(additionalStyles);
