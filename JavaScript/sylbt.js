// 轮播图功能脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有轮播图元素
    const slides = document.querySelectorAll('.carousel-slide');
    const totalSlides = slides.length;
    let currentIndex = 0;
    let intervalId;
    
    // 初始化轮播图状态 - 修复不显示的问题
    function initSlides() {
        slides.forEach((slide, index) => {
            // 重置所有幻灯片样式 - 不重置z-index，让CSS控制
            slide.classList.remove('prev', 'active', 'next');
            slide.style.opacity = '1';
            slide.style.left = '';
            slide.style.transform = '';
            
            // 计算当前幻灯片相对于currentIndex的位置
            const position = (index - currentIndex + totalSlides) % totalSlides;
            
            if (position === 0) {
                // 当前活跃的幻灯片
                slide.classList.add('active');
            } else if (position === totalSlides - 1) {
                // 上一张幻灯片
                slide.classList.add('prev');
            } else if (position === 1) {
                // 下一张幻灯片
                slide.classList.add('next');
            } else {
                // 其他幻灯片隐藏
                slide.style.opacity = '0';
            }
        });
    }
    
    // 重置并重新开始自动轮播
    function resetAutoPlay() {
        // 清除现有的计时器
        clearInterval(intervalId);
        // 重新设置计时器
        intervalId = setInterval(nextSlide, 1500);
    }
    
    // 初始化显示第一张图片
    initSlides();
    
    // 轮播函数
    function nextSlide() {
        // 更新索引
        currentIndex = (currentIndex + 1) % totalSlides;
        
        // 更新轮播图状态
        initSlides();
        
        // 更新引导点状态
        updateDots();
    }
    
    // 更新引导点状态的函数
    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // 设置自动轮播，间隔1.5秒
    resetAutoPlay();
    
    // 左按钮点击事件
    document.querySelector('.prev-btn').addEventListener('click', function() {
        // 更新索引到上一张
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        
        // 更新轮播图状态
        initSlides();
        
        // 更新引导点状态
        updateDots();
        
        // 重置自动轮播计时器
        resetAutoPlay();
    });
    
    // 右按钮点击事件
    document.querySelector('.next-btn').addEventListener('click', function() {
        nextSlide();
        
        // 重置自动轮播计时器
        resetAutoPlay();
    });
    
    // 鼠标悬浮在图片上时暂停轮播
    const carouselImages = document.querySelectorAll('.carousel-slide img');
    carouselImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            clearInterval(intervalId);
        });
        
        // 鼠标离开图片时继续轮播
        img.addEventListener('mouseleave', function() {
            resetAutoPlay();
        });
    });
    
    // 初始化引导点点击事件
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            // 获取点击的引导点索引
            currentIndex = parseInt(this.getAttribute('data-index'));
            
            // 更新轮播图状态
            initSlides();
            
            // 更新引导点状态
            updateDots();
            
            // 重置自动轮播计时器
            resetAutoPlay();
        });
    });
});
