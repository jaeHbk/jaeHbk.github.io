// Floating and folding image animation with three interactive images
(function() {
    'use strict';
    
    // Wait for DOM to be ready
    function init() {
        const sketchHolder = document.getElementById("sketch-holder");
        if (!sketchHolder) {
            // Retry if element not found yet
            setTimeout(init, 100);
            return;
        }
        
        // Clear sketch holder
        sketchHolder.innerHTML = '';
        
        // Get container dimensions
        const containerWidth = sketchHolder.offsetWidth;
        const containerHeight = sketchHolder.offsetHeight;
        
        // Create three floating images
        const images = [
            {
                id: 'floating-img-1',
                src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
                initialX: Math.max(10, containerWidth * 0.15 - 75),
                initialY: Math.max(10, containerHeight * 0.2 - 75),
                floatOffset: { x: 20, y: 15 }
            },
            {
                id: 'floating-img-2',
                src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
                initialX: Math.max(10, containerWidth * 0.5 - 75),
                initialY: Math.max(10, containerHeight * 0.5 - 75),
                floatOffset: { x: -25, y: 20 }
            },
            {
                id: 'floating-img-3',
                src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
                initialX: Math.max(10, containerWidth * 0.8 - 75),
                initialY: Math.max(10, containerHeight * 0.75 - 75),
                floatOffset: { x: 15, y: -18 }
            }
        ];
        
        images.forEach((imgConfig, index) => {
            const wrapper = document.createElement('div');
            wrapper.className = 'floating-image-wrapper';
            wrapper.id = imgConfig.id;
            wrapper.dataset.index = index;
            wrapper.dataset.unfolded = 'false';
            
            // Create placeholder (folded state)
            const placeholder = document.createElement('div');
            placeholder.className = 'image-placeholder';
            
            // Create image element (hidden when folded)
            const img = document.createElement('img');
            img.src = imgConfig.src;
            img.alt = 'Floating image ' + (index + 1);
            img.className = 'floating-folding-image';
            img.style.display = 'none';
            
            // Create clickable overlay
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';
            overlay.innerHTML = '<span>Click to unfold</span>';
            
            wrapper.appendChild(placeholder);
            wrapper.appendChild(img);
            wrapper.appendChild(overlay);
            sketchHolder.appendChild(wrapper);
            
            // Set initial position
            wrapper.style.left = imgConfig.initialX + 'px';
            wrapper.style.top = imgConfig.initialY + 'px';
            
            // Add click handler
            wrapper.addEventListener('click', function() {
                const isUnfolded = this.dataset.unfolded === 'true';
                if (isUnfolded) {
                    foldImage(this);
                } else {
                    unfoldImage(this);
                }
            });
        });
        
        // Add CSS styles if not already added
        if (!document.getElementById('floating-image-styles')) {
            const style = document.createElement('style');
            style.id = 'floating-image-styles';
            style.textContent = `
                #sketch-holder {
                    position: relative;
                    overflow: hidden;
                    width: 100%;
                    height: 100%;
                    background-color: #f3f4f6;
                }
                
                .floating-image-wrapper {
                    position: absolute;
                    width: 150px;
                    height: 150px;
                    transform-style: preserve-3d;
                    perspective: 1000px;
                    cursor: pointer;
                    z-index: 1;
                    transition: z-index 0.3s,
                                width 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55),
                                height 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .floating-image-wrapper.unfolded {
                    width: 200px;
                    height: 200px;
                    z-index: 10;
                }
                
                .image-placeholder {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    animation: floatAndFold 8s ease-in-out infinite;
                    transform-style: preserve-3d;
                    position: relative;
                    overflow: hidden;
                }
                
                .image-placeholder::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 100%);
                    border-radius: 8px 0 0 8px;
                    animation: foldLeft 3s ease-in-out infinite;
                    pointer-events: none;
                }
                
                .image-placeholder::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 50%;
                    height: 100%;
                    background: linear-gradient(-90deg, rgba(0,0,0,0.2) 0%, transparent 100%);
                    border-radius: 0 8px 8px 0;
                    animation: foldRight 3s ease-in-out infinite;
                    pointer-events: none;
                }
                
                .floating-image-wrapper:nth-child(1) .image-placeholder {
                    animation: floatAndFold1 10s ease-in-out infinite;
                }
                
                .floating-image-wrapper:nth-child(2) .image-placeholder {
                    animation: floatAndFold2 12s ease-in-out infinite;
                    animation-delay: -2s;
                }
                
                .floating-image-wrapper:nth-child(3) .image-placeholder {
                    animation: floatAndFold3 9s ease-in-out infinite;
                    animation-delay: -4s;
                }
                
                .floating-folding-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    transform-style: preserve-3d;
                    position: absolute;
                    top: 0;
                    left: 0;
                    opacity: 0;
                    transform: scale(0.8) rotateY(90deg);
                    transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                }
                
                .floating-image-wrapper.unfolded .floating-folding-image {
                    opacity: 1;
                    transform: scale(1) rotateY(0deg);
                    display: block !important;
                    width: 200px;
                    height: 200px;
                }
                
                .floating-image-wrapper.unfolded .image-placeholder {
                    opacity: 0;
                    transform: scale(0.8) rotateY(-90deg);
                    pointer-events: none;
                }
                
                .image-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(0, 0, 0, 0.3);
                    border-radius: 8px;
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                }
                
                .floating-image-wrapper:hover .image-overlay {
                    opacity: 1;
                }
                
                .image-overlay span {
                    color: white;
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                
                .floating-image-wrapper.unfolded .image-overlay span {
                    content: 'Click to fold';
                }
                
                @keyframes floatAndFold1 {
                    0% {
                        transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
                    }
                    25% {
                        transform: translate(30px, -20px) rotateY(15deg) rotateX(5deg);
                    }
                    50% {
                        transform: translate(20px, 25px) rotateY(-10deg) rotateX(-8deg);
                    }
                    75% {
                        transform: translate(-25px, 15px) rotateY(12deg) rotateX(6deg);
                    }
                    100% {
                        transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
                    }
                }
                
                @keyframes floatAndFold2 {
                    0% {
                        transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
                    }
                    25% {
                        transform: translate(-30px, 20px) rotateY(-18deg) rotateX(-6deg);
                    }
                    50% {
                        transform: translate(-20px, -25px) rotateY(12deg) rotateX(10deg);
                    }
                    75% {
                        transform: translate(25px, -15px) rotateY(-15deg) rotateX(-5deg);
                    }
                    100% {
                        transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
                    }
                }
                
                @keyframes floatAndFold3 {
                    0% {
                        transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
                    }
                    25% {
                        transform: translate(25px, 25px) rotateY(20deg) rotateX(8deg);
                    }
                    50% {
                        transform: translate(-30px, 10px) rotateY(-12deg) rotateX(-10deg);
                    }
                    75% {
                        transform: translate(15px, -30px) rotateY(15deg) rotateX(5deg);
                    }
                    100% {
                        transform: translate(0, 0) rotateY(0deg) rotateX(0deg);
                    }
                }
                
                @keyframes foldLeft {
                    0%, 100% {
                        transform: rotateY(0deg) translateZ(0);
                        opacity: 0.4;
                    }
                    50% {
                        transform: rotateY(-35deg) translateZ(15px);
                        opacity: 0.7;
                    }
                }
                
                @keyframes foldRight {
                    0%, 100% {
                        transform: rotateY(0deg) translateZ(0);
                        opacity: 0.4;
                    }
                    50% {
                        transform: rotateY(35deg) translateZ(15px);
                        opacity: 0.7;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    function unfoldImage(wrapper) {
        wrapper.dataset.unfolded = 'true';
        wrapper.classList.add('unfolded');
        const img = wrapper.querySelector('.floating-folding-image');
        img.style.display = 'block';
        const overlay = wrapper.querySelector('.image-overlay');
        overlay.querySelector('span').textContent = 'Click to fold';
    }
    
    function foldImage(wrapper) {
        wrapper.dataset.unfolded = 'false';
        wrapper.classList.remove('unfolded');
        const img = wrapper.querySelector('.floating-folding-image');
        setTimeout(() => {
            if (wrapper.dataset.unfolded === 'false') {
                img.style.display = 'none';
            }
        }, 600);
        const overlay = wrapper.querySelector('.image-overlay');
        overlay.querySelector('span').textContent = 'Click to unfold';
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const sketchHolder = document.getElementById("sketch-holder");
        if (sketchHolder) {
            const containers = sketchHolder.querySelectorAll('.floating-image-wrapper');
            const containerWidth = sketchHolder.offsetWidth;
            const containerHeight = sketchHolder.offsetHeight;
            
            containers.forEach((wrapper, index) => {
            const positions = [
                { x: Math.max(10, containerWidth * 0.15 - 75), y: Math.max(10, containerHeight * 0.2 - 75) },
                { x: Math.max(10, containerWidth * 0.5 - 75), y: Math.max(10, containerHeight * 0.5 - 75) },
                { x: Math.max(10, containerWidth * 0.8 - 75), y: Math.max(10, containerHeight * 0.75 - 75) }
            ];
                if (positions[index]) {
                    wrapper.style.left = positions[index].x + 'px';
                    wrapper.style.top = positions[index].y + 'px';
                }
            });
        }
    });
})();
