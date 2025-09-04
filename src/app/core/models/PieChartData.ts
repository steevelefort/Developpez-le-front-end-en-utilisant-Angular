/**
 * Data model for pie chart display
 * Used to show Olympic data in pie chart format
 */
export interface PieChartData {
  name: string
  value: number
  extra?: { id: number }
}

