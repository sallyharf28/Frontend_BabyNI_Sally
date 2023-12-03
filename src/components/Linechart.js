
import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: this.getSeries(props.data),
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: true,
            tools: {
             
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
          },
        },
        colors: ['#589bc9', '#545454' ,'#5FC09B'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: "Plotted Ne's",
          align: 'center',
          
        },
        grid: {
          borderColor: '#9cdae2',
          row: {
            colors: ['#f3f3f3', 'transparent'],
            opacity: 6.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          title: {
            text: 'DateTime',
          },
          type: 'datetime', // Set x-axis type to datetime
          categories: this.getYearLabels(props.data),
          labels: {
            formatter: function (value) {
              const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric' };
              return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
            },
          },
        },
        yaxis: {
          title: {
            text: 'KPI',
          },
          min: this.getMinValue(props.data),
          max: this.getMaxValue(props.data),
        },
        legend: {
          position: 'top',
          horizontalAlign: 'center',
          floating: true,
          offsetY: -14,
          offsetX: -5,
        },
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedKPI !== this.props.selectedKPI || prevProps.data !== this.props.data) {
      this.setState({
        series: this.getSeries(this.props.data),
        options: {
          ...this.state.options,
          xaxis: {
            ...this.state.options.xaxis,
            categories: this.getYearLabels(this.props.data),
            title:{
              text: 'DateTime',
            },
          },
          yaxis: {
            title:{
              text: 'KPI',
            },
            min: this.getMinValue(this.props.data),
            max: this.getMaxValue(this.props.data),
          },
        },
      });
    }
  }


  getSeries(data) {
    const groupedData = this.groupData(data, ['neAlias','neType']);
    const series = Object.keys(groupedData).map(key => ({
      name: key,
      data: groupedData[key].map(item => this.getKPIValue(item)),
    }));
    return series;
  }

  groupData(data, properties) {
    return data.reduce((result, item) => {
      const key = properties.map(prop => item[prop]).join('_'); // Combine neAlias and neType
    if (!result[key]) {
      result[key] = [];
      }
      result[key].push(item);
      return result;
    }, {});
  }

  getKPIValue(item) {
    switch (this.props.selectedKPI) {
      case 'MAX_RX_LEVEL':
        return item.maxRxLevel !== null ? item.maxRxLevel : undefined;
      case 'RSL_INPUT_POWER':
        return item.rslInputPower !== null ? item.rslInputPower : undefined;
      case 'RSL_DEVIATION':
        return item.rslDeviation !== null ? item.rslDeviation : undefined;
      default:
        return undefined;
    }
  }
  

  getYearLabels(data) {
    return data.map(item => new Date(Date.parse(item.dateTimeKey)).getTime()); // Convert to timestamp
  }

  getMinValue(data) {
    return Math.min(...data.map(item => this.getKPIValue(item)).filter(value => value !== null));
  }

  getMaxValue(data) {
    return Math.max(...data.map(item => this.getKPIValue(item)).filter(value => value !== null));
  }

  render() {
    return (
      <div id="chart">
        <h3>Preformance Chart</h3>
        <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={400} width={1400}/>
      </div>
     
    );
  }
}

export default ApexChart;
