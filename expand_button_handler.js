document.addEventListener('DOMContentLoaded', function() {

    // --- 核心：处理展开/折叠的点击事件 (保留你原有的功能) ---
    const expandButton = document.getElementById('chat-expand-btn');
    if (expandButton) {
        expandButton.addEventListener('click', function() {
            document.body.classList.toggle('chat-actions-expanded');
        });
    }

    // --- 新功能：简洁聊天界面的实时控制逻辑 ---
    const toggle = document.getElementById('minimal-chat-ui-toggle');
    const bgUrlInput = document.getElementById('minimal-chat-ui-bg-url');
    const styleTagId = 'minimal-chat-ui-dynamic-style';

    // 功能函数：根据设置，实时更新UI
    function applyMinimalUISettings(isEnabled, bgUrl) {
        // 1. 控制 body 上的主 class，决定功能是否激活
        if (isEnabled) {
            document.body.classList.add('minimal-chat-ui-active');
        } else {
            document.body.classList.remove('minimal-chat-ui-active');
        }

        // 2. 动态创建或更新 <style> 标签来设置自定义背景
        let styleTag = document.getElementById(styleTagId);
        const trimmedUrl = bgUrl ? bgUrl.trim() : '';

        if (isEnabled && trimmedUrl !== '') {
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.id = styleTagId;
                document.head.appendChild(styleTag);
            }
            // 使用自定义图片作为背景，并隐藏“+”号
            styleTag.innerHTML = `
                body.minimal-chat-ui-active #chat-expand-btn {
                    background-image: url('${trimmedUrl}') !important;
                    background-size: cover !important;
                    background-position: center !important;
                    color: transparent !important; /* 隐藏加号 */
                    font-size: 0 !important; /* 隐藏加号 */
                }
            `;
        } else if (styleTag) {
            // 如果关闭或URL为空，则清空自定义样式，恢复默认的“+”号
            styleTag.innerHTML = '';
        }
    }

    // --- 集成说明 ---
    // 下面的代码只负责在设置页面进行“实时预览”。
    // 真正的“保存”和“加载”需要您在您自己的代码中完成。

    // 当用户在设置页面操作时，立即应用效果
    if (toggle && bgUrlInput) {
        toggle.addEventListener('change', () => {
            applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        });

        bgUrlInput.addEventListener('input', () => {
            applyMinimalUISettings(toggle.checked, bgUrlInput.value);
        });
    }

    // =================================================================
    // ▼▼▼ 您需要在这里集成您的加载和保存逻辑 ▼▼▼
    // =================================================================

    // 【加载逻辑】
    // 当您的设置页面加载某个角色的数据时，您需要：
    // 1. 从您的数据源获取 isEnabled 和 bgUrl 的值。
    // 2. 将这些值设置到UI上。
    // 3. 调用 applyMinimalUISettings 应用样式。
    //
    // 示例伪代码:
    // const savedSettings = your_method_to_get_settings_for_current_chat();
    // if (savedSettings && savedSettings.minimalUI) {
    //     toggle.checked = savedSettings.minimalUI.isEnabled;
    //     bgUrlInput.value = savedSettings.minimalUI.bgUrl;
    //     applyMinimalUISettings(toggle.checked, bgUrlInput.value);
    // }

    // 【保存逻辑】
    // 当用户点击您项目中总的“保存”按钮时，您需要：
    // 1. 从UI上获取当前开关和输入框的值。
    // 2. 将它们保存到您的数据源中。
    //
    // 示例伪代码:
    // const settingsToSave = {
    //     isEnabled: toggle.checked,
    //     bgUrl: bgUrlInput.value.trim()
    // };
    // your_method_to_save_settings_for_current_chat({ minimalUI: settingsToSave });
    // =================================================================
});



// 我们只需要留下这个“暂停”的魔法
function sleep(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}
