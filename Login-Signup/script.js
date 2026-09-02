const loginFormBox = document.getElementById("loginForm");
const signupFormBox = document.getElementById("signupForm");

const switchButtons = document.querySelectorAll(".switch-btn");
const toggleButtons = document.querySelectorAll(".toggle-password");

const signupPassword = document.getElementById("signupPassword");
const confirmPassword = document.getElementById("confirmPassword");

const strengthFill = document.getElementById("strengthFill");
const strengthText = document.getElementById("strengthText");

const loginForm = document.getElementById("login");
const signupForm = document.getElementById("signup");

const toast = document.getElementById("toast");

/* ---------------- SMOOTH FORM SWITCH ---------------- */

function switchForm(target) {
    const currentForm = document.querySelector(".form-box.active");
    const targetForm =
        target === "signup"
            ? signupFormBox
            : loginFormBox;

    // Prevent unnecessary animation
    if (currentForm === targetForm) {
        return;
    }

    // Clean up all animation states
    loginFormBox.classList.remove("active");
    loginFormBox.classList.remove("exit-left");
    signupFormBox.classList.remove("active");
    signupFormBox.classList.remove("exit-left");

    // Clear all inline transforms
    loginFormBox.style.transform = "";
    signupFormBox.style.transform = "";
    loginFormBox.style.visibility = "";
    signupFormBox.style.visibility = "";

    // Animate out current form
    currentForm.classList.add("exit-left");

    // Animate in target form
    targetForm.style.visibility = "visible";
    
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            targetForm.classList.add("active");
        });
    });
}

/* ---------------- SWITCH LOGIN / SIGNUP BUTTONS ---------------- */

switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
        switchForm(button.dataset.form);
    });
});

/* ---------------- SHOW / HIDE PASSWORD ---------------- */

toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.target;
        const input = document.getElementById(targetId);

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "Hide";
        } else {
            input.type = "password";
            button.textContent = "Show";
        }
    });
});

/* ---------------- PASSWORD STRENGTH ---------------- */

function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}

signupPassword.addEventListener("input", () => {
    const password = signupPassword.value;
    const score = checkPasswordStrength(password);

    const strengthData = [
        {
            width: "0%",
            text: "Use at least 8 characters."
        },
        {
            width: "25%",
            text: "Weak password"
        },
        {
            width: "50%",
            text: "Fair password"
        },
        {
            width: "75%",
            text: "Good password"
        },
        {
            width: "100%",
            text: "Strong password"
        }
    ];

    strengthFill.style.width = strengthData[score].width;
    strengthText.textContent = strengthData[score].text;
});

/* ---------------- TOAST ---------------- */

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

/* ---------------- LOGIN ---------------- */

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailOrUsername =
        document.getElementById("loginEmail").value.trim();

    const password =
        document.getElementById("loginPassword").value;

    if (!emailOrUsername || !password) {
        showToast("Please fill in all fields.");
        return;
    }

    /*
        BACKEND INTEGRATION GOES HERE

        Example:

        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailOrUsername,
                password
            })
        });
    */

    console.log({
        emailOrUsername,
        password
    });

    showToast(
        "Login successful! "
    );

    setTimeout(() => {
        window.location.href = "../index.html";
    }, 1500);
});

/* ---------------- SIGNUP ---------------- */

signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const firstName =
    document.getElementById("firstName").value.trim();

const lastName =
    document.getElementById("lastName").value.trim();

const username =
    document.getElementById("username").value.trim();

const country =
    document.getElementById("country").value;

const email =
    document.getElementById("signupEmail").value.trim();

const password =
    signupPassword.value;

const confirm =
    confirmPassword.value;


/* Validate empty fields */

if (
    !firstName ||
    !lastName ||
    !username ||
    !country ||
    !email ||
    !password ||
    !confirm
) {
    showToast("Please complete all fields.");
    return;
}


/* Validate password length */

if (password.length < 8) {
    showToast(
        "Password must contain at least 8 characters."
    );
    return;
}


/* Validate password match */

if (password !== confirm) {
    showToast("Passwords do not match.");
    return;
}


const userData = {
    firstName,
    lastName,
    username,
    country,
    email
};


/*
    BACKEND INTEGRATION GOES HERE

    Example:

    fetch("/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ...userData,
            password
        })
    });
*/


console.log(
    "Signup data:",
    userData
);


showToast(
    "Account created successfully!"
);


/* Switch back to login smoothly */

setTimeout(() => {

    switchForm("login");

    signupForm.reset();

    strengthFill.style.width = "0%";

    strengthText.textContent =
        "Use at least 8 characters.";

}, 1200);

});
