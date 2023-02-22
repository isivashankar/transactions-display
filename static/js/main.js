var columnDefs = [
    {
        headerName: "DATE",
        field: "date",
        width: 120,
        type: ['dateColumn', 'nonEditableColumn'],
        cellStyle: {textAlign: "left"},
        filter: 'agDateColumnFilter',
        valueFormatter: function(params) {
            var dateObj = new Date(params.data.date);
            var month = dateObj.toLocaleString('default', { month: 'short' });
            var day = dateObj.getDate();
            var year = dateObj.getFullYear();
            var hour = dateObj.getHours();
            var minute = dateObj.getMinutes();
            var ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12;
            hour = hour ? hour : 12; // the hour '0' should be '12'
            minute = minute < 10 ? '0'+minute : minute;
            var strTime = hour + ':' + minute + ' ' + ampm;
            return year + ' ' + month + ' ' + day + ', ' + strTime;
          }
    },
    {
        headerName: "GROSS AMOUNT",
        field: "gross_amount",
        width: 120,
        valueFormatter: function(params) {
            return '$' + params.data.gross_amount.toFixed(2);
        },
        filter: 'agNumberColumnFilter'
    },
    {
        headerName: "STATUS",
        field: "status",
        width: 90,
        cellRenderer: statusValueFormatter,
        cellStyle: {textAlign: "left"},
    },
    {
        headerName: "CUSTOMER",
        field: "customer",
        width: 140,
        cellStyle: {textAlign: "left"},
    },
    {
        headerName: "SWIFTER ID",
        field: "swifter_id",
        width: 100,        
        cellStyle: {textAlign: "left"},
    },
    {
        headerName: "EXTERNAL ID",
        field: "external_id",
        width: 100,
        cellStyle: {textAlign: "left"},
    },
    {
        headerName: "SOURCE",
        field: "source",
        width: 100,
        cellStyle: {textAlign: "left"},
    }
    ];

var gridOptions = {
    rowData: null,
    columnDefs: columnDefs,
    defaultColDef: {
        width: 100,
        resizable: true,
        filter: 'agTextColumnFilter',
        floatingFilter: true
    },
    editType: 'fullRow',
    pagination: true,
    paginationPageSize: 15,
    autoHeight: true,
    rowHeight: 29
};

document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('/transactions')
    .then(response => response.json())
    .then(function(data) {
        // data = JSON.parse(data);
        console.info(data);
        gridOptions.api.setRowData(data);
        gridOptions.api.sizeColumnsToFit();
    });
});

// function currencyFormatter(currency, sign) {
//     var sansDec = currency.toFixed(0);
//     var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
//     return sign + `${formatted}`;
//   }

function statusValueFormatter(params) {
    const status = params.data.status;
    let color = '';
    let backgroundColor = '';
  
    switch (status) {
      case 'authorized':
        color = 'orange';
        backgroundColor = 'yellow';
        break;
      case 'initiated':
        color = 'darkblue';
        backgroundColor = 'lightblue';
        break;
      case 'successful':
        color = 'green';
        backgroundColor = 'lightgreen';
        break;
      case 'returned':
        color = 'red';
        backgroundColor = 'lightpink';
        break;
      case 'canceled':
        color = 'black';
        backgroundColor = 'lightgrey';
        break;
      default:
        break;
    }
    let rendererText = status
    if (status === 'authorized' || status === 'initiated' || status === 'returned') {
        rendererText = `ACH ${status}`;
    }
    return `<code style="color: ${color}; background-color: ${backgroundColor};">${rendererText.toUpperCase()}</code>`;
}

function onBtnExport() {
    gridOptions.api.exportDataAsCsv();
}