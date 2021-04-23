async function deletePost(event) {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length-1
    ];
   
        const response = await fetch(`/api/post/${post_id}`, {
            method: 'delete',
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    
}

document.querySelector('.delete-post-btn').addEventListener('click', deletePost)