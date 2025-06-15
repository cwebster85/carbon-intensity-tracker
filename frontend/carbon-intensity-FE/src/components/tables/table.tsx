import "./styles.css";

const Table = ({ headers, data }) => {

    return (
        <div>
            <table className="table">
                <thead>
                    <tr className="headers">
                        {headers.map(head => (
                            <th>{head}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {headers.map((head, colIndex) => {
                                const value = row[head];
                                const showUnit = ['intensity forecast', 'intensity actual'].includes(head.toLowerCase());
                                const showPercentage = ['gas', 'coal', 'biomass', 'nuclear', 'hydro', 'imports', 'wind', 'solar', 'other', 'misc']

                                return (
                                    <td key={`${rowIndex}-${colIndex}`}>
                                        {showUnit ? (
                                            <>
                                                {value} <span className="carbon-intensity-values">gCO<sub>2</sub>/kWh</span>
                                            </>
                                        ) : showPercentage.includes(head.toLowerCase()) ? (
                                            <>
                                                {value}%
                                            </>
                                        ) : (
                                            value
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;