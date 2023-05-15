// aktuell noch zum spielen und funktionen testen rund um die verschlüsselung
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CreateDataEntry = () => {
  const { t } = useTranslation(['main']);
  const [category, setCategory] = useState(null);
  const [favourite, setFavourite] = useState(false);
  const [subject, setSubject] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [url, setUrl] = useState(null);
  const [comment, setComment] = useState(null);
  const [note, setNote] = useState(null);
  const [pin, setPin] = useState(null);
  const [cardnumber, setCardnumber] = useState(null);
  const [expirationdate, setExpirationdate] = useState(null);
  const [owner, setOwner] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [cardtype, setCardtype] = useState(null);
  const [numFields, setNumFields] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    console.log(
      category,
      favourite,
      subject,
      username,
      password,
      url,
      comment,
      note,
      pin,
      cardnumber,
      expirationdate,
      owner,
      cvv,
      cardtype
    );
  };

  const handleAddField = () => {
    setNumFields(numFields + 1);
  };

  const removeField = (i) => {
    console.log(i);
  };

  const renderFields = () => {
    const fields = [];
    for (let i = 0; i < numFields; i++) {
      fields.push(
        <>
          <input
            key={`title-${i}`}
            type="text"
            name={`title-${i}`}
            placeholder={`title ${i}`}
          />

          <input
            key={i}
            type="text"
            name={`field-${i}`}
            // value={[`field-${i}`] || ''}
            placeholder={`Field ${i}`}
          />

          <button type="button" onClick={() => removeField(i)}>
            Remove
          </button>
        </>
      );
    }
    return fields;
  };

  return (
    <>
      <select
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="login">{t('login')}</option>
        <option value="safenote">{t('safenotes')}</option>
        <option value="payment card">{t('paymentcards')} </option>
      </select>

      <form onSubmit={handleSubmit}>
        {/* form-elements for login */}
        {category === 'login' && (
          <fieldset>
            <label htmlFor="favourite">{t('favourite')}</label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={favourite}
              placeholder={t('favourite')}
              onChange={(e) => setFavourite(e.target.value)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="text"
              id="username"
              name="username"
              required
              placeholder={t('username')}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder={t('password')}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="url"
              id="url"
              name="url"
              placeholder={t('url')}
              onChange={(e) => setUrl(e.target.value)}
            />
            {renderFields()}
            <button type="button" onClick={handleAddField}>
              Add Field
            </button>

            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              onChange={(e) => setComment(e.target.value)}
            />
          </fieldset>
        )}

        {/* form-elements for safenotes */}
        {category === 'safenote' && (
          <fieldset>
            <label htmlFor="favourite">{t('favourite')}</label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={favourite}
              placeholder={t('favourite')}
              onChange={(e) => setFavourite(e.target.value)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              onChange={(e) => setSubject(e.target.value)}
            />

            <input
              type="note"
              id="note"
              name="note"
              placeholder={t('note')}
              onChange={(e) => setNote(e.target.value)}
            />

            <input
              type="text"
              id="comment"
              name="comment"
              placeholder={t('comment')}
              onChange={(e) => setComment(e.target.value)}
            />
          </fieldset>
        )}
        {category === 'payment card' && (
          <fieldset>
            <label htmlFor="favourite">{t('favourite')}</label>
            <input
              type="checkbox"
              id="favourite"
              name="favourite"
              value={favourite}
              placeholder={t('favourite')}
              onChange={(e) => setFavourite(e.target.value)}
            />
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder={t('subject')}
              onChange={(e) => setSubject(e.target.value)}
            />

            <select
              name="cardtype"
              id="cardtype"
              onChange={(e) => setCardtype(e.target.value)}
            >
              <option value="visa">{t('visa')}</option>
              <option value="master">{t('master')}</option>
              <option value="credit">{t('credit')} </option>
              <option value="giro">{t('giro')} </option>
            </select>

            <input
              type="text"
              id="owner"
              name="owner"
              required
              placeholder={t('owner')}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="number"
              id="number"
              name="number"
              required
              placeholder={t('cardnumber')}
              onChange={(e) => setCardnumber(e.target.value)}
            />
            <input
              type="date"
              id="expirationdate"
              name="expirationdate"
              placeholder={t('expirationdate')}
              onChange={(e) => setExpirationdate(e.target.value)}
            />

            <input
              type="password"
              id="pin"
              name="pin"
              placeholder={t('pin')}
              onChange={(e) => setPin(e.target.value)}
            />
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder={t('cvv')}
              onChange={(e) => setCvv(e.target.value)}
            />
          </fieldset>
        )}

        <button type="submit"> {t('submit')}</button>
      </form>
    </>
  );
};
export default CreateDataEntry;
