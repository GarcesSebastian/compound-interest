"use client"

import { useState } from "react"
import { BlockMath, InlineMath } from "@/components/math-renderer"

type ModelType = "continuous" | "discrete" | "derivation" | "contributions" | "variableRates" | "variableWithContributions"

export function MathExplanation() {
  const [activeModel, setActiveModel] = useState<ModelType>("continuous")

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Introduction */}
      <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Fundamentos Matemáticos del Interés Compuesto</h2>
        <p className="text-sm sm:text-base md:text-lg text-red-100 leading-relaxed">
          El interés compuesto es un fenómeno financiero que puede modelarse mediante ecuaciones diferenciales. Este
          modelo matemático nos permite entender cómo crece el capital a lo largo del tiempo cuando los intereses se
          reinvierten continuamente.
        </p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-1.5 sm:p-2 border border-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveModel("continuous")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeModel === "continuous" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Modelo Continuo
          </button>
          <button
            onClick={() => setActiveModel("discrete")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeModel === "discrete" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Modelo Discreto
          </button>
          <button
            onClick={() => setActiveModel("derivation")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeModel === "derivation" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Derivación
          </button>
          <button
            onClick={() => setActiveModel("contributions")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeModel === "contributions" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Con Aportes
          </button>
          <button
            onClick={() => setActiveModel("variableRates")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeModel === "variableRates" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tasas Variables
          </button>
          <button
            onClick={() => setActiveModel("variableWithContributions")}
            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all ${
              activeModel === "variableWithContributions" ? "bg-[#DC2626] text-white shadow-lg" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Tasas Var. + Aportes
          </button>
        </div>
      </div>

      {/* Continuous Model */}
      {activeModel === "continuous" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-blue-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Ecuación Diferencial del Interés Compuesto</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-blue-200 mb-4 sm:mb-6">
              <BlockMath>{"\\frac{dP}{dt} = rP"}</BlockMath>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Variable Dependiente</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">P(t)</p>
                <p className="text-xs sm:text-sm text-gray-600">Capital en el tiempo t</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Parámetro</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#DC2626] mb-1">r</p>
                <p className="text-xs sm:text-sm text-gray-600">Tasa de interés anual</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-blue-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Derivada</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">dP/dt</p>
                <p className="text-xs sm:text-sm text-gray-600">Tasa de cambio del capital</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-900 mb-3 sm:mb-4">Interpretación Física</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Esta ecuación nos dice que{" "}
              <span className="font-bold text-yellow-900">
                la tasa de cambio del capital es proporcional al capital actual
              </span>
              . En términos simples: mientras más dinero tengas, más rápido crecerá tu inversión. La constante de
              proporcionalidad es la tasa de interés r.
            </p>
          </div>

          <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-4 sm:mb-6">Solución de la Ecuación Diferencial</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-green-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 e^{rt}"}</BlockMath>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-green-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Condición Inicial</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  P<sub>0</sub>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Capital inicial en t = 0</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-green-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Constante Matemática</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">e ≈ 2.71828</p>
                <p className="text-xs sm:text-sm text-gray-600">Número de Euler</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-green-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Variable Independiente</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">t</p>
                <p className="text-xs sm:text-sm text-gray-600">Tiempo en años</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900 mb-4 sm:mb-6">Ejemplo Numérico</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Con <InlineMath>{"P_0 = \\$15{,}000{,}000"}</InlineMath>, <InlineMath>{"r = 16.5\\% = 0.165"}</InlineMath>, <InlineMath>{"t = 4"}</InlineMath> años:
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-purple-200 space-y-3 sm:space-y-4">
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times e^{(0.165 \\times 4)}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times e^{0.66}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times 1.9348"}</BlockMath>
              <div className="pt-4 border-t-2 border-purple-200">
                <BlockMath>{"P(4) \\approx \\$29{,}022{,}000"}</BlockMath>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discrete Model */}
      {activeModel === "discrete" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-red-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-red-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-red-900 mb-4 sm:mb-6">Fórmula Discreta del Interés Compuesto</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-red-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 \\left(1 + \\frac{r}{n}\\right)^{nt}"}</BlockMath>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-l-4 border-blue-500">
              <h4 className="font-bold text-blue-900 mb-3 text-sm sm:text-base">📖 Diccionario de Variables:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div><InlineMath>{"P(t)"}</InlineMath> = Capital en el tiempo <InlineMath>{"t"}</InlineMath></div>
                <div><InlineMath>{"P_0"}</InlineMath> = Capital inicial en <InlineMath>{"t=0"}</InlineMath></div>
                <div><InlineMath>{"r"}</InlineMath> = Tasa de interés anual (como decimal)</div>
                <div><InlineMath>{"n"}</InlineMath> = Número de capitalizaciones por año</div>
                <div><InlineMath>{"t"}</InlineMath> = Tiempo en años</div>
                <div><InlineMath>{"nt"}</InlineMath> = Total de períodos de capitalización</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-red-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Frecuencia</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600 mb-1">n</p>
                <p className="text-xs sm:text-sm text-gray-600">Capitalizaciones por año</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-red-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Tasa por Período</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">r/n</p>
                <p className="text-xs sm:text-sm text-gray-600">Interés por capitalización</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-red-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Períodos Totales</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">nt</p>
                <p className="text-xs sm:text-sm text-gray-600">Número de capitalizaciones</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-blue-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-900 mb-4 sm:mb-6">Frecuencias de Capitalización</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-blue-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Anual</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">n = 1</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-blue-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Semestral</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">n = 2</p>
              </div>
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-blue-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Trimestral</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">n = 4</p>
              </div>
              <div className="bg-[#DC2626] rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border-2 border-red-700 shadow-lg col-span-2 lg:col-span-1">
                <p className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2">Mensual (Bancos)</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">n = 12</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-4 sm:mb-6">Ejemplo Bancario Real</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Davivienda: <InlineMath>{"P_0 = \\$15{,}000{,}000"}</InlineMath>, <InlineMath>{"r = 16.5\\%"}</InlineMath>, <InlineMath>{"n = 12"}</InlineMath>, <InlineMath>{"t = 4"}</InlineMath> años
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-green-200 space-y-3 sm:space-y-4">
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times \\left(1 + \\frac{0.165}{12}\\right)^{12 \\times 4}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times (1.01375)^{48}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times 1.9261"}</BlockMath>
              <div className="pt-4 border-t-2 border-green-200">
                <BlockMath>{"P(4) = \\$28{,}891{,}686"}</BlockMath>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-yellow-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-900 mb-4 sm:mb-6">Relación con el Modelo Continuo</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Cuando el número de capitalizaciones tiende a infinito, el modelo discreto converge al continuo:
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-yellow-200">
              <BlockMath>{"\\lim_{n \\to \\infty} \\left(1 + \\frac{r}{n}\\right)^{nt} = e^{rt}"}</BlockMath>
            </div>
          </div>
        </div>
      )}

      {/* Derivation */}
      {activeModel === "derivation" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-indigo-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-900 mb-3 sm:mb-4">Paso 1: Planteamiento</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-indigo-200">
              <BlockMath>{"\\frac{dP}{dt} = rP"}</BlockMath>
            </div>
          </div>

          <div className="bg-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-purple-900 mb-3 sm:mb-4">Paso 2: Separación de Variables</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">Dividimos ambos lados por P y multiplicamos por dt:</p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-purple-200">
              <BlockMath>{"\\frac{dP}{P} = r \\, dt"}</BlockMath>
            </div>
          </div>

          <div className="bg-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-pink-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-pink-900 mb-3 sm:mb-4">Paso 3: Integración</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">Integramos ambos lados:</p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-pink-200 space-y-4 sm:space-y-6">
              <BlockMath>{"\\int \\frac{dP}{P} = \\int r \\, dt"}</BlockMath>
              <BlockMath>{"\\ln|P| = rt + C"}</BlockMath>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">Donde C es la constante de integración</p>
          </div>

          <div className="bg-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-orange-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 mb-3 sm:mb-4">Paso 4: Aplicar Exponencial</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Aplicamos <InlineMath>{"e^x"}</InlineMath> a ambos lados:
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-orange-200 space-y-4 sm:space-y-6">
              <BlockMath>{"e^{\\ln|P|} = e^{rt + C}"}</BlockMath>
              <BlockMath>{"P = e^C \\cdot e^{rt}"}</BlockMath>
              <BlockMath>{"P = A \\cdot e^{rt}"}</BlockMath>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
              Donde <InlineMath>{"A = e^C"}</InlineMath> es una constante
            </p>
          </div>

          <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-3 sm:mb-4">Paso 5: Condición Inicial</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Aplicamos la condición inicial <InlineMath>{"P(0) = P_0"}</InlineMath>:
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-green-200 space-y-4 sm:space-y-6">
              <BlockMath>{"P_0 = A \\cdot e^0 = A"}</BlockMath>
              <p className="text-center text-base sm:text-lg md:text-2xl text-gray-600">
                Por lo tanto, <InlineMath>{"A = P_0"}</InlineMath>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-red-700 shadow-2xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Solución Final</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 md:p-10 border-2 border-red-300">
              <BlockMath>{"P(t) = P_0 e^{rt}"}</BlockMath>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-red-100 mt-4 sm:mt-6 text-center">
              Esta es la fórmula del interés compuesto continuo, solución de la ecuación diferencial <InlineMath>{"\\frac{dP}{dt} = rP"}</InlineMath>
            </p>
          </div>
        </div>
      )}

      {/* Contributions Model */}
      {activeModel === "contributions" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-cyan-900 mb-4 sm:mb-6">Modelo Discreto con Aportes Regulares</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0\\left(1 + \\frac{r}{n}\\right)^{nt} + A \\times \\frac{\\left(1 + \\frac{r}{n}\\right)^{nt} - 1}{\\frac{r}{n}}"}</BlockMath>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-l-4 border-cyan-500">
              <h4 className="font-bold text-cyan-900 mb-3 text-sm sm:text-base">📖 Diccionario de Variables:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div><InlineMath>{"P_0"}</InlineMath> = Capital inicial</div>
                <div><InlineMath>{"r"}</InlineMath> = Tasa de interés anual</div>
                <div><InlineMath>{"n"}</InlineMath> = Capitalizaciones por año</div>
                <div><InlineMath>{"t"}</InlineMath> = Tiempo en años</div>
                <div><InlineMath>{"A"}</InlineMath> = Aporte periódico (cada 1/n años)</div>
                <div>Segundo término = Valor futuro de todos los aportes</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-cyan-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Primer Término</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">P<sub>0</sub>(1 + r/n)<sup>nt</sup></p>
                <p className="text-xs sm:text-sm text-gray-600">Valor futuro del capital inicial</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-cyan-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Segundo Término</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">A × S</p>
                <p className="text-xs sm:text-sm text-gray-600">Valor futuro de los aportes periódicos</p>
              </div>
            </div>
          </div>

          <div className="bg-teal-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-teal-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-900 mb-4 sm:mb-6">Modelo Continuo con Aportes</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-teal-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 e^{rt} + \\frac{a}{r}\\left(e^{rt} - 1\\right)"}</BlockMath>
            </div>
            <div className="bg-white rounded-lg p-3 sm:p-4 md:p-5 border border-teal-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Tasa de Aporte Continuo</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">a</p>
              <p className="text-xs sm:text-sm text-gray-600">Cantidad aportada por unidad de tiempo (COP/año)</p>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-green-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-4 sm:mb-6">Ejemplo: Plan de Ahorro</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Capital inicial: $5,000,000 | Aporte mensual: $200,000 | Tasa: 8% E.A. | Tiempo: 2 años
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-green-200 space-y-3">
              <BlockMath>{"VF_{capital} = 5{,}000{,}000 \\times \\left(1 + \\frac{0.08}{12}\\right)^{24} = 5{,}863{,}000"}</BlockMath>
              <BlockMath>{"VF_{aportes} = 200{,}000 \\times \\frac{\\left(1.08/12\\right)^{24} - 1}{0.08/12} = 5{,}101{,}000"}</BlockMath>
              <div className="pt-3 border-t-2 border-green-200">
                <BlockMath>{"\\text{Total: } \\$10{,}964{,}000"}</BlockMath>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variable Rates Model */}
      {activeModel === "variableRates" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-amber-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-900 mb-3 sm:mb-4">Modelo Discreto con Tasas Variables</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-amber-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 \\times \\prod_{i=1}^{m} \\left(1 + \\frac{r_i}{n}\\right)^{n \\cdot t_i}"}</BlockMath>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-l-4 border-amber-500">
              <h4 className="font-bold text-amber-900 mb-3 text-sm sm:text-base">📖 Diccionario de Variables y Símbolos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div><InlineMath>{"\\prod"}</InlineMath> = Símbolo de <strong>producto</strong> (multiplicar todos los términos)</div>
                <div><InlineMath>{"m"}</InlineMath> = Número total de períodos con diferentes tasas</div>
                <div><InlineMath>{"i"}</InlineMath> = Índice del período (1, 2, 3, ..., m)</div>
                <div><InlineMath>{"r_i"}</InlineMath> = Tasa de interés del período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"t_i"}</InlineMath> = Duración (en años) del período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"n"}</InlineMath> = Capitalizaciones por año</div>
              </div>
              <div className="mt-3 p-2 bg-amber-100 rounded border border-amber-300">
                <p className="text-xs font-semibold text-amber-900">Ejemplo de lectura:</p>
                <p className="text-xs text-gray-700">Si m=3: multiplicas (1+r₁/n)^(nt₁) × (1+r₂/n)^(nt₂) × (1+r₃/n)^(nt₃)</p>
              </div>
            </div>
            
            <div className="bg-yellow-100 rounded-lg p-3 sm:p-4 md:p-5 border-2 border-yellow-300">
              <p className="text-xs sm:text-sm font-bold text-yellow-900 mb-2">⚠️ Nota Importante</p>
              <p className="text-xs sm:text-sm text-gray-700">
                Cuando las tasas varían en el tiempo, la solución clásica <InlineMath>{"P(t) = P_0 e^{rt}"}</InlineMath> ya no es aplicable directamente. Se debe calcular el producto secuencial de factores de crecimiento.
              </p>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-orange-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-orange-900 mb-4 sm:mb-6">Ejemplo: Préstamo con Tasa Promocional</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Préstamo: $20,000,000 | Año 1: 14% | Año 2: 17% | Años 3-5: 18.5%
            </p>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-orange-200 space-y-3">
              <BlockMath>{"P(5) = 20{,}000{,}000 \\times (1.01167)^{12} \\times (1.01417)^{12} \\times (1.01542)^{36}"}</BlockMath>
              <BlockMath>{"P(5) = 20{,}000{,}000 \\times 1.1499 \\times 1.1842 \\times 1.7374"}</BlockMath>
              <BlockMath>{"P(5) = 20{,}000{,}000 \\times 2.3657"}</BlockMath>
              <div className="pt-3 border-t-2 border-orange-200">
                <BlockMath>{"P(5) = \\$47{,}314{,}000"}</BlockMath>
                <p className="text-sm text-gray-600 mt-3 text-center">Intereses totales: $27,314,000</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Variable Rates with Contributions */}
      {activeModel === "variableWithContributions" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-rose-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-rose-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-rose-900 mb-4 sm:mb-6">Modelo Completo: Tasas Variables + Aportes Periódicos</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border-2 border-rose-200 mb-4">
              <BlockMath>{"P(t) = P_0 \\prod \\left(1 + \\frac{r_i}{n}\\right)^{nt_i} + \\sum A_j \\prod \\left(1 + \\frac{r_i}{n}\\right)^{n \\cdot \\tau_{i,j}}"}</BlockMath>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-4 border-l-4 border-rose-500">
              <h4 className="font-bold text-rose-900 mb-3 text-sm sm:text-base">📖 Diccionario de Variables y Símbolos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                <div><InlineMath>{"\\prod"}</InlineMath> = Símbolo de <strong>producto</strong> (multiplicación)</div>
                <div><InlineMath>{"\\sum"}</InlineMath> = Símbolo de <strong>sumatoria</strong> (suma de todos los términos)</div>
                <div><InlineMath>{"r_i"}</InlineMath> = Tasa de interés en el período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"t_i"}</InlineMath> = Duración del período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"A_j"}</InlineMath> = Aporte realizado en el momento <InlineMath>{"j"}</InlineMath></div>
                <div><InlineMath>{"\\tau_{i,j}"}</InlineMath> = Tiempo que el aporte <InlineMath>{"j"}</InlineMath> estuvo en el período <InlineMath>{"i"}</InlineMath></div>
              </div>
              <div className="mt-3 p-2 bg-rose-100 rounded border border-rose-300">
                <p className="text-xs font-semibold text-rose-900">Estructura de la fórmula:</p>
                <p className="text-xs text-gray-700"><strong>Primer término:</strong> Valor futuro del capital inicial con tasas variables</p>
                <p className="text-xs text-gray-700"><strong>Segundo término:</strong> Suma del valor futuro de cada aporte con tasas variables</p>
              </div>
            </div>
          </div>

          <div className="bg-violet-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-violet-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-violet-900 mb-4 sm:mb-6">Caso Simplificado: Dos Tasas con Aportes Mensuales</h3>
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-violet-200 mb-4">
              <BlockMath>{"P(t) = P_0\\left(1 + \\frac{r_1}{n}\\right)^{nt_1}\\left(1 + \\frac{r_2}{n}\\right)^{nt_2} + A \\cdot S_1 + A \\cdot S_2"}</BlockMath>
              <div className="space-y-2 mt-4">
                <BlockMath>{"S_1 = \\frac{\\left(1 + \\frac{r_1}{n}\\right)^{nt_1} - 1}{\\frac{r_1}{n}} \\times \\left(1 + \\frac{r_2}{n}\\right)^{nt_2}"}</BlockMath>
                <BlockMath>{"S_2 = \\frac{\\left(1 + \\frac{r_2}{n}\\right)^{nt_2} - 1}{\\frac{r_2}{n}}"}</BlockMath>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-emerald-300">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-900 mb-4 sm:mb-6">Ejemplo Completo: Plan de Ahorro</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-emerald-200">
                <p className="text-xs text-gray-600 mb-1">Capital inicial</p>
                <p className="text-lg font-bold text-gray-900">$5,000,000</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-emerald-200">
                <p className="text-xs text-gray-600 mb-1">Aporte mensual</p>
                <p className="text-lg font-bold text-gray-900">$200,000</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-emerald-200">
                <p className="text-xs text-gray-600 mb-1">Primer año</p>
                <p className="text-lg font-bold text-emerald-700">8% E.A.</p>
              </div>
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-emerald-200">
                <p className="text-xs text-gray-600 mb-1">Segundo año</p>
                <p className="text-lg font-bold text-emerald-700">10% E.A.</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-emerald-200 space-y-3">
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-emerald-900 text-sm mb-2">Paso 1: Capital inicial</p>
                  <BlockMath>{"VF_{capital} = 5{,}000{,}000 \\times 1.0830 \\times 1.1047 = \\$5{,}981{,}000"}</BlockMath>
                </div>
                
                <div>
                  <p className="font-bold text-emerald-900 text-sm mb-2">Paso 2: Aportes año 1</p>
                  <BlockMath>{"S_1 = 12.449 \\times 1.1047 = 13.752"}</BlockMath>
                  <BlockMath>{"VF_{aportes1} = 200{,}000 \\times 13.752 = \\$2{,}750{,}400"}</BlockMath>
                </div>
                
                <div>
                  <p className="font-bold text-emerald-900 text-sm mb-2">Paso 3: Aportes año 2</p>
                  <BlockMath>{"S_2 = 12.565"}</BlockMath>
                  <BlockMath>{"VF_{aportes2} = 200{,}000 \\times 12.565 = \\$2{,}513{,}000"}</BlockMath>
                </div>
                
                <div className="pt-4 border-t-2 border-emerald-300">
                  <BlockMath>{"\\text{Valor Final} = \\$11{,}244{,}400"}</BlockMath>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    Total invertido: $9,800,000 | Rendimiento: $1,444,400 (14.7%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
