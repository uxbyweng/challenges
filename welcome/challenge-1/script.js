const userData = [
    {
        username: "David",
        status: "online",
        lastActivity: 10,
    },
    {
        username: "Lucy",
        status: "offline",
        lastActivity: 22,
    },
    {
        username: "Bob",
        status: "online",
        lastActivity: 104,
    },
];

// Neues Objekt mit 3 Arrays für den Status der Benutzer
const userStatus = { online: [], offline: [], away: [] };

function setUserStatus() {
    for (user in userData) {
        console.log(userData[user]);
        if (userData[user].status === "online" && userData[user].lastActivity <= 10) {
            console.log("User is online");
            userStatus.online.push(userData[user].username);
        } else if (userData[user].status === "online" && userData[user].lastActivity > 10) {
            console.log("User is away");
            userStatus.away.push(userData[user].username);
        } else {
            console.log("User is offline");
            userStatus.offline.push(userData[user].username);
        }
    }
    console.log(userStatus);
}

// console.log(userData);
// console.log(userStatus);
setUserStatus();
