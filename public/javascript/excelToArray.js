    var ExcelToArray = function() {
		data_Vue['Upload_CorrFile'] = 'Yes';
      	this.parseExcel = function(selectedFile) {
        var reader = new FileReader();
        reader.onload = function(e) {
          var data = e.target.result;
          var workbook = XLSX.read(data, {
            type: 'binary'
          });
          
			var excel_sheet_name = workbook.SheetNames;
				excel_sheet_name.forEach(function(y) {
				    var worksheet = workbook.Sheets[y];
				    var headers = {};
				    var data = [];

					  for(var z in worksheet) {
				        if(z[0] === '!') continue;
				    //    var col = z.substring(0,1);
				    //   var row = parseInt(z.substring(1));
						var col = z.slice(0, z.search(/\d/));
						var row = z.replace(col, '');
				        var value = worksheet[z].v;

				        if(row == 1) {
							headers[col] = value;
				           continue;
				        }
						
				        if(!data[row]) data[row]={};
						if (col != "A") data[row][headers[col]]= value;
				    }

					data.shift();
				    data.shift();

					//console.log(data);
				    var mydatawork = data;
					
					document.getElementById("excelImport_button").disabled = false;
					if((mydatawork.length < data_Vue.traitsinfo.length) || data_Vue.traitsinfo.length == 0) {
						document.getElementById("excelImport_button").disabled = true;
						document.getElementById('excelToArray').value = '';
						//data_Vue.geninfo['Excel_File'] = '';
						alert("Problem importing excel file. You have no phenotypes added or add more values to the excel file of diagnonal cells!")
					}
					else {
						Object.keys({'key': 'value'})
						if (window.UndefinedVariable) {
						    Object.assign(window.UndefinedVariable, {})
						}
						
						var m1 = [];
						var m2 = [];
						
						var row1;
						//console.log(mydatawork);
						var cnt = data_Vue.traitsinfo.length;
						for (var i=0; i<cnt; i++) {
							r1 = [];
							for (var j=0; j<=i; j++){
							//	if (i==j) {
							//		r1.push(1);
							//	}
							//	else {
								r1.push(Object.values(mydatawork[i])[j]); }
						//	}	
							m1.push(r1);
						}
						data_Vue.mymatrix1 = m1;
						//console.log(data_Vue.mymatrix1);
						
						for (var x=0; x<cnt; x++) {
							r2 = [];
							for (var y=0; y<x+1; y++){
								r2.push(Object.values(mydatawork[y])[x]);
							}	
							m2.push(r2);
						}
						data_Vue.mymatrix2=m2;
					};
				});
      		 };
                    reader.onerror = function(event) {
                     console.error("File could not be read! Code " + event.target.error.code);
                   };

        reader.readAsBinaryString(selectedFile);
      };
  };