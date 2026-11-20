import Script from 'next/script';
import SurgicalSubdomainHeader from './SurgicalSubdomainHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './sass/style.scss';

export const metadata = {
  metadataBase: new URL('https://soisurgicalcentre.seedsofinnocens.com'),
  title: 'Seeds of Innocence Surgical Centre | Advanced Laparoscopic & Hysteroscopic Surgery',
  description:
    'Seeds of Innocence (SOI) Surgical Centre offers state-of-the-art laparoscopic and hysteroscopic procedures for fibroids, polyps, endometriosis, and fertility preservation in Delhi NCR.',
  alternates: {
    canonical: 'https://soisurgicalcentre.seedsofinnocens.com/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Seeds of Innocence" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="preload"
          href="/fonts/lemon-milk/LemonMilkMedium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/lemon-milk/LemonMilkBold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <Script id="phone-input-limit" strategy="afterInteractive">
          {`(function () {
  var phoneFields = ['phone', 'mobile', 'contact', 'contactno', 'contact_no', 'contactnumber'];
  var phoneLengthErrorMessage = 'Phone number must be exactly 10 digits.';
  var internationalPhoneErrorMessage = 'Enter a valid international phone number with country code.';
  var phoneStartErrorMessage = 'Invalid number';

  function isPhoneInput(target) {
    if (!(target instanceof HTMLInputElement)) return false;
    var name = (target.getAttribute('name') || '').toLowerCase();
    return phoneFields.indexOf(name) !== -1 || target.type === 'tel';
  }

  function getOrCreateErrorEl(input) {
    var next = input.nextElementSibling;
    if (next && next.getAttribute('data-phone-error') === 'true') return next;

    var errorEl = document.createElement('div');
    errorEl.setAttribute('data-phone-error', 'true');
    errorEl.style.color = '#c33';
    errorEl.style.fontSize = '12px';
    errorEl.style.marginTop = '6px';
    errorEl.style.display = 'none';
    input.insertAdjacentElement('afterend', errorEl);
    return errorEl;
  }

  function allowsInternationalPhone(input) {
    return input.hasAttribute('data-allow-international-phone');
  }

  function syncPhoneError(input) {
    var errorEl = getOrCreateErrorEl(input);
    var digits = input.value.replace(/\\D/g, '');
    var errorMessage = '';
    if (allowsInternationalPhone(input)) {
      if (digits.length > 0 && !/^[1-9]\\d{6,14}$/.test(digits)) {
        errorMessage = internationalPhoneErrorMessage;
      }
    } else if (digits.length > 0 && !/^[6-9]/.test(digits)) {
      errorMessage = phoneStartErrorMessage;
    } else if (digits.length > 0 && digits.length !== 10) {
      errorMessage = phoneLengthErrorMessage;
    }
    errorEl.textContent = errorMessage;
    var shouldShow = errorMessage !== '';
    errorEl.style.display = shouldShow ? 'block' : 'none';
    return shouldShow;
  }

  document.addEventListener('input', function (event) {
    var target = event.target;
    if (!isPhoneInput(target)) return;

    if (allowsInternationalPhone(target)) {
      target.maxLength = 16;
      target.inputMode = 'tel';
      target.setAttribute('pattern', '\\+?[0-9]{7,15}');

      var internationalDigits = target.value.replace(/\\D/g, '').slice(0, 15);
      var internationalValue = (target.value.charAt(0) === '+' ? '+' : '') + internationalDigits;
      if (target.value !== internationalValue) {
        target.value = internationalValue;
      }

      syncPhoneError(target);
      return;
    }

    target.maxLength = 10;
    target.inputMode = 'numeric';
    target.setAttribute('pattern', '[6-9][0-9]{9}');

    var digits = target.value.replace(/\\D/g, '').slice(0, 10);
    if (target.value !== digits) {
      target.value = digits;
    }

    syncPhoneError(target);
  });

  document.addEventListener('blur', function (event) {
    var target = event.target;
    if (!isPhoneInput(target)) return;
    syncPhoneError(target);
  }, true);

  document.addEventListener('submit', function (event) {
    var form = event.target;
    if (!(form instanceof HTMLFormElement)) return;

    var phoneInputs = form.querySelectorAll('input[type="tel"], input[name="phone"], input[name="mobile"], input[name="contact"], input[name="contactNo"], input[name="contact_no"], input[name="contactNumber"]');
    var firstInvalid = null;

    for (var i = 0; i < phoneInputs.length; i += 1) {
      var input = phoneInputs[i];
      if (!(input instanceof HTMLInputElement)) continue;
      var hasError = syncPhoneError(input);
      if (hasError && !firstInvalid) {
        firstInvalid = input;
      }
    }

    if (firstInvalid) {
      event.preventDefault();
      firstInvalid.focus();
    }
  });
})();`}
        </Script>
      </head>
      <body>
        <div className="subdomain-page-area">
          <SurgicalSubdomainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
