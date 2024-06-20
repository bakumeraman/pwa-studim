const msgTemplate = document.getElementById("message");

async function load(LN) {
    const msgContainer = document.querySelector(`#lobbyN${LN}-panel .messages-flux`);
    const loadTemplate = displayLoader();//only here to wait with you
    msgContainer.appendChild(loadTemplate);
    try {//case: messages loaded
        const messages = JSON.parse(localStorage.getItem(`messages-LN${LN}`)) || [];
        for (const msg of messages) {
            msgContainer.appendChild(generateMsg(msg));
        }
    } catch (err) {//case: fetch error
        console.log("Pas de message?")
        const errorElement = displayError(err);
        msgContainer.appendChild(errorElement);
        const reload = (evt) => {
            window.removeEventListener("online", reload);//prevents further firing of reload
            evt.preventDefault();
            errorElement.remove();
            load();
        };
        window.addEventListener("online", reload);//auto reload when online
        const reloadBtn = errorElement.querySelector(`#lobbyN${LN}-panel .msg-reload`);
        reloadBtn.addEventListener("click", reload);
    }
    loadTemplate.remove();//waiting is over
};

/* TEMPLATE : ERROR */
function displayError() {
    const div = document.createElement("div");
    div.appendChild(
        document.importNode(document.getElementById("error").content, true)
    );
    return div;
}

/* TEMPLATE : LOADER */
function displayLoader() {
    const div = document.createElement("div");
    div.appendChild(
        document.importNode(document.getElementById("loader").content, true)
    );
    return div;
}

/* TEMPLATE : MESSAGE */
function generateMsg(msg) {
    const clone = document.importNode(msgTemplate.content, true);
    clone.querySelector(".message__content").innerText = msg.body;
    return clone;
}

function wait(time = 1000) {
    return new Promise((resolve) => {
        window.setTimeout(resolve,time);
    })
};

const lobbies = ["01","02","03"];

lobbies.forEach(LN => {
    load(LN);
})

/* ============================= 
 * Functionality : post messages 
 * ============================== */

async function postMsg(LN) {
    const msgForm = document.querySelector(`#userFormLN${LN}`);
    console.log(msgForm);

    const messages = JSON.parse(localStorage.getItem(`messages-LN${LN}`)) || [];
    console.log(messages);

    const messageInput = msgForm.querySelector(".user-message__input");
    console.log(messageInput);

    msgForm.addEventListener('submit', event => {
        console.log("feefe");
        event.preventDefault();
        const message = messageInput.value.trim();
        if (message) {
            const messageObject = { body: message, type: 'outgoing' };
            messages.push(messageObject);
            localStorage.setItem(`messages-LN${LN}`, JSON.stringify(messages));
            messageInput.value = '';
            document.querySelector(`#lobbyN${LN}-panel .messages-flux`).appendChild(generateMsg(messageObject));
            sendNotification('Nouveau message', message);
        }
        const sendNotification = (userId, body) => {
            if (Notification.permission === 'granted') {
                new Notification(userId, { body });
            }
        };
        load(LN);
    });
}

lobbies.forEach(lobby => {
    postMsg(lobby);
});

/* ============================= 
 * Functionality : notifications
 * ============================== */

document.addEventListener('DOMContentLoaded', () => {
    const alreadyAskedForNotifications = localStorage.getItem('alreadyAskedForNotifications');

    if (!alreadyAskedForNotifications) {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification('Notifications activées', { body: 'Vous recevrez désormais des notifications.' });
                }
                localStorage.setItem('alreadyAskedForNotifications', true);
            });
        } else {
            new Notification('Notifications déjà activées', { body: 'Vous recevrez déjà des notifications.' });
            localStorage.setItem('alreadyAskedForNotifications', true);
        }
    }
});