/* --- DATABASE OF DESTINATIONS & CATEGORIES (UPDATED WITH IMAGE URLs) --- */
// The image URLs are placeholder links from Pexels/Unsplash for professional visuals.
const destinationsDB = {
    "maldives": {
        "family": "index5.html", "adventure": "index4.html", "romantic": "index2.html", "solo": "index3.html",
        "images": [
            "https://images.pexels.com/photos/14838637/pexels-photo-14838637.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17387343/pexels-photo-17387343.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17693952/pexels-photo-17693952.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    "bali": {
        "romantic": "index2.html",
        "images": [
            "https://images.pexels.com/photos/14838637/pexels-photo-14838637.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/18260309/pexels-photo-18260309.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/18260309/pexels-photo-18260309.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    "paris": {
        "romantic": "index2.html",
        "images": [
            "https://images.pexels.com/photos/18520037/pexels-photo-18520037.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17926131/pexels-photo-17926131.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17585250/pexels-photo-17585250.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    "varanasi": {
        "devotional": "index1.html",
        "images": [
            "https://images.pexels.com/photos/3389269/pexels-photo-3389269.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/15982544/pexels-photo-15982544/free-photo-of-river-front-of-varanasi-at-night-india.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17498322/pexels-photo-17498322/free-photo-of-sun-rising-over-varanasi-india.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    "kyoto": {
        "family": "index5.html", "solo": "index3.html",
        "images": [
            "https://images.pexels.com/photos/17693952/pexels-photo-17693952.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/18520037/pexels-photo-18520037.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17387343/pexels-photo-17387343.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    "the alps": {
        "adventure": "index4.html", "family": "index5.html",
        "images": [
            "https://images.pexels.com/photos/18260309/pexels-photo-18260309.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17926131/pexels-photo-17926131.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/17585250/pexels-photo-17585250.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    "rishikesh": {
        "adventure": "index4.html",
        "images": [
            "https://images.pexels.com/photos/17585250/pexels-photo-17585250/free-photo-of-river-in-hills.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/3389269/pexels-photo-3389269.jpeg?auto=compress&cs=tinysrgb&w=300",
            "https://images.pexels.com/photos/15982544/pexels-photo-15982544/free-photo-of-river-front-of-varanasi-at-night-india.jpeg?auto=compress&cs=tinysrgb&w=300"
        ]
    },
    // Keeping a subset of other destinations for brevity
    "london": { "family": "index5.html", "images": ["urlA", "urlB", "urlC"] },
    "goa": { "solo": "index3.html", "images": ["urlD", "urlE", "urlF"] },
    "ladakh": { "adventure": "index4.html", "images": ["urlG", "urlH", "urlI"] },
    "udaipur": { "romantic": "index2.html", "images": ["urlJ", "urlK", "urlL"] }
};

let currentSelectedPlace = "";

/* --- 1. SEARCH SUGGESTIONS LOGIC (Adapted for Hero Search) --- */
const searchInput = document.getElementById("heroDestinationInput");
const suggestionsBox = document.getElementById("suggestionsBox");
const detailCard = document.getElementById("itineraryDetailCard");

if (searchInput) {
    searchInput.addEventListener("keyup", handleKeyup);
    searchInput.addEventListener("focus", handleKeyup);

    function handleKeyup() {
        const inputVal = searchInput.value.toLowerCase().trim();
        suggestionsBox.innerHTML = ""; // Clear previous
        
        const allPlaces = Object.keys(destinationsDB); 
        const matches = allPlaces.filter(place => place.includes(inputVal));
        
        if (matches.length > 0 && inputVal.length > 0) {
            suggestionsBox.style.display = "block";
            matches.forEach(match => {
                const div = createSuggestionItem(match);
                suggestionsBox.appendChild(div);
            });
        } else if (inputVal.length === 0) {
             // Show all places on focus/empty input
             suggestionsBox.style.display = "block";
             allPlaces.forEach(match => {
                 const div = createSuggestionItem(match);
                 suggestionsBox.appendChild(div);
             });
        } else {
            suggestionsBox.style.display = "none";
        }
    }

    function createSuggestionItem(match) {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innerText = match.charAt(0).toUpperCase() + match.slice(1);
        div.onclick = function() {
            searchInput.value = match; 
            suggestionsBox.style.display = "none"; 
            populateDetailCard(match); // Show preview card on selection
        };
        return div;
    }

    // Hide suggestions when clicking outside
    document.addEventListener("click", function(e) {
        if (e.target !== searchInput && e.target !== suggestionsBox) {
            suggestionsBox.style.display = "none";
        }
    });

    // Populate the detail card with the first destination on load for presentation clarity
    window.addEventListener('load', () => {
        populateDetailCard("maldives");
    });
}

/* --- 2. SEARCH HANDLER (Updated for all three inputs) --- */
function handleHeroSearch() {
    const destinationVal = document.getElementById("heroDestinationInput").value.toLowerCase().trim();
    const themeVal = document.getElementById("heroThemeSelect").value;
    const durationVal = document.getElementById("heroDurationSelect").value;
    
    if (destinationVal === "" || themeVal === "") {
        alert("Please select a Destination and a Theme/Vibe to plan your trip.");
        return;
    }

    if (destinationsDB[destinationVal]) {
        currentSelectedPlace = destinationVal;
        
        // Check if the selected theme is available for the destination
        if (destinationsDB[destinationVal][themeVal]) {
            const finalURL = destinationsDB[destinationVal][themeVal];
            
            // Success alert before redirect
            alert(`Planning your ${durationVal}-Day, ${themeVal.toUpperCase()} trip to ${destinationVal.toUpperCase()}! Redirecting to itinerary page...`);
            
            // Interactive Map Integration Placeholder: 
            // The first activity for Day 1 is usually the arrival location.
            const googleMapLink = `https://www.google.com/maps/search/${destinationVal} travel map`;
            console.log(`[Interactive Map Integration]: Suggested Map Search: ${googleMapLink}`);
            
            // window.location.href = finalURL; // Uncomment this for actual redirect
        } else {
            // If destination exists but the specific theme does not, show modal if other options exist
            const availableTypes = Object.keys(destinationsDB[destinationVal]).filter(k => k !== 'images');
            if (availableTypes.length > 0) {
                openModal(destinationVal, availableTypes);
            } else {
                alert(`Sorry, the theme '${themeVal.toUpperCase()}' is not available for ${destinationVal.toUpperCase()}.`);
            }
        }
    } else {
        alert("Sorry, we don't have a specific package for that location yet. Try 'Maldives' or 'Varanasi'.");
    }
}


/* --- 3. CLARITY OF INFORMATION (New Function) --- */
function populateDetailCard(placeName) {
    const data = destinationsDB[placeName.toLowerCase()];
    if (!data) return;

    const placeDisplayName = placeName.charAt(0).toUpperCase() + placeName.slice(1);
    const availableThemes = Object.keys(data).filter(k => k !== 'images').map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
    
    // Create the image grid HTML
    let imageHTML = data.images.map(url => `<img src="${url}" alt="${placeDisplayName} location photo">`).join('');

    // Google Maps Link (Beginner's Implementation)
    const mapLink = `https://www.google.com/maps/search/${placeName} main attractions`;

    detailCard.innerHTML = `
        <h3>A Glimpse of the ${placeDisplayName} 5-Day Plan</h3>
        <p><strong>Available Themes:</strong> ${availableThemes}</p>
        <p><strong>Sample Activity (Day 1):</strong> Arrive at [Airport/Station] and transfer to a [Mid-range hotel/Resort]. Start with a local cultural dinner.</p>
        <p><strong>Flexible Duration Note:</strong> The 5-day plan can be customized to 3 or 7 days.</p>
        
        <div class="card-images">
            ${imageHTML}
        </div>
        
        <a href="${mapLink}" target="_blank" class="map-link">
            <i class="fa fa-map-marker"></i> View Sample Locations on Map
        </a>
    `;
}


/* --- 4. MODAL FUNCTIONS (Kept the same) --- */
function openModal(placeName, types) {
    const modal = document.getElementById("tripTypeModal");
    const title = document.getElementById("modalDestinationName");
    const optionsContainer = document.getElementById("modalOptions");

    title.innerText = placeName.charAt(0).toUpperCase() + placeName.slice(1);
    optionsContainer.innerHTML = "";

    types.forEach(type => {
        const btn = document.createElement("button");
        btn.innerText = getButtonLabel(type); 
        btn.className = `option-btn ${type}-btn`; 
        btn.onclick = function() {
            window.location.href = destinationsDB[placeName][type];
        };
        optionsContainer.appendChild(btn);
    });

    modal.style.display = "block";
}

function closeModal() {
    document.getElementById("tripTypeModal").style.display = "none";
}

// Helper to add emojis
function getButtonLabel(type) {
    if (type === "family") return "👨‍👩‍👧‍👦 Family Trip";
    if (type === "adventure") return "🧗 Adventure Trip";
    if (type === "romantic") return "❤️ Romantic Trip";
    if (type === "solo") return "🧘 Solo Trip";
    if (type === "devotional") return "🙏 Devotional Trip";
    return type.toUpperCase();
}

window.onclick = function(event) {
    const modal = document.getElementById("tripTypeModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}