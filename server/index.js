const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const accountSid = 'AC685fe72a7814dd762994667cbc132d82';
const authToken = '5b8ca8b1b6c0fb4354022674d908d85f';
const client = new twilio(accountSid, authToken);


app.get("/",(req,res) => {
  console.log("hello")
  res.send({
    message:"hello"
  })
})

app.post('/send-sms', (req, res) => {
  const { body, to } = req.body;
  console.log(body, to)

  client.messages.create({
    body,
    to, // the phone number you want to send the SMS to
    from: '+13132468106' // a valid Twilio number
  })
  .then((message) => {
    console.log(message.sid);
    res.send({ success: true });
  })
  .catch((error) => {
    console.error(error);
    res.send({ success: false });
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
