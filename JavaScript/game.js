// 蔬菜点击游戏
document.addEventListener('DOMContentLoaded', function() {
    // 游戏状态
    let score = 0;   // 初始分数为0
    let timeLeft = 30;  // 初始时间为30秒
    let gameActive = false;  // 游戏是否激活，初始为false
    let gameTimer;   // 游戏定时器，用于更新游戏状态
    let countdownTimer;   // 倒计时定时器，用于更新剩余时间
    let vegetableTimers = {}; // 存储每个蔬菜的定时器，用于自动变回默认状态
    
    // 获取DOM元素
    const scoreElement = document.getElementById('game-score');    // 游戏分数元素
    const timeElement = document.getElementById('game-time');    // 游戏剩余时间元素
    const messageElement = document.getElementById('game-message');    // 游戏消息元素
    const startBtn = document.getElementById('game-start');    // 开始游戏按钮元素
    const resetBtn = document.getElementById('game-reset');    // 重置游戏按钮元素
    const vegetables = document.querySelectorAll('.vegetable');    // 所有蔬菜元素
    
    // 蔬菜表情符号数组（加分）
    const vegetableEmojis = ['🥦', '🥒', '🌶️', '🥕', '🌽', '🍆', '🥔', '🥜'];   
    
    // 水果表情符号数组（扣分）
    const fruitEmojis = ['🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥'];
    
    // 默认蔬菜
    const defaultVegetable = '🥬';
    
    // 初始化游戏
    function initGame() {
        score = 0;    // 重置分数为0
        timeLeft = 30;    // 重置时间为30秒
        gameActive = false;    // 游戏状态设为未激活
        updateDisplay();    // 更新显示
        messageElement.textContent = '点击"开始游戏"按钮开始！点击蔬菜+10分，点击水果-5分！';
        
        // 清除所有定时器
        clearInterval(gameTimer);    // 清除游戏定时器
        clearInterval(countdownTimer);    // 清除倒计时定时器
        
        // 清除所有蔬菜定时器
        Object.values(vegetableTimers).forEach(timer => clearTimeout(timer));
        vegetableTimers = {};
        
        // 重置所有蔬菜为默认蔬菜
        vegetables.forEach((vegetable, index) => {
            vegetable.textContent = defaultVegetable;    // 重置蔬菜为默认蔬菜
            vegetable.classList.remove('clicked');    // 移除点击类
        });
        
        // 确保开始按钮是启用的
        startBtn.disabled = false;    // 启用开始按钮
    }
    
    // 更新显示
    function updateDisplay() {
        scoreElement.textContent = score;    // 更新分数显示
        timeElement.textContent = timeLeft;    // 更新剩余时间显示
    }
    
    // 设置蔬菜自动变回默认状态的定时器
    function setVegetableTimer(vegetable, index) {
        // 清除之前的定时器（如果有）
        if (vegetableTimers[index]) {
            clearTimeout(vegetableTimers[index]);
        }
        
        // 设置新的定时器，1.5秒后变回默认状态
        vegetableTimers[index] = setTimeout(() => {
            if (gameActive && vegetable.textContent !== defaultVegetable) {
                vegetable.textContent = defaultVegetable;
            }
        }, 1500);
    }
    
    // 开始游戏
    function startGame() {
        if (gameActive) return;    // 如果游戏已激活，直接返回
        
        gameActive = true;    // 游戏状态设为已激活
        score = 0;    // 重置分数为0
        timeLeft = 30;    // 重置时间为30秒
        updateDisplay();    // 更新显示
        messageElement.textContent = '游戏进行中，点击蔬菜+10分，点击水果-5分！';    // 更新消息
        startBtn.disabled = true;    // 禁用开始按钮
        
        // 设置倒计时
        countdownTimer = setInterval(() => {    // 倒计时定时器，每秒执行一次
            timeLeft--;    // 剩余时间减1秒
            updateDisplay();    // 更新显示
            
            if (timeLeft <= 0) {
                endGame();    // 如果剩余时间小于等于0，结束游戏
            }
        }, 1000);    // 倒计时定时器，每秒执行一次
        
        // 设置蔬菜随机变化（加速出现时间，从1000ms改为500ms）
        gameTimer = setInterval(() => {    // 游戏定时器，每0.5秒执行一次
            if (gameActive) {
                // 随机选择一个蔬菜
                const randomIndex = Math.floor(Math.random() * vegetables.length);    // 随机选择一个蔬菜索引
                const randomVegetable = vegetables[randomIndex];    // 随机选择一个蔬菜元素
                
                // 随机决定是变成蔬菜还是水果，还是变回默认蔬菜
                const randomChoice = Math.random();
                
                if (randomChoice < 0.4) {
                    // 40% 概率变成其他蔬菜
                    const randomEmoji = vegetableEmojis[Math.floor(Math.random() * vegetableEmojis.length)];    // 随机选择一个蔬菜表情符号
                    randomVegetable.textContent = randomEmoji;    // 随机选择一个蔬菜表情符号
                    // 设置定时器，1.5秒后变回默认状态
                    setVegetableTimer(randomVegetable, randomIndex);
                } else if (randomChoice < 0.6) {
                    // 20% 概率变成水果
                    const randomEmoji = fruitEmojis[Math.floor(Math.random() * fruitEmojis.length)];    // 随机选择一个水果表情符号
                    randomVegetable.textContent = randomEmoji;    // 随机选择一个水果表情符号
                    // 设置定时器，1.5秒后变回默认状态
                    setVegetableTimer(randomVegetable, randomIndex);
                } else {
                    // 40% 概率变回默认蔬菜
                    randomVegetable.textContent = defaultVegetable;    // 变回默认蔬菜
                }
            }
        }, 500);  // 加速出现时间，从1000ms改为500ms
    }
    
    // 结束游戏
    function endGame() {    // 结束游戏
        gameActive = false;    // 游戏状态设为未激活
        clearInterval(gameTimer);    // 清除游戏定时器
        clearInterval(countdownTimer);    // 清除倒计时定时器
        
        // 清除所有蔬菜定时器
        Object.values(vegetableTimers).forEach(timer => clearTimeout(timer));
        vegetableTimers = {};
        
        startBtn.disabled = false;    // 启用开始按钮
        
        // 显示最终得分
        messageElement.textContent = `游戏结束！你的得分是：${score}分`;    // 显示最终得分
        
        // 重置所有蔬菜为默认蔬菜
        vegetables.forEach(vegetable => {
            vegetable.textContent = defaultVegetable;    // 变回默认蔬菜
            vegetable.classList.remove('clicked');    // 移除点击类
        });
    }
    
    // 处理蔬菜点击
    function handleVegetableClick(event) {
        if (!gameActive) return;    // 如果游戏未激活，直接返回
        
        const vegetable = event.target;    // 获取点击的蔬菜元素
        const emoji = vegetable.textContent;    // 获取蔬菜元素的文本内容（表情符号）
        const vegetableIndex = Array.from(vegetables).indexOf(vegetable); // 获取蔬菜的索引
        
        // 添加点击动画
        vegetable.classList.add('clicked');    // 添加点击类
        
        // 移除动画类
        setTimeout(() => {
            vegetable.classList.remove('clicked');    // 移除点击类
        }, 500);
        
        // 判断点击的是蔬菜还是水果
        if (emoji === defaultVegetable) {
            // 点击默认蔬菜，不加分也不扣分
            messageElement.textContent = '这是普通蔬菜，没有分数！';
        } else if (vegetableEmojis.includes(emoji)) {
            // 点击其他蔬菜，加分
            score += 10;
            messageElement.textContent = '好样的！蔬菜+10分！';
        } else if (fruitEmojis.includes(emoji)) {
            // 点击水果，扣分
            score -= 5;
            messageElement.textContent = '哎呀！水果-5分！';
        }
        
        updateDisplay();
        
        // 清除该蔬菜的定时器
        if (vegetableTimers[vegetableIndex]) {
            clearTimeout(vegetableTimers[vegetableIndex]);
            delete vegetableTimers[vegetableIndex];
        }
        
        // 点击后变回默认蔬菜
        setTimeout(() => {
            if (gameActive) {
                vegetable.textContent = defaultVegetable;    // 变回默认蔬菜
            }
        }, 300);
    }
    
    // 事件监听器
    startBtn.addEventListener('click', startGame);    // 开始按钮点击事件，调用开始游戏函数
    resetBtn.addEventListener('click', initGame);    // 重置按钮点击事件，调用初始化游戏函数
    
    vegetables.forEach((vegetable, index) => {
        vegetable.addEventListener('click', handleVegetableClick);    // 为每个蔬菜元素添加点击事件监听器，调用处理蔬菜点击函数
    });
    
    // 初始化游戏
    initGame();
});