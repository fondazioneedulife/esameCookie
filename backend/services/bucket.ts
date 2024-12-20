import { UserModel, find } from "./user";

/**
 * Verifica se nel cesto ci sono un numero sufficiente di partecipanti
 * Il numero minimo è impostato nelle variabili d'ambiente
 */
export const hasReachedThreshold = async (): Promise<boolean> => {
  const subscriberThreshold = Number(process.env.SUBSCRIBERS_THRESHOLD);
  const subscribers = await UserModel.countDocuments().exec();
  return subscriberThreshold < subscribers;
};

/**
 * Effettua l'estrazione.
 * Se l'utente ha già estratto il suo destinatario
 * ritorna il destinatario estratto in precedenza
 */
export const extract = async (userId) => {
  const currentUser = await find(userId);
  const hasRecipient = currentUser?.get("recipient");

  if (hasRecipient) {
    // already extracted
    const r = await find(hasRecipient);
    return r?.toObject();
  }

  // extract recipient

  // get all users, excluding me
  const subscribers = await UserModel.find({ _id: { $ne: userId } }); // $ne = "not equal"

  // get users already extracted (recipients)
  const alreadyExtracted = subscribers
    .map((subscriber) => subscriber.get("recipient"))
    .filter(Boolean) as string[];

  // find users not yet extracted (subscribers - alreadyExtracted)
  const bucket = subscribers.filter((subscriber) => {
    return !alreadyExtracted.includes(subscriber._id.toString());
  });

  // extract a random user
  const recipient = bucket[Math.floor(Math.random() * bucket.length)];

  if (!recipient) {
    throw new Error("Non è possibile estrarre un destinatario");
  }

  currentUser?.set({ recipient: recipient._id.toString() });
  await currentUser?.save();

  const recipientObject = recipient.toObject();
  const { password, ...filtered } = recipientObject; // remove password
  return filtered;
};