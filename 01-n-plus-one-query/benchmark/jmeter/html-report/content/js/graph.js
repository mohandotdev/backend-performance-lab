/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 6546.0, "minX": 0.0, "maxY": 16199.0, "series": [{"data": [[0.0, 6546.0], [0.1, 6546.0], [0.2, 6546.0], [0.3, 6546.0], [0.4, 6546.0], [0.5, 6868.0], [0.6, 6868.0], [0.7, 6868.0], [0.8, 6868.0], [0.9, 6868.0], [1.0, 6909.0], [1.1, 6909.0], [1.2, 6909.0], [1.3, 6909.0], [1.4, 6909.0], [1.5, 7228.0], [1.6, 7228.0], [1.7, 7228.0], [1.8, 7228.0], [1.9, 7228.0], [2.0, 7422.0], [2.1, 7422.0], [2.2, 7422.0], [2.3, 7422.0], [2.4, 7422.0], [2.5, 7466.0], [2.6, 7466.0], [2.7, 7466.0], [2.8, 7466.0], [2.9, 7466.0], [3.0, 7937.0], [3.1, 7937.0], [3.2, 7937.0], [3.3, 7937.0], [3.4, 7937.0], [3.5, 8119.0], [3.6, 8119.0], [3.7, 8119.0], [3.8, 8119.0], [3.9, 8119.0], [4.0, 8215.0], [4.1, 8215.0], [4.2, 8215.0], [4.3, 8215.0], [4.4, 8215.0], [4.5, 8344.0], [4.6, 8344.0], [4.7, 8344.0], [4.8, 8344.0], [4.9, 8344.0], [5.0, 8353.0], [5.1, 8353.0], [5.2, 8353.0], [5.3, 8353.0], [5.4, 8353.0], [5.5, 8371.0], [5.6, 8371.0], [5.7, 8371.0], [5.8, 8371.0], [5.9, 8371.0], [6.0, 8384.0], [6.1, 8384.0], [6.2, 8384.0], [6.3, 8384.0], [6.4, 8384.0], [6.5, 8415.0], [6.6, 8415.0], [6.7, 8415.0], [6.8, 8415.0], [6.9, 8415.0], [7.0, 8428.0], [7.1, 8428.0], [7.2, 8428.0], [7.3, 8428.0], [7.4, 8428.0], [7.5, 8451.0], [7.6, 8451.0], [7.7, 8451.0], [7.8, 8451.0], [7.9, 8451.0], [8.0, 8490.0], [8.1, 8490.0], [8.2, 8490.0], [8.3, 8490.0], [8.4, 8490.0], [8.5, 8495.0], [8.6, 8495.0], [8.7, 8495.0], [8.8, 8495.0], [8.9, 8495.0], [9.0, 8564.0], [9.1, 8564.0], [9.2, 8564.0], [9.3, 8564.0], [9.4, 8564.0], [9.5, 8573.0], [9.6, 8573.0], [9.7, 8573.0], [9.8, 8573.0], [9.9, 8573.0], [10.0, 8722.0], [10.1, 8722.0], [10.2, 8722.0], [10.3, 8722.0], [10.4, 8722.0], [10.5, 8749.0], [10.6, 8749.0], [10.7, 8749.0], [10.8, 8749.0], [10.9, 8749.0], [11.0, 8756.0], [11.1, 8756.0], [11.2, 8756.0], [11.3, 8756.0], [11.4, 8756.0], [11.5, 8761.0], [11.6, 8761.0], [11.7, 8761.0], [11.8, 8761.0], [11.9, 8761.0], [12.0, 8782.0], [12.1, 8782.0], [12.2, 8782.0], [12.3, 8782.0], [12.4, 8782.0], [12.5, 8798.0], [12.6, 8798.0], [12.7, 8798.0], [12.8, 8798.0], [12.9, 8798.0], [13.0, 8811.0], [13.1, 8811.0], [13.2, 8811.0], [13.3, 8811.0], [13.4, 8811.0], [13.5, 8835.0], [13.6, 8835.0], [13.7, 8835.0], [13.8, 8835.0], [13.9, 8835.0], [14.0, 8853.0], [14.1, 8853.0], [14.2, 8853.0], [14.3, 8853.0], [14.4, 8853.0], [14.5, 8868.0], [14.6, 8868.0], [14.7, 8868.0], [14.8, 8868.0], [14.9, 8868.0], [15.0, 8896.0], [15.1, 8896.0], [15.2, 8896.0], [15.3, 8896.0], [15.4, 8896.0], [15.5, 8916.0], [15.6, 8916.0], [15.7, 8916.0], [15.8, 8916.0], [15.9, 8916.0], [16.0, 8917.0], [16.1, 8917.0], [16.2, 8917.0], [16.3, 8917.0], [16.4, 8917.0], [16.5, 8933.0], [16.6, 8933.0], [16.7, 8933.0], [16.8, 8933.0], [16.9, 8933.0], [17.0, 8946.0], [17.1, 8946.0], [17.2, 8946.0], [17.3, 8946.0], [17.4, 8946.0], [17.5, 8951.0], [17.6, 8951.0], [17.7, 8951.0], [17.8, 8951.0], [17.9, 8951.0], [18.0, 8951.0], [18.1, 8951.0], [18.2, 8951.0], [18.3, 8951.0], [18.4, 8951.0], [18.5, 8965.0], [18.6, 8965.0], [18.7, 8965.0], [18.8, 8965.0], [18.9, 8965.0], [19.0, 8970.0], [19.1, 8970.0], [19.2, 8970.0], [19.3, 8970.0], [19.4, 8970.0], [19.5, 8980.0], [19.6, 8980.0], [19.7, 8980.0], [19.8, 8980.0], [19.9, 8980.0], [20.0, 9005.0], [20.1, 9005.0], [20.2, 9005.0], [20.3, 9005.0], [20.4, 9005.0], [20.5, 9006.0], [20.6, 9006.0], [20.7, 9006.0], [20.8, 9006.0], [20.9, 9006.0], [21.0, 9010.0], [21.1, 9010.0], [21.2, 9010.0], [21.3, 9010.0], [21.4, 9010.0], [21.5, 9013.0], [21.6, 9013.0], [21.7, 9013.0], [21.8, 9013.0], [21.9, 9013.0], [22.0, 9016.0], [22.1, 9016.0], [22.2, 9016.0], [22.3, 9016.0], [22.4, 9016.0], [22.5, 9029.0], [22.6, 9029.0], [22.7, 9029.0], [22.8, 9029.0], [22.9, 9029.0], [23.0, 9029.0], [23.1, 9029.0], [23.2, 9029.0], [23.3, 9029.0], [23.4, 9029.0], [23.5, 9032.0], [23.6, 9032.0], [23.7, 9032.0], [23.8, 9032.0], [23.9, 9032.0], [24.0, 9035.0], [24.1, 9035.0], [24.2, 9035.0], [24.3, 9035.0], [24.4, 9035.0], [24.5, 9037.0], [24.6, 9037.0], [24.7, 9037.0], [24.8, 9037.0], [24.9, 9037.0], [25.0, 9038.0], [25.1, 9038.0], [25.2, 9038.0], [25.3, 9038.0], [25.4, 9038.0], [25.5, 9055.0], [25.6, 9055.0], [25.7, 9055.0], [25.8, 9055.0], [25.9, 9055.0], [26.0, 9075.0], [26.1, 9075.0], [26.2, 9075.0], [26.3, 9075.0], [26.4, 9075.0], [26.5, 9082.0], [26.6, 9082.0], [26.7, 9082.0], [26.8, 9082.0], [26.9, 9082.0], [27.0, 9108.0], [27.1, 9108.0], [27.2, 9108.0], [27.3, 9108.0], [27.4, 9108.0], [27.5, 9117.0], [27.6, 9117.0], [27.7, 9117.0], [27.8, 9117.0], [27.9, 9117.0], [28.0, 9118.0], [28.1, 9118.0], [28.2, 9118.0], [28.3, 9118.0], [28.4, 9118.0], [28.5, 9120.0], [28.6, 9120.0], [28.7, 9120.0], [28.8, 9120.0], [28.9, 9120.0], [29.0, 9139.0], [29.1, 9139.0], [29.2, 9139.0], [29.3, 9139.0], [29.4, 9139.0], [29.5, 9155.0], [29.6, 9155.0], [29.7, 9155.0], [29.8, 9155.0], [29.9, 9155.0], [30.0, 9205.0], [30.1, 9205.0], [30.2, 9205.0], [30.3, 9205.0], [30.4, 9205.0], [30.5, 9214.0], [30.6, 9214.0], [30.7, 9214.0], [30.8, 9214.0], [30.9, 9214.0], [31.0, 9244.0], [31.1, 9244.0], [31.2, 9244.0], [31.3, 9244.0], [31.4, 9244.0], [31.5, 9267.0], [31.6, 9267.0], [31.7, 9267.0], [31.8, 9267.0], [31.9, 9267.0], [32.0, 9290.0], [32.1, 9290.0], [32.2, 9290.0], [32.3, 9290.0], [32.4, 9290.0], [32.5, 9309.0], [32.6, 9309.0], [32.7, 9309.0], [32.8, 9309.0], [32.9, 9309.0], [33.0, 9330.0], [33.1, 9330.0], [33.2, 9330.0], [33.3, 9330.0], [33.4, 9330.0], [33.5, 9330.0], [33.6, 9330.0], [33.7, 9330.0], [33.8, 9330.0], [33.9, 9330.0], [34.0, 9335.0], [34.1, 9335.0], [34.2, 9335.0], [34.3, 9335.0], [34.4, 9335.0], [34.5, 9343.0], [34.6, 9343.0], [34.7, 9343.0], [34.8, 9343.0], [34.9, 9343.0], [35.0, 9347.0], [35.1, 9347.0], [35.2, 9347.0], [35.3, 9347.0], [35.4, 9347.0], [35.5, 9352.0], [35.6, 9352.0], [35.7, 9352.0], [35.8, 9352.0], [35.9, 9352.0], [36.0, 9354.0], [36.1, 9354.0], [36.2, 9354.0], [36.3, 9354.0], [36.4, 9354.0], [36.5, 9362.0], [36.6, 9362.0], [36.7, 9362.0], [36.8, 9362.0], [36.9, 9362.0], [37.0, 9376.0], [37.1, 9376.0], [37.2, 9376.0], [37.3, 9376.0], [37.4, 9376.0], [37.5, 9381.0], [37.6, 9381.0], [37.7, 9381.0], [37.8, 9381.0], [37.9, 9381.0], [38.0, 9400.0], [38.1, 9400.0], [38.2, 9400.0], [38.3, 9400.0], [38.4, 9400.0], [38.5, 9432.0], [38.6, 9432.0], [38.7, 9432.0], [38.8, 9432.0], [38.9, 9432.0], [39.0, 9434.0], [39.1, 9434.0], [39.2, 9434.0], [39.3, 9434.0], [39.4, 9434.0], [39.5, 9461.0], [39.6, 9461.0], [39.7, 9461.0], [39.8, 9461.0], [39.9, 9461.0], [40.0, 9470.0], [40.1, 9470.0], [40.2, 9470.0], [40.3, 9470.0], [40.4, 9470.0], [40.5, 9487.0], [40.6, 9487.0], [40.7, 9487.0], [40.8, 9487.0], [40.9, 9487.0], [41.0, 9498.0], [41.1, 9498.0], [41.2, 9498.0], [41.3, 9498.0], [41.4, 9498.0], [41.5, 9500.0], [41.6, 9500.0], [41.7, 9500.0], [41.8, 9500.0], [41.9, 9500.0], [42.0, 9510.0], [42.1, 9510.0], [42.2, 9510.0], [42.3, 9510.0], [42.4, 9510.0], [42.5, 9517.0], [42.6, 9517.0], [42.7, 9517.0], [42.8, 9517.0], [42.9, 9517.0], [43.0, 9521.0], [43.1, 9521.0], [43.2, 9521.0], [43.3, 9521.0], [43.4, 9521.0], [43.5, 9536.0], [43.6, 9536.0], [43.7, 9536.0], [43.8, 9536.0], [43.9, 9536.0], [44.0, 9541.0], [44.1, 9541.0], [44.2, 9541.0], [44.3, 9541.0], [44.4, 9541.0], [44.5, 9547.0], [44.6, 9547.0], [44.7, 9547.0], [44.8, 9547.0], [44.9, 9547.0], [45.0, 9611.0], [45.1, 9611.0], [45.2, 9611.0], [45.3, 9611.0], [45.4, 9611.0], [45.5, 9611.0], [45.6, 9611.0], [45.7, 9611.0], [45.8, 9611.0], [45.9, 9611.0], [46.0, 9623.0], [46.1, 9623.0], [46.2, 9623.0], [46.3, 9623.0], [46.4, 9623.0], [46.5, 9653.0], [46.6, 9653.0], [46.7, 9653.0], [46.8, 9653.0], [46.9, 9653.0], [47.0, 9653.0], [47.1, 9653.0], [47.2, 9653.0], [47.3, 9653.0], [47.4, 9653.0], [47.5, 9659.0], [47.6, 9659.0], [47.7, 9659.0], [47.8, 9659.0], [47.9, 9659.0], [48.0, 9662.0], [48.1, 9662.0], [48.2, 9662.0], [48.3, 9662.0], [48.4, 9662.0], [48.5, 9668.0], [48.6, 9668.0], [48.7, 9668.0], [48.8, 9668.0], [48.9, 9668.0], [49.0, 9680.0], [49.1, 9680.0], [49.2, 9680.0], [49.3, 9680.0], [49.4, 9680.0], [49.5, 9683.0], [49.6, 9683.0], [49.7, 9683.0], [49.8, 9683.0], [49.9, 9683.0], [50.0, 9686.0], [50.1, 9686.0], [50.2, 9686.0], [50.3, 9686.0], [50.4, 9686.0], [50.5, 9688.0], [50.6, 9688.0], [50.7, 9688.0], [50.8, 9688.0], [50.9, 9688.0], [51.0, 9690.0], [51.1, 9690.0], [51.2, 9690.0], [51.3, 9690.0], [51.4, 9690.0], [51.5, 9693.0], [51.6, 9693.0], [51.7, 9693.0], [51.8, 9693.0], [51.9, 9693.0], [52.0, 9697.0], [52.1, 9697.0], [52.2, 9697.0], [52.3, 9697.0], [52.4, 9697.0], [52.5, 9698.0], [52.6, 9698.0], [52.7, 9698.0], [52.8, 9698.0], [52.9, 9698.0], [53.0, 9699.0], [53.1, 9699.0], [53.2, 9699.0], [53.3, 9699.0], [53.4, 9699.0], [53.5, 9699.0], [53.6, 9699.0], [53.7, 9699.0], [53.8, 9699.0], [53.9, 9699.0], [54.0, 9701.0], [54.1, 9701.0], [54.2, 9701.0], [54.3, 9701.0], [54.4, 9701.0], [54.5, 9704.0], [54.6, 9704.0], [54.7, 9704.0], [54.8, 9704.0], [54.9, 9704.0], [55.0, 9706.0], [55.1, 9706.0], [55.2, 9706.0], [55.3, 9706.0], [55.4, 9706.0], [55.5, 9706.0], [55.6, 9706.0], [55.7, 9706.0], [55.8, 9706.0], [55.9, 9706.0], [56.0, 9706.0], [56.1, 9706.0], [56.2, 9706.0], [56.3, 9706.0], [56.4, 9706.0], [56.5, 9708.0], [56.6, 9708.0], [56.7, 9708.0], [56.8, 9708.0], [56.9, 9708.0], [57.0, 9722.0], [57.1, 9722.0], [57.2, 9722.0], [57.3, 9722.0], [57.4, 9722.0], [57.5, 9725.0], [57.6, 9725.0], [57.7, 9725.0], [57.8, 9725.0], [57.9, 9725.0], [58.0, 9742.0], [58.1, 9742.0], [58.2, 9742.0], [58.3, 9742.0], [58.4, 9742.0], [58.5, 9746.0], [58.6, 9746.0], [58.7, 9746.0], [58.8, 9746.0], [58.9, 9746.0], [59.0, 9749.0], [59.1, 9749.0], [59.2, 9749.0], [59.3, 9749.0], [59.4, 9749.0], [59.5, 9759.0], [59.6, 9759.0], [59.7, 9759.0], [59.8, 9759.0], [59.9, 9759.0], [60.0, 9775.0], [60.1, 9775.0], [60.2, 9775.0], [60.3, 9775.0], [60.4, 9775.0], [60.5, 9793.0], [60.6, 9793.0], [60.7, 9793.0], [60.8, 9793.0], [60.9, 9793.0], [61.0, 9809.0], [61.1, 9809.0], [61.2, 9809.0], [61.3, 9809.0], [61.4, 9809.0], [61.5, 9828.0], [61.6, 9828.0], [61.7, 9828.0], [61.8, 9828.0], [61.9, 9828.0], [62.0, 9828.0], [62.1, 9828.0], [62.2, 9828.0], [62.3, 9828.0], [62.4, 9828.0], [62.5, 9836.0], [62.6, 9836.0], [62.7, 9836.0], [62.8, 9836.0], [62.9, 9836.0], [63.0, 9891.0], [63.1, 9891.0], [63.2, 9891.0], [63.3, 9891.0], [63.4, 9891.0], [63.5, 9903.0], [63.6, 9903.0], [63.7, 9903.0], [63.8, 9903.0], [63.9, 9903.0], [64.0, 9922.0], [64.1, 9922.0], [64.2, 9922.0], [64.3, 9922.0], [64.4, 9922.0], [64.5, 9929.0], [64.6, 9929.0], [64.7, 9929.0], [64.8, 9929.0], [64.9, 9929.0], [65.0, 9936.0], [65.1, 9936.0], [65.2, 9936.0], [65.3, 9936.0], [65.4, 9936.0], [65.5, 9950.0], [65.6, 9950.0], [65.7, 9950.0], [65.8, 9950.0], [65.9, 9950.0], [66.0, 10002.0], [66.1, 10002.0], [66.2, 10002.0], [66.3, 10002.0], [66.4, 10002.0], [66.5, 10007.0], [66.6, 10007.0], [66.7, 10007.0], [66.8, 10007.0], [66.9, 10007.0], [67.0, 10020.0], [67.1, 10020.0], [67.2, 10020.0], [67.3, 10020.0], [67.4, 10020.0], [67.5, 10049.0], [67.6, 10049.0], [67.7, 10049.0], [67.8, 10049.0], [67.9, 10049.0], [68.0, 10082.0], [68.1, 10082.0], [68.2, 10082.0], [68.3, 10082.0], [68.4, 10082.0], [68.5, 10123.0], [68.6, 10123.0], [68.7, 10123.0], [68.8, 10123.0], [68.9, 10123.0], [69.0, 10419.0], [69.1, 10419.0], [69.2, 10419.0], [69.3, 10419.0], [69.4, 10419.0], [69.5, 10620.0], [69.6, 10620.0], [69.7, 10620.0], [69.8, 10620.0], [69.9, 10620.0], [70.0, 10642.0], [70.1, 10642.0], [70.2, 10642.0], [70.3, 10642.0], [70.4, 10642.0], [70.5, 10644.0], [70.6, 10644.0], [70.7, 10644.0], [70.8, 10644.0], [70.9, 10644.0], [71.0, 10765.0], [71.1, 10765.0], [71.2, 10765.0], [71.3, 10765.0], [71.4, 10765.0], [71.5, 10925.0], [71.6, 10925.0], [71.7, 10925.0], [71.8, 10925.0], [71.9, 10925.0], [72.0, 10980.0], [72.1, 10980.0], [72.2, 10980.0], [72.3, 10980.0], [72.4, 10980.0], [72.5, 11226.0], [72.6, 11226.0], [72.7, 11226.0], [72.8, 11226.0], [72.9, 11226.0], [73.0, 11275.0], [73.1, 11275.0], [73.2, 11275.0], [73.3, 11275.0], [73.4, 11275.0], [73.5, 11343.0], [73.6, 11343.0], [73.7, 11343.0], [73.8, 11343.0], [73.9, 11343.0], [74.0, 11346.0], [74.1, 11346.0], [74.2, 11346.0], [74.3, 11346.0], [74.4, 11346.0], [74.5, 11398.0], [74.6, 11398.0], [74.7, 11398.0], [74.8, 11398.0], [74.9, 11398.0], [75.0, 11594.0], [75.1, 11594.0], [75.2, 11594.0], [75.3, 11594.0], [75.4, 11594.0], [75.5, 11631.0], [75.6, 11631.0], [75.7, 11631.0], [75.8, 11631.0], [75.9, 11631.0], [76.0, 11654.0], [76.1, 11654.0], [76.2, 11654.0], [76.3, 11654.0], [76.4, 11654.0], [76.5, 11745.0], [76.6, 11745.0], [76.7, 11745.0], [76.8, 11745.0], [76.9, 11745.0], [77.0, 11969.0], [77.1, 11969.0], [77.2, 11969.0], [77.3, 11969.0], [77.4, 11969.0], [77.5, 12169.0], [77.6, 12169.0], [77.7, 12169.0], [77.8, 12169.0], [77.9, 12169.0], [78.0, 12176.0], [78.1, 12176.0], [78.2, 12176.0], [78.3, 12176.0], [78.4, 12176.0], [78.5, 12327.0], [78.6, 12327.0], [78.7, 12327.0], [78.8, 12327.0], [78.9, 12327.0], [79.0, 12434.0], [79.1, 12434.0], [79.2, 12434.0], [79.3, 12434.0], [79.4, 12434.0], [79.5, 12472.0], [79.6, 12472.0], [79.7, 12472.0], [79.8, 12472.0], [79.9, 12472.0], [80.0, 12499.0], [80.1, 12499.0], [80.2, 12499.0], [80.3, 12499.0], [80.4, 12499.0], [80.5, 12502.0], [80.6, 12502.0], [80.7, 12502.0], [80.8, 12502.0], [80.9, 12502.0], [81.0, 12507.0], [81.1, 12507.0], [81.2, 12507.0], [81.3, 12507.0], [81.4, 12507.0], [81.5, 12518.0], [81.6, 12518.0], [81.7, 12518.0], [81.8, 12518.0], [81.9, 12518.0], [82.0, 12528.0], [82.1, 12528.0], [82.2, 12528.0], [82.3, 12528.0], [82.4, 12528.0], [82.5, 12538.0], [82.6, 12538.0], [82.7, 12538.0], [82.8, 12538.0], [82.9, 12538.0], [83.0, 12552.0], [83.1, 12552.0], [83.2, 12552.0], [83.3, 12552.0], [83.4, 12552.0], [83.5, 12559.0], [83.6, 12559.0], [83.7, 12559.0], [83.8, 12559.0], [83.9, 12559.0], [84.0, 12560.0], [84.1, 12560.0], [84.2, 12560.0], [84.3, 12560.0], [84.4, 12560.0], [84.5, 12569.0], [84.6, 12569.0], [84.7, 12569.0], [84.8, 12569.0], [84.9, 12569.0], [85.0, 12570.0], [85.1, 12570.0], [85.2, 12570.0], [85.3, 12570.0], [85.4, 12570.0], [85.5, 12573.0], [85.6, 12573.0], [85.7, 12573.0], [85.8, 12573.0], [85.9, 12573.0], [86.0, 12593.0], [86.1, 12593.0], [86.2, 12593.0], [86.3, 12593.0], [86.4, 12593.0], [86.5, 12599.0], [86.6, 12599.0], [86.7, 12599.0], [86.8, 12599.0], [86.9, 12599.0], [87.0, 12605.0], [87.1, 12605.0], [87.2, 12605.0], [87.3, 12605.0], [87.4, 12605.0], [87.5, 12615.0], [87.6, 12615.0], [87.7, 12615.0], [87.8, 12615.0], [87.9, 12615.0], [88.0, 12627.0], [88.1, 12627.0], [88.2, 12627.0], [88.3, 12627.0], [88.4, 12627.0], [88.5, 12627.0], [88.6, 12627.0], [88.7, 12627.0], [88.8, 12627.0], [88.9, 12627.0], [89.0, 12635.0], [89.1, 12635.0], [89.2, 12635.0], [89.3, 12635.0], [89.4, 12635.0], [89.5, 12642.0], [89.6, 12642.0], [89.7, 12642.0], [89.8, 12642.0], [89.9, 12642.0], [90.0, 12645.0], [90.1, 12645.0], [90.2, 12645.0], [90.3, 12645.0], [90.4, 12645.0], [90.5, 12650.0], [90.6, 12650.0], [90.7, 12650.0], [90.8, 12650.0], [90.9, 12650.0], [91.0, 12665.0], [91.1, 12665.0], [91.2, 12665.0], [91.3, 12665.0], [91.4, 12665.0], [91.5, 12680.0], [91.6, 12680.0], [91.7, 12680.0], [91.8, 12680.0], [91.9, 12680.0], [92.0, 12684.0], [92.1, 12684.0], [92.2, 12684.0], [92.3, 12684.0], [92.4, 12684.0], [92.5, 12694.0], [92.6, 12694.0], [92.7, 12694.0], [92.8, 12694.0], [92.9, 12694.0], [93.0, 12697.0], [93.1, 12697.0], [93.2, 12697.0], [93.3, 12697.0], [93.4, 12697.0], [93.5, 12706.0], [93.6, 12706.0], [93.7, 12706.0], [93.8, 12706.0], [93.9, 12706.0], [94.0, 12714.0], [94.1, 12714.0], [94.2, 12714.0], [94.3, 12714.0], [94.4, 12714.0], [94.5, 12719.0], [94.6, 12719.0], [94.7, 12719.0], [94.8, 12719.0], [94.9, 12719.0], [95.0, 12744.0], [95.1, 12744.0], [95.2, 12744.0], [95.3, 12744.0], [95.4, 12744.0], [95.5, 13093.0], [95.6, 13093.0], [95.7, 13093.0], [95.8, 13093.0], [95.9, 13093.0], [96.0, 13307.0], [96.1, 13307.0], [96.2, 13307.0], [96.3, 13307.0], [96.4, 13307.0], [96.5, 13398.0], [96.6, 13398.0], [96.7, 13398.0], [96.8, 13398.0], [96.9, 13398.0], [97.0, 14125.0], [97.1, 14125.0], [97.2, 14125.0], [97.3, 14125.0], [97.4, 14125.0], [97.5, 14503.0], [97.6, 14503.0], [97.7, 14503.0], [97.8, 14503.0], [97.9, 14503.0], [98.0, 15546.0], [98.1, 15546.0], [98.2, 15546.0], [98.3, 15546.0], [98.4, 15546.0], [98.5, 15940.0], [98.6, 15940.0], [98.7, 15940.0], [98.8, 15940.0], [98.9, 15940.0], [99.0, 16175.0], [99.1, 16175.0], [99.2, 16175.0], [99.3, 16175.0], [99.4, 16175.0], [99.5, 16199.0], [99.6, 16199.0], [99.7, 16199.0], [99.8, 16199.0], [99.9, 16199.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 6500.0, "maxY": 18.0, "series": [{"data": [[6500.0, 1.0], [6900.0, 1.0], [6800.0, 1.0], [7400.0, 2.0], [7200.0, 1.0], [7900.0, 1.0], [8100.0, 1.0], [8200.0, 1.0], [8300.0, 4.0], [8500.0, 2.0], [8700.0, 6.0], [8400.0, 5.0], [8900.0, 9.0], [8800.0, 5.0], [9200.0, 5.0], [9100.0, 6.0], [9000.0, 14.0], [9600.0, 18.0], [9500.0, 7.0], [9400.0, 7.0], [9700.0, 14.0], [9300.0, 11.0], [9900.0, 5.0], [10000.0, 5.0], [10100.0, 1.0], [9800.0, 5.0], [10600.0, 3.0], [10700.0, 1.0], [10400.0, 1.0], [10900.0, 2.0], [11200.0, 2.0], [11300.0, 3.0], [11500.0, 1.0], [11700.0, 1.0], [11600.0, 2.0], [12100.0, 2.0], [11900.0, 1.0], [12600.0, 13.0], [12500.0, 13.0], [12700.0, 4.0], [12400.0, 3.0], [12300.0, 1.0], [13300.0, 2.0], [13000.0, 1.0], [14100.0, 1.0], [14500.0, 1.0], [15500.0, 1.0], [16100.0, 2.0], [15900.0, 1.0]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 16100.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 200.0, "minX": 2.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 200.0, "series": [{"data": [], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 200.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 7.8571428571428585, "minX": 1.78085316E12, "maxY": 10.0, "series": [{"data": [[1.78085322E12, 10.0], [1.7808534E12, 7.8571428571428585], [1.78085328E12, 10.0], [1.78085316E12, 10.0], [1.78085334E12, 10.0]], "isOverall": false, "label": "Thread Group", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7808534E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 6546.0, "minX": 1.0, "maxY": 10354.329842931933, "series": [{"data": [[8.0, 8119.0], [4.0, 7228.0], [2.0, 6868.0], [1.0, 6546.0], [9.0, 8344.0], [10.0, 10354.329842931933], [5.0, 7466.0], [6.0, 7422.0], [3.0, 6909.0], [7.0, 7937.0]], "isOverall": false, "label": "HTTP Request", "isController": false}, {"data": [[9.775, 10222.579999999998]], "isOverall": false, "label": "HTTP Request-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 18.133333333333333, "minX": 1.78085316E12, "maxY": 178143.56666666668, "series": [{"data": [[1.78085322E12, 143664.16666666666], [1.7808534E12, 60338.95], [1.78085328E12, 178143.56666666668], [1.78085316E12, 22986.266666666666], [1.78085334E12, 169523.71666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.78085322E12, 113.33333333333333], [1.7808534E12, 47.6], [1.78085328E12, 140.53333333333333], [1.78085316E12, 18.133333333333333], [1.78085334E12, 133.73333333333332]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7808534E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 8099.190476190476, "minX": 1.78085316E12, "maxY": 11839.880000000001, "series": [{"data": [[1.78085322E12, 11839.880000000001], [1.7808534E12, 8099.190476190476], [1.78085328E12, 9492.629032258064], [1.78085316E12, 8660.000000000002], [1.78085334E12, 10586.71186440678]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7808534E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 8098.809523809522, "minX": 1.78085316E12, "maxY": 11839.599999999999, "series": [{"data": [[1.78085322E12, 11839.599999999999], [1.7808534E12, 8098.809523809522], [1.78085328E12, 9492.419354838708], [1.78085316E12, 8659.75], [1.78085334E12, 10586.372881355934]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7808534E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.06000000000000001, "minX": 1.78085316E12, "maxY": 1.2500000000000002, "series": [{"data": [[1.78085322E12, 0.06000000000000001], [1.7808534E12, 0.5714285714285714], [1.78085328E12, 0.20967741935483872], [1.78085316E12, 1.2500000000000002], [1.78085334E12, 0.2203389830508474]], "isOverall": false, "label": "HTTP Request", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7808534E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 6546.0, "minX": 1.78085316E12, "maxY": 16199.0, "series": [{"data": [[1.78085322E12, 12719.0], [1.7808534E12, 9362.0], [1.78085328E12, 10644.0], [1.78085316E12, 8970.0], [1.78085334E12, 16199.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.78085322E12, 8761.0], [1.7808534E12, 6546.0], [1.78085328E12, 8896.0], [1.78085316E12, 8215.0], [1.78085334E12, 8868.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.78085322E12, 12683.6], [1.7808534E12, 8794.8], [1.78085328E12, 9933.9], [1.78085316E12, 8970.0], [1.78085334E12, 14125.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.78085322E12, 12719.0], [1.7808534E12, 9362.0], [1.78085328E12, 10644.0], [1.78085316E12, 8970.0], [1.78085334E12, 16199.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.78085322E12, 12512.5], [1.7808534E12, 8384.0], [1.78085328E12, 9531.0], [1.78085316E12, 8752.5], [1.78085334E12, 9699.0]], "isOverall": false, "label": "Median", "isController": false}, {"data": [[1.78085322E12, 12701.05], [1.7808534E12, 9305.599999999999], [1.78085328E12, 10111.9], [1.78085316E12, 8970.0], [1.78085334E12, 15940.0]], "isOverall": false, "label": "95th percentile", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7808534E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 8762.0, "minX": 1.0, "maxY": 9767.0, "series": [{"data": [[1.0, 9767.0], [2.0, 9697.5], [3.0, 8762.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 8760.5, "minX": 1.0, "maxY": 9767.0, "series": [{"data": [[1.0, 9767.0], [2.0, 9697.0], [3.0, 8760.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 3.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 0.18333333333333332, "minX": 1.78085316E12, "maxY": 1.0333333333333334, "series": [{"data": [[1.78085322E12, 0.8333333333333334], [1.7808534E12, 0.18333333333333332], [1.78085328E12, 1.0333333333333334], [1.78085316E12, 0.3], [1.78085334E12, 0.9833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7808534E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.78085316E12, "maxY": 1.0333333333333334, "series": [{"data": [[1.78085322E12, 0.8333333333333334], [1.7808534E12, 0.35], [1.78085328E12, 1.0333333333333334], [1.78085316E12, 0.13333333333333333], [1.78085334E12, 0.9833333333333333]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.7808534E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.78085316E12, "maxY": 1.0333333333333334, "series": [{"data": [[1.78085322E12, 0.8333333333333334], [1.7808534E12, 0.35], [1.78085328E12, 1.0333333333333334], [1.78085316E12, 0.13333333333333333], [1.78085334E12, 0.9833333333333333]], "isOverall": false, "label": "HTTP Request-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7808534E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.13333333333333333, "minX": 1.78085316E12, "maxY": 1.0333333333333334, "series": [{"data": [[1.78085322E12, 0.8333333333333334], [1.7808534E12, 0.35], [1.78085328E12, 1.0333333333333334], [1.78085316E12, 0.13333333333333333], [1.78085334E12, 0.9833333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.7808534E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 19800000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

