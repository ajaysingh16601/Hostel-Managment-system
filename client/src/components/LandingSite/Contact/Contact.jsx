import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPaperPlane, FaSpinner } from 'react-icons/fa';

function Contact() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.send(
      import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: email,
        message: `Subject: ${subject}, Message: ${message}`,
        to_name: 'Sir',
        reply_to: email,
      },
      import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setIsSending(false);
      setIsSent(true);
      setTimeout(() => {
        setIsSent(false)
        setEmail('')
        setSubject('')
        setMessage('')
      }, 3000);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
      setIsSending(false);
    });
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-white">Contact Us</h2>
        <p className="text-center text-white/80 mb-6">
          If you have any queries or concerns, feel free to reach out.
        </p>

        {isSent && (
          <div className="text-center text-green-300 bg-green-800/30 p-2 rounded-md mb-4">
            🎉 Message Sent Successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/80 font-medium mb-1">Your Email</label>
            <div className="flex items-center bg-white/20 rounded-lg px-3 py-2">
              <FaEnvelope className="text-white/80 mr-2" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent flex-1 text-white placeholder-white/60 outline-none"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white/80 font-medium mb-1">Subject</label>
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/60 p-2 rounded-lg outline-none"
              placeholder="How can we help?"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 font-medium mb-1">Your Message</label>
            <textarea
              name="message"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/60 p-2 rounded-lg outline-none"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2 text-lg font-semibold text-white bg-blue-700 rounded-lg shadow-md hover:opacity-90 transition duration-300 disabled:opacity-50"
            disabled={isSending || isSent}
          >
            {isSending ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
            {isSending ? 'Sending...' : isSent ? 'Sent!' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}

export { Contact };
