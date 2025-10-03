"use client"

import { useState } from "react"

export function MathExplanation() {
  const [activeModel, setActiveModel] = useState<"continuous" | "discrete" | "derivation">("continuous")

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-2xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold mb-4">Fundamentos Matemáticos del Interés Compuesto</h2>
        <p className="text-lg text-red-100 leading-relaxed">
          El interés compuesto es un fenómeno financiero que puede modelarse mediante ecuaciones diferenciales. Este
          modelo matemático nos permite entender cómo crece el capital a lo largo del tiempo cuando los intereses se
          reinvierten continuamente.
        </p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-2xl shadow-lg p-2 border border-gray-200 flex gap-2">
        <button
          onClick={() => setActiveModel("continuous")}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
            activeModel === "continuous" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Modelo Continuo
        </button>
        <button
          onClick={() => setActiveModel("discrete")}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
            activeModel === "discrete" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Modelo Discreto
        </button>
        <button
          onClick={() => setActiveModel("derivation")}
          className={`flex-1 px-6 py-4 rounded-xl font-semibold text-lg transition-all ${
            activeModel === "derivation" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          Derivación Completa
        </button>
      </div>

      {/* Continuous Model */}
      {activeModel === "continuous" && (
        <div className="space-y-6">
          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-300">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Ecuación Diferencial del Interés Compuesto</h3>
            <div className="bg-white rounded-xl p-8 border-2 border-blue-200 mb-6">
              <p className="text-center text-5xl font-bold text-gray-900 mb-4">
                <span className="inline-block">
                  <span className="text-4xl">d</span>P
                </span>
                <span className="mx-3">/</span>
                <span className="inline-block">
                  <span className="text-4xl">d</span>t
                </span>
                <span className="mx-4">=</span>
                <span className="text-[#DC2626]">r</span>P
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-5 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Variable Dependiente</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">P(t)</p>
                <p className="text-sm text-gray-600">Capital en el tiempo t</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Parámetro</p>
                <p className="text-2xl font-bold text-[#DC2626] mb-1">r</p>
                <p className="text-sm text-gray-600">Tasa de interés anual</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-blue-200">
                <p className="text-sm text-gray-600 mb-2">Derivada</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">dP/dt</p>
                <p className="text-sm text-gray-600">Tasa de cambio del capital</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-300">
            <h3 className="text-2xl font-bold text-yellow-900 mb-4">Interpretación Física</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Esta ecuación nos dice que{" "}
              <span className="font-bold text-yellow-900">
                la tasa de cambio del capital es proporcional al capital actual
              </span>
              . En términos simples: mientras más dinero tengas, más rápido crecerá tu inversión. La constante de
              proporcionalidad es la tasa de interés r.
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-900 mb-6">Solución de la Ecuación Diferencial</h3>
            <div className="bg-white rounded-xl p-8 border-2 border-green-200 mb-6">
              <p className="text-center text-5xl font-bold text-gray-900">
                P(t) = P<sub className="text-3xl">0</sub> e<sup className="text-3xl">rt</sup>
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-5 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Condición Inicial</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  P<sub>0</sub>
                </p>
                <p className="text-sm text-gray-600">Capital inicial en t = 0</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Constante Matemática</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">e ≈ 2.71828</p>
                <p className="text-sm text-gray-600">Número de Euler</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-green-200">
                <p className="text-sm text-gray-600 mb-2">Variable Independiente</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">t</p>
                <p className="text-sm text-gray-600">Tiempo en años</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-purple-900 mb-6">Ejemplo Numérico</h3>
            <p className="text-lg text-gray-700 mb-6">
              Con P<sub>0</sub> = $15,000,000, r = 16.5% (0.165), t = 4 años:
            </p>
            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 space-y-4">
              <div className="text-xl font-mono text-gray-900">
                <p className="mb-3">
                  P(4) = 15,000,000 × e<sup>(0.165 × 4)</sup>
                </p>
                <p className="mb-3">
                  P(4) = 15,000,000 × e<sup>0.66</sup>
                </p>
                <p className="mb-3">P(4) = 15,000,000 × 1.9348</p>
                <p className="text-2xl font-bold text-[#DC2626] pt-4 border-t-2 border-purple-200">
                  P(4) ≈ $29,022,000
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discrete Model */}
      {activeModel === "discrete" && (
        <div className="space-y-6">
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-300">
            <h3 className="text-2xl font-bold text-red-900 mb-6">Fórmula Discreta del Interés Compuesto</h3>
            <div className="bg-white rounded-xl p-8 border-2 border-red-200 mb-6">
              <p className="text-center text-4xl font-bold text-gray-900">
                P(t) = P<sub className="text-2xl">0</sub>
                <span className="mx-3">×</span>
                <span className="inline-block">
                  (1 + <span className="text-[#DC2626]">r</span>/<span className="text-blue-600">n</span>)
                  <sup className="text-2xl">nt</sup>
                </span>
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-5 border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Frecuencia</p>
                <p className="text-2xl font-bold text-blue-600 mb-1">n</p>
                <p className="text-sm text-gray-600">Capitalizaciones por año</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Tasa por Período</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">r/n</p>
                <p className="text-sm text-gray-600">Interés por capitalización</p>
              </div>
              <div className="bg-white rounded-lg p-5 border border-red-200">
                <p className="text-sm text-gray-600 mb-2">Períodos Totales</p>
                <p className="text-2xl font-bold text-gray-900 mb-1">nt</p>
                <p className="text-sm text-gray-600">Número de capitalizaciones</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-8 border-2 border-blue-300">
            <h3 className="text-2xl font-bold text-blue-900 mb-6">Frecuencias de Capitalización</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <p className="text-lg font-bold text-gray-900 mb-2">Anual</p>
                <p className="text-3xl font-bold text-blue-600">n = 1</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <p className="text-lg font-bold text-gray-900 mb-2">Semestral</p>
                <p className="text-3xl font-bold text-blue-600">n = 2</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <p className="text-lg font-bold text-gray-900 mb-2">Trimestral</p>
                <p className="text-3xl font-bold text-blue-600">n = 4</p>
              </div>
              <div className="bg-[#DC2626] rounded-xl p-6 border-2 border-red-700 shadow-lg">
                <p className="text-lg font-bold text-white mb-2">Mensual (Bancos)</p>
                <p className="text-3xl font-bold text-white">n = 12</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-900 mb-6">Ejemplo Bancario Real</h3>
            <p className="text-lg text-gray-700 mb-6">
              Davivienda: P<sub>0</sub> = $15,000,000, r = 16.5%, n = 12, t = 4 años
            </p>
            <div className="bg-white rounded-xl p-6 border-2 border-green-200 space-y-4">
              <div className="text-xl font-mono text-gray-900">
                <p className="mb-3">
                  P(4) = 15,000,000 × (1 + 0.165/12)<sup>(12×4)</sup>
                </p>
                <p className="mb-3">
                  P(4) = 15,000,000 × (1.01375)<sup>48</sup>
                </p>
                <p className="mb-3">P(4) = 15,000,000 × 1.9261</p>
                <p className="text-2xl font-bold text-[#DC2626] pt-4 border-t-2 border-green-200">P(4) = $28,891,686</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-300">
            <h3 className="text-2xl font-bold text-yellow-900 mb-6">Relación con el Modelo Continuo</h3>
            <p className="text-lg text-gray-700 mb-6">
              Cuando el número de capitalizaciones tiende a infinito, el modelo discreto converge al continuo:
            </p>
            <div className="bg-white rounded-xl p-8 border-2 border-yellow-200">
              <p className="text-center text-3xl font-bold text-gray-900">
                lim<sub className="text-xl">n→∞</sub>
                <span className="mx-3">
                  (1 + r/n)<sup>nt</sup>
                </span>
                <span className="mx-4">=</span>
                <span className="text-[#DC2626]">
                  e<sup>rt</sup>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Derivation */}
      {activeModel === "derivation" && (
        <div className="space-y-6">
          <div className="bg-indigo-50 rounded-2xl p-8 border-2 border-indigo-300">
            <h3 className="text-2xl font-bold text-indigo-900 mb-4">Paso 1: Planteamiento</h3>
            <div className="bg-white rounded-xl p-8 border-2 border-indigo-200">
              <p className="text-center text-4xl font-bold text-gray-900">
                <span className="inline-block">dP</span>
                <span className="mx-2">/</span>
                <span className="inline-block">dt</span>
                <span className="mx-3">=</span>
                <span className="text-[#DC2626]">r</span>P
              </p>
            </div>
          </div>

          <div className="bg-purple-50 rounded-2xl p-8 border-2 border-purple-300">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Paso 2: Separación de Variables</h3>
            <p className="text-lg text-gray-700 mb-6">Dividimos ambos lados por P y multiplicamos por dt:</p>
            <div className="bg-white rounded-xl p-8 border-2 border-purple-200">
              <p className="text-center text-4xl font-bold text-gray-900">
                <span className="inline-block">dP</span>
                <span className="mx-2">/</span>
                <span className="inline-block">P</span>
                <span className="mx-4">=</span>
                <span className="text-[#DC2626]">r</span>
                <span className="mx-2">dt</span>
              </p>
            </div>
          </div>

          <div className="bg-pink-50 rounded-2xl p-8 border-2 border-pink-300">
            <h3 className="text-2xl font-bold text-pink-900 mb-4">Paso 3: Integración</h3>
            <p className="text-lg text-gray-700 mb-6">Integramos ambos lados:</p>
            <div className="bg-white rounded-xl p-8 border-2 border-pink-200 space-y-6">
              <p className="text-center text-3xl font-bold text-gray-900">
                ∫ <span className="inline-block">dP/P</span> = ∫ <span className="text-[#DC2626]">r</span> dt
              </p>
              <p className="text-center text-3xl font-bold text-gray-900">
                ln|P| = <span className="text-[#DC2626]">r</span>t + C
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">Donde C es la constante de integración</p>
          </div>

          <div className="bg-orange-50 rounded-2xl p-8 border-2 border-orange-300">
            <h3 className="text-2xl font-bold text-orange-900 mb-4">Paso 4: Aplicar Exponencial</h3>
            <p className="text-lg text-gray-700 mb-6">
              Aplicamos e<sup>x</sup> a ambos lados:
            </p>
            <div className="bg-white rounded-xl p-8 border-2 border-orange-200 space-y-6">
              <p className="text-center text-3xl font-bold text-gray-900">
                e<sup>ln|P|</sup> = e<sup>rt + C</sup>
              </p>
              <p className="text-center text-3xl font-bold text-gray-900">
                P = e<sup>C</sup> · e<sup>rt</sup>
              </p>
              <p className="text-center text-3xl font-bold text-gray-900">
                P = A · e<sup>rt</sup>
              </p>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Donde A = e<sup>C</sup> es una constante
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-300">
            <h3 className="text-2xl font-bold text-green-900 mb-4">Paso 5: Condición Inicial</h3>
            <p className="text-lg text-gray-700 mb-6">
              Aplicamos la condición inicial P(0) = P<sub>0</sub>:
            </p>
            <div className="bg-white rounded-xl p-8 border-2 border-green-200 space-y-6">
              <p className="text-center text-3xl font-bold text-gray-900">
                P<sub>0</sub> = A · e<sup>0</sup> = A
              </p>
              <p className="text-center text-2xl text-gray-600">
                Por lo tanto, A = P<sub>0</sub>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-2xl p-8 border-2 border-red-700 shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-6">Solución Final</h3>
            <div className="bg-white rounded-xl p-10 border-2 border-red-300">
              <p className="text-center text-5xl font-bold text-gray-900">
                P(t) = P<sub className="text-3xl">0</sub> e<sup className="text-3xl">rt</sup>
              </p>
            </div>
            <p className="text-lg text-red-100 mt-6 text-center">
              Esta es la fórmula del interés compuesto continuo, solución de la ecuación diferencial dP/dt = rP
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
