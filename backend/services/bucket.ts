import { UserModel, find } from "./user";

/**
 * Verifica se nel cesto ci sono un numero sufficiente di partecipanti.
 * Il numero minimo è impostato nelle variabili d'ambiente.
 */
export const hasReachedThreshold = async (): Promise<boolean> => {
  const subscriberThreshold = Number(process.env.SUBSCRIBERS_THRESHOLD);
  const subscribers = await UserModel.countDocuments().exec();
  return subscribers >= subscriberThreshold;
};

/**
 * Filtra gli utenti escludendo sé stessi e quelli già estratti.
 */
const getAvailableRecipients = async (userId: string): Promise<InstanceType<typeof UserModel>[]> => {
  const subscribers = await UserModel.find({ _id: { $ne: userId } });

  const alreadyExtracted = subscribers
    .map((subscriber) => subscriber.get("recipient"))
    .filter(Boolean) as string[];

  return subscribers.filter((subscriber) => !alreadyExtracted.includes(subscriber._id.toString()));
};

/**
 * Effettua l'estrazione.
 * Se l'utente ha già estratto il suo destinatario,
 * ritorna il destinatario estratto in precedenza.
 */
export const extract = async (userId: string) => {
  const currentUser = await find(userId);
  if (!currentUser) {
    throw new Error("Utente non trovato.");
  }

  // Controlla se l'utente ha già un destinatario
  const hasRecipient = currentUser.get("recipient");
  if (hasRecipient) {
    const recipient = await find(hasRecipient);
    return recipient?.toObject();
  }

  // Ottiene i destinatari disponibili
  const bucket = await getAvailableRecipients(userId);

  if (bucket.length === 0) {
    throw new Error("Non è possibile estrarre un destinatario: nessuno disponibile.");
  }

  // Estrae un destinatario casuale
  const recipient = bucket[Math.floor(Math.random() * bucket.length)];
  if (!recipient) {
    throw new Error("Errore durante l'estrazione del destinatario.");
  }

  // Salva il destinatario per l'utente corrente
  currentUser.set({ recipient: recipient._id.toString() });
  await currentUser.save();

  // Restituisce i dati del destinatario senza informazioni sensibili
  const recipientObject = recipient.toObject();
  const { password, ...filtered } = recipientObject; // Rimuove la password
  return filtered;
};
