import { sendMsg } from './routes.js';
import { appendMessage, scrollToBottom } from './utils.js';

export function setupSendMessage(msgInput, sendBtn, chatBody, typing, introText) {
    let typingInterval;
    const maxInputHeight = 120;

  function startTypingAnimation() {
        typing.style.display='block';
        let dots=0;
        typing.textContent='Thinking';
        typingInterval = setInterval(()=>{ 
            dots=(dots+1)%4; 
            typing.textContent='Thinking'+'.'.repeat(dots); 
            scrollToBottom(chatBody); 
        },500);
    }
    function stopTypingAnimation() {
        clearInterval(typingInterval);
        typing.style.display='none';
    }

    async function sendMessage() {
        const msg = msgInput.value;
        if(!msg.trim()) return alert('Enter a website URL first!');
        appendMessage('user', msg, chatBody, typing);

        startTypingAnimation();
        msgInput.value = '';
        msgInput.style.height = '36px';
        sendBtn.style.height = '36px';
        msgInput.scrollTop = 0;
        introText.style.display='none';
        const data = await sendMsg(msg);
        stopTypingAnimation();
        appendMessage('bot', data, chatBody, typing);

    }

    sendBtn.addEventListener('click', sendMessage);
    msgInput.addEventListener('keydown', e => {
        if(e.key==='Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    // Auto-resize input & send button
    msgInput.addEventListener('input', () => {
        msgInput.style.height = 'auto';
        let newHeight = msgInput.scrollHeight;
        if(newHeight > maxInputHeight) {
            newHeight = maxInputHeight;
            msgInput.style.overflowY = 'auto';
        } else {
            msgInput.style.overflowY = 'hidden';
        }
        msgInput.style.height = newHeight + 'px';
        sendBtn.style.height = newHeight + 'px';
    });
   
}
