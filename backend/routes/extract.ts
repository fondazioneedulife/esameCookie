const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Modello Mongoose per i destinatari
const RecipientSchema = new mongoose.Schema({
  name: String,
  extractedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
});

const Recipient = mongoose.model('Recipient', RecipientSchema);

// Modello Mongoose per gli utenti
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

const User = mongoose.model('User', UserSchema);

// Configurazione Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connettiti a MongoDB
mongoose.connect('mongodb://localhost:27017/secretsanta', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Endpoint POST /extract
app.post('/extract', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Trova un destinatario già estratto da questo utente
    let recipient = await Recipient.findOne({ extractedBy: userId });

    if (!recipient) {
      // Trova un destinatario non ancora estratto
      recipient = await Recipient.findOneAndUpdate(
        { extractedBy: null },
        { extractedBy: userId },
        { new: true }
      );

      if (!recipient) {
        return res.status(404).json({ message: 'Nessun destinatario disponibile' });
      }
    }

    res.json({ recipient });
  } catch (error) {
    res.status(500).json({ message: 'Errore interno del server', error });
  }
});

// Endpoint GET /recipient
app.get('/recipient', async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Trova il destinatario estratto dall'utente
    const recipient = await Recipient.findOne({ extractedBy: userId });

    if (!recipient) {
      return res.status(404).json({ message: 'Nessun destinatario trovato' });
    }

    res.json({ recipient });
  } catch (error) {
    res.status(500).json({ message: 'Errore interno del server', error });
  }
});

// Avvia il server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:3000`);
});


