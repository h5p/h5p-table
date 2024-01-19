/** @namespace H5PUpgrades */
var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.Table'] = (function () {
  return {
    1: {
      2: function (parameters, finished, extras) {
        const tables = parameters.text.split('<table');
        let newParams = tables[0];

        for (let i = 1; i < tables.length; i++) {
          const style = tables[i].includes('h5p-table') ? 
            'style="border-style:solid;' :
            'style="border-style:double;border-width: 0.2em;border-collapse:collapse;';

          if (tables[i].includes('border')) {
            // Set border style on the table
            if (tables.includes('style="')) {
              tables[i] = tables[i].replace('style="', style);
            }
            else {
              tables[i] = ' ' + style + '"' + tables[i];
            }

            // Set border style on header cells
            let headers = tables[i].split(/<th(?!ead)/);
            tables[i] = headers[0];

            for (let j = 1; j < headers.length; j++) {
              tables[i] += '<th';

              if (headers[j].includes('style="')) {
                tables[i] += headers[j].replace('style="', style);
              }
              else {
                tables[i] += ' ' + style + '"' + headers[j];
              }
            }
            
            // Set border style on cells
            let cells = tables[i].split('<td');
            tables[i] = cells[0];

            for (let j = 1; j < cells.length; j++) {
              tables[i] += '<td';

              if (cells[j].includes('style="')) {
                tables[i] += cells[j].replace('style="', style);
              }
              else {
                tables[i] += ' ' + style + '"' + cells[j];
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