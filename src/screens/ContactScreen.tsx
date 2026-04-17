import React, { useState } from 'react';
import { Mail, Shield, Zap } from 'lucide-react';

export function ContactScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info', text: string } | null>(null);

  const handleSend = async () => {
    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Message content is required.' });
      return;
    }

    setIsSending(true);
    setStatus({ type: 'info', text: 'Establishing secure connection...' });

    try {
      // Simulate Tor secure connection delay for effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus({ type: 'info', text: 'Broadcasting...' });

      // Connect to the actual API from the Kotlin app
      const response = await fetch("https://api.staticforms.dev/submit", {
        method: "POST",
        headers: {
           "Content-Type": "application/json",
           "Accept": "application/json"
        },
        body: JSON.stringify({
          apiKey: "sf_0491b9b3fbb2f4f489b6a319",
          name: email ? email.split('@')[0] : "Anonymous",
          email: email || "no-reply@stellarium.app",
          message: message,
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus({ type: 'success', text: 'Transmission Complete. Secure Message Sent.' });
        setEmail('');
        setMessage('');
      } else {
        setStatus({ type: 'error', text: data.message || 'Secure channel failed.' });
      }
    } catch (err) {
      console.error(err);
      setStatus({ type: 'error', text: 'Connection failed.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-6 items-center">
      <div className="mb-4">
        <Shield size={48} className="text-white opacity-80" />
      </div>
      <h1 className="text-3xl font-normal text-center mt-2 uppercase tracking-wide">
        Secure Comms
      </h1>
      <p className="text-center text-sm text-[var(--color-on-background)] mt-4 max-w-sm leading-relaxed mb-8">
        Send Intelligence or Directives to the Stellarium Foundation. (Routes via secure tunnel)
      </p>

      <div className="w-full max-w-md space-y-4 pb-24">
         <div className="bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Contact Email (Optional)
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-[var(--color-surface-variant)] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors placeholder:text-gray-500"
              placeholder="Leave empty for anonymity"
              disabled={isSending}
            />

            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mt-6 mb-2">
              Intel / Message
            </label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={6}
              className="w-full bg-[var(--color-surface-variant)] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--color-tertiary)] transition-colors resize-none placeholder:text-gray-500"
              placeholder="Enter your transmission..."
              disabled={isSending}
            />

            {status && (
              <div className={`mt-6 p-4 rounded-xl border flex items-start gap-3 ${
                status.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                status.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                'bg-[var(--color-tertiary)]/10 border-[var(--color-tertiary)]/30 text-[var(--color-tertiary)]'
              }`}>
                {status.type === 'info' && <Zap size={18} className="animate-pulse shrink-0 mt-0.5" />}
                <p className="text-sm font-medium">{status.text}</p>
              </div>
            )}

            <button 
              onClick={handleSend}
              disabled={isSending || !message.trim()}
              className="w-full mt-6 bg-[var(--color-tertiary)] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest text-sm hover:bg-[var(--color-tertiary)]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSending ? (
                <>Encrypting...</>
              ) : (
                <>
                  <Mail size={18} /> Broadcast
                </>
              )}
            </button>
         </div>
      </div>
    </div>
  );
}
