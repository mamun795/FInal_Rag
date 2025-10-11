import { appendMessage, scrollToBottom } from './utils.js';
import {sendUrl} from './routes.js'
//const { startTypingAnimation, stopTypingAnimation } = setupSendMessage();
import { typing,chatBody } from './main.js';

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

export function setupURLUpload(uploadBtn, urlInput, urlSection, newUrlBtn, msgInput, sendBtn, chatBody, typing, introText) {

    async function handleUploadURL() {
    const url = urlInput.value;
    if (!url.trim()) return alert('Enter a website URL first!');

    introText.style.display = 'none';
    startTypingAnimation();
    const data = await sendUrl(url);
    stopTypingAnimation();

    if (data.message) {
        appendMessage('bot',"website Process successfully", chatBody, typing);
    } else {
        appendMessage('bot',"Error", chatBody, typing);
    }

    urlSection.style.display = 'none';
    newUrlBtn.style.display = 'block';
    msgInput.disabled = false;
    sendBtn.disabled = false;
    typing.style.display = 'none';
    scrollToBottom(chatBody);
}



    function resetChatForNewURL() {
        const messages = chatBody.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
        introText.style.display = 'block';
        typing.style.display = 'none';
        urlSection.style.display = 'flex';
        urlInput.value = '';
        newUrlBtn.style.display = 'none';
        msgInput.disabled = true;
        sendBtn.disabled = true;
        msgInput.style.height = '36px';
        sendBtn.style.height = '36px';
        msgInput.style.overflowY = 'hidden';
        chatBody.scrollTop = 0;
    }

    uploadBtn.addEventListener('click', handleUploadURL);
    urlInput.addEventListener('keydown', e => {
        if(e.key==='Enter' && !e.shiftKey) { e.preventDefault(); handleUploadURL(); }
    });
    newUrlBtn.addEventListener('click', resetChatForNewURL);
}
