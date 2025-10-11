export function appendMessage(sender, text, chatBody, typing) {
  const div = document.createElement('div');
  div.className = sender === 'user' ? 'message user-msg' : 'message bot-msg';
  div.innerHTML = text;

  // Insert before "Thinking..." if visible
  if (typing && typing.parentNode === chatBody) {
    chatBody.insertBefore(div, typing);
  } else {
    chatBody.appendChild(div);
  }

  scrollToBottom(chatBody)
}

/**
 * Auto scroll only if user is near bottom
 */
function autoScroll(chatBody) {
  const isNearBottom =
    chatBody.scrollHeight - chatBody.scrollTop - chatBody.clientHeight < 100;

  if (isNearBottom) {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
}

/**
 * Force scroll to bottom (for initial load)
 */
export function scrollToBottom(chatBody) {
  chatBody.scrollTop = chatBody.scrollHeight;
}
