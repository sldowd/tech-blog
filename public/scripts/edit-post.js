async function editPost(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_body = document.querySelector('input[name="post-content"]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
    
    const response = await fetch(`/api/post/${post_id}`, {
        method: 'put',
        body: JSON.stringify({
            title,
            post_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
    


}

document.querySelector('.edit-post-form').addEventListener('submit', editPost);