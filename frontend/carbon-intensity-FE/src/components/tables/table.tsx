import './styles.css';

const Table = ({ headers, data, onDelete, onEdit }) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr className="headers">
            {headers.map((head, i) => (
              <th key={i}>{head}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((head, colIndex) => {
                const rawValue = row[head];
                const value =
                  typeof rawValue === 'object' && rawValue !== null
                    ? JSON.stringify(rawValue)
                    : rawValue;
                const showUnit = ['intensity forecast', 'intensity actual'].includes(
                  head.toLowerCase(),
                );
                const showPercentage = [
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

                return (
                  <td key={`${rowIndex}-${colIndex}`}>
                    {showUnit ? (
                      <>
                        {value}{' '}
                        <span className="carbon-intensity-values">
                          gCO<sub>2</sub>/kWh
                        </span>
                      </>
                    ) : showPercentage.includes(head.toLowerCase()) ? (
                      <>{value}%</>
                    ) : (
                      value
                    )}
                  </td>
                );
              })}
              <td>
                <button onClick={() => onEdit(row)}>✏️ Edit</button>
                <button onClick={() => onDelete(row)}>🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
