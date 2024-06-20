document.getElementById('bookmarkForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    e.preventDefault();

    const siteName = document.getElementById('siteName').value;
    const siteURL = document.getElementById('siteURL').value;

    const bookmark = {
        name: siteName,
        url: siteURL
    };

    // Check if bookmarks array exists in local storage
    if(localStorage.getItem('bookmarks') === null) {
        // Init bookmarks array
        const bookmarks = [];
        // Add to bookmarks array
        bookmarks.push(bookmark);
        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from local storage
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to bookmarks array
        bookmarks.push(bookmark);
        // Re-set back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear form
    document.getElementById('bookmarkForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
    // Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Get output id
    const bookmarksResults = document.getElementById('bookmarks');

    // Build output
    bookmarksResults.innerHTML = '';
    bookmarks.forEach(function(bookmark){
        const name = bookmark.name;
        const url = bookmark.url;

        bookmarksResults.innerHTML += '<div class="bookmark"><div>'+name+' </div><div class="viewDelete"><a href="'+url+'" target="_blank">Visit</a> <a onclick="deleteBookmark(\''+url+'\')" href="#">Delete</a></div></div>';
    });
}

function deleteBookmark(url) {
    // Get bookmarks from local storage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // Loop through the bookmarks
    for(let i = 0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
    }

    // Re-set back to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks on page load
fetchBookmarks();
