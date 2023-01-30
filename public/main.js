const socket = io();
socket.on("welcome", (uid) => {
    document.getElementById("uid").innerHTML ="uid : "+ uid;
});

socket.on("posts", (posts) => {
    document.getElementById("posts").innerHTML = "";

    posts.forEach((post) => {
        document.getElementById("posts").innerHTML += `
        <div class="post">
            <h1>${post.title}</h1>
            <p>${post.content}</p>
            <p>${post.likes}</p>
            <button onclick="like(${post.id})">Like</button>
        </div>
        `;
    });
});

// socket.on("update", (post) => {
//     socket.emit("posts", posts);
// });

function like(post_id) {
    socket.emit("like", post_id);
}