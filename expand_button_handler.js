// 使用这一个文件替换所有之前的JS代码

document.addEventListener('DOMContentLoaded', function() {

    // =============================================================
    // ▼▼▼ 您原有的、必须保留的核心功能代码 ▼▼▼
    // (作用：负责在聊天页面，响应用户对“+”号按钮的点击)
    // =============================================================
    const expandButton = document.getElementById('chat-expand-btn');
    if (expandButton) {
        expandButton.addEventListener('click', function() {
            // 这行代码让工具栏弹出，并让“+”号旋转成“x”
            document.body.classList.toggle('chat-actions-expanded');
        });
    }


    // =============================================================
    // ▼▼▼ 我新增的、用于“绑定”设置面板的代码 ▼▼▼
    // (作用：负责在设置页面，将开关和输入框与功能本身关联起来)
    // =============================================================
    const toggle = document.getElementById('minimal-chat-ui-toggle');
    const bgUrlInput = document.getElementById('minimal-chat-ui-bg-url');
    const styleTagId = 'minimal-chat-ui-dynamic-style';

    // 功能函数：根据UI控件的状态，实时更新页面样式
    function applyMinimalUISettings(isEnabled, bgUrl) {
        // 1. 根据开关，添加/移除 .minimal-chat-ui-active 类
        // 这个类是您所有CSS的总开关
        if (isEnabled) {
            document.body.classList.add('minimal-chat-ui-active');
        } else {
            document.body.classList.remove('minimal-chat-ui-active');
        }

        // 2. 如果输入了URL，则动态添加背景图片样式
        let styleTag = document.getElementById(styleTagId);
        const trimmedUrl = bgUrl ? bgUrl.trim() : '';

        if (isEnabled && trimmedUrl !== '') {
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = styleTagId;
                document.head.appendChild(styleTag);
            }
            // 这段CSS会覆盖默认的“+”号样式
            styleTag.innerHTML = `
                body.minimal-chat-ui-active #chat-expand-btn {
                    background-image: url('${trimmedUrl}') !important;
                    background-size: cover !important;
                    background-position: center !important;
                    font-size: 0 !important; /* 隐藏加号 */
                }
            `;
        } else if (styleTag) {
            // 如果关闭或URL为空，则清空自定义样式，恢复默认的“+”号
            styleTag.innerHTML = '';
        }
    }

    // --- 如何为“单个聊天”保存和加载 (这部分需要您来完成) ---

    // 当用户在设置页面操作时，立即调用函数进行实时预览
    if (toggle && bgUrlInput) {
        toggle.addEventListener('change', () => {
            applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        });
        bgUrlInput.addEventListener('input', () => {
            applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        });
    }

    // 【加载逻辑 - 示例】
    // 在您的代码中，当加载一个角色的设置时，您需要：
    // const savedSettings = ...; // 您获取角色设置的方法
    // if (savedSettings && savedSettings.minimalUI) {
    //     toggle.checked = savedSettings.minimalUI.isEnabled;
    //     bgUrlInput.value = savedSettings.minimalUI.bgUrl;
    //     applyMinimalUISettings(toggle.checked, bgUrlInput.value);
    // }

    // 【保存逻辑 - 示例】
    // 在您现有的“保存”按钮的点击事件中，您需要：
    // const settingsToSave = {
    //     isEnabled: toggle.checked,
    //     bgUrl: bgUrlInput.value.trim()
    // };
    // ... // 您保存角色设置的方法，将 settingsToSave 对象存进去
});

// 我们只需要留下这个“暂停”的魔法
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
