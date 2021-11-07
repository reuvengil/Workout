import { Component } from "react";
import MaterialTable from 'material-table'
import requests from "../api/Requests";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import font from '../font/index'

export default class WorkOutTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Workout Table',
      columns: [
        { title: 'Muscle Group', field: 'muscle_group', editable: 'never', },
        { title: 'Muscle Category', field: 'sub_muscle_group', editable: 'never' },
        { title: 'Training', field: 'training', editable: 'never' },
        { title: 'Sets', field: 'sets' },
        { title: 'Reps', field: 'reps' },
        { title: 'Resistance (in kg)', field: 'resistance' }
      ],
      data: props.data,
      pageSizeOptions: this.getPageSizeOptions(props.data.length),
    }
  }

  getPageSizeOptions(length) {
    if (length <= 5) {
      return [5];
    }
    if (length <= 10) {
      return [5, 10];
    }
    return [5, 10, 20];
  }
  render() {
    return (
      <div style={{ maxWidth: '95%', maxHeight: '75%', margin: 'auto' }}>
        <MaterialTable
          title={this.state.title}
          options={{
            draggable: false,
            exportButton: {
              csv: true,
              pdf: true
            },
            exportCsv: (data, columns) => {
              const columnTitles = `"${([...this.state.columns]
                .map(columnDef => columnDef.title)
                .join('","'))}"`

              const pdfData = data.map(rowData => columns.map(columnDef =>
                `"${columnDef[rowData.field]}"`
              ));
              const body = pdfData[0].map((_, colIndex) => pdfData.map(row => row[colIndex]).join(',')).join('\n');

              //download the file
              var element = document.createElement('a');
              element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`${columnTitles}\n${body}`));
              element.setAttribute('download', `${this.state.title}.csv`);
              element.style.display = 'none';
              document.body.appendChild(element);
              element.click();
              document.body.removeChild(element);
            },
            exportPdf: (data, columns) => {
              const doc = new jsPDF("landscape", "pt", "A4");
              doc.addFileToVFS(font.fileName, font.base64font);
              doc.addFont(font.fileName, font.fontName, 'normal')
              doc.setFont(font.fontName);
              doc.setFontSize(15);
              doc.text(this.state.title, 40, 40);
              const columnTitles = [...this.state.columns]
                .map(columnDef => columnDef.title);

              const pdfData = data.map(rowData => columns.map(columnDef =>
                columnDef[rowData.field]
              ));
              const body = pdfData[0].map((_, colIndex) => pdfData.map(row => row[colIndex]));

              for (let i = 0; i < body.length; i++) {
                for (let j = 0; j < body[i].length; j++) {
                  // hebrew -> set letters direction
                  if ((/[\u0590-\u05FF]/).test(body[i][j])) {
                    body[i][j] = body[i][j].split("").reverse().join("");
                  }
                }
              }

              autoTable(doc, {
                startY: 50,
                head: [columnTitles],
                body: body,
                willDrawCell: (hookData) => doc.setFont(font.fontName)
              })
              doc.save(`${this.state.title}.pdf`);
            },
            pageSizeOptions: this.state.pageSizeOptions,
          }}
          columns={this.state.columns}
          localization={{
            toolbar: {
              exportCSVName: "Export some Excel format!!",
              exportPDFName: "Export as pdf!!"
            }
          }}
          data={this.state.data}
          editable={{
            onRowUpdate: (newData, oldData) => {
              return new Promise((resolve, rej) => {
                requests.updateTraining(oldData, newData).then((res, error) => {
                  var data = [...this.state.data];
                  data[data.indexOf(oldData)] = res.data;
                  this.setState({
                    data: data
                  });
                  resolve();
                });
              })
            },
            onRowDelete: oldData => {
              return new Promise((resolve, rej) => {
                requests.deleteTraining(oldData).then((res) => {
                  if (res.data.success) {
                    var data = [...this.state.data];
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({
                      data: data,
                    });
                  }
                })
                resolve();
              })
            }
          }}
        />
      </div>
    );
  }
}
