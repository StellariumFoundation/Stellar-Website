import React, { useState } from 'react';
import { BottomSheet } from '../components/BottomSheet';
import { BANK_DETAILS } from '../data';
import { Landmark, Bitcoin, DollarSign, CreditCard, Copy } from 'lucide-react';

export function SponsorScreen({ onContact }: { onContact?: () => void }) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard');
  };

  const renderContent = () => {
    switch (selectedMethod) {
      case 'bank':
        return (
          <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Bank Transfer</h2>
            <p className="text-sm text-[var(--color-on-surface)] text-center mb-4">
              Please choose the account matching your currency.
            </p>
            <a 
              href="https://www.notion.so/Stellarium-Literature-19fc1c04bbc1801f9243d1fa5d7d44ad?pvs=21" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[var(--color-surface)] border border-white/10 rounded-full text-xs text-[var(--color-tertiary)] font-bold uppercase tracking-wider mb-6 hover:bg-white/5 transition-colors"
            >
              View Stellarium Literature Docs
            </a>
            
            <div className="w-full space-y-4">
              {BANK_DETAILS.map(bank => (
                <div key={bank.id} className="bg-white/5 border border-white/10 rounded-xl p-4 w-full">
                  <h3 className="text-[var(--color-primary)] font-bold mb-1">{bank.title}</h3>
                  <p className="text-[var(--color-secondary)] text-sm mb-4">{bank.bankName}</p>
                  <div className="flex items-start justify-between bg-[var(--color-surface)] p-3 rounded-lg overflow-x-auto">
                     <pre className="text-xs text-[var(--color-on-background)] font-mono flex-1 whitespace-pre-wrap leading-relaxed">{bank.details}</pre>
                     <button 
                       onClick={() => handleCopy(`${bank.bankName}\n${bank.details}`)} 
                       className="ml-4 p-2 text-gray-500 hover:text-[var(--color-tertiary)]"
                     >
                       <Copy size={16} />
                     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'crypto':
        return (
           <div className="flex flex-col items-center w-full">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Cryptocurrency</h2>
            <div className="w-full bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-[var(--color-secondary)] font-bold mb-4">Monero (XMR)</h3>
              <div className="flex items-start justify-between bg-[var(--color-surface)] p-3 rounded-lg">
                  <p className="text-xs text-[var(--color-on-background)] font-mono break-all flex-1">
                    44u8KhinKQ4SgpxwS5jq3cJBMWVsWnMHaGMqYp8abTw3iAJW5izBm9V7uoNVcXAeWS6UqUzVdrn2qAtH4Epd5RkoDJxtRaL
                  </p>
                  <button onClick={() => handleCopy('44u8KhinKQ4SgpxwS5jq3cJBMWVsWnMHaGMqYp8abTw3iAJW5izBm9V7uoNVcXAeWS6UqUzVdrn2qAtH4Epd5RkoDJxtRaL')} className="ml-4 p-2 text-gray-500 hover:text-[var(--color-tertiary)] shrink-0">
                    <Copy size={16} />
                  </button>
              </div>
            </div>
            
            <a 
              href="https://trocador.app/en/anonpay" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 text-center bg-[var(--color-tertiary)] text-black rounded-full font-bold uppercase tracking-wider"
            >
              Pay with Any Crypto (Trocador)
            </a>
          </div>
        );
      case 'patreon':
        return (
          <div className="flex flex-col items-center w-full">
             <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4 text-center">Patreon</h2>
             <p className="text-[var(--color-on-surface)] text-center mb-8">Join our exclusive community on Patreon.</p>
             <a  href="https://www.patreon.com/join/StellariumFoundation" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs py-4 text-center bg-white text-black rounded-full font-bold uppercase tracking-wider">
               Visit Patreon Page
             </a>
          </div>
        );
      case 'paypal':
        return (
           <div className="flex flex-col items-center w-full">
             <h2 className="text-2xl font-bold text-white mb-6 text-center">PayPal</h2>
             <div className="flex w-full items-center justify-between bg-[var(--color-surface)] p-4 rounded-xl border border-white/10 mb-8">
                <span className="text-[var(--color-on-background)] font-mono text-sm">stellar.foundation.us@gmail.com</span>
                <button onClick={() => handleCopy('stellar.foundation.us@gmail.com')} className="text-gray-500 hover:text-[var(--color-tertiary)]"><Copy size={16}/></button>
             </div>
             <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=stellar.foundation.us@gmail.com&currency_code=USD" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs py-4 text-center bg-white text-black rounded-full font-bold uppercase tracking-wider">
               Send via PayPal
             </a>
          </div>
        );
      default: return null;
    }
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto w-full p-6 items-center">
      <h1 className="text-3xl font-normal text-center mt-2">
        Support the Mission
      </h1>

      <div className="w-full max-w-md mt-6">
        <div className="bg-[var(--color-surface)] border border-white/10 rounded-2xl p-6 flex flex-col items-center">
           <h2 className="text-xl font-bold text-[var(--color-secondary)]">Become a Partner</h2>
           <p className="text-sm text-[var(--color-on-surface)] mt-2 text-center leading-relaxed">
            Gain a platform of global cultural relevance to advertise your brand. Support the Stellarium Foundation and align your business with prosperity and peace.
           </p>
           <button onClick={onContact} className="mt-6 px-6 py-2 bg-[var(--color-tertiary)] text-black font-bold uppercase tracking-wider text-xs rounded-full hover:opacity-90 active:scale-95 transition-all">
             Contact for a Deal
           </button>
        </div>
      </div>

      <h2 className="text-sm font-semibold text-gray-400 mt-10 mb-4 uppercase tracking-widest text-center">
        Choose Payment Method
      </h2>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md pb-24">
         <button onClick={() => setSelectedMethod('bank')} className="h-28 bg-[var(--color-surface)] border border-white/5 rounded-2xl flex flex-col justify-center items-center hover:bg-white/5">
            <Landmark size={32} className="text-white mb-3" />
            <span className="text-white font-semibold text-xs tracking-wide">Bank Deposit</span>
         </button>
         <button onClick={() => setSelectedMethod('crypto')} className="h-28 bg-[var(--color-surface)] border border-white/5 rounded-2xl flex flex-col justify-center items-center hover:bg-white/5">
            <Bitcoin size={32} className="text-[var(--color-tertiary)] mb-3" />
            <span className="text-[var(--color-tertiary)] font-semibold text-xs tracking-wide">Crypto</span>
         </button>
         <button onClick={() => setSelectedMethod('patreon')} className="h-28 bg-[var(--color-surface)] border border-white/5 rounded-2xl flex flex-col justify-center items-center hover:bg-white/5">
            <DollarSign size={32} className="text-white mb-3" />
            <span className="text-white font-semibold text-xs tracking-wide">Patreon</span>
         </button>
         <button onClick={() => setSelectedMethod('paypal')} className="h-28 bg-[var(--color-surface)] border border-white/5 rounded-2xl flex flex-col justify-center items-center hover:bg-white/5">
            <CreditCard size={32} className="text-[var(--color-secondary)] mb-3" />
            <span className="text-[var(--color-secondary)] font-semibold text-xs tracking-wide">PayPal</span>
         </button>
      </div>

      <BottomSheet isOpen={selectedMethod !== null} onClose={() => setSelectedMethod(null)}>
         {renderContent()}
      </BottomSheet>
    </div>
  );
}

