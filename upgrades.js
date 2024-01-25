/** @namespace H5PUpgrades */
var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.Table'] = (function () {
  return {
    1: {
      2: function (parameters, finished, extras) {
        const tables = parameters.text.split('<table');
        let newParams = tables[0];

        for (let i = 1; i < tables.length; i++) {
          let tableChanges = false;
          let cellChanges = false;
          let style = 'style="';
          let cellStyle = 'style="';

          // Find and replace border width and style
          if (tables[i].includes('border')) {
            const needle = 'border="';
            const needleStart = tables[i].indexOf(needle);
            const needleEnd = tables[i].indexOf('"', needleStart + needle.length);
            const borderWidth = parseInt(tables[i].substring(needleStart + needle.length, needleEnd));

            style += 'border-style:solid;border-collapse:collapse;' + 'border-width:' + borderWidth + 'px;';
            cellStyle += tables[i].includes('h5p-table') ?
              'border-style:solid;' :
              'border-style:double;border-collapse:collapse;border-width:0.2em;';

            tableChanges = true;
            cellChanges = true;
          }

          // Find and replace cell padding
          if (tables[i].includes('cellpadding')) {
            const needle = 'cellpadding="';
            const needleStart = tables[i].indexOf(needle);
            const needleEnd = tables[i].indexOf('"', needleStart + needle.length);
            const cellPadding = parseInt(tables[i].substring(needleStart + needle.length, needleEnd));

            cellStyle += 'padding:' + cellPadding + 'px;';
            tables[i] = tables[i].replace(/cellpadding="[0-9]*"/, '');

            cellChanges = true;
          }

          if (tableChanges) {
            // Set border style on the table
            if (tables.includes('style="')) {
              tables[i] = tables[i].replace('style="', style);
            }
            else {
              tables[i] = ' ' + style + '"' + tables[i];
            }
          }

          if (cellChanges) {
            // Set border style on header cells
            let headers = tables[i].split(/<th(?!ead)/);
            tables[i] = headers[0];

            for (let j = 1; j < headers.length; j++) {
              tables[i] += '<th';

              if (headers[j].includes('style="')) {
                tables[i] += headers[j].replace('style="', cellStyle);
              }
              else {
                tables[i] += ' ' + cellStyle + '"' + headers[j];
              }
            }

            // Set border style on cells
            let cells = tables[i].split('<td');
            tables[i] = cells[0];

            for (let j = 1; j < cells.length; j++) {
              tables[i] += '<td';

              if (cells[j].includes('style="')) {
                tables[i] += cells[j].replace('style="', cellStyle);
              }
              else {
                tables[i] += ' ' + cellStyle + '"' + cells[j];
              }
            }
          }

          newParams += '<table' + tables[i];
        }

        parameters.text = newParams;
        finished(null, parameters, extras);
      }
    }
  };
})();