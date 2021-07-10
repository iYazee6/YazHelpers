var xlsxloaded = false;

jQuery.loadScript = function (url, callback) {
  // to allow loading the JS file when needed
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

function exportExcelFromJSGrd(grdId, title) {
    try {
        if (!xlsxloaded) {
            // Load SheetJS file when needed (Not a small file at all)
            $.loadScript('../Scripts/sheetjs/xlsx.full.min.js', function () {
                // When loaded ~> update flag 
                xlsxloaded = true;
                exportExcelFromJSGrd(grdId, title);
            });
        }
        else {
            // Start by collecting Table header as an array
            let header = Array();
            $("#" + grdId + " table:first tr:first th").each(function (i, v) {
                header[i] = $(this).text();
            });
            
            // JSGrid ~> remove paging to display all data
            $("#" + grdId).jsGrid({ paging: false });
            
            // Get all table data
            var tbl = document.getElementById(grdId).getElementsByTagName('table')[1];
            tbl.insertRow(0); // insert empty row at the begining for header
            let wb = XLSX.utils.table_to_sheet(tbl);
            
            // Add header row in the begining of the sheet
            // origin default is 0, no need to send it as param, you can use origin:-1 will add data at the end of sheet 
            XLSX.utils.sheet_add_aoa(wb, [header], { origin: 0 });
            if (WantToDisplayResult) console.log(XLSX.utils.sheet_to_csv(wb));

            var wbb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wbb, wb, "WorksheetName");
          
            // I'm using Moment to get current date time and useit in the Excel file name 
            // End result should look something like (Title)-[2021-01-01 13-59]-ApplicationName.xlsx
            let now = moment(new Date()).locale('en-US').format('YYYY-MM-DD HH-mm');
            XLSX.writeFile(wbb, '(' + title + ')-[' + now + ']-ApplicationName.xlsx');
        }
    } catch (e) {
        console.log(e);
        // If you want to use toastr to show message (https://codeseven.github.io/toastr/)
        toastr.error(e);
    } finally {
        // Return JSGrid paging 
        $("#" + grdId).jsGrid({ paging: true });
    }
}
