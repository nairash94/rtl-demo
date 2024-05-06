import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {I18nManager} from 'react-native';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      English: 'English',
      Arabic: 'Arabic',
      login_header: 'Demo App',
      login_title: 'Enter your credentials',
      email_label: 'User Email',
      email_placeholder: 'Enter your email',
      pwd_label: 'User Password',
      pwd_placeholder: 'Enter your password',
      Ok_text: 'Ok',
      Dashboard: 'Dashboard',
      cred_required: 'Both Email Id/password is required to login',
      email_invalid: 'Please enter a valid email Id',
      password_poilcy:
        'Password must be 8 to 15 characters long, with at least 1 uppercase letter and 1 special character',
      password_max_length: 'The password length should be between 8-15',
    },
  },
  ar: {
    translation: {
      English: 'الإنجليزية',
      Arabic: 'العربية',
      login_header: 'تطبيق العرض التوضيحي',
      login_title: 'أدخل بياناتك',
      email_label: 'بريد المستخدم',
      email_placeholder: 'أدخل بريدك الإلكتروني',
      pwd_label: 'كلمة المرور',
      pwd_placeholder: 'أدخل كلمة المرور',
      Ok_text: 'موافق',
      Dashboard: 'لوحة القيادة',
      cred_required:
        'كل من البريد الإلكتروني وكلمة المرور مطلوبان لتسجيل الدخول.',
      email_invalid: 'الرجاء إدخال بريد إلكتروني صالح.',
      password_poilcy:
        'يجب أن تكون كلمة المرور مكونة من 8 إلى 15 حرفًا، مع وجود حرف كبير وحرف خاص واحد على الأقل.',
      password_max_length: 'يجب أن تكون طول كلمة المرور بين 8 و 15 حرفًا.',
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng: I18nManager.isRTL ? 'ar' : 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
