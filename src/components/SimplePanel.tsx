import React, { useEffect, useMemo, useState } from 'react'
import { PanelProps } from '@grafana/data'
import { MenuPanelDashboard, MenuPanelOptions } from 'types'
import { css, cx } from '@emotion/css'
import { PanelDataErrorView } from '@grafana/runtime'
import './menuPanelStyle.css'

interface MenuPanelProps extends PanelProps<MenuPanelOptions> {}

export const MenuPanel: React.FC<MenuPanelProps> = ({ options, data, width, height, fieldConfig, id }) => {
  const [dashboards, setDashboards] = useState<MenuPanelDashboard[]>([])

  useEffect(() => {
    if (options.fetchUrl) {
      fetch(options.fetchUrl)
      .then(response => response.json())
        .then(data => setDashboards(data))
        .catch(error => console.error('Error fetching dashboards:', error))
      return setDashboards([])
    }
  }, [options.fetchUrl])

  const filteredDashboards = useMemo(() => {
    const optionsTags: string[] = options.tags?.split(',').map(tag => tag.trim()) || ''
    return dashboards.filter(dashboard => {
      return dashboard.tags?.some(tag => optionsTags.includes(tag))
    })
  }, [dashboards, options.tags])

  const handleButtonClick = (dashboard: MenuPanelDashboard) => {
    window.open(dashboard.url, '_blank')
  }

  if (data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />
  }

  return (
    <div className={cx(
      css`
        width: ${width}px;
        height: ${height}px;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        align-content: center;
        flex-wrap: wrap;
      `
    )}>
      {filteredDashboards.map(dashboard => {
        return <button
          className='menuButton'
          onClick={() => handleButtonClick(dashboard)}
          key={dashboard.id}
        >
          {dashboard.title}
        </button>
      })}
    </div>
  )
}
