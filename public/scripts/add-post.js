async function submitNewPostHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', submitNewPostHandler);