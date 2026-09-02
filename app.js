/**
 * ============================================================
 * TRAVEL MATE — FRONTEND LOGIC
 * ============================================================
  */

/* ============================================================
PAGE LOADER
============================================================ */

window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  setTimeout(() => {
    loader.classList.add("hidden");
    document.body.classList.remove("loading");
  }, 1200);
});

document.body.classList.add("loading");

/* ============================================================
DOM ELEMENTS
============================================================ */

const tripForm = document.getElementById("tripForm");
const generateBtn = document.getElementById("generateBtn");

const formSection = document.getElementById("formSection");
const loadingSection = document.getElementById("loadingSection");
const resultsSection = document.getElementById("resultsSection");

const errorToast = document.getElementById("errorToast");
const errorMsg = document.getElementById("errorMsg");
const errorClose = document.getElementById("errorClose");

const resetBtn = document.getElementById("resetBtn");
const loadingTitle = document.getElementById("loadingTitle");

/* ============================================================
TRANSPORT ICONS
============================================================ */

const TRANSPORT_ICONS = {
Cab: "🚖",
Auto: "🛺",
Metro: "🚇",
"E-Rickshaw": "🛺",
Walking: "🚶",
Bus: "🚌",
Train: "🚆",
Bike: "🏍️",
Bicycle: "🚲",
};

function getTransportIcon(mode) {
return TRANSPORT_ICONS[mode] || "🚗";
}

/* ============================================================
HTML ESCAPING
============================================================ */

function escapeHTML(value) {
if (value === null || value === undefined) {
return "";
}

return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}

/* ============================================================
ACTIVITY TYPE CLASS
============================================================ */

function getTypeClass(type) {
if (!type) {
return "type-default";
}

const t = String(type).toLowerCase();

if (
    t.includes("sight") ||
    t.includes("tourist") ||
    t.includes("monument")
) {
    return "type-sightseeing";
}

if (
    t.includes("food") ||
    t.includes("cafe") ||
    t.includes("restaurant")
) {
    return "type-food";
}

if (t.includes("lunch")) {
    return "type-lunch";
}

if (
    t.includes("nature") ||
    t.includes("park") ||
    t.includes("waterfall")
) {
    return "type-nature";
}

if (
    t.includes("cultural") ||
    t.includes("heritage")
) {
    return "type-cultural";
}

if (
    t.includes("shop") ||
    t.includes("market") ||
    t.includes("bazaar")
) {
    return "type-shopping";
}

if (
    t.includes("spirit") ||
    t.includes("temple") ||
    t.includes("religious")
) {
    return "type-spiritual";
}

return "type-default";

}

/* ============================================================
LOADING STEPS
============================================================ */

const PLANNING_STEPS = [
"step1",
"step2",
"step3",
"step4",
"step5",
];

const LOADING_MESSAGES = [
"Finding the best options for your stay...",
"Discovering places that match your travel style...",
"Checking timings and travel details...",
"Optimizing routes, transport and estimated costs...",
"Building your personalized itinerary...",
];

let loadingTimer = null;
let currentStep = 0;

/* ============================================================
START LOADING ANIMATION
============================================================ */

function startLoadingAnimation() {
currentStep = 0;

if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
}

PLANNING_STEPS.forEach((id) => {
    const element = document.getElementById(id);

    if (element) {
        element.classList.remove("active", "done");
    }
});


function activateNext() {

    if (currentStep > 0) {
        const previousStep =
            document.getElementById(
                PLANNING_STEPS[currentStep - 1]
            );

        if (previousStep) {
            previousStep.classList.remove("active");
            previousStep.classList.add("done");
        }
    }


    if (currentStep < PLANNING_STEPS.length) {

        if (loadingTitle) {
            loadingTitle.textContent =
                LOADING_MESSAGES[currentStep] ||
                "Preparing your travel plan...";
        }

        const currentElement =
            document.getElementById(
                PLANNING_STEPS[currentStep]
            );

        if (currentElement) {
            currentElement.classList.add("active");
        }

        currentStep++;

        const delays = [
            3500,
            6000,
            5000,
            5000,
            4000,
        ];

        const delay =
            delays[currentStep - 1] || 5000;

        loadingTimer = setTimeout(
            activateNext,
            delay
        );
    }
}


activateNext();

}

/* ============================================================
STOP LOADING ANIMATION
============================================================ */

function stopLoadingAnimation() {

if (loadingTimer) {
    clearTimeout(loadingTimer);
    loadingTimer = null;
}


PLANNING_STEPS.forEach((id) => {

    const element =
        document.getElementById(id);

    if (element) {
        element.classList.remove("active");
        element.classList.add("done");
    }

});


if (loadingTitle) {
    loadingTitle.textContent =
        "Your itinerary is ready!";
}

}

/* ============================================================
SECTION SWITCHING
============================================================ */

function showSection(section) {

[
    formSection,
    loadingSection,
    resultsSection,
].forEach((item) => {

    if (item) {
        item.classList.add("hidden");
    }

});


if (section) {
    section.classList.remove("hidden");
}

}

/* ============================================================
ERROR HANDLING
============================================================ */

let errorTimer = null;

function showError(message) {

if (!errorToast || !errorMsg) {
    alert(message);
    return;
}


if (errorTimer) {
    clearTimeout(errorTimer);
}


errorMsg.textContent = message;

errorToast.classList.remove("hidden");


errorTimer = setTimeout(() => {

    errorToast.classList.add("hidden");

}, 7000);

}

/* ============================================================
FORM VALIDATION
============================================================ */

function validateForm() {

const fields = [
    {
        id: "destination",
        label: "Destination",
    },
    {
        id: "check_in",
        label: "Check-in date",
    },
    {
        id: "check_out",
        label: "Check-out date",
    },
    {
        id: "total_budget",
        label: "Total budget",
    },
    {
        id: "hotel_budget",
        label: "Hotel budget per night",
    },
    {
        id: "adults",
        label: "Number of adults",
    },
    {
        id: "vibe",
        label: "Traveler vibe",
    },
];


for (const field of fields) {

    const element =
        document.getElementById(field.id);


    if (!element) {
        continue;
    }


    const value =
        String(element.value || "").trim();


    if (!value) {

        element.classList.add("invalid");

        showError(
            `Please fill in: ${field.label}`
        );

        element.focus();

        return false;
    }


    element.classList.remove("invalid");
}


const checkInElement =
    document.getElementById("check_in");

const checkOutElement =
    document.getElementById("check_out");


if (!checkInElement || !checkOutElement) {
    showError("Date fields are missing.");
    return false;
}


const checkInValue =
    checkInElement.value;

const checkOutValue =
    checkOutElement.value;


const checkIn =
    new Date(
        `${checkInValue}T00:00:00`
    );

const checkOut =
    new Date(
        `${checkOutValue}T00:00:00`
    );


if (
    Number.isNaN(checkIn.getTime()) ||
    Number.isNaN(checkOut.getTime())
) {
    showError("Please select valid travel dates.");
    return false;
}


if (checkOut <= checkIn) {

    showError(
        "Check-out date must be after check-in date."
    );

    checkOutElement.classList.add("invalid");

    return false;
}


const totalBudgetElement =
    document.getElementById("total_budget");

const hotelBudgetElement =
    document.getElementById("hotel_budget");

const adultsElement =
    document.getElementById("adults");


const totalBudget =
    Number(totalBudgetElement?.value);


if (
    !Number.isFinite(totalBudget) ||
    totalBudget <= 0
) {

    showError(
        "Please enter a valid total budget."
    );

    return false;
}


const hotelBudget =
    Number(hotelBudgetElement?.value);


if (
    !Number.isFinite(hotelBudget) ||
    hotelBudget <= 0
) {

    showError(
        "Please enter a valid hotel budget."
    );

    return false;
}


const adults =
    Number(adultsElement?.value);


if (
    !Number.isInteger(adults) ||
    adults < 1
) {

    showError(
        "Number of adults must be at least 1."
    );

    return false;
}


return true;

}

/* ============================================================
RENDER COMPLETE RESULTS
============================================================ */

function renderResults(data) {

renderTripBanner(
    data?.trip_overview || {}
);


renderHotelCard(
    data?.hotel_details || {}
);


renderDayTabs(
    data?.daily_itinerary || []
);


showSection(resultsSection);


if (resultsSection) {
    setTimeout(() => {

        resultsSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

    }, 100);
}

}

/* ============================================================
TRIP BANNER
============================================================ */

function renderTripBanner(overview) {

const element =
    document.getElementById(
        "tripBanner"
    );


if (!element) {
    return;
}


const days =
    Number(overview.total_days || 0);


const destination =
    escapeHTML(
        overview.destination || "-"
    );


const dates =
    escapeHTML(
        overview.dates || "-"
    );


const vibe =
    escapeHTML(
        overview.travel_vibe || "-"
    );


element.innerHTML = `
    <div class="trip-banner-left">
        <h2>📍 ${destination}</h2>
        <p>${dates}</p>
    </div>

    <div class="trip-badges">
        <span class="trip-badge">
            🗓 ${days} Day${days !== 1 ? "s" : ""}
        </span>

        <span class="trip-badge">
            🎯 ${vibe}
        </span>
    </div>
`;

}

/* ============================================================
HOTEL CARD
============================================================ */

function renderHotelCard(hotel) {

const element =
    document.getElementById(
        "hotelCard"
    );


if (!element) {
    return;
}


const ratingNumber =
    Number(hotel.rating);


const rating =
    Number.isFinite(ratingNumber)
        ? ratingNumber.toFixed(1)
        : "N/A";


const hotelName =
    escapeHTML(
        hotel.name ||
        "Recommended Hotel"
    );


const hotelArea =
    escapeHTML(
        hotel.area || "-"
    );


const hotelPrice =
    escapeHTML(
        hotel.price_per_night || "₹0"
    );


element.innerHTML = `

    <div class="hotel-icon-wrap">
        🏨
    </div>

    <div class="hotel-info">

        <div class="hotel-name">
            ${hotelName}
        </div>

        <div class="hotel-area">
            📍 ${hotelArea}
        </div>

    </div>

    <div class="hotel-meta">

        <span class="hotel-label">
            Stay
        </span>

        <span class="hotel-price">
            ${hotelPrice}

            <span
                style="
                    font-size:0.72rem;
                    font-weight:500;
                    color:#687772;
                "
            >
                / night
            </span>
        </span>

        <span class="hotel-rating">
            ⭐ ${rating}
        </span>

    </div>

`;

}

/* ============================================================
DAY TABS
============================================================ */

function renderDayTabs(days) {

const tabsContainer =
    document.getElementById("dayTabs");

const panelsContainer =
    document.getElementById("dayPanels");


if (!tabsContainer || !panelsContainer) {
    return;
}


tabsContainer.innerHTML = "";
panelsContainer.innerHTML = "";


if (!Array.isArray(days) || days.length === 0) {

    panelsContainer.innerHTML = `
        <div class="day-panel active">
            <div class="day-theme-title">
                No itinerary generated
            </div>
        </div>
    `;

    return;
}


days.forEach((day, index) => {

    /* ---------------- TAB ---------------- */

    const tab =
        document.createElement("button");


    tab.type = "button";


    tab.className =
        `day-tab${index === 0 ? " active" : ""}`;


    tab.setAttribute(
        "role",
        "tab"
    );


    tab.setAttribute(
        "aria-selected",
        index === 0 ? "true" : "false"
    );


    tab.setAttribute(
        "tabindex",
        index === 0 ? "0" : "-1"
    );


    const dayNumber =
        escapeHTML(
            day.day_number || index + 1
        );


    tab.innerHTML = `
        <span class="day-tab-label">
            Day ${dayNumber}
        </span>

        <span>
            ${escapeHTML(formatDate(day.date))}
        </span>
    `;


    tab.addEventListener(
        "click",
        () => switchTab(index)
    );


    tabsContainer.appendChild(tab);


    /* ---------------- PANEL ---------------- */

    const panel =
        document.createElement("div");


    panel.className =
        `day-panel${index === 0 ? " active" : ""}`;


    panel.id =
        `panel-${index}`;


    const theme =
        escapeHTML(
            day.day_theme ||
            "Explore the city"
        );


    panel.innerHTML = `

        <div class="day-theme-title">
            🌟 ${theme}
        </div>

        <div class="timeline">
            ${renderTimeline(
                Array.isArray(day.schedule)
                    ? day.schedule
                    : []
            )}
        </div>

    `;


    panelsContainer.appendChild(panel);

});

}

/* ============================================================
SWITCH DAY TAB
============================================================ */

function switchTab(index) {

document
    .querySelectorAll(".day-tab")
    .forEach((tab, tabIndex) => {

        const isActive =
            tabIndex === index;


        tab.classList.toggle(
            "active",
            isActive
        );


        tab.setAttribute(
            "aria-selected",
            isActive ? "true" : "false"
        );


        tab.setAttribute(
            "tabindex",
            isActive ? "0" : "-1"
        );

    });


document
    .querySelectorAll(".day-panel")
    .forEach((panel, panelIndex) => {

        panel.classList.toggle(
            "active",
            panelIndex === index
        );

    });

}

/* ============================================================
TIMELINE RENDERING
============================================================ */

function renderTimeline(schedule) {
if (
    !Array.isArray(schedule) ||
    schedule.length === 0
) {

    return `
        <div class="timeline-card">
            No activities available for this day.
        </div>
    `;
}


return schedule
    .map((item) => {

        const activityType =
            item.activity_type ||
            "Sightseeing";


        const isLunch =
            String(activityType)
                .toLowerCase()
                .includes("lunch");


        const icon =
            getTransportIcon(
                item.transport_mode
            );


        const typeClass =
            getTypeClass(
                activityType
            );


        const timeSlot =
            item.time_slot ||
            "09:00 - 10:00";


        const parts =
            String(timeSlot).split(" - ");


        const start =
            parts[0] || "";


        const end =
            parts[1] || "";


        const activityName =
            escapeHTML(
                item.activity_name ||
                "Activity"
            );


        const safeActivityType =
            escapeHTML(
                activityType
            );


        const transportMode =
            escapeHTML(
                item.transport_mode ||
                "Travel"
            );


        const distanceNote =
            escapeHTML(
                item.distance_note ||
                "-"
            );


        const estimatedCost =
            item.est_cost === "₹0"
                ? "Free"
                : escapeHTML(
                    item.est_cost || "₹0"
                );


        return `

            <div
                class="timeline-row${
                    isLunch
                        ? " lunch-row"
                        : ""
                }"
            >

                <div class="timeline-time">

                    ${escapeHTML(start)}

                    <br />

                    <span
                        style="
                            color:#98a7a2;
                            font-weight:500;
                        "
                    >
                        ${escapeHTML(end)}
                    </span>

                </div>


                <div class="timeline-line">

                    <div class="timeline-dot"></div>

                    <div
                        class="timeline-connector"
                    ></div>

                </div>


                <div class="timeline-card">

                    <div
                        class="timeline-card-header"
                    >

                        <div
                            class="activity-name"
                        >
                            ${activityName}
                        </div>


                        <span
                            class="
                                activity-type-badge
                                ${typeClass}
                            "
                        >
                            ${safeActivityType}
                        </span>

                    </div>


                    <div
                        class="timeline-card-footer"
                    >

                        <span
                            class="transport-pill"
                        >
                            ${icon}
                            ${transportMode}
                        </span>


                        <span
                            class="distance-note"
                        >
                            📏 ${distanceNote}
                        </span>


                        <span
                            class="cost-pill"
                        >
                            ${estimatedCost}
                        </span>

                    </div>

                </div>

            </div>

        `;

    })
    .join("");

}

/* ============================================================
DATE FORMATTING
============================================================ */

function formatDate(dateString) {


if (!dateString) {
    return "-";
}


const date =
    new Date(
        `${dateString}T00:00:00`
    );


if (Number.isNaN(date.getTime())) {
    return dateString;
}


return date.toLocaleDateString(
    "en-IN",
    {
        day: "2-digit",
        month: "short",
    }
);

}

/* ============================================================
FORM SUBMISSION
============================================================ */

if (tripForm && generateBtn) {

tripForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        if (!validateForm()) {
            return;
        }


        const destinationElement =
            document.getElementById("destination");

        const checkInElement =
            document.getElementById("check_in");

        const checkOutElement =
            document.getElementById("check_out");

        const totalBudgetElement =
            document.getElementById("total_budget");

        const hotelBudgetElement =
            document.getElementById("hotel_budget");

        const adultsElement =
            document.getElementById("adults");

        const vibeElement =
            document.getElementById("vibe");


        /*
         * Payload structure remains compatible
         * with the existing backend.
         */

        const payload = {

            destination:
                destinationElement.value.trim(),


            check_in:
                checkInElement.value,


            check_out:
                checkOutElement.value,


            total_budget:
                parseFloat(
                    totalBudgetElement.value
                ),


            hotel_budget_per_night:
                parseFloat(
                    hotelBudgetElement.value
                ),


            adults:
                parseInt(
                    adultsElement.value,
                    10
                ),


            traveler_vibe:
                vibeElement.value,

        };


        /* ---------------- BUTTON STATE ---------------- */

        generateBtn.disabled = true;


        const buttonText =
            generateBtn.querySelector(
                ".btn-text"
            );


        const oldButtonText =
            buttonText
                ? buttonText.textContent
                : "Generate My Itinerary";


        if (buttonText) {
            buttonText.textContent =
                "Creating Your Trip...";
        }


        /* ---------------- SHOW LOADING ---------------- */

        showSection(
            loadingSection
        );


        startLoadingAnimation();


        try {

            const response =
                await fetch(
                    "/plan",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body:
                            JSON.stringify(
                                payload
                            ),
                    }
                );


            if (!response.ok) {

                let errorData =
                    null;


                try {

                    errorData =
                        await response.json();

                } catch {
                    errorData = null;
                }


                const errorMessage =
                    errorData?.detail ||
                    errorData?.message ||
                    `Server error (${response.status})`;


                throw new Error(
                    errorMessage
                );
            }


            const data =
                await response.json();


            stopLoadingAnimation();


            setTimeout(() => {

                renderResults(data);

            }, 350);


        } catch (error) {

            console.error(
                "Trip generation error:",
                error
            );


            stopLoadingAnimation();


            showSection(
                formSection
            );


            showError(
                error.message ||
                "Failed to generate itinerary. Please try again."
            );

        } finally {

            generateBtn.disabled = false;


            if (buttonText) {
                buttonText.textContent =
                    oldButtonText;
            }

        }

    }
);

}

/* ============================================================
RESET BUTTON
============================================================ */

if (resetBtn) {

resetBtn.addEventListener(
    "click",
    () => {

        showSection(
            formSection
        );


        setTimeout(() => {

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        }, 50);

    }
);

}

/* ============================================================
ERROR CLOSE BUTTON
============================================================ */

if (errorClose && errorToast) {

errorClose.addEventListener(
    "click",
    () => {

        if (errorTimer) {
            clearTimeout(errorTimer);
        }


        errorToast.classList.add(
            "hidden"
        );

    }
);

}

/* ============================================================
CLEAR INVALID STATE WHILE TYPING
============================================================ */

[
"destination",
"check_in",
"check_out",
"total_budget",
"hotel_budget",
"adults",
"vibe",
].forEach((id) => {

const element =
    document.getElementById(id);


if (!element) {
    return;
}


const eventName =
    element.tagName === "SELECT"
        ? "change"
        : "input";


element.addEventListener(
    eventName,
    () => {

        if (
            String(
                element.value || ""
            ).trim()
        ) {

            element.classList.remove(
                "invalid"
            );

        }

    }
);

});

/* ============================================================
DEFAULT DATES
============================================================ */

(function setDefaultDates() {

const today =
    new Date();


const pad = (number) =>
    String(number).padStart(
        2,
        "0"
    );


const formatInputDate = (date) =>
    `${date.getFullYear()}-${pad(
        date.getMonth() + 1
    )}-${pad(
        date.getDate()
    )}`;


/*
 * Default check-in:
 * 7 days from today
 */

const nextWeek =
    new Date(today);


nextWeek.setDate(
    today.getDate() + 7
);


/*
 * Default check-out:
 * 3 days after check-in
 */

const checkOutDate =
    new Date(nextWeek);


checkOutDate.setDate(
    nextWeek.getDate() + 3
);


const checkInElement =
    document.getElementById(
        "check_in"
    );


const checkOutElement =
    document.getElementById(
        "check_out"
    );


if (
    !checkInElement ||
    !checkOutElement
) {
    return;
}


/*
 * Set minimum date to today.
 */

checkInElement.min =
    formatInputDate(today);


/*
 * Set defaults only if fields
 * do not already have values.
 */

if (!checkInElement.value) {

    checkInElement.value =
        formatInputDate(nextWeek);

}


if (!checkOutElement.value) {

    checkOutElement.value =
        formatInputDate(
            checkOutDate
        );

}


checkOutElement.min =
    checkInElement.value;


/*
 * Update checkout restriction
 * when check-in changes.
 */

checkInElement.addEventListener(
    "change",
    () => {

        const selectedCheckIn =
            checkInElement.value;


        checkOutElement.min =
            selectedCheckIn;


        if (
            checkOutElement.value &&
            checkOutElement.value <=
                selectedCheckIn
        ) {

            const newCheckOut =
                new Date(
                    `${selectedCheckIn}T00:00:00`
                );


            newCheckOut.setDate(
                newCheckOut.getDate() + 1
            );


            checkOutElement.value =
                formatInputDate(
                    newCheckOut
                );

        }

    }
);

})();

/* ============================================================
NAVBAR SCROLL EFFECT
============================================================ */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});
