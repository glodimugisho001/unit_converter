import { useState } from "react";

const units = {
  length: {
    label: "Longueur",
    units: {
      m: { name: "Mètre (m)", toBase: v => v, fromBase: v => v },
      km: { name: "Kilomètre (km)", toBase: v => v * 1000, fromBase: v => v / 1000 },
      cm: { name: "Centimètre (cm)", toBase: v => v / 100, fromBase: v => v * 100 },
      in: { name: "Pouce (in)", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 },
      ft: { name: "Pied (ft)", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      yd: { name: "Yard (yd)", toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      mi: { name: "Mile (mi)", toBase: v => v * 1609.34, fromBase: v => v / 1609.34 },
    },
  },
  mass: {
    label: "Masse",
    units: {
      g: { name: "Gramme (g)", toBase: v => v / 1000, fromBase: v => v * 1000 },
      kg: { name: "Kilogramme (kg)", toBase: v => v, fromBase: v => v },
      lb: { name: "Livre (lb)", toBase: v => v * 0.453592, fromBase: v => v / 0.453592 },
      oz: { name: "Once (oz)", toBase: v => v * 0.0283495, fromBase: v => v / 0.0283495 },
    },
  },
};

export default function UnitConverter() {
  const [category, setCategory] = useState("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState(0);
  const [result, setResult] = useState(0);

  const handleConvert = () => {
    const base = units[category].units[fromUnit].toBase(value);
    const converted = units[category].units[toUnit].fromBase(base);
    setResult(converted);
  };

  const unitOptions = Object.entries(units[category].units);

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Convertisseur d'unités</h1>

      <div className="mb-4">
        <label className="mr-2">Catégorie :</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            const firstUnit = Object.keys(units[e.target.value].units)[0];
            setFromUnit(firstUnit);
            setToUnit(firstUnit);
          }}
          className="p-2 rounded-md border"
        >
          {Object.entries(units).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-4 mb-4">
        <div>
          <label>De :</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="block p-2 border rounded-md"
          >
            {unitOptions.map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>À :</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="block p-2 border rounded-md"
          >
            {unitOptions.map(([key, val]) => (
              <option key={key} value={key}>{val.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value))}
          className="p-2 border rounded-md w-64"
          placeholder="Entrez une valeur"
        />
      </div>

      <button
        onClick={handleConvert}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
      >
        Convertir
      </button>

      <div className="mt-6 text-xl">
        Résultat : <strong>{result}</strong>
      </div>
    </div>
  );
}