const topicContent = {
    "cardiac-care": {
        title: "Cardiac Sciences",
        body: "Our cardiac team handles preventive cardiology, angiography, angioplasty, heart failure management, and post-cardiac rehab. We use integrated diagnostics and emergency cath-lab support for faster interventions."
    },
    neurosciences: {
        title: "Neurosciences",
        body: "Dedicated neuro units support stroke response, epilepsy monitoring, spine surgery, and neuro rehab. We follow time-sensitive pathways to reduce complications and improve long-term recovery."
    },
    oncology: {
        title: "Cancer Care",
        body: "Comprehensive oncology services include tumor board-based treatment planning, day-care chemo, precision diagnostics, surgery, and structured survivorship care."
    },
    orthopedics: {
        title: "Orthopedics & Joint Care",
        body: "Joint replacement, sports injury care, arthroscopy, and post-surgery physiotherapy are delivered in a coordinated, mobility-first model."
    },
    "mother-child": {
        title: "Mother & Child Health",
        body: "From fertility counseling and high-risk pregnancy support to NICU and pediatric specialty care, we provide complete mother-child continuum under one roof."
    },
    transplants: {
        title: "Liver & Kidney Transplant",
        body: "Multidisciplinary transplant teams manage evaluation, surgery, ICU care, infection monitoring, and long-term follow-ups with transplant coordinators."
    },
    "doctor-rohan": {
        title: "Dr. Rohan Mehta",
        body: "Senior Interventional Cardiologist with over 20 years of experience. Focus areas include complex angioplasty, critical care cardiology, and preventive cardiac programs."
    },
    "doctor-aditi": {
        title: "Dr. Aditi Sharma",
        body: "Consultant Medical Oncologist specializing in targeted therapies and integrated treatment planning for breast, lung, and GI cancers."
    },
    "doctor-vivek": {
        title: "Dr. Vivek Arora",
        body: "Director, Neurosurgery with expertise in skull-base surgery, brain tumor procedures, and minimally invasive spine interventions."
    },
    "doctor-isha": {
        title: "Dr. Isha Kapoor",
        body: "Cardiac Electrophysiologist focused on rhythm disorders, pacemaker implants, and advanced ablation techniques."
    },
    "article-heart": {
        title: "Early Signs of Heart Disease",
        body: "Look out for chest pressure, unusual breathlessness, jaw/arm pain, and extreme fatigue. Immediate assessment is important, especially with risk factors like diabetes or hypertension."
    },
    "article-diabetes": {
        title: "Managing Diabetes Daily",
        body: "Keep glucose logs, follow portion-aware meals, stay physically active, and take medicines as prescribed. Regular eye, kidney, and foot checks reduce complications significantly."
    },
    "article-stroke": {
        title: "Stroke: Golden Hour Response",
        body: "Use FAST: Face droop, Arm weakness, Speech difficulty, Time to call emergency. Rapid hospital arrival can dramatically improve outcomes in stroke care."
    }
};

const modal = document.getElementById("contentModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

function openModal(title, body) {
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
}

function hideModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}

document.querySelectorAll(".read-topic, .read-doctor").forEach((button) => {
    button.addEventListener("click", (event) => {
        const card = event.target.closest("[data-topic]");
        if (!card) return;

        const topicKey = card.dataset.topic;
        const content = topicContent[topicKey];
        if (!content) return;

        openModal(content.title, content.body);
    });
});

closeModal?.addEventListener("click", hideModal);
modal?.addEventListener("click", (event) => {
    if (event.target === modal) hideModal();
});
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideModal();
});

document.querySelectorAll(".action-card").forEach((button) => {
    button.addEventListener("click", () => {
        const target = document.querySelector(button.dataset.target);
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const menuToggle = document.getElementById("menuToggle");
const primaryNav = document.getElementById("primaryNav");
menuToggle?.addEventListener("click", () => {
    primaryNav.classList.toggle("show");
});

document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.doctorFilter;
        document.querySelectorAll(".doctor-card").forEach((card) => {
            const match = filter === "all" || card.dataset.category === filter;
            card.style.display = match ? "block" : "none";
        });
    });
});

const planOutput = document.getElementById("planOutput");
document.querySelectorAll(".select-plan").forEach((button) => {
    button.addEventListener("click", (event) => {
        const card = event.target.closest(".plan-card");
        const planName = card?.querySelector("h3")?.textContent || "Selected package";
        planOutput.textContent = `${planName} selected. Our team will contact you shortly.`;
    });
});

document.querySelectorAll("[data-open-appointment='true']").forEach((button) => {
    button.addEventListener("click", () => {
        document.getElementById("appointment")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

const appointmentForm = document.getElementById("appointmentForm");
appointmentForm?.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("patientName").value.trim();
    const phone = document.getElementById("patientPhone").value.trim();
    const dept = document.getElementById("department").value;
    const date = document.getElementById("appointmentDate").value;
    const time = document.getElementById("appointmentTime").value;
    const message = document.getElementById("appointmentMsg");

    if (!name || !phone || !dept || !date || !time) {
        message.style.color = "#b52323";
        message.textContent = "Please fill all required appointment details.";
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        message.style.color = "#b52323";
        message.textContent = "Enter a valid 10-digit mobile number.";
        return;
    }

    message.style.color = "#0b615f";
    message.textContent = `Appointment request sent for ${name} (${dept}) on ${date} at ${time}.`;
    this.reset();
});

// Contact Form Basic JS
document.getElementById("contactForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const msg = document.getElementById("message").value.trim();
    const output = document.getElementById("formMsg");

    if (name === "" || email === "" || msg === "") {
        output.style.color = "#b52323";
        output.textContent = "Please fill all fields!";
    } else {
        output.style.color = "#0b615f";
        output.textContent = "Message sent! We'll contact you soon.";
        this.reset();
    }
});

const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.style.display = window.scrollY > 500 ? "block" : "none";
});
backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
        question.parentElement.classList.toggle("open");
    });
});