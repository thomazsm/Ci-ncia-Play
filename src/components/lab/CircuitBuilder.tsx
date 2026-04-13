import { useState } from 'react';
import { motion } from 'framer-motion';
import { Battery, Lightbulb, LightbulbOff, Zap, AlertTriangle } from 'lucide-react';

export function CircuitBuilder() {
  const [isClosed, setIsClosed] = useState(false);
  const [voltage, setVoltage] = useState(5); // 1 to 12
  const [isBroken, setIsBroken] = useState(false);

  const handleVoltageChange = (val: number) => {
    setVoltage(val);
    if (val > 9 && isClosed) {
      setIsBroken(true);
    }
  };

  const toggleSwitch = () => {
    const nextState = !isClosed;
    setIsClosed(nextState);
    if (nextState && voltage > 9) {
      setIsBroken(true);
    }
  };

  const reset = () => {
    setIsClosed(false);
    setVoltage(5);
    setIsBroken(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Laboratório de Circuitos</h2>
      <p className="mb-8 opacity-80 font-medium text-center max-w-2xl">
        Feche o circuito para acender a lâmpada. Cuidado com a voltagem para não queimá-la!
      </p>

      <div className="relative w-full max-w-2xl h-80 bg-slate-800 rounded-3xl border-4 border-slate-700 p-8 flex items-center justify-center mb-8">
        
        {/* Circuit Path */}
        <div className="absolute inset-12 border-4 border-slate-600 rounded-xl z-0" />

        {/* Electrons Flowing */}
        {isClosed && !isBroken && (
          <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
            <rect x="48" y="48" width="calc(100% - 96px)" height="calc(100% - 96px)" fill="none" stroke="#eab308" strokeWidth="4" strokeDasharray="10 10" className="animate-[dash_1s_linear_infinite]" />
          </svg>
        )}

        {/* Components */}
        <div className="absolute inset-0 flex flex-col justify-between py-8 z-10">
          
          {/* Top: Lightbulb */}
          <div className="flex justify-center">
            <div className="bg-slate-800 p-4 rounded-full relative">
              {isBroken ? (
                <div className="relative">
                  <LightbulbOff size={64} className="text-slate-600" />
                  <AlertTriangle size={32} className="text-red-500 absolute -top-2 -right-2" />
                  <motion.div 
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 0.5, 0], y: -20, scale: 1.5 }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-4 left-4 w-8 h-8 bg-slate-400 rounded-full blur-md"
                  />
                </div>
              ) : isClosed ? (
                <motion.div 
                  animate={{ opacity: [0.8, 1, 0.8] }} 
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ filter: `drop-shadow(0 0 ${voltage * 5}px rgba(250, 204, 21, 1))` }}
                >
                  <Lightbulb size={64} className="text-yellow-400" />
                </motion.div>
              ) : (
                <Lightbulb size={64} className="text-slate-600" />
              )}
            </div>
          </div>

          {/* Bottom: Battery and Switch */}
          <div className="flex justify-around items-center px-16">
            {/* Battery */}
            <div className="flex flex-col items-center bg-slate-800 p-2 rounded-xl">
              <Battery size={48} className="text-emerald-500 rotate-90" />
              <span className="font-bold mt-2">{voltage}V</span>
            </div>

            {/* Switch */}
            <button 
              onClick={toggleSwitch}
              className="flex flex-col items-center bg-slate-800 p-4 rounded-xl hover:bg-slate-700 transition-colors"
            >
              <div className="w-16 h-8 bg-slate-900 rounded-full relative flex items-center px-1">
                <motion.div 
                  className={`w-6 h-6 rounded-full ${isClosed ? 'bg-emerald-500' : 'bg-red-500'}`}
                  animate={{ x: isClosed ? 32 : 0 }}
                />
              </div>
              <span className="font-bold mt-2 text-sm uppercase tracking-wider">
                {isClosed ? 'Fechado' : 'Aberto'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="w-full max-w-md bg-black/40 p-6 rounded-2xl border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold flex items-center gap-2"><Zap size={20} className="text-yellow-400"/> Voltagem (Tensão)</span>
          <span className="font-bold">{voltage} V</span>
        </div>
        <input 
          type="range" 
          min="1" max="12" 
          value={voltage} 
          onChange={(e) => handleVoltageChange(Number(e.target.value))}
          className="w-full h-4 bg-slate-700 rounded-full appearance-none outline-none cursor-pointer accent-yellow-500 mb-6"
        />
        
        {isBroken && (
          <button 
            onClick={reset}
            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-colors"
          >
            Trocar Lâmpada Queimada
          </button>
        )}
      </div>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -20; }
        }
      `}</style>
    </div>
  );
}
