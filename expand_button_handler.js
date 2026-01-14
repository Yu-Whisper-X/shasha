// 等待整个页面的HTML内容都加载完毕后，再执行我们的代码
document.addEventListener('DOMContentLoaded', function() {

    // --- 原有的 "+" 按钮点击逻辑 (这部分被完整保留了) ---
    const expandButton = document.getElementById('chat-expand-btn');
    if (expandButton) {
        expandButton.addEventListener('click', function() {
            document.body.classList.toggle('chat-actions-expanded');
        });
    }

    // --- 【新功能】简洁聊天界面设置逻辑 ---

    // 1. 获取所有需要的元素
    const toggle = document.getElementById('minimal-chat-ui-toggle');
    const bgSettingDiv = document.getElementById('minimal-chat-ui-bg-setting');
    const bgUrlInput = document.getElementById('minimal-chat-ui-bg-url');
    const saveBtn = document.getElementById('save-minimal-ui-btn');
    const resetBtn = document.getElementById('reset-minimal-ui-btn');
    const styleTagId = 'minimal-chat-ui-bg-style'; // 用于动态应用背景图片的 <style> 标签ID

    // 2. 功能函数：应用设置到界面
    function applyMinimalUISettings(isEnabled, bgUrl) {
        // 切换简洁模式的 body class
        if (isEnabled) {
            document.body.classList.add('minimal-chat-ui-active');
        } else {
            document.body.classList.remove('minimal-chat-ui-active');
        }

        // 动态创建或更新 <style> 标签来设置背景图片
        let styleTag = document.getElementById(styleTagId);
        if (isEnabled && bgUrl) {
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = styleTagId;
                document.head.appendChild(styleTag);
            }
            // CSS 规则：只有在简洁模式激活时才应用背景
            styleTag.innerHTML = `
                body.minimal-chat-ui-active #chat-expand-btn {
                    background-image: url('${bgUrl}');
                    background-size: cover;
                    background-position: center;
                    font-size: 0; /* 隐藏原始的 "+" 号 */
                    border: none; /* 图片背景时通常不需要边框 */
                }
            `;
        } else if (styleTag) {
            // 如果关闭或URL为空，则移除样式
            styleTag.innerHTML = '';
        }
    }

    // 3. 功能函数：从 localStorage 加载设置
    function loadMinimalUISettings() {
        // 检查元素是否存在，防止在非设置页面报错
        if (!toggle) return; 

        const settings = JSON.parse(localStorage.getItem('minimalUISettings')) || { isEnabled: false, bgUrl: '' };
        
        toggle.checked = settings.isEnabled;
        bgUrlInput.value = settings.bgUrl;

        // 根据加载的设置，初始化界面
        bgSettingDiv.style.display = settings.isEnabled ? 'flex' : 'none';
        applyMinimalUISettings(settings.isEnabled, settings.bgUrl);
    }

    // 4. 功能函数：保存设置到 localStorage
    function saveMinimalUISettings() {
        const settings = {
            isEnabled: toggle.checked,
            bgUrl: bgUrlInput.value.trim()
        };
        localStorage.setItem('minimalUISettings', JSON.stringify(settings));
        
        // 应用新设置
        applyMinimalUISettings(settings.isEnabled, settings.bgUrl);

        // (可选) 显示一个保存成功的提示
        alert('设置已保存！');
    }

    // 5. 绑定事件监听器 (仅当在设置页面时)
    if (toggle && bgSettingDiv && bgUrlInput && saveBtn && resetBtn) {
        // 开关控制背景URL输入框的显示/隐藏
        toggle.addEventListener('change', function() {
            bgSettingDiv.style.display = this.checked ? 'flex' : 'none';
        });

        // 保存按钮
        saveBtn.addEventListener('click', saveMinimalUISettings);

        // 重置按钮
        resetBtn.addEventListener('click', function() {
            if (confirm('确定要重置简洁界面设置吗？')) {
                toggle.checked = false;
                bgUrlInput.value = '';
                bgSettingDiv.style.display = 'none';
                saveMinimalUISettings(); // 保存重置后的状态
            }
        });
    }
    
    // 6. 页面加载时，立即加载并应用已保存的设置 (这个函数会在任何页面运行，但内部有保护)
    loadMinimalUISettings();
});




// 我们只需要留下这个“暂停”的魔法
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
