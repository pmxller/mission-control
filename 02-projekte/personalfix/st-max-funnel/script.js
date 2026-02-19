const steps = [...document.querySelectorAll('.step')];
const progressBar = document.getElementById('progressBar');
const totalSteps = steps.length;
let currentStep = 1;

const formData = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  zip: ''
};

function showStep(stepNumber) {
  currentStep = Math.min(Math.max(1, stepNumber), totalSteps);
  steps.forEach((step) => {
    const isActive = Number(step.dataset.step) === currentStep;
    step.classList.toggle('active', isActive);
  });

  const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
  progressBar.style.width = `${percent}%`;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goNext() {
  showStep(currentStep + 1);
}

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', goNext);
});

const scrollToDetails = () => {
  document.getElementById('details').scrollIntoView({ behavior: 'smooth', block: 'start' });
};

document.getElementById('moreInfos').addEventListener('click', scrollToDetails);
document.getElementById('moreInfosBottom').addEventListener('click', scrollToDetails);

const formOrder = [
  { key: 'firstName', id: 'firstName', validator: (v) => v.trim().length > 1 },
  { key: 'lastName', id: 'lastName', validator: (v) => v.trim().length > 1 },
  { key: 'phone', id: 'phone', validator: (v) => v.trim().length >= 6 },
  { key: 'email', id: 'email', validator: (v) => /^\S+@\S+\.\S+$/.test(v) },
  { key: 'zip', id: 'zip', validator: (v) => /^\d{4,5}$/.test(v.trim()) }
];

const formNextButtons = [...document.querySelectorAll('[data-form-next]')];
formNextButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const index = currentStep - 4;
    const field = formOrder[index];
    const input = document.getElementById(field.id);
    const value = input.value;

    if (!field.validator(value)) {
      input.focus();
      input.style.borderColor = '#dc2626';
      return;
    }

    input.style.borderColor = '#d8c7aa';
    formData[field.key] = value.trim();
    goNext();
  });
});

document.getElementById('submitApplication').addEventListener('click', () => {
  const field = formOrder[4];
  const input = document.getElementById(field.id);
  const value = input.value;

  if (!field.validator(value)) {
    input.focus();
    input.style.borderColor = '#dc2626';
    return;
  }

  formData[field.key] = value.trim();

  // Platzhalter für spätere EmailJS/Formspree-Integration
  console.log('Neue Bewerbung ST Personal:', formData);

  showStep(9);
});

// Testimonials
const quotes = [...document.querySelectorAll('.quote')];
const dotsContainer = document.getElementById('testimonialDots');
let quoteIndex = 0;

quotes.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
  dot.addEventListener('click', () => setQuote(i));
  dotsContainer.appendChild(dot);
});

const dots = [...dotsContainer.querySelectorAll('button')];

function setQuote(index) {
  quoteIndex = index;
  quotes.forEach((q, i) => q.classList.toggle('active', i === quoteIndex));
  dots.forEach((d, i) => d.classList.toggle('active', i === quoteIndex));
}

setQuote(0);
setInterval(() => setQuote((quoteIndex + 1) % quotes.length), 5000);

showStep(1);
