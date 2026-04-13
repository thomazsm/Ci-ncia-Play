import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Thermometer, Droplets, Wind, CloudLightning, Sun } from 'lucide-react';

export function WeatherMachine() {
  const [oceanTemp, setOceanTemp] = useState(24); // 20 to 32 C
  const [humidity, setHumidity] = useState(50); // 0 to 100 %
  const [windShear, setWindShear] = useState(50); // 0 to 100 (low is good for hurricane)

  // Hurricane conditions: Temp >= 26.5, Humidity >= 70, Wind Shear <= 30
  const isHurricane = oceanTemp >= 26.5 && humidity >= 70 && windShear <= 30;
  const isStorm = !isHurricane && (oceanTemp >= 25 && humidity >= 60);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-900 rounded-2xl text-white">
      <h2 className="text-3xl font-bold mb-2">Máquina do Clima</h2>
      <p className="mb-8 opacity-80 text-center max-w-2xl">
        Controle as variáveis atmosféricas e oceânicas. Descubra a "receita" exata para a formação de um furacão!
      </p>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl items-center justify-center">
        
        {/* Simulation Area */}
        <div className="relative w-full max-w-2xl h-96 bg-sky-900 rounded-3xl border-4 border-slate-700 overflow-hidden flex flex-col items-center justify-center">
          
          {/* Background Sky */}
          <motion.div 
            className="absolute inset-0 transition-colors duration-1000"
            animate={{ backgroundColor: isHurricane ? '#1e293b' : isStorm ? '#475569' : '#0ea5e9' }} // slate-800, slate-600, sky-500
          />

          {/* Sun */}
          <motion.div 
            className="absolute top-8 right-8 text-yellow-400"
            animate={{ opacity: isHurricane || isStorm ? 0 : 1 }}
          >
            <Sun size={64} className="animate-spin-slow" />
          </motion.div>

          {/* Ocean */}
          <motion.div 
            className="absolute bottom-0 w-full h-32 transition-colors duration-1000 z-10"
            animate={{ backgroundColor: oceanTemp > 28 ? '#0284c7' : '#0369a1' }} // sky-600 vs sky-700
          >
            {/* Waves */}
            <motion.div 
              className="w-full h-4 bg-white/20"
              animate={{ y: isHurricane ? [-5, 5, -5] : [-2, 2, -2] }}
              transition={{ duration: isHurricane ? 0.5 : 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Clouds / Storm */}
          <AnimatePresence>
            {isStorm && !isHurricane && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="absolute top-10 flex gap-4 text-slate-300 z-20"
              >
                <CloudLightning size={80} className="animate-pulse" />
                <CloudLightning size={100} className="animate-pulse delay-75" />
                <CloudLightning size={80} className="animate-pulse delay-150" />
              </motion.div>
            )}

            {isHurricane && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
              >
                {/* Hurricane Vortex */}
                <motion.div 
                  className="w-64 h-64 rounded-full border-[16px] border-slate-300/80 border-t-slate-100/90 border-b-slate-400/80 shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-48 h-48 rounded-full border-[12px] border-slate-300/60 border-l-slate-100/80" />
                  {/* Eye of the storm */}
                  <div className="absolute w-12 h-12 bg-sky-900/80 rounded-full shadow-inner" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rain */}
          {(isStorm || isHurricane) && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
              {Array.from({ length: isHurricane ? 50 : 20 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className="absolute w-1 h-8 bg-blue-200/50 rounded-full"
                  style={{ left: `${Math.random() * 100}%`, top: -20 }}
                  animate={{ y: [0, 400] }}
                  transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity, delay: Math.random() }}
                />
              ))}
            </div>
          )}

        </div>

        {/* Controls */}
        <div className="w-full md:w-80 space-y-6">
          
          {/* Status Panel */}
          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 flex flex-col items-center text-center">
            <h3 className="font-bold text-slate-400 mb-2 uppercase tracking-wider text-sm">Status do Clima</h3>
            {isHurricane ? (
              <div className="text-2xl font-black text-red-500 animate-pulse">FURACÃO FORMADO!</div>
            ) : isStorm ? (
              <div className="text-xl font-bold text-yellow-400">Tempestade Tropical</div>
            ) : (
              <div className="text-xl font-bold text-emerald-400">Tempo Estável</div>
            )}
          </div>

          <div className="bg-black/40 p-6 rounded-2xl border border-white/10 space-y-6">
            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2"><Thermometer size={16} className={oceanTemp >= 26.5 ? 'text-red-400' : 'text-blue-400'}/> Temp. do Oceano</span>
                <span className={oceanTemp >= 26.5 ? 'text-red-400' : 'text-blue-400'}>{oceanTemp}°C</span>
              </label>
              <input 
                type="range" min="20" max="32" step="0.5"
                value={oceanTemp} 
                onChange={e => setOceanTemp(Number(e.target.value))} 
                className="w-full accent-red-500" 
              />
              <p className="text-[10px] text-slate-500 mt-1">Furacões precisam de águas quentes (≥ 26.5°C) como combustível.</p>
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2"><Droplets size={16} className="text-blue-400"/> Umidade do Ar</span>
                <span>{humidity}%</span>
              </label>
              <input 
                type="range" min="30" max="100" 
                value={humidity} 
                onChange={e => setHumidity(Number(e.target.value))} 
                className="w-full accent-blue-500" 
              />
            </div>

            <div>
              <label className="flex justify-between text-sm font-bold text-slate-400 mb-2">
                <span className="flex items-center gap-2"><Wind size={16} className="text-slate-300"/> Cisalhamento do Vento</span>
                <span>{windShear}%</span>
              </label>
              <input 
                type="range" min="0" max="100" 
                value={windShear} 
                onChange={e => setWindShear(Number(e.target.value))} 
                className="w-full accent-slate-400" 
              />
              <p className="text-[10px] text-slate-500 mt-1">Ventos fortes em altitudes altas (cisalhamento alto) "rasgam" o furacão, impedindo sua formação.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
