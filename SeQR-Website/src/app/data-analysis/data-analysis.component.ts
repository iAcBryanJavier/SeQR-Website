import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-data-analysis',
  templateUrl: './data-analysis.component.html',
  styleUrls: ['./data-analysis.component.css']
})
export class DataAnalysisComponent implements OnInit {

  public data: any = [];
  chart: any;

  constructor(private db: DatabaseService) { }

  ngOnInit(): void {

    this.db.getCourses().subscribe(i => {
      this.data = i;
      console.log(this.data);
      this.createChart();
    });

    
  }

  createChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    // Create the chart
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        datasets: [{
          data: this.data,
          label: 'My Data'
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'
            }
          },
          y: {
            beginAtZero: true,
            suggestedMin: 0 // Add this line to fix the error
          }
        }
      }
    });
  }

}
