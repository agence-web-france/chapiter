import type { NextPage } from 'next'
import AnalyticsList from '../../../features/admin/analytics/list'
import AnalyticsTimeline from '../../../features/admin/analytics/timeline'

const DashboardIndex: NextPage = () => {
  return (
    <>
      <AnalyticsTimeline />
      <AnalyticsList />
    </>
  )
}

export default DashboardIndex
