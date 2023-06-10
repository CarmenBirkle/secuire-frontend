import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import bcrypt from 'bcryptjs';

const Signup = () => {
  const { t } = useTranslation(['common', 'signup']);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [agbAcceptedAt, setAGBAcceptedAt] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState('1');

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError(false);
  
   
    if (password !== confirmPassword) {
      setError(true);
      return;
    }

    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
//TODO console log entfernen
      console.log('username ', username);
      console.log('email: ', email);
      console.log('password: ', password);
      console.log('salt: ', salt);
      console.log('confirm password: ', confirmPassword);
      console.log('hashed password: ', hashedPassword);
      console.log('agb accepted at: ', agbAcceptedAt);
      console.log('selected question: ', selectedQuestion);
      console.log('answer: ', answer);

      const userData = {
        username: username,
        hashedPassword: hashedPassword,
        question: selectedQuestion,
        answer: answer,
        salt: salt,
        agbAcceptedAt: agbAcceptedAt,
      };
      console.log('userData: ', userData);
      // sendToBackend(userData);
      } catch (error) {
      console.error('Fehler bei der Salzgenerierung und dem Hashen:', error);
    }
    
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      const currentDatetime = new Date();
      // TODO console log entfernen
      console.log('currentDatetime: ', currentDatetime);
      setAGBAcceptedAt(currentDatetime);
    } else {
      setAGBAcceptedAt(null);
    }
  };

  const handleQuestionChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedQuestion(selectedValue);
  };

  return (
    <>
      <h1>{t('common:signup')}</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="">{t('signup:username')}:</label>
          <input
            type="text"
            id="signup-username"
            name="signup-username"
            required
            placeholder={t('signup:username')}
            onChange={(e) => setUsername(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="signup-email">{t('signup:email')}:</label>
          <input
            type="email"
            id="signup-email"
            name="signup-email"
            required
            placeholder={t('signup:email')}
            onChange={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">{t('signup:password')}:</label>
          <input
            type="password"
            id="signup-password"
            name="signup-password"
            required
            placeholder={t('signup:Password')}
            onChange={(e) => setPassword(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="">{t('signup:confirmPassword')}:</label>
          <input
            type="password"
            id="pwCheck"
            name="pwCheck"
            required
            placeholder={t('signup:confirmPassword')}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={error ? 'errorField' : ''}
          />
        </fieldset>
        {error && <p className="errorMessage">{t('signup:passwordError')}</p>}
        <p>{t('signup:information')}</p>

        <fieldset className="question">
          <select value={selectedQuestion} onChange={handleQuestionChange}>
            {/* TODO what question to offer?, translation, translate  */}

            <option value="1">Wie ist der Mädchenname Deiner Mutter</option>
            <option value="2">Wie ist Dein Spitzname</option>
          </select>
          <input
            type="text"
            name="signup-answer"
            required
            id="signup-answer"
            placeholder={t('signup:answer')}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </fieldset>
        <div id="agbCheck">
          <input
            type="checkbox"
            required
            name="agb"
            id="agb"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="agb">{t('signup:agb')}:</label>
          {/* TODO link to AGBs */}
        </div>
        <input
          className="submitButton"
          type="submit"
          value={t('common:signup')}
        />
      </form>
    </>
  );
};
export default Signup;
