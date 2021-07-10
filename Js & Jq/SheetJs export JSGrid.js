var xlsxloaded = false;
jQuery.loadScript = function (url, callback) {
  // to allow loading the sheetJS file when needed
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

            $.loadScript('../Scripts/sheetjs/xlsx.full.min.js', function () {
                // When loaded ~> change the flag 
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
            let wb = XLSX.utils.table_to_sheet(tbl);
            
            // Add header row in the begining of the sheet
            XLSX.utils.sheet_add_aoa(wb, [header], { origin: 0 });
            if (isDev) console.log(XLSX.utils.sheet_to_csv(wb));

            var wbb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wbb, wb, "WorksheetName");

            let now = moment(new Date()).locale('en-US').format('YYYY-MM-DD HH-mm');

            XLSX.writeFile(wbb, '(' + title + ')-[' + now + ']-ApplicationName.xlsx');
        }
    } catch (e) {
        console.log(e);
        toastr.error(e);
    } finally {
        // Return JSGrid paging 
        $("#" + grdId).jsGrid({ paging: true });
    }
}
