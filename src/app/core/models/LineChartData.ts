/**
 * Data model for line chart display
 * Used to show Olympic data trends over time
 */
export interface LineChartData {
  name: string
  series: {
    name: string,
    value: number
  }[]
}
