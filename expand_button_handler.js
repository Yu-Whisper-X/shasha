// 【最终审查版】使用这一个文件替换所有之前的JS代码

document.addEventListener('DOMContentLoaded', function() {

    // =============================================================
    // ▼▼▼ 逻辑部分 1：聊天页面的核心功能 (来自于您，必须保留) ▼▼▼
    // (这段代码只会在聊天页面被触发，因为它寻找的是聊天页的按钮)
    // =============================================================
    const expandButton = document.getElementById('chat-expand-btn');
    if (expandButton) {
        expandButton.addEventListener('click', function() {
            // 这行代码是您已有功能的核心：让工具栏弹出，并让“+”号旋转成“x”
            document.body.classList.toggle('chat-actions-expanded');
        });
    }


    // =============================================================
    // ▼▼▼ 逻辑部分 2：设置页面的控制器 (新功能，带安全检查) ▼▼▼
    // (这段代码只会在设置页面被触发，因为它寻找的是设置页的开关)
    // =============================================================
    const toggle = document.getElementById('minimal-chat-ui-toggle');
    const bgUrlInput = document.getElementById('minimal-chat-ui-bg-url');
    const styleTagId = 'minimal-chat-ui-dynamic-style';

    // **【关键的安全检查】**
    // 只有当代码在设置页面、并且成功找到了开关和输入框时，才执行下面的所有逻辑。
    // 这可以100%保证在聊天页面不会报错。
    if (toggle && bgUrlInput) {

        // 功能函数：根据UI控件的状态，实时更新页面样式
        function applyMinimalUISettings(isEnabled, bgUrl) {
            // 1. 根据开关，添加/移除 .minimal-chat-ui-active 类
            // 这个类是激活您所有简洁模式CSS的总开关
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

        // 当用户在设置页面操作开关或输入框时，立即调用函数进行实时预览
        toggle.addEventListener('change', () => {
            applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        });
        bgUrlInput.addEventListener('input', () => {
            applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        });

        // --- 如何为“单个聊天”保存和加载 (集成说明) ---

        // 【加载逻辑 - 您需要做的事】
        // 在您加载角色设置的地方，从您的 state 或 db 中读取保存的设置，然后恢复到UI上。
        /*
        // 伪代码示例:
        const minimalUISettings = state.currentCharacter.minimalUISettings || { isEnabled: false, bgUrl: '' };
        toggle.checked = minimalUISettings.isEnabled;
        bgUrlInput.value = minimalUISettings.bgUrl;
        
        // 加载后立即应用一次，以恢复聊天界面的样式
        applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        */


        // 【保存逻辑 - 您需要做的事】
        // 在您现有的“保存设置”按钮的点击事件中，从UI上读取当前的状态，并存回您的 state 或 db。
        /*
        // 伪代码示例:
        const settingsToSave = {
            isEnabled: toggle.checked,
            bgUrl: bgUrlInput.value.trim()
        };
        // state.currentCharacter.minimalUISettings = settingsToSave;
        // db.characters.update(activeCharacterId, { minimalUISettings: settingsToSave });
        */
    }
});



// 我们只需要留下这个“暂停”的魔法
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
