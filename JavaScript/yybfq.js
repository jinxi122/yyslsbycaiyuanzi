// 音乐播放器控制脚本
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const musicControls = document.getElementById('musicControls');
    
    // 初始状态：显示播放按钮
    playBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    
    // 设置音频音量为较低值，这样可以自动播放且不会太突兀
    audio.volume = 0.3;
    
    // 尝试自动播放
    audio.play().then(function() {
        // 播放成功，显示暂停按钮
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        musicControls.classList.add('playing');
        
        // 0.5秒后逐渐恢复到正常音量
        setTimeout(function() {
            // 使用渐变效果增加音量
            let currentVolume = 0.3;
            const targetVolume = 1.0;
            const volumeStep = 0.05;
            
            const volumeInterval = setInterval(function() {
                currentVolume += volumeStep;
                if (currentVolume >= targetVolume) {
                    currentVolume = targetVolume;
                    clearInterval(volumeInterval);
                }
                audio.volume = currentVolume;
            }, 100);
        }, 500);
    }).catch(function(error) {
        console.log('自动播放失败:', error);
        // 如果自动播放失败，设置音量为正常值并等待用户交互
        audio.volume = 1.0;
        
        let hasInteracted = false;
        
        function enableAutoPlay() {
            if (!hasInteracted) {
                hasInteracted = true;
                audio.play().then(function() {
                    playBtn.style.display = 'none';
                    pauseBtn.style.display = 'block';
                    musicControls.classList.add('playing');
                }).catch(function(error) {
                    console.log('播放失败:', error);
                });
                
                document.removeEventListener('click', enableAutoPlay);
                document.removeEventListener('touchstart', enableAutoPlay);
                document.removeEventListener('keydown', enableAutoPlay);
            }
        }
        
        document.addEventListener('click', enableAutoPlay);
        document.addEventListener('touchstart', enableAutoPlay);
        document.addEventListener('keydown', enableAutoPlay);
    });
    
    // 播放按钮点击事件
    playBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        // 确保音量为正常值
        audio.volume = 1.0;
        audio.play();
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        musicControls.classList.add('playing');
    });
    
    // 暂停按钮点击事件
    pauseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        audio.pause();
        playBtn.style.display = 'block';
        pauseBtn.style.display = 'none';
        musicControls.classList.remove('playing');
    });
    
    // 鼠标悬停放大效果
    musicControls.addEventListener('mouseenter', function() {
        this.classList.add('hover');
    });
    
    musicControls.addEventListener('mouseleave', function() {
        this.classList.remove('hover');
    });
});
