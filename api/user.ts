export type User = {
  /**
   * Id generata dal database
   */
  _id: string;

  /**
   * Nome
   */
  first_name: string;

  /**
   * Cognome
   */
  last_name: string;

  /**
   * Email, utilizzata per l'autenticazione
   */
  email: string;

  /**
   * Password, usata per l'autenticazione
   * La password è criptata
   */
  password: string;

  /**
   * Destinatario del regalo
   */
  recipient: string;

  /**
   * Data di registrazione
   */
  created_at: string;

  /**
   * Ultima modifica
   */
  updated_at: string;
};
