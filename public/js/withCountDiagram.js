(async () => {
    const data = await fetch("/api/diagrams/withcount").then(data => data.json());
    const inventors = data.map(d => d.name);
    const counts = data.map(d => d.count);

    new Chart(
        document.getElementById('barDiagram'),
        {
            type: 'bar',
            data: {
                labels: inventors,
                datasets: [{
                    label: 'Count Of Inventions',
                    data: counts,
                    backgroundColor: '#36A2EB'
                }]
            }
        }
    );
})();