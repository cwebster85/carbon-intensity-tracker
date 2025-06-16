import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Table from './components/tables/table';
import './App.css';
import { normaliser } from './utils/normaliser';

Modal.setAppElement('#root');

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
console.log('Using API URL:', API_URL);

const defaultRow = {
  from: '2025-01-01T00:00',
  to: '2025-01-01T00:30',
  intensity_forecast: '250',
  intensity_actual: '245',
  index: 'moderate',
  gas: '30.0',
  coal: '10.0',
  biomass: '5.0',
  nuclear: '15.0',
  hydro: '2.0',
  imports: '8.0',
  wind: '10.0',
  solar: '12.0',
  other: '3.0',
};

const emptyRow = Object.fromEntries(Object.keys(defaultRow).map((key) => [key, '']));

type CarbonData = {
  from: string;
  to: string;
  intensity_forecast: number;
  intensity_actual: number;
  index: string;
  gas: number;
  coal: number;
  biomass: number;
  nuclear: number;
  hydro: number;
  imports: number;
  wind: number;
  solar: number;
  other: number;
};

interface RowWithOriginal extends CarbonData {
  _original?: CarbonData;
}

function App() {
  const [data, setData] = useState<CarbonData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [newRow, setNewRow] = useState(emptyRow);
  const [modalOpen, setModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [rowToEdit, setRowToEdit] = useState<RowWithOriginal | null>(null);

  const fetchInfo = () => {
    axios.get(`${API_URL}/api/get/intensity?ts=${Date.now()}`).then((response) => {
      const rawData = response.data;

      if (rawData.length > 0) {
        const cleanedData = rawData.map(({ _original, ...rest }: RowWithOriginal) => rest);
        const rawHeaders = Object.keys(cleanedData[0]);

        const [normHeaders, normData] = normaliser(rawHeaders, cleanedData);
        const filteredHeaders = Array.from(new Set(normHeaders));
        const finalHeaders = filteredHeaders.filter(
          (h) =>
            ![
              'intensity forecast',
              'intensity actual',
              'Intensity Forecast',
              'Intensity Actual',
            ].includes(h.toLowerCase()),
        );

        const orderedHeaders = [
          'from',
          'to',
          'intensity forecast',
          'intensity actual',
          ...finalHeaders.filter(
            (h) =>
              !['from', 'to', 'intensity forecast', 'intensity actual'].includes(h.toLowerCase()),
          ),
        ];

        const sortedData = [...normData].sort(
          (a, b) => new Date(b.from).getTime() - new Date(a.from).getTime(),
        );
        setHeaders(orderedHeaders);
        setData(sortedData);
      }
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setNewRow((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));

    if (name === 'from' || name === 'to') {
      const fromDate = new Date(name === 'from' ? value : newRow.from);
      const toDate = new Date(name === 'to' ? value : newRow.to);

      if (
        newRow.from &&
        newRow.to &&
        !isNaN(fromDate.getTime()) &&
        !isNaN(toDate.getTime()) &&
        fromDate < toDate
      ) {
        setFormErrors((prev) => ({ ...prev, from: '', to: '' }));
      } else if (newRow.from && newRow.to) {
        setFormErrors((prev) => ({ ...prev, to: '"To" Must Be Later Than "From"' }));
      } else {
        setFormErrors((prev) => ({ ...prev, from: '', to: '' }));
      }
    }
  };

  const toDateTimeLocal = (input: string) => {
    if (input.includes('T')) return input;

    const match = input.match(/^(\d{2})\/(\d{2})\/(\d{4}),\s*(\d{2}):(\d{2})(?::(\d{2}))?$/);
    if (!match) return '';

    const [, dd, mm, yyyy, hh, min] = match;
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  };

  const handleEditClick = (row: RowWithOriginal) => {
    const keyMap: Record<string, string> = {
      'intensity forecast': 'intensity_forecast',
      'intensity actual': 'intensity_actual',
      from: 'from',
      to: 'to',
      index: 'index',
      gas: 'gas',
      coal: 'coal',
      biomass: 'biomass',
      nuclear: 'nuclear',
      hydro: 'hydro',
      imports: 'imports',
      wind: 'wind',
      solar: 'solar',
      other: 'other',
    };

    const prefill = Object.fromEntries(
      Object.entries(row)
        .map(([key, val]) => {
          const internalKey = keyMap[key];
          if (!internalKey) return [];
          if (internalKey === 'from' || internalKey === 'to') {
            return [internalKey, toDateTimeLocal(String(val))];
          }
          return [internalKey, val !== undefined && val !== null ? String(val) : ''];
        })
        .filter((entry) => entry.length > 0),
    );

    setNewRow(prefill);
    setRowToEdit(row);
    setModalOpen(true);
  };

  const handleDelete = async (row: RowWithOriginal) => {
    const original = row._original;

    try {
      await axios.post(`${API_URL}/api/delete/intensity`, {
        from: original?.from || row.from,
        to: original?.to || row.to,
      });
      fetchInfo();
    } catch (err) {
      console.error('Error deleting row', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    const fromDate = new Date(newRow.from);
    const toDate = new Date(newRow.to);

    if (isNaN(fromDate.getTime())) errors.from = 'Enter a valid "from" date/time';
    if (isNaN(toDate.getTime())) errors.to = 'Enter a valid "to" date/time';
    if (fromDate >= toDate) errors.to = '"To" must be later than "From"';

    const percentKeys = [
      'gas',
      'coal',
      'biomass',
      'nuclear',
      'hydro',
      'imports',
      'wind',
      'solar',
      'other',
    ];

    percentKeys.forEach((key) => {
      const value = parseFloat(newRow[key]);
      if (isNaN(value)) errors[key] = 'Must be a number';
      else if (value < 0 || value > 100) errors[key] = 'Value must be between 0 and 100';
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});

    try {
      const url = rowToEdit ? `${API_URL}/api/edit/intensity` : `${API_URL}/api/add/intensity`;

      const method = rowToEdit ? axios.put : axios.post;

      const payload = rowToEdit
        ? {
            originalFrom: rowToEdit._original?.from || rowToEdit.from,
            originalTo: rowToEdit._original?.to || rowToEdit.to,
            ...newRow,
            from: new Date(newRow.from).toISOString(),
            to: new Date(newRow.to).toISOString(),
          }
        : {
            ...newRow,
            from: new Date(newRow.from).toISOString(),
            to: new Date(newRow.to).toISOString(),
          };

      const response = await method(url, payload);

      if (response.status === 200 || response.status === 201) {
        fetchInfo();
        setModalOpen(false);
        setRowToEdit(null);
        setNewRow(defaultRow);
        setFormErrors({});
        setTouchedFields({});
      }
    } catch (err) {
      console.error('Failed to save data:', err);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>National Carbon Intensity</h1>
      </div>
      <div className="add-row-btn">
        <button
          onClick={() => {
            setModalOpen(true);
            setNewRow(defaultRow);
            setRowToEdit(null);
          }}
          className="add-button"
        >
          Add New Row＋
        </button>
      </div>
      <Table headers={headers} data={data} onDelete={handleDelete} onEdit={handleEditClick} />
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{rowToEdit ? 'Edit Row' : 'Insert New Row'}</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          {Object.keys(emptyRow).map((key) => (
            <div key={key} className="input-group">
              <label>{key.replace(/_/g, ' ')}</label>

              {key === 'index' ? (
                <select name={key} value={newRow[key]} onChange={handleChange} required>
                  <option value="">Select index</option>
                  <option value="very low">Very Low</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="very high">Very High</option>
                </select>
              ) : (
                <input
                  name={key}
                  type={key === 'from' || key === 'to' ? 'datetime-local' : 'number'}
                  value={newRow[key]}
                  onChange={handleChange}
                  required
                  step="any"
                  min={
                    key !== 'from' &&
                    key !== 'to' &&
                    key !== 'intensity_forecast' &&
                    key !== 'intensity_actual' &&
                    key !== 'index'
                      ? 0
                      : undefined
                  }
                  max={
                    key !== 'from' &&
                    key !== 'to' &&
                    key !== 'intensity_forecast' &&
                    key !== 'intensity_actual' &&
                    key !== 'index'
                      ? 100
                      : undefined
                  }
                />
              )}
              {formErrors[key] && touchedFields[key] && (
                <div className="error-message">{formErrors[key]}</div>
              )}
            </div>
          ))}

          <div className="modal-actions">
            <button type="submit">{rowToEdit ? 'Save' : 'Add'}</button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setNewRow(emptyRow);
                setFormErrors({});
                setTouchedFields({});
              }}
            >
              Clear All
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;
