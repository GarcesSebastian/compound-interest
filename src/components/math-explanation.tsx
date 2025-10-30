"use client"

import { useState } from "react"
import { BlockMath, InlineMath } from "@/components/math-renderer"
import { useLoanMode } from "@/contexts/loan-mode-context"

type ModelType = "continuous" | "discrete" | "derivation" | "contributions" | "variableRates" | "variableWithContributions"

export function MathExplanation() {
  const [activeModel, setActiveModel] = useState<ModelType>("continuous")
  const { isLoanMode, setIsLoanMode } = useLoanMode()

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
          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Ecuación Diferencial del Interés Compuesto</h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4 sm:mb-6">
              <BlockMath>{"\\frac{dP}{dt} = rP"}</BlockMath>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Variable Dependiente</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">P(t)</p>
                <p className="text-xs sm:text-sm text-gray-600">Capital en el tiempo t</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Parámetro</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-[#DC2626] mb-1">r</p>
                <p className="text-xs sm:text-sm text-gray-600">Tasa de interés anual</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Derivada</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">dP/dt</p>
                <p className="text-xs sm:text-sm text-gray-600">Tasa de cambio del capital</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Interpretación Física</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
              Esta ecuación nos dice que{" "}
              <span className="font-bold text-gray-900">
                la tasa de cambio del capital es proporcional al capital actual
              </span>
              . En términos simples: mientras más dinero tengas, más rápido crecerá tu inversión. La constante de
              proporcionalidad es la tasa de interés r.
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Solución de la Ecuación Diferencial</h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 e^{rt}"}</BlockMath>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Condición Inicial</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">
                  P<sub>0</sub>
                </p>
                <p className="text-xs sm:text-sm text-gray-600">Capital inicial en t = 0</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Constante Matemática</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">e ≈ 2.71828</p>
                <p className="text-xs sm:text-sm text-gray-600">Número de Euler</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Variable Independiente</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">t</p>
                <p className="text-xs sm:text-sm text-gray-600">Tiempo en años</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Ejemplo Numérico</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Con <InlineMath>{"P_0 = \\$15{,}000{,}000"}</InlineMath>, <InlineMath>{"r = 16.5\\% = 0.165"}</InlineMath>, <InlineMath>{"t = 4"}</InlineMath> años:
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200 space-y-3 sm:space-y-4">
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times e^{(0.165 \\times 4)}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times e^{0.66}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times 1.9348"}</BlockMath>
              <div className="pt-4 border-t-2 border-gray-300">
                <BlockMath>{"P(4) \\approx \\$29{,}022{,}000"}</BlockMath>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Discrete Model */}
      {activeModel === "discrete" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Fórmula Discreta del Interés Compuesto</h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 \\left(1 + \\frac{r}{n}\\right)^{nt}"}</BlockMath>
            </div>
            
            <div className="bg-gray-50 p-4 mb-4 border-l-4 border-gray-400">
              <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Diccionario de Variables:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                <div><InlineMath>{"P(t)"}</InlineMath> = Capital en el tiempo <InlineMath>{"t"}</InlineMath></div>
                <div><InlineMath>{"P_0"}</InlineMath> = Capital inicial en <InlineMath>{"t=0"}</InlineMath></div>
                <div><InlineMath>{"r"}</InlineMath> = Tasa de interés anual (como decimal)</div>
                <div><InlineMath>{"n"}</InlineMath> = Número de capitalizaciones por año</div>
                <div><InlineMath>{"t"}</InlineMath> = Tiempo en años</div>
                <div><InlineMath>{"nt"}</InlineMath> = Total de períodos de capitalización</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Frecuencia</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">n</p>
                <p className="text-xs sm:text-sm text-gray-600">Capitalizaciones por año</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Tasa por Período</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">r/n</p>
                <p className="text-xs sm:text-sm text-gray-600">Interés por capitalización</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Períodos Totales</p>
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1">nt</p>
                <p className="text-xs sm:text-sm text-gray-600">Número de capitalizaciones</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Frecuencias de Capitalización</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 md:p-6 border border-gray-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Anual</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">n = 1</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-6 border border-gray-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Semestral</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">n = 2</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-6 border border-gray-200">
                <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2">Trimestral</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">n = 4</p>
              </div>
              <div className="bg-[#DC2626] p-3 sm:p-4 md:p-6 border-2 border-[#B91C1C] shadow-lg col-span-2 lg:col-span-1">
                <p className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2">Mensual (Bancos)</p>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white">n = 12</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Ejemplo Bancario Real</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Davivienda: <InlineMath>{"P_0 = \\$15{,}000{,}000"}</InlineMath>, <InlineMath>{"r = 16.5\\%"}</InlineMath>, <InlineMath>{"n = 12"}</InlineMath>, <InlineMath>{"t = 4"}</InlineMath> años
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200 space-y-3 sm:space-y-4">
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times \\left(1 + \\frac{0.165}{12}\\right)^{12 \\times 4}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times (1.01375)^{48}"}</BlockMath>
              <BlockMath>{"P(4) = 15{,}000{,}000 \\times 1.9261"}</BlockMath>
              <div className="pt-4 border-t-2 border-gray-300">
                <BlockMath>{"P(4) = \\$28{,}891{,}686"}</BlockMath>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Relación con el Modelo Continuo</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Cuando el número de capitalizaciones tiende a infinito, el modelo discreto converge al continuo:
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200">
              <BlockMath>{"\\lim_{n \\to \\infty} \\left(1 + \\frac{r}{n}\\right)^{nt} = e^{rt}"}</BlockMath>
            </div>
          </div>
        </div>
      )}

      {/* Derivation */}
      {activeModel === "derivation" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Paso 1: Planteamiento</h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200">
              <BlockMath>{"\\frac{dP}{dt} = rP"}</BlockMath>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Paso 2: Separación de Variables</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">Dividimos ambos lados por P y multiplicamos por dt:</p>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200">
              <BlockMath>{"\\frac{dP}{P} = r \\, dt"}</BlockMath>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Paso 3: Integración</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">Integramos ambos lados:</p>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 space-y-4 sm:space-y-6">
              <BlockMath>{"\\int \\frac{dP}{P} = \\int r \\, dt"}</BlockMath>
              <BlockMath>{"\\ln|P| = rt + C"}</BlockMath>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">Donde C es la constante de integración</p>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Paso 4: Aplicar Exponencial</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Aplicamos <InlineMath>{"e^x"}</InlineMath> a ambos lados:
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 space-y-4 sm:space-y-6">
              <BlockMath>{"e^{\\ln|P|} = e^{rt + C}"}</BlockMath>
              <BlockMath>{"P = e^C \\cdot e^{rt}"}</BlockMath>
              <BlockMath>{"P = A \\cdot e^{rt}"}</BlockMath>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 text-center">
              Donde <InlineMath>{"A = e^C"}</InlineMath> es una constante
            </p>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Paso 5: Condición Inicial</h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6">
              Aplicamos la condición inicial <InlineMath>{"P(0) = P_0"}</InlineMath>:
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 space-y-4 sm:space-y-6">
              <BlockMath>{"P_0 = A \\cdot e^0 = A"}</BlockMath>
              <p className="text-center text-base sm:text-lg md:text-2xl text-gray-600">
                Por lo tanto, <InlineMath>{"A = P_0"}</InlineMath>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#DC2626] to-[#B91C1C] p-4 sm:p-6 md:p-8 shadow-2xl">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">Solución Final</h3>
            <div className="bg-white p-6 sm:p-8 md:p-10 border-2 border-red-300">
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
          {/* Mode Toggle */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#DC2626]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">Contexto del Modelo</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Los aportes se {isLoanMode ? "restan (pagos)" : "suman (inversiones)"}</p>
              </div>
              <div className="flex items-center gap-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsLoanMode(false)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold transition-all ${
                    !isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Ahorro
                </button>
                <button
                  onClick={() => setIsLoanMode(true)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold transition-all border-l-2 border-gray-300 ${
                    isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Préstamo
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Modelo Discreto con Aportes Regulares {isLoanMode ? "(Préstamo)" : "(Ahorro)"}
            </h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4 sm:mb-6">
              <BlockMath>
                {isLoanMode 
                  ? "P(t) = P_0\\left(1 + \\frac{r}{n}\\right)^{nt} - A \\times \\frac{\\left(1 + \\frac{r}{n}\\right)^{nt} - 1}{\\frac{r}{n}}"
                  : "P(t) = P_0\\left(1 + \\frac{r}{n}\\right)^{nt} + A \\times \\frac{\\left(1 + \\frac{r}{n}\\right)^{nt} - 1}{\\frac{r}{n}}"
                }
              </BlockMath>
            </div>
            
            <div className="bg-gray-50 p-4 mb-4 border-l-4 border-gray-400">
              <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Diccionario de Variables:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                <div><InlineMath>{"P_0"}</InlineMath> = Capital inicial</div>
                <div><InlineMath>{"r"}</InlineMath> = Tasa de interés anual</div>
                <div><InlineMath>{"n"}</InlineMath> = Capitalizaciones por año</div>
                <div><InlineMath>{"t"}</InlineMath> = Tiempo en años</div>
                <div>
                  <InlineMath>{"A"}</InlineMath> = {isLoanMode ? "Pago periódico (cada 1/n años)" : "Aporte periódico (cada 1/n años)"}
                </div>
                <div>
                  Segundo término = {isLoanMode ? "Valor presente de todos los pagos" : "Valor futuro de todos los aportes"}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Primer Término</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">P<sub>0</sub>(1 + r/n)<sup>nt</sup></p>
                <p className="text-xs sm:text-sm text-gray-600">Valor futuro del capital inicial</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Segundo Término</p>
                <p className="text-base sm:text-lg font-bold text-gray-900 mb-1">A × S</p>
                <p className="text-xs sm:text-sm text-gray-600">Valor futuro de los aportes periódicos</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Modelo Continuo con Aportes {isLoanMode ? "(Préstamo)" : "(Ahorro)"}
            </h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4 sm:mb-6">
              <BlockMath>
                {isLoanMode
                  ? "P(t) = P_0 e^{rt} - \\frac{a}{r}\\left(e^{rt} - 1\\right)"
                  : "P(t) = P_0 e^{rt} + \\frac{a}{r}\\left(e^{rt} - 1\\right)"
                }
              </BlockMath>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 md:p-5 border border-gray-200">
              <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
                {isLoanMode ? "Tasa de Pago Continuo" : "Tasa de Aporte Continuo"}
              </p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 mb-1">a</p>
              <p className="text-xs sm:text-sm text-gray-600">
                Cantidad {isLoanMode ? "pagada" : "aportada"} por unidad de tiempo (COP/año)
              </p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ejemplo: {isLoanMode ? "Plan de Pagos de Préstamo" : "Plan de Ahorro"}
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              {isLoanMode 
                ? "Préstamo inicial: $5,000,000 | Pago mensual: $200,000 | Tasa: 8% E.A. | Tiempo: 2 años"
                : "Capital inicial: $5,000,000 | Aporte mensual: $200,000 | Tasa: 8% E.A. | Tiempo: 2 años"
              }
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200 space-y-3">
              <BlockMath>{"VF_{capital} = 5{,}000{,}000 \\times \\left(1 + \\frac{0.08}{12}\\right)^{24} = 5{,}863{,}000"}</BlockMath>
              <BlockMath>
                {isLoanMode
                  ? "VF_{pagos} = 200{,}000 \\times \\frac{\\left(1.08/12\\right)^{24} - 1}{0.08/12} = 5{,}101{,}000"
                  : "VF_{aportes} = 200{,}000 \\times \\frac{\\left(1.08/12\\right)^{24} - 1}{0.08/12} = 5{,}101{,}000"
                }
              </BlockMath>
              <div className="pt-3 border-t-2 border-gray-300">
                <BlockMath>
                  {isLoanMode
                    ? "\\text{Deuda Final: } \\$762{,}000"
                    : "\\text{Total: } \\$10{,}964{,}000"
                  }
                </BlockMath>
              </div>
            </div>
            {isLoanMode && (
              <p className="text-xs sm:text-sm text-gray-600 mt-3">
                Nota: En modo préstamo, los pagos reducen la deuda. El resultado es Deuda Final = Capital con intereses - Pagos acumulados.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Variable Rates Model */}
      {activeModel === "variableRates" && (
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Modelo Discreto con Tasas Variables</h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4 sm:mb-6">
              <BlockMath>{"P(t) = P_0 \\times \\prod_{i=1}^{m} \\left(1 + \\frac{r_i}{n}\\right)^{n \\cdot t_i}"}</BlockMath>
            </div>
            
            <div className="bg-gray-50 p-4 mb-4 border-l-4 border-gray-400">
              <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Diccionario de Variables y Símbolos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                <div><InlineMath>{"\\prod"}</InlineMath> = Símbolo de <strong>producto</strong> (multiplicar todos los términos)</div>
                <div><InlineMath>{"m"}</InlineMath> = Número total de períodos con diferentes tasas</div>
                <div><InlineMath>{"i"}</InlineMath> = Índice del período (1, 2, 3, ..., m)</div>
                <div><InlineMath>{"r_i"}</InlineMath> = Tasa de interés del período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"t_i"}</InlineMath> = Duración (en años) del período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"n"}</InlineMath> = Capitalizaciones por año</div>
              </div>
              <div className="mt-3 p-2 bg-gray-100 border border-gray-300">
                <p className="text-xs font-semibold text-gray-900">Ejemplo de lectura:</p>
                <p className="text-xs text-gray-700">Si m=3: multiplicas (1+r₁/n)^(nt₁) × (1+r₂/n)^(nt₂) × (1+r₃/n)^(nt₃)</p>
              </div>
            </div>
            
            <div className="bg-gray-100 p-3 sm:p-4 md:p-5 border-2 border-gray-300">
              <p className="text-xs sm:text-sm font-bold text-gray-900 mb-2">Nota Importante</p>
              <p className="text-xs sm:text-sm text-gray-700">
                Cuando las tasas varían en el tiempo, la solución clásica <InlineMath>{"P(t) = P_0 e^{rt}"}</InlineMath> ya no es aplicable directamente. Se debe calcular el producto secuencial de factores de crecimiento.
              </p>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Ejemplo: Préstamo con Tasa Promocional</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Préstamo: $20,000,000 | Año 1: 14% | Año 2: 17% | Años 3-5: 18.5%
            </p>
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200 space-y-3">
              <BlockMath>{"P(5) = 20{,}000{,}000 \\times (1.01167)^{12} \\times (1.01417)^{12} \\times (1.01542)^{36}"}</BlockMath>
              <BlockMath>{"P(5) = 20{,}000{,}000 \\times 1.1499 \\times 1.1842 \\times 1.7374"}</BlockMath>
              <BlockMath>{"P(5) = 20{,}000{,}000 \\times 2.3657"}</BlockMath>
              <div className="pt-3 border-t-2 border-gray-300">
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
          {/* Mode Toggle */}
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-[#DC2626]">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div>
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">Contexto del Modelo</h4>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Los aportes se {isLoanMode ? "restan (pagos)" : "suman (inversiones)"}</p>
              </div>
              <div className="flex items-center gap-0 border-2 border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setIsLoanMode(false)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold transition-all ${
                    !isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Ahorro
                </button>
                <button
                  onClick={() => setIsLoanMode(true)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold transition-all border-l-2 border-gray-300 ${
                    isLoanMode ? "bg-[#DC2626] text-white" : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Préstamo
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Modelo Completo: Tasas Variables + Aportes Periódicos {isLoanMode ? "(Préstamo)" : "(Ahorro)"}
            </h3>
            <div className="bg-gray-50 p-4 sm:p-6 md:p-8 border border-gray-200 mb-4">
              <BlockMath>
                {isLoanMode
                  ? "P(t) = P_0 \\prod_{i=1}^{m} \\left(1 + \\frac{r_i}{n}\\right)^{nt_i} - \\sum_{j=1}^{k} A_j \\prod_{i=1}^{m} \\left(1 + \\frac{r_i}{n}\\right)^{n \\cdot \\tau_{i,j}}"
                  : "P(t) = P_0 \\prod_{i=1}^{m} \\left(1 + \\frac{r_i}{n}\\right)^{nt_i} + \\sum_{j=1}^{k} A_j \\prod_{i=1}^{m} \\left(1 + \\frac{r_i}{n}\\right)^{n \\cdot \\tau_{i,j}}"
                }
              </BlockMath>
            </div>
            
            <div className="bg-gray-50 p-4 mb-4 border-l-4 border-gray-400">
              <h4 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">Diccionario de Variables y Símbolos:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-700">
                <div><InlineMath>{"\\prod"}</InlineMath> = Símbolo de <strong>producto</strong> (multiplicación)</div>
                <div><InlineMath>{"\\sum"}</InlineMath> = Símbolo de <strong>sumatoria</strong> (suma de todos los términos)</div>
                <div><InlineMath>{"m"}</InlineMath> = Número total de períodos con diferentes tasas</div>
                <div><InlineMath>{"k"}</InlineMath> = Número total de aportes realizados</div>
                <div><InlineMath>{"i"}</InlineMath> = Índice del período de tasas (1, 2, ..., m)</div>
                <div><InlineMath>{"j"}</InlineMath> = Índice del aporte (1, 2, ..., k)</div>
                <div><InlineMath>{"r_i"}</InlineMath> = Tasa de interés en el período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"t_i"}</InlineMath> = Duración del período <InlineMath>{"i"}</InlineMath></div>
                <div><InlineMath>{"A_j"}</InlineMath> = Aporte realizado en el momento <InlineMath>{"j"}</InlineMath></div>
                <div><InlineMath>{"\\tau_{i,j}"}</InlineMath> = Tiempo que el aporte <InlineMath>{"j"}</InlineMath> estuvo en el período <InlineMath>{"i"}</InlineMath></div>
              </div>
              <div className="mt-3 p-2 bg-gray-100 border border-gray-300">
                <p className="text-xs font-semibold text-gray-900">Estructura de la fórmula:</p>
                <p className="text-xs text-gray-700"><strong>Primer término:</strong> Valor futuro del capital inicial con tasas variables</p>
                <p className="text-xs text-gray-700"><strong>Segundo término:</strong> Suma del valor futuro de cada aporte con tasas variables</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-gray-400 shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Caso Simplificado: Dos Tasas con Aportes Mensuales {isLoanMode ? "(Préstamo)" : "(Ahorro)"}
            </h3>
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200 mb-4">
              <BlockMath>
                {isLoanMode
                  ? "P(t) = P_0\\left(1 + \\frac{r_1}{n}\\right)^{nt_1}\\left(1 + \\frac{r_2}{n}\\right)^{nt_2} - A \\cdot S_1 - A \\cdot S_2"
                  : "P(t) = P_0\\left(1 + \\frac{r_1}{n}\\right)^{nt_1}\\left(1 + \\frac{r_2}{n}\\right)^{nt_2} + A \\cdot S_1 + A \\cdot S_2"
                }
              </BlockMath>
              <div className="space-y-2 mt-4">
                <BlockMath>{"S_1 = \\frac{\\left(1 + \\frac{r_1}{n}\\right)^{nt_1} - 1}{\\frac{r_1}{n}} \\times \\left(1 + \\frac{r_2}{n}\\right)^{nt_2}"}</BlockMath>
                <BlockMath>{"S_2 = \\frac{\\left(1 + \\frac{r_2}{n}\\right)^{nt_2} - 1}{\\frac{r_2}{n}}"}</BlockMath>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 md:p-8 border-l-4 border-[#DC2626] shadow-sm">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Ejemplo Completo: {isLoanMode ? "Plan de Pagos de Préstamo" : "Plan de Ahorro"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">{isLoanMode ? "Préstamo inicial" : "Capital inicial"}</p>
                <p className="text-lg font-bold text-gray-900">$5,000,000</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">{isLoanMode ? "Pago mensual" : "Aporte mensual"}</p>
                <p className="text-lg font-bold text-gray-900">$200,000</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Primer año</p>
                <p className="text-lg font-bold text-[#DC2626]">8% E.A.</p>
              </div>
              <div className="bg-gray-50 p-3 sm:p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Segundo año</p>
                <p className="text-lg font-bold text-[#DC2626]">10% E.A.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 sm:p-6 border border-gray-200 space-y-3">
              <div className="space-y-3">
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-2">Paso 1: {isLoanMode ? "Deuda inicial con intereses" : "Capital inicial"}</p>
                  <BlockMath>{"VF_{capital} = 5{,}000{,}000 \\times 1.0830 \\times 1.1047 = \\$5{,}981{,}000"}</BlockMath>
                </div>
                
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-2">Paso 2: {isLoanMode ? "Pagos año 1" : "Aportes año 1"}</p>
                  <BlockMath>{"S_1 = 12.449 \\times 1.1047 = 13.752"}</BlockMath>
                  <BlockMath>
                    {isLoanMode 
                      ? "VF_{pagos1} = 200{,}000 \\times 13.752 = \\$2{,}750{,}400"
                      : "VF_{aportes1} = 200{,}000 \\times 13.752 = \\$2{,}750{,}400"
                    }
                  </BlockMath>
                </div>
                
                <div>
                  <p className="font-bold text-gray-900 text-sm mb-2">Paso 3: {isLoanMode ? "Pagos año 2" : "Aportes año 2"}</p>
                  <BlockMath>{"S_2 = 12.565"}</BlockMath>
                  <BlockMath>
                    {isLoanMode
                      ? "VF_{pagos2} = 200{,}000 \\times 12.565 = \\$2{,}513{,}000"
                      : "VF_{aportes2} = 200{,}000 \\times 12.565 = \\$2{,}513{,}000"
                    }
                  </BlockMath>
                </div>
                
                <div className="pt-4 border-t-2 border-gray-300">
                  <BlockMath>
                    {isLoanMode
                      ? "\\text{Deuda Restante} = \\$717{,}600"
                      : "\\text{Valor Final} = \\$11{,}244{,}400"
                    }
                  </BlockMath>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {isLoanMode
                      ? "Deuda con intereses - Total pagado: $5,981,000 - $5,263,400 = $717,600"
                      : "Total invertido: $9,800,000 | Rendimiento: $1,444,400 (14.7%)"
                    }
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
