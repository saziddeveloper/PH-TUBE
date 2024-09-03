// Global variable to store all videos
let allVideos = [];

// Get Videos Data Through API
const loadVideos = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/1000`);
    const data = await res.json();
    allVideos = data.data; // Store all videos globally
    displayVideos(allVideos); // Display all videos by default
};

// Function to display videos
const displayVideos = (inputVideos) => {
    const videosContainer = document.getElementById("videos-container");
    videosContainer.innerHTML = ''; // Clear the container before displaying new videos

    if (inputVideos.length === 0) {
        videosContainer.innerHTML = `<div id="not-found-video" class="w-[400px] col-span-4 mx-auto mt-8">
            <div class="flex justify-center">
                <img src="img/Icon.png" alt="">
            </div>
            <h1 class="mt-6 text-center font-bold text-[32px] text-[#171717]">Oops!! Sorry, There is no content here</h1>
        </div>`;
        return;
    }

    inputVideos.forEach(video => {
        const isVerified = video?.authors[0]?.verified ? '' : 'hidden'; // Hide the icon if not verified
        const videoCard = document.createElement("div");
        videoCard.classList = `flex flex-col gap-5 w-[299px] h-[324px]`;
        videoCard.innerHTML = `
        <div class="w-[299px] h-[200px]">
            <img src="${video?.thumbnail}" alt="Not Found!">
        </div>
        <div class="flex gap-3">
            <aside>
                <div class="w-[40px] h-[40px]">
                    <img src="${video?.authors[0]?.profile_picture}" class="rounded-full" alt="Not Found!">
                </div>
            </aside>
            <aside>
                <h2 class="font-bold text-[#171717]">${video?.title}</h2>
                <div class="flex gap-3 my-1">
                    <p class="text-[#252525d2] text-base">${video?.authors[0]?.profile_name}</p>
                    <i class="bi bi-patch-check-fill text-[#2568EF] ${isVerified}"></i>
                </div>
                <p class="text-[#252525d2] text-base">${video?.others?.views} views</p>
            </aside>
        </div>
        `;
        videosContainer.appendChild(videoCard);
    });
};

// Function to handle category click
const handleCategoryClick = (event) => {
    categoryButtons.forEach(button => {
        button.classList.remove('active'); // Remove the 'active' class from all buttons
        button.classList.remove('bg-[#FF1F3D]', 'text-white'); // Remove red background and white text
        button.classList.add('bg-[#2525251f]', 'text-[#252525d2]'); // Reapply the default styling
    });

    // Add 'active' class to the clicked button
    event.target.classList.add('active');
    event.target.classList.add('bg-[#FF1F3D]', 'text-white'); // Apply red background and white text to the clicked button

    // Filter videos based on the selected category
    const selectedCategory = event.target.dataset.category;
    if (selectedCategory === 'all') {
        displayVideos(allVideos); // Display all videos
    } else if (selectedCategory === 'music') {
        const filteredVideos = allVideos.filter(video => video.category_id === "1001");
        displayVideos(filteredVideos);
    } else if (selectedCategory === 'comedy') {
        const filteredVideos = allVideos.filter(video => video.category_id === "1003");
        displayVideos(filteredVideos);
    } else if (selectedCategory === 'drawing') {
        displayVideos([]); // Show no videos and the "not found" message for drawing
    }
};

// Select all category buttons
const categoryButtons = document.querySelectorAll('.category-btn');

// Add click event listener to all category buttons
categoryButtons.forEach(button => {
    button.addEventListener('click', handleCategoryClick);
});

// Set the "All" button as active by default on page load
window.addEventListener('DOMContentLoaded', () => {
    const allButton = document.querySelector('[data-category="all"]');
    allButton.classList.add('active', 'bg-[#FF1F3D]', 'text-white');
    allButton.classList.remove('bg-[#2525251f]', 'text-[#252525d2]');
    loadVideos(); // Load and display all videos when the page loads
});
